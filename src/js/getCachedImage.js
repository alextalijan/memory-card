import generateImageUrl from './generateImageUrl.js';

async function getCachedImage(name) {
  const formattedName = name.toLowerCase().split(' ').join('_');

  const url = localStorage.getItem(`img_${formattedName}`);
  if (url) return url;

  const googleUrl = await generateImageUrl(name);
  if (googleUrl) {
    localStorage.setItem(`img_${formattedName}`, googleUrl);
    return googleUrl;
  }

  return null;
}

export default getCachedImage;
