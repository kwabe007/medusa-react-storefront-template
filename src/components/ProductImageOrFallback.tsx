import notFound from "../assets/not-found-bg.jpg";
import { ComponentPropsWithoutRef } from "react";

interface ProductImageOrFallbackProps extends ComponentPropsWithoutRef<'img'>{
  className?: string
}

export function ProductImageOrFallback({ src, ...rest }: ProductImageOrFallbackProps) {
  if (src) {
    return <img src={src} {...rest} />
  }
  return (
    <img src={notFound} {...rest}>
      <p>Not found</p>
    </img>
  )
}