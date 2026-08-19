import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import { processImageFile } from '../utils/validators';

interface ImageUploaderProps {
  currentImage?: string;
  onImageUploaded: (base64Data: string) => void;
  onImageRemoved?: () => void;
  label?: string;
  helperText?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  currentImage,
  onImageUploaded,
  onImageRemoved,
  label = 'الصورة الشخصية الرئيسية (Hero Profile Image)',
  helperText = 'اسحب وأفلت الصورة هنا أو اضغط للاختيار من جهازك (بحد أقصى 5 ميجابايت)',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFile = async (file: File) => {
    setErrorMessage(null);
    setIsProcessing(true);

    try {
      const result = await processImageFile(file);
      if (result.success && result.dataUrl) {
        onImageUploaded(result.dataUrl);
      } else {
        setErrorMessage(result.error || 'فشل في تحميل الصورة');
      }
    } catch (err) {
      setErrorMessage('حدث خطأ غير متوقع أثناء معالجة الملف.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
    // reset input value so re-selecting same file triggers change
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemove = () => {
    if (onImageRemoved) {
      onImageRemoved();
    }
    setErrorMessage(null);
  };

  return (
    <div id="image-uploader-container" className="space-y-3" dir="rtl">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-800 flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-blue-600" />
          <span>{label}</span>
        </label>
        {currentImage && (
          <button
            type="button"
            onClick={handleRemove}
            className="text-xs font-medium text-rose-600 hover:text-rose-700 flex items-center gap-1 hover:underline cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>حذف الصورة</span>
          </button>
        )}
      </div>

      {/* Hidden native file input strictly enforcing accept */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/svg+xml,image/jpg"
        onChange={handleInputChange}
        className="hidden"
        id="native-file-upload-input"
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Dropzone Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`col-span-12 ${
            currentImage ? 'md:col-span-8' : 'md:col-span-12'
          } border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer flex flex-col items-center justify-center min-h-[160px] ${
            isDragging
              ? 'border-blue-500 bg-blue-50/70 scale-[1.01]'
              : 'border-slate-300 hover:border-blue-400 bg-slate-50/50 hover:bg-blue-50/20'
          }`}
        >
          <div className="w-12 h-12 rounded-xl bg-blue-100/70 text-blue-600 flex items-center justify-center mb-3 shadow-xs">
            <UploadCloud className="w-6 h-6 animate-pulse" />
          </div>

          <p className="text-sm font-semibold text-slate-800 mb-1">
            {isProcessing ? 'جاري معالجة الصورة...' : 'اضغط لاختيار صورة أو اسحبها هنا'}
          </p>

          <p className="text-xs text-slate-500 max-w-xs">{helperText}</p>

          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-full text-[11px] font-medium text-slate-600 shadow-2xs">
            <span>الصيغ المتاحة: PNG, JPG, WEBP, SVG</span>
          </div>
        </div>

        {/* Live Preview Area */}
        {currentImage && (
          <div className="col-span-12 md:col-span-4 flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <span className="text-xs font-semibold text-slate-600 mb-2 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>معاينة فورية مباشرة</span>
            </span>
            <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-white">
              <img
                src={currentImage}
                alt="Ahmed Sameh Live Preview"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-3 text-xs font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              تغيير الصورة
            </button>
          </div>
        )}
      </div>

      {errorMessage && (
        <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
