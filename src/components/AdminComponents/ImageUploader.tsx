import { useState, useRef } from "react";
import { X, Upload, LinkIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import api from "@/api/axiosInstance";

interface ImageUploaderProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export function ImageUploader({ value, onChange }: ImageUploaderProps) {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [urlInput, setUrlInput] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  // const handleFiles = (files: FileList) => {
  //   const newUrls = [...value];

  //   Array.from(files).forEach((file) => {
  //     const objectUrl = URL.createObjectURL(file);
  //     newUrls.push(objectUrl);
  //   });

  //   onChange(newUrls);
  // };
  const handleFiles = async (files: FileList) => {
    const newUrls = [...value];

    for (const file of Array.from(files)) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", "image");

        const response = await api.post(
          "/upload/product",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        const imageUrl = "http://localhost:8080" + response.data.data; // adjust if needed
        newUrls.push(imageUrl);
      } catch (error) {
        console.error("Image upload failed:", error);
        // Optional: show toast or error UI here
      }
    }

    onChange(newUrls);
  };

  const handleUrlAdd = () => {
    if (urlInput && !value.includes(urlInput)) {
      onChange([...value, urlInput]);
      setUrlInput("");
      setIsDialogOpen(false);
    }
  };

  const removeImage = (index: number) => {
    const newUrls = [...value];
    newUrls.splice(index, 1);
    onChange(newUrls);
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
          dragActive ? "border-amber-500 bg-amber-50" : "border-gray-300"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-3 text-center">
          <Upload className="h-10 w-10 text-amber-600" />
          <div className="text-sm text-gray-600">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="mt-2"
          >
            Browse Files
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <LinkIcon className="h-4 w-4" />
              Add Image URL
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Image URL</DialogTitle>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <Input
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              <Button type="button" onClick={handleUrlAdd}>
                Add
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {value.map((url, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-md overflow-hidden border border-gray-200">
                <img
                  src={url || "/placeholder.svg"}
                  alt={`Product image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="aspect-square rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-amber-500 transition-colors"
          >
            <Plus className="h-6 w-6 text-gray-400" />
          </button>
        </div>
      )}
    </div>
  );
}
