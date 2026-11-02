import Image from "next/image";
import type { CropRect, PhotoSource } from "@/data/visualArchive";

interface CropImageProps {
  photo: PhotoSource;
  crop: CropRect;
  sizes: string;
  alt?: string;
  className?: string;
  preload?: boolean;
}

/**
 * Renders an honest crop of a real photograph.
 *
 * The parent must be `position: relative; overflow: hidden` and share the
 * crop's aspect ratio. The full image is laid out at the scale that makes the
 * crop rectangle fill the parent exactly — no distortion, no generated pixels.
 */
export function CropImage({ photo, crop, sizes, alt, className = "", preload }: CropImageProps) {
  return (
    <div
      className={`absolute max-w-none ${className}`}
      style={{
        width: `${(photo.width / crop.w) * 100}%`,
        height: `${(photo.height / crop.h) * 100}%`,
        left: `${-(crop.x / crop.w) * 100}%`,
        top: `${-(crop.y / crop.h) * 100}%`,
      }}
    >
      <Image
        src={photo.src}
        alt={alt ?? photo.alt}
        fill
        sizes={sizes}
        preload={preload}
        draggable={false}
        className="object-fill select-none"
      />
    </div>
  );
}
