"use client";

interface Props {
  logo?: string;
  onUpload: (logo: string) => void;
}

export default function LogoUploader({ logo, onUpload }: Props) {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) onUpload(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    onUpload(""); // Clear the logo
  };

  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow space-y-2">
      <h2 className="text-lg font-semibold">Upload Logo</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="bg-blue-950 p-0 border border-gray-300 rounded"
      />

      {logo && (
        <div className="space-y-2">
          <img src={logo} alt="Logo" className="w-32 h-auto" />
          <button
            onClick={handleRemove}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded transition-colors"
          >
            Remove Logo
          </button>
        </div>
      )}
    </div>
  );
}
