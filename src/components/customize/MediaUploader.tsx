import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image, Video, FileVideo, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MediaItem {
  id: string;
  type: "image" | "video" | "animation";
  file: File;
  preview: string;
}

export const MediaUploader = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newMediaItems: MediaItem[] = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      type: file.type.startsWith("image/") 
        ? "image" 
        : file.type.startsWith("video/") 
          ? "video" 
          : "animation",
      file,
      preview: URL.createObjectURL(file)
    }));

    setMediaItems((prev) => [...prev, ...newMediaItems]);
    toast({
      title: "Media uploaded",
      description: `${files.length} file(s) successfully added`,
    });
  };

  const removeItem = (id: string) => {
    setMediaItems((prev) => {
      const itemToRemove = prev.find(item => item.id === id);
      if (itemToRemove) {
        URL.revokeObjectURL(itemToRemove.preview);
      }
      return prev.filter(item => item.id !== id);
    });
  };

  return (
    <Card className="p-6 space-y-6 animate-fade-up">
      <div className="flex items-center gap-2 mb-4">
        <Upload className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Media Upload</h2>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Upload images, videos, or animations to use in your website.
          Supported formats: PNG, JPG, GIF, MP4, WebM
        </p>

        <div className="flex justify-center">
          <label className="cursor-pointer w-full">
            <Input
              type="file"
              className="hidden"
              multiple
              capture="environment"
              accept="image/*,video/*"
              onChange={handleFileUpload}
            />
            <Button variant="outline" className="w-full">
              <Upload className="mr-2 h-4 w-4" />
              Choose from Gallery
            </Button>
          </label>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {mediaItems.map((item) => (
            <div key={item.id} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-neutral-100 border">
                {item.type === "image" ? (
                  <img
                    src={item.preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={item.preview}
                    className="w-full h-full object-cover"
                    controls
                  />
                )}
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeItem(item.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-1 text-sm text-center text-gray-600 truncate">
                {item.file.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};