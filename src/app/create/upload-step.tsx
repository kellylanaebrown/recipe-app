"use client";

import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

type UploadStepProps = {
  formAction: (formData: FormData) => void;
  isPending: boolean;
};

type Handle = {
  fileInputRef: React.RefObject<HTMLInputElement>;
  formRef: React.RefObject<HTMLFormElement>;
  getImageDataUrl: () => string | null;
};

export const UploadStep = forwardRef<Handle, UploadStepProps>(
  ({ formAction, isPending }, ref) => {
    const [dragActive, setDragActive] = useState(false);
    const [fileName, setFileName] = useState("");
    const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
    const internalFileRef = useRef<HTMLInputElement>(null);
    const internalFormRef = useRef<HTMLFormElement>(null);

    useImperativeHandle(ref, () => ({
      fileInputRef: internalFileRef,
      formRef: internalFormRef,
      getImageDataUrl: () => imageDataUrl,
    }));

    const handleFileChange = (file: File | undefined) => {
      if (file) {
        setFileName(file.name);
        const newImageDataUrl = URL.createObjectURL(file);

        if (imageDataUrl) {
          URL.revokeObjectURL(imageDataUrl);
        }
        setImageDataUrl(newImageDataUrl);
      } else {
        setFileName("");
        if (imageDataUrl) {
          URL.revokeObjectURL(imageDataUrl);
        }
        setImageDataUrl(null);
      }
    };

    const handleDrag = (e: React.DragEvent<HTMLFormElement | HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      const file = e.dataTransfer.files?.[0];
      if (file && internalFileRef.current) {
        internalFileRef.current.files = e.dataTransfer.files;
        handleFileChange(file);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const file = e.target.files?.[0];
      handleFileChange(file);
    };

    return (
      <motion.div
        key="upload"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="flex h-full flex-col justify-center"
      >
        <form
          ref={internalFormRef}
          action={formAction}
          onDragEnter={handleDrag}
          className="flex h-full flex-col"
        >
          <label
            htmlFor="dropzone-file"
            className={`flex flex-1 flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
              dragActive ? "border-primary bg-secondary" : "border-border hover:bg-muted"
            }`}
          >
            <div
              className="relative flex h-full w-full flex-col items-center justify-center"
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5 text-center">
                <UploadCloud className="mb-4 h-10 w-10 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold text-primary">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG or WEBP (MAX. 5MB)
                </p>
                <AnimatePresence>
                  {fileName && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-4 text-sm font-medium text-accent"
                    >
                      {fileName}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </label>
          <input
            id="dropzone-file"
            type="file"
            name="image"
            className="hidden"
            onChange={handleChange}
            accept="image/png, image/jpeg, image/webp"
            ref={internalFileRef}
            disabled={isPending}
          />
          <Button type="submit" className="mt-4 w-full" size="lg" disabled={isPending || !fileName}>
            {isPending ? "Identifying..." : "Identify Ingredients"}
          </Button>
        </form>
      </motion.div>
    );
  }
);
UploadStep.displayName = "UploadStep";
