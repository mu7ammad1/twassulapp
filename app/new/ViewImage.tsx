"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CircleUserRound, CircleUserRoundIcon } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";

interface ImagePreviewProps {
  initialPreviews?: any[];
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  initialPreviews = [],
}) => {

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const previews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
    }
  };






  const previewRef = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleButtonClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      previewRef.current = url;
      console.log("File selected:", file);
    }
  }, []);

  const handleRemove = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setFileName(null);
    setPreviewUrl(null);
    previewRef.current = null;
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [previewUrl]);

  useEffect(() => {
    return () => {
      if (previewRef.current) {
        URL.revokeObjectURL(previewRef.current);
      }
    };
  }, []);





















  return (
    <div className="flex flex-wrap gap-2">





      <div>
        <div className="inline-flex items-center gap-2 align-top">
          <div
            className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-input"
            aria-label={previewUrl ? "Preview of uploaded image" : "Default user avatar"}
          >
            {previewUrl ? (
              <Image
                className="h-full w-full object-cover"
                src={previewUrl}
                alt="Preview of uploaded image"
                width={32}
                height={32}
              />
            ) : (
              <div aria-hidden="true">
                <CircleUserRoundIcon className="opacity-60" size={16} strokeWidth={2} />
              </div>
            )}
          </div>
          <div className="relative inline-block">
            <span onClick={handleButtonClick} aria-haspopup="dialog">
              {fileName ? "Change image" : "Upload image"}
            </span>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange || handleImageChange}
              className="hidden"
              accept="image/*"
              multiple
              aria-label="Upload image file"
              name="photos"
              id="photos"
            />
          </div>
        </div>
        {fileName && (
          <div className="mt-2">
            <div className="inline-flex gap-2 text-xs">
              <p className="truncate text-muted-foreground" aria-live="polite">
                {fileName}
              </p>{" "}
              <button
                onClick={handleRemove}
                className="font-medium text-red-500 hover:underline"
                aria-label={`Remove ${fileName}`}
              >
                Remove
              </button>
            </div>
          </div>
        )}
        <div className="sr-only" aria-live="polite" role="status">
          {previewUrl ? "Image uploaded and preview available" : "No image uploaded"}
        </div>
      </div>

    </div>
  );
};












export default ImagePreview;
