import { useCallback, useRef, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { Upload, X, Check, ZoomIn } from "lucide-react";

async function getCroppedImg(src: string, area: Area, aspect: number): Promise<string> {
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const i = new Image();
    i.crossOrigin = "anonymous";
    i.onload = () => resolve(i);
    i.onerror = reject;
    i.src = src;
  });
  const maxW = 1200;
  const outW = Math.min(area.width, maxW);
  const outH = outW / aspect;
  const canvas = document.createElement("canvas");
  canvas.width = outW;
  canvas.height = outH;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, area.x, area.y, area.width, area.height, 0, 0, outW, outH);
  return canvas.toDataURL("image/jpeg", 0.88);
}

export function ImageCropper({
  open,
  onClose,
  onConfirm,
  aspect = 1,
  title = "Upload & Crop Image",
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: (dataUrl: string) => void;
  aspect?: number;
  title?: string;
}) {
  const [src, setSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const areaRef = useRef<Area | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const onFile = (f: File) => {
    const r = new FileReader();
    r.onload = () => setSrc(r.result as string);
    r.readAsDataURL(f);
  };

  const onCropComplete = useCallback((_: Area, areaPixels: Area) => {
    areaRef.current = areaPixels;
  }, []);

  const confirm = async () => {
    if (!src || !areaRef.current) return;
    const out = await getCroppedImg(src, areaRef.current, aspect);
    onConfirm(out);
    reset();
  };

  const reset = () => {
    setSrc(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    areaRef.current = null;
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        <header className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <h3 className="font-semibold text-slate-900">{title}</h3>
          <button onClick={reset} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500">
            <X className="w-4 h-4" />
          </button>
        </header>

        {!src ? (
          <div
            onClick={() => fileRef.current?.click()}
            className="m-6 border-2 border-dashed border-slate-300 rounded-xl p-12 text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/40 transition"
          >
            <Upload className="w-10 h-10 mx-auto text-slate-400 mb-3" />
            <p className="text-slate-700 font-medium">Click to upload an image</p>
            <p className="text-slate-500 text-sm mt-1">PNG, JPG · up to ~5MB recommended</p>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
            />
          </div>
        ) : (
          <>
            <div className="relative w-full h-[380px] bg-slate-900">
              <Cropper
                image={src}
                crop={crop}
                zoom={zoom}
                aspect={aspect}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <div className="px-5 py-3 flex items-center gap-3 border-t border-slate-200">
              <ZoomIn className="w-4 h-4 text-slate-500" />
              <input
                type="range"
                min={1}
                max={3}
                step={0.05}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="flex-1 accent-indigo-600"
              />
              <button
                onClick={() => setSrc(null)}
                className="px-3 py-1.5 text-sm rounded-lg text-slate-600 hover:bg-slate-100"
              >
                Replace
              </button>
            </div>
          </>
        )}

        <footer className="flex justify-end gap-2 px-5 py-3 bg-slate-50 border-t border-slate-200">
          <button onClick={reset} className="px-4 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-200">
            Cancel
          </button>
          <button
            disabled={!src}
            onClick={confirm}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Check className="w-4 h-4" /> Use this image
          </button>
        </footer>
      </div>
    </div>
  );
}
