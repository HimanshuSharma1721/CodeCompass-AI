import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { uploadRepository } from "../services/api";

function UploadCard({ onUploadSuccess }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a ZIP file.");
      return;
    }

    try {
      setUploading(true);

      await uploadRepository(selectedFile);

      alert(`✅ ${selectedFile.name} uploaded successfully`);

      onUploadSuccess();
    } catch (error) {
      console.error(error);
      alert("❌ Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center bg-white px-6">

      <div className="w-full max-w-xl border border-slate-200 rounded-2xl p-10 shadow-sm">

        <div className="flex justify-center">
          <UploadCloud size={48} className="text-slate-700" />
        </div>

        <h1 className="mt-6 text-3xl font-semibold text-center text-slate-900">
          Upload Repository
        </h1>

        <p className="mt-3 text-center text-slate-500">
          Upload a ZIP repository to start chatting with your codebase.
        </p>

        <div className="mt-10">

          <input
            type="file"
            accept=".zip"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            className="block w-full text-sm
                       file:mr-4
                       file:py-3
                       file:px-4
                       file:border-0
                       file:rounded-xl
                       file:bg-slate-900
                       file:text-white
                       file:cursor-pointer
                       cursor-pointer"
          />

          {selectedFile && (
            <p className="mt-4 text-sm text-slate-600">
              Selected: <span className="font-medium">{selectedFile.name}</span>
            </p>
          )}

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="mt-8 w-full bg-slate-900 text-white py-3 rounded-xl hover:bg-slate-800 transition disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload Repository"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default UploadCard;