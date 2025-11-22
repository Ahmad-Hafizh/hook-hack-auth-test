import { Button } from '@/components/ui/button';
import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useDropzone } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';
import { uploadImage } from '../hooks/useFetchApi';

const UploadImageButton = ({ onUploadImage }: { onUploadImage: (url: string) => void }) => {
  const [image, setImage] = React.useState<string>('');
  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    const previewUrl = URL.createObjectURL(acceptedFiles[0]);
    setImage(previewUrl);
    uploadImage({
      file: acceptedFiles[0],
      onUploadImage,
    });
  }, []);

  const { getInputProps, getRootProps, isDragActive, isDragReject, isDragAccept } = useDropzone({ onDrop, accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] } });

  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="px-4 py-2">
            Upload
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 h-64 flex items-center justify-center p-2" onCloseAutoFocus={() => setImage('')}>
          <div {...getRootProps()} className="w-full h-full">
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center cursor-pointer border-2 border-dotted border-gray-200 p-4 rounded w-full h-full">
              {!image && <UploadCloud className="w-10 h-10" />}
              {isDragAccept ? (
                <p className="text-sm text-center">file will be accepted</p>
              ) : isDragReject ? (
                <p className="text-sm text-center">file will be rejected</p>
              ) : !isDragActive && !image ? (
                <p className="text-sm text-center">Drag 'n' drop some file here, or click to select file</p>
              ) : (
                image && <img src={image} alt="Preview" className="mt-2 w-full h-full object-contain" />
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default UploadImageButton;
