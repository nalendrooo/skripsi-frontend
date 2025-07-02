// components/EmptyState.tsx
import { FileX } from "lucide-react";

const EmptyState = ({
  title = "Tidak ada data",
  description = "Silakan tambah data baru atau ubah filter pencarian.",
}: {
  title?: string;
  description?: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-6  rounded-xl  ">
      <FileX className="w-12 h-12 text-gray-500 mb-4" />
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </div>
  );
};

export default EmptyState;
