import { useState } from "react";

export default function DoctorSpecialtyAI() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [medFiles, setMedFiles] = useState([]);
  [];

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const contents = [
        {
          role: "user",
          parts: [
            {
              text: `User Medical Prompt: ${prompt}\n\nPlease return EXACTLY this format for 3 options only:\nCondition: <name>\nSpecialty: <doctor specialty>\nSeverity: <Low/Moderate/High>`,
            },
          ],
        },
      ];

      // Convert medication files to base64 FULL CONTENT for Gemini analysis
      const medFilesBase64 = await Promise.all(
        (medFiles || []).map(
          (file) =>
            new Promise((resolve) => {
              const reader = new FileReader();
              reader.onload = () =>
                resolve({ name: file.name, data: reader.result });
              reader.readAsDataURL(file);
            })
        )
      );

      // Build a detailed medication content block for Gemini
      const medicationBlock = medFilesBase64.length
        ? "\n\nUploaded Medication Files (Base64 Included):\n" +
          medFilesBase64
            .map(
              (f) =>
                `File: ${f.name}\nContent(Base64): ${f.data}\n------------------------------------`
            )
            .join("\n") +
          "\n"
        : "";

      // Append the medication details (full Base64) into the prompt
      contents[0].parts.push({ text: medicationBlock });
      const medicationNote = medFilesBase64.length
        ? "Uploaded Medications/Treatments:" +
          medFilesBase64.map((f) => `- ${f.name}`).join("") +
          ""
        : "";

      // Append medication files info to the prompt
      contents[0].parts[0].text += medicationNote;

      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": import.meta.env.VITE_GEMINI_API_KEY,
          },
          body: JSON.stringify({ contents }),
        }
      );

      if (!response.ok) throw new Error("Gemini Error");

      const data = await response.json();
      const text =
        data.candidates?.[0]?.content?.parts
          .map((p) => p.text || "")
          .join("") || "";

      const blocks = text.split("Condition:").slice(1);

      const parsed = blocks.map((block) => {
        const lines = block.trim().split("\n");
        return {
          condition: lines[0]?.trim() || "Unknown",
          specialty: lines[1]?.replace("Specialty:", "").trim() || "N/A",
          severity: lines[2]?.replace("Severity:", "").trim() || "N/A",
        };
      });

      setResult(parsed.slice(0, 3));
    } catch (err) {
      console.error(err);
      alert("خطأ من API", err);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 w-full min-h-screen">
      <h1 className="text-3xl font-semibold mb-8">AI Doctor Specialty Guide</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your symptoms or medical concern..."
            className="w-full h-40 border border-gray-300 rounded-lg p-4"
          />

          {/* Upload Medication / Treatment Files */}
          <div>
            <p className="font-medium mb-3">
              Upload Medication / Treatment Files
            </p>
            <label className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col justify-center items-center cursor-pointer">
              <p className="text-gray-600 font-medium">
                Drag and drop files here
              </p>
              <p className="text-sm text-gray-400">Or click to browse</p>

              <input
                type="file"
                multiple
                className="hidden"
                onChange={(e) => setMedFiles(Array.from(e.target.files))}
              />

              <button className="mt-4 px-4 py-2 bg-gray-100 rounded-md">
                Upload Files
              </button>
            </label>

            {medFiles?.length > 0 && (
              <ul className="mt-3 text-sm text-gray-600">
                {medFiles.map((f, i) => (
                  <li key={i}>• {f.name}</li>
                ))}
              </ul>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {loading ? "Analyzing..." : "Submit"}
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">AI Suggestions</h2>

          {result.length === 0 && (
            <p className="text-gray-500 text-sm">Results will appear here...</p>
          )}

          {result.map((item, i) => (
            <div key={i} className="mb-5 border p-4 rounded-lg shadow-sm">
              <p className="font-medium text-lg">Condition: {item.condition}</p>
              <p className="text-sm text-gray-600">
                Specialty: {item.specialty}
              </p>
              <p className="text-sm text-gray-600">Severity: {item.severity}</p>
              <div
                className={`h-2 w-full rounded mt-1 ${
                  item.severity === "High"
                    ? "bg-red-500"
                    : item.severity === "Moderate"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
