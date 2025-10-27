import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "~/lib/utils";

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}
const fileImage = {
  "application/pdf": "images/pdf.png",
  "image/png": "images/png.png",
  "image/jpeg": "images/jpg.png",
};
const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const maxFileSize = 10 * 1024 * 1024;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null;
      setSelectedFile(file);
      onFileSelect?.(file);
    },
    [onFileSelect],
  );
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: {
        "application/pdf": [".pdf"],
        "image/png": [".png"],
        "image/jpeg": [".jpg", ".jpeg"],
      },
      maxSize: 10 * 1024 * 1024,
    });
  // const file = acceptedFiles[0] || null;

  return (
    <div className="w-full gradient-border">
      <div {...getRootProps()}>
        <input {...getInputProps()} id="uploader" name="uploader" />
        <div className="space-y-4 cursor-pointer">
          {selectedFile ? (
            <div
              className="uploader-selected-file"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                alt={selectedFile.type}
                src={fileImage[selectedFile.type]}
                className="size-10"
              />
              <div className="flex items-center space-x-3">
                <div>
                  <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                    {selectedFile.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatSize(selectedFile.size)}
                  </p>
                </div>
              </div>
              <button
                className="p-2 cursor-pointer"
                onClick={(e) => {
                  onFileSelect?.(null);
                  setSelectedFile(null);
                }}
              >
                <img src="/icons/cross.svg" alt="remove" className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div>
              <div className="mx-auto w016 h-16 flex items-center justify-center mb-2">
                <img src="/icons/info.svg" alt="upload" className="size-20" />
              </div>
              <p className="text-lg text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-lg text-gray-500">
                PDF, PNG or JPG (max. {formatSize(maxFileSize)})
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default FileUploader;
