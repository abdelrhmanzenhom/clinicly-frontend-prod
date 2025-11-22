import { useState } from "react";

export default function MedicalRecords() {
  const [loadingFile, setLoadingFile] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);

  // Modal
  const [previewImage, setPreviewImage] = useState(null);

  // ------------------ Upload FILES (MULTIPLE) ------------------
  const uploadFile = async (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (!selectedFiles.length) return;

    setLoadingFile(true);

    for (const file of selectedFiles) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "FinalProjectRaw");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/duzsjvocp/raw/upload",
        { method: "POST", body: data }
      );

      const uploaded = await res.json();

      setFiles((prev) => [
        ...prev,
        { name: file.name, url: uploaded.secure_url },
      ]);
    }

    setLoadingFile(false);
  };

  // ------------------ Upload IMAGES (MULTIPLE) ------------------
  const uploadImage = async (event) => {
    const selectedImgs = Array.from(event.target.files);
    if (!selectedImgs.length) return;

    setLoadingImage(true);

    for (const img of selectedImgs) {
      const data = new FormData();
      data.append("file", img);
      data.append("upload_preset", "FinalProjectImages");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/duzsjvocp/image/upload",
        { method: "POST", body: data }
      );

      const uploaded = await res.json();

      setImages((prev) => [
        ...prev,
        { name: img.name, url: uploaded.secure_url },
      ]);
    }

    setLoadingImage(false);
  };

  const deleteFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const deleteImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 flex justify-center">

      {/* MODAL PREVIEW */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            className="max-w-[80%] max-h-[80%] rounded-lg shadow-xl"
          />
        </div>
      )}

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 px-4">

        {/* --------------------- FILES SECTION --------------------- */}
        <div className="flex flex-col items-center gap-6">

          <div className="bg-white w-full h-80 rounded-2xl shadow-lg flex flex-col items-center justify-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Upload File</h2>

            {loadingFile ? (
              <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-blue-500 opacity-80 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 16v-8m0 0l-4 4m4-4l4 4m6 4v1a2 2 0 01-2 2H4a2 2 0 01-2-2v-1m16-8l2 2m0 0l-2 2m2-2h-6" />
              </svg>
            )}

            <label className="cursor-pointer bg-blue-600 text-white px-5 py-2 rounded-xl text-lg hover:bg-blue-700 transition">
              Choose
              <input type="file" multiple hidden onChange={uploadFile} />
            </label>
          </div>

          <div className="w-full">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Files</h3>
            <div className="flex flex-col gap-4">
              {files.map((file, index) => (
                <div key={index} className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800 truncate w-40">{file.name}</p>
<a
  href={file.url}
  target="_blank"
  className="text-red-600 cursor-pointer text-sm no-underline mt-1"
>
                      Download
                    </a>
                  </div>

                  <button
                    onClick={() => deleteFile(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg cursor-pointer hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --------------------- IMAGES SECTION --------------------- */}
        <div className="flex flex-col items-center gap-6">

          <div className="bg-white w-full h-80 rounded-2xl shadow-lg flex flex-col items-center justify-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Upload Img</h2>

            {loadingImage ? (
              <div className="w-12 h-12 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-blue-500 opacity-80 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l9 6 9-6M3 7l9-4 9 4" />
              </svg>
            )}

            <label className="cursor-pointer bg-blue-600 text-white px-5 py-2 rounded-xl text-lg">
              Choose
              <input type="file" multiple accept="image/*" hidden onChange={uploadImage} />
            </label>
          </div>

          {/* GRID IMAGES */}
          <div className="w-full">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Images</h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="bg-white p-3 rounded-xl shadow-md flex flex-col items-center"
                >
                  <img
                    src={img.url}
                    onClick={() => setPreviewImage(img.url)}
                    className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-80"
                  />

                  <p className="font-medium text-gray-800 text-center truncate w-full mt-2">
                    {img.name}
                  </p>

                  <div className="flex gap-2 mt-2">
                    <a
                      href={img.url}
                      target="_blank"
                      className="bg-blue-500 text-white px-1 py-1 rounded-lg cursor-pointer hover:bg-blue-600"
                    >
                      Download
                    </a>

                    <button
                      onClick={() => deleteImage(index)}
                      className="bg-red-500 text-white px-1 py-1 rounded-lg cursor-pointer hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
