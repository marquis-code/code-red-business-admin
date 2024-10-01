// For images in the 'public/assets/img' directory
export const dynamicImage = (image: string) => {
    return new URL(`/assets/img/${image}`, import.meta.url).href;
  }
  
  // For icons in the 'public/assets/icons' directory
  export const dynamicIcons = (icon: string) => {
    return new URL(`/assets/icons/${icon}.svg`, import.meta.url).href;
  }
  