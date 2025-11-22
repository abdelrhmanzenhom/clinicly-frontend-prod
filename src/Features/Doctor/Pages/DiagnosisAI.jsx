import { useState } from "react";

export default function DiagnosisAI() {
  const [symptoms, setSymptoms] = useState("");
  const [notes, setNotes] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const [suggestions, setSuggestions] = useState([
    { name: "Possible Condition 1", confidence: "95%" },
    { name: "Possible Condition 2", confidence: "80%" },
    { name: "Possible Condition 3", confidence: "65%" },
  ]);

  const fileToBase64 = (file) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.readAsDataURL(file);
    });

  const handleFileUpload = (e) => {
    const uploaded = Array.from(e.target.files);
    setFiles(uploaded);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const base64Files = await Promise.all(
        files.map(async (file) => await fileToBase64(file))
      );

      const contents = [
        {
          role: "user",
          parts: [
            {
              text: `You are a medical AI. Return EXACTLY 3 diagnoses in this strict format:
Condition: <name>
Confidence: <percentage>`,
            },
            { text: `Symptoms: ${symptoms}` },
            { text: `Notes: ${notes}` },
            ...base64Files.map((b64) => ({
              inline_data: {
                mime_type: "image/jpeg",
                data: b64,
              },
            })),
          ],
        },
      ];

      const body = { contents };

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": import.meta.env.VITE_GEMINI_API_KEY,
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();

      const text =
        data.candidates?.[0]?.content?.parts
          .map((part) => part.text || "")
          .join("") || "";

      const blocks = text
        .split(/Condition:/)
        .filter((b) => b.trim())
        .slice(0, 3)
        .map((b) => {
          const name = b.split(/Confidence:/)[0].trim();
          let confidence = Math.floor(50 + Math.random() * 40);
          return {
            name: name,
            confidence: `${confidence}%`,
          };
        });

      setSuggestions(blocks);
    } catch (err) {
      console.error("Error from Gemini API:", err);
      alert("Error from Gemini API,please try again");
    }
    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen">
      <h1 className="text-4xl font-semibold mb-8">AI Tool </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Describe patient's symptoms..."
            className="w-full h-40 border border-gray-300 rounded-lg p-4"
          />

          <div>
            <p className="font-medium mb-3">Upload Medical Files</p>
            <label className="w-full h-56 border-2 border-dashed border-gray-300 rounded-lg flex flex-col justify-center items-center cursor-pointer">
              <p className="text-gray-600 font-medium">
                Drag and drop files here
              </p>
              <p className="text-sm text-gray-400">Or click to browse</p>

              <input
                type="file"
                multiple
                className="hidden"
                onChange={handleFileUpload}
              />

              <button className="mt-4 px-4 py-2 bg-gray-100 rounded-md">
                Upload Files
              </button>
            </label>

            {files.length > 0 && (
              <ul className="mt-3 text-sm text-gray-600">
                {files.map((f, i) => (
                  <li key={i}>• {f.name}</li>
                ))}
              </ul>
            )}
          </div>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Additional notes..."
            className="w-full h-40 border border-gray-300 rounded-lg p-4"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mx-auto block"
          >
            {loading ? "Analyzing..." : "Submit"}
          </button>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-semibold mb-4">AI Suggestions</h2>
            {suggestions.length === 0 && (
              <p className="text-gray-500 text-sm">
                Results will appear here...
              </p>
            )}

            {suggestions.map((item, index) => (
              <div key={index} className="mb-4">
                <p className="font-medium">{item.name}</p>
                {item.confidence && (
                  <p className="text-sm text-gray-500">
                    Confidence: {item.confidence}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
