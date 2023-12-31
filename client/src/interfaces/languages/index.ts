import { StaticImageData } from "next/legacy/image"

export interface Language {
  language: string
  icon: string | StaticImageData
  alt: string
}

export interface Languages extends Language {
  code: string
}
