import { Button } from "@/components/ui/button";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDropzone } from "react-dropzone";
import { CloudUpload, UploadCloud } from "lucide-react";
import { uploadImage } from "../hooks/useFetchAPINext";
import Cropper, { Area } from "react-easy-crop";

type UploadImageButtonProps = {
  onUploadImage: (url: string) => void;
  children?: React.ReactNode;
  disabled?: boolean;
  /**
   * Target aspect ratio for the final video frame.
   * If not provided, the original behaviour (no cropping UI) is used.
   */
  aspectRatio?: number;
};

const createCroppedImageBlob = async ({
  imageSrc,
  cropAreaPixels,
  aspectRatio,
}: {
  imageSrc: string;
  cropAreaPixels: Area;
  aspectRatio: number;
}): Promise<Blob> => {
  console.log("[UploadImageButton] createCroppedImageBlob called", {
    imageSrc,
    cropAreaPixels,
    aspectRatio,
  });

  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (error) => reject(error);
    img.src = imageSrc;
  });

  // `cropAreaPixels` from react-easy-crop is already in the image pixel space
  // and already matches the aspect ratio we passed into the Cropper.
  const targetWidth = cropAreaPixels.width;
  const targetHeight = cropAreaPixels.height;

  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Could not get canvas context");
  }

  // White buffer: fill entire frame with white first so any empty area becomes white.
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, targetWidth, targetHeight);

  // Draw only the selected crop, scaled to fill the canvas.
  // This follows the official react-easy-crop example.
  ctx.drawImage(
    image,
    cropAreaPixels.x,
    cropAreaPixels.y,
    cropAreaPixels.width,
    cropAreaPixels.height,
    0,
    0,
    targetWidth,
    targetHeight
  );

  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Failed to create image blob"));
          return;
        }
        resolve(blob);
      },
      "image/jpeg",
      0.9
    );
  });
};

const UploadImageButton: React.FC<UploadImageButtonProps> = ({
  onUploadImage,
  children,
  disabled,
  aspectRatio,
}) => {
  const [image, setImage] = React.useState<string>("");
  const [sourceFile, setSourceFile] = React.useState<File | null>(null);
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<Area | null>(
    null
  );

  const onCropComplete = React.useCallback(
    (_croppedArea: Area, croppedPixels: Area) => {
      console.log("[UploadImageButton] onCropComplete", {
        croppedPixels,
      });
      setCroppedAreaPixels(croppedPixels);
    },
    []
  );

  const handleConfirm = React.useCallback(async () => {
    console.log("[UploadImageButton] Save clicked", {
      hasImage: !!image,
      hasSourceFile: !!sourceFile,
      hasAspectRatio: !!aspectRatio,
      hasCroppedArea: !!croppedAreaPixels,
    });

    if (!image || !sourceFile) return;

    // If no aspectRatio is provided, fall back to original upload behaviour.
    if (!aspectRatio || !croppedAreaPixels) {
      console.log(
        "[UploadImageButton] No aspect ratio or crop area, uploading original file"
      );
      uploadImage({
        file: sourceFile,
        onUploadImage,
      });
      return;
    }

    try {
      const blob = await createCroppedImageBlob({
        imageSrc: image,
        cropAreaPixels: croppedAreaPixels,
        aspectRatio,
      });

      const croppedFile = new File(
        [blob],
        sourceFile.name || "cropped-image.jpg",
        { type: blob.type || "image/jpeg" }
      );

      console.log("[UploadImageButton] Uploading cropped file", {
        size: blob.size,
        type: blob.type,
      });

      uploadImage({
        file: croppedFile,
        onUploadImage,
      });
    } catch (error) {
      console.error(
        "[UploadImageButton] Error while cropping & uploading",
        error
      );
    }
  }, [aspectRatio, croppedAreaPixels, image, onUploadImage, sourceFile]);

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      console.log("[UploadImageButton] onDrop called", {
        filesLength: acceptedFiles?.length ?? 0,
        hasAspectRatio: !!aspectRatio,
      });

      if (!acceptedFiles || acceptedFiles.length === 0) return;
      const file = acceptedFiles[0];
      const previewUrl = URL.createObjectURL(file);
      setImage(previewUrl);
      setSourceFile(file);

      // If no aspectRatio is provided, immediately upload as before.
      if (!aspectRatio) {
        console.log(
          "[UploadImageButton] No aspect ratio provided, uploading original file immediately"
        );
        uploadImage({
          file,
          onUploadImage,
        });
      }
    },
    [aspectRatio, onUploadImage]
  );

  const {
    getInputProps,
    getRootProps,
    isDragActive,
    isDragReject,
    isDragAccept,
  } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp"] },
  });

  const showCropper = Boolean(aspectRatio && image);

  return (
    <Popover>
      <PopoverTrigger asChild disabled={disabled}>
        {children ? (
          children
        ) : (
          <Button variant="outline" className="px-4 py-2 w-full">
            <CloudUpload className="w-4 h-4" /> Upload
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent
        className="w-[360px] h-[420px] flex flex-col gap-3 p-3"
        onCloseAutoFocus={() => setImage("")}
      >
        {!showCropper && (
          <div {...getRootProps()} className="w-full h-full">
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center cursor-pointer border-2 border-dotted border-gray-200 p-4 rounded w-full h-full">
              {!image && <UploadCloud className="w-10 h-10 mb-2" />}
              {isDragAccept ? (
                <p className="text-sm text-center">file will be accepted</p>
              ) : isDragReject ? (
                <p className="text-sm text-center">file will be rejected</p>
              ) : !isDragActive && !image ? (
                <p className="text-sm text-center">
                  Drag 'n' drop some file here, or click to select file
                </p>
              ) : (
                image && (
                  <img
                    src={image}
                    alt="Preview"
                    className="mt-2 w-full h-full object-contain"
                  />
                )
              )}
            </div>
          </div>
        )}

        {showCropper && (
          <div className="flex flex-col gap-3 w-full h-full">
            <p className="text-xs text-gray-600">
              動画に合うように画像の位置や大きさを調整してください。
            </p>
            <div className="relative w-full flex-1 rounded-md overflow-hidden border border-gray-200 bg-black/80">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={aspectRatio!}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                showGrid={false}
                restrictPosition
              />
              {/* Framing guide overlay */}
              <div className="pointer-events-none absolute inset-4 border-2 border-white/60 rounded-md" />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="range"
                min={1}
                max={3}
                step={0.01}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setImage("");
                  setSourceFile(null);
                }}
              >
                Reset
              </Button>
              <Button
                size="sm"
                className="border-rose-600 bg-rose-600 hover:bg-rose-500 text-white"
                onClick={handleConfirm}
              >
                Save
              </Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default UploadImageButton;
