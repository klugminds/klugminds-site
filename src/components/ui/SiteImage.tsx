import Image, { type ImageProps } from 'next/image';

import { siteImages, type SiteImageKey } from '@/config/images';
import { cn } from '@/lib/cn';

type SiteImageProps = Omit<ImageProps, 'src' | 'alt' | 'width' | 'height'> & {
  imageKey: SiteImageKey;
  className?: string;
  priority?: boolean;
};

export function SiteImage({ imageKey, className, priority, ...props }: SiteImageProps) {
  const image = siteImages[imageKey];
  const displayWidth = Math.round((image.width / image.height) * image.displayHeight);

  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={displayWidth}
      height={image.displayHeight}
      className={cn('h-auto w-auto', className)}
      priority={priority}
      {...props}
    />
  );
}
