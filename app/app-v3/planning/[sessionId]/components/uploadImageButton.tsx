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
  /** Slot identifier for the upload API */
  slot?: "hook" | "body_a" | "body_b" | "body_c" | "cta" | "logo";
  /** If provided, receives the cropped file instead of auto-uploading.
   *  The caller is responsible for uploading with correct slots. */
  onCroppedFile?: (file: File) => void;
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
    targetHeight,
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
      0.9,
    );
  });
};

const UploadImageButton: React.FC<UploadImageButtonProps> = ({
  onUploadImage,
  children,
  disabled,
  aspectRatio,
  slot = "hook",
  onCroppedFile,
}) => {
  const [image, setImage] = React.useState<string>("");
  const [sourceFile, setSourceFile] = React.useState<File | null>(null);
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1); // Default to 1, will be calculated on image load
  const [minZoom, setMinZoom] = React.useState(0.3);
  const [maxZoom, setMaxZoom] = React.useState(3);
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<Area | null>(
    null,
  );
  const [isOpen, setIsOpen] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  // Calculate zoom to fit image height and set zoom range
  const calculateInitialZoom = React.useCallback(
    (imageSrc: string, containerHeight: number = 200) => {
      const img = new Image();
      img.onload = () => {
        const imgWidth = img.naturalWidth;
        const imgHeight = img.naturalHeight;

        if (aspectRatio) {
          // Calculate the zoom needed to fit the image height within the crop area
          // The crop area height relative to the container
          const cropAreaAspect = aspectRatio;

          // For fitting image height: we want the image to fill the container height
          // When zoom = 1, the image fits within the container
          // We want to find zoom where image height = container height

          // Calculate zoom to fit height
          const zoomToFitHeight = 1;

          // Set zoom range: from half of fit-height to 3x
          const calculatedMinZoom = Math.max(0.2, zoomToFitHeight * 0.5);
          const calculatedMaxZoom = zoomToFitHeight * 3;

          // Initial zoom is the fit-height zoom (middle of the range)
          setMinZoom(calculatedMinZoom);
          setMaxZoom(calculatedMaxZoom);
          setZoom(zoomToFitHeight);
        }
        setImageLoaded(true);
      };
      img.src = imageSrc;
    },
    [aspectRatio],
  );

  const onCropComplete = React.useCallback(
    (_croppedArea: Area, croppedPixels: Area) => {
      console.log("[UploadImageButton] onCropComplete", {
        croppedPixels,
      });
      setCroppedAreaPixels(croppedPixels);
    },
    [],
  );

  const handleConfirm = React.useCallback(async () => {
    console.log("[UploadImageButton] Save clicked", {
      hasImage: !!image,
      hasSourceFile: !!sourceFile,
      hasAspectRatio: !!aspectRatio,
      hasCroppedArea: !!croppedAreaPixels,
    });

    if (!image || !sourceFile) return;

    setIsUploading(true);

    // If no aspectRatio is provided, fall back to original upload behaviour.
    if (!aspectRatio || !croppedAreaPixels) {
      console.log(
        "[UploadImageButton] No aspect ratio or crop area, uploading original file",
      );
      if (onCroppedFile) {
        onCroppedFile(sourceFile);
      } else {
        await uploadImage({
          file: sourceFile,
          onUploadImage,
          slot,
        });
      }
      setIsUploading(false);
      setIsOpen(false);
      setImage("");
      setSourceFile(null);
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
        { type: blob.type || "image/jpeg" },
      );

      console.log("[UploadImageButton] Uploading cropped file", {
        size: blob.size,
        type: blob.type,
      });

      if (onCroppedFile) {
        onCroppedFile(croppedFile);
        setIsOpen(false);
        setImage("");
        setSourceFile(null);
        setIsUploading(false);
        return;
      }

      const uploadedUrl = await uploadImage({
        file: croppedFile,
        onUploadImage,
        slot,
      });

      console.log("[UploadImageButton] Upload completed, URL:", uploadedUrl);

      // Close popover and reset state after successful upload
      setIsOpen(false);
      setImage("");
      setSourceFile(null);
    } catch (error) {
      console.error(
        "[UploadImageButton] Error while cropping & uploading",
        error,
      );
    } finally {
      setIsUploading(false);
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
      setImageLoaded(false);

      // If aspectRatio is provided, calculate the initial zoom
      if (aspectRatio) {
        calculateInitialZoom(previewUrl);
      }

      // If no aspectRatio is provided, immediately upload as before.
      if (!aspectRatio) {
        console.log(
          "[UploadImageButton] No aspect ratio provided, uploading original file immediately",
        );
        uploadImage({
          file,
          onUploadImage,
          slot,
        });
      }
    },
    [aspectRatio, onUploadImage, calculateInitialZoom],
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
    <Popover open={isOpen} onOpenChange={setIsOpen}>
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
        className="w-[300px] h-[300px] flex flex-col gap-3 p-2 rounded-xl"
        onCloseAutoFocus={() => {
          setImage("");
          setSourceFile(null);
        }}
      >
        {!showCropper && (
          <div {...getRootProps()} className="w-full h-full">
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center cursor-pointer border-2 border-dotted border-gray-200 p-4 rounded-lg w-full h-full">
              {!image && (
                <UploadCloud className="w-10 h-10 mb-2 text-gray-400" />
              )}
              {isDragAccept ? (
                <p className="text-sm text-center text-gray-400">
                  file will be accepted
                </p>
              ) : isDragReject ? (
                <p className="text-sm text-center text-gray-400">
                  ファイルのアップロードに失敗しました
                </p>
              ) : !isDragActive && !image ? (
                <p className="text-sm text-center text-gray-400 leading-tight">
                  ここにファイルをドラッグ＆ドロップまたはクリックして選択
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
              {aspectRatio === 1
                ? "ロゴの位置を調整してください。十字線が中心を示しています。"
                : "動画に合うように画像の位置や大きさを調整してください。"}
            </p>
            <div className="relative w-full flex-1 rounded-md overflow-hidden border border-gray-200 bg-black/80">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                minZoom={minZoom}
                maxZoom={maxZoom}
                aspect={aspectRatio!}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                showGrid={false}
                restrictPosition={false}
                objectFit="contain"
              />
              {/* Crosshair overlay for logo (1:1 aspect ratio) */}
              {aspectRatio === 1 && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
                  {/* Horizontal line */}
                  <div
                    className="absolute w-full h-[1px] bg-white/60"
                    style={{ boxShadow: "0 0 2px rgba(0,0,0,0.5)" }}
                  />
                  {/* Vertical line */}
                  <div
                    className="absolute h-full w-[1px] bg-white/60"
                    style={{ boxShadow: "0 0 2px rgba(0,0,0,0.5)" }}
                  />
                  {/* Center dot */}
                  <div
                    className="absolute w-2 h-2 rounded-full bg-white border border-gray-400"
                    style={{ boxShadow: "0 0 2px rgba(0,0,0,0.5)" }}
                  />
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-500">−</span>
              <input
                type="range"
                min={minZoom}
                max={maxZoom}
                step={0.01}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full"
              />
              <span className="text-[10px] text-gray-500">+</span>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={isUploading}
                onClick={() => {
                  setImage("");
                  setSourceFile(null);
                }}
              >
                リセット
              </Button>
              <Button
                size="sm"
                className=" bg-[#0093b4] hover:bg-[#007a8c] text-white"
                onClick={handleConfirm}
                disabled={isUploading}
              >
                {isUploading ? "アップロード中..." : "保存する"}
              </Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default UploadImageButton;
