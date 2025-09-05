import generateImageUrl from './generateImageUrl.js';

async function getCachedImage(name) {
  const url = localStorage.getItem(`img_${name}`);
  if (url) return url;

  const googleUrl = await generateImageUrl(name);
  if (googleUrl) {
    localStorage.setItem(`img_${name}`, googleUrl);
    return googleUrl;
  }

  return null;
}

export default getCachedImage;
