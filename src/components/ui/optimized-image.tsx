import { ImgHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'alt'> {
  /** Alt text is REQUIRED for SEO and accessibility */
  alt: string;
  /** Priority image (above the fold) - disables lazy loading */
  priority?: boolean;
  /** Explicit width to prevent CLS */
  width?: number | string;
  /** Explicit height to prevent CLS */
  height?: number | string;
  /** Aspect ratio class (e.g., "aspect-video", "aspect-square") */
  aspectRatio?: string;
  /** Additional wrapper className */
  wrapperClassName?: string;
}

/**
 * OptimizedImage - SEO-optimized image component
 * 
 * Features:
 * - Required `alt` attribute (enforced via TypeScript)
 * - Automatic lazy loading for below-the-fold images
 * - Explicit width/height to prevent CLS
 * - fetchPriority="high" for priority images
 * - decoding="async" for non-blocking rendering
 */
const OptimizedImage = forwardRef<HTMLImageElement, OptimizedImageProps>(
  ({ alt, priority = false, width, height, aspectRatio, wrapperClassName, className, src, ...props }, ref) => {
    const imgElement = (
      <img
        ref={ref}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        {...(priority && { fetchPriority: 'high' as const })}
        className={cn(
          'max-w-full',
          aspectRatio && 'w-full h-full object-cover',
          className
        )}
        {...props}
      />
    );

    if (aspectRatio) {
      return (
        <div className={cn(aspectRatio, 'overflow-hidden', wrapperClassName)}>
          {imgElement}
        </div>
      );
    }

    return imgElement;
  }
);

OptimizedImage.displayName = 'OptimizedImage';

export { OptimizedImage };
export type { OptimizedImageProps };
