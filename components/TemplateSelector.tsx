"use client";

interface Props {
  template: "minimal" | "modern" | "classic";
  onChange: (template: "minimal" | "modern" | "classic") => void;
}

export default function TemplateSelector({ template, onChange }: Props) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Select Template</h2>
      <div className="flex gap-4">
        {["minimal", "modern", "classic"].map((t) => (
          <button
            key={t}
            className={`px-4 py-2 rounded ${
              template === t ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700"
            }`}
            onClick={() => onChange(t as "minimal" | "modern" | "classic")}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
