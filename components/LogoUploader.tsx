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

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow space-y-2">
      <h2 className="text-lg font-semibold">Upload Logo</h2>
      <input type="file" accept="image/*" onChange={handleFile} />
      {logo && <img src={logo} alt="Logo" className="w-32 h-auto" />}
    </div>
  );
}
