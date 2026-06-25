const THUMBNAIL_RESIZE_OPTIONS = "h_240,c_scale,q_auto,f_auto";
const CARD_RESIZE_OPTIONS = "h_480,c_scale,q_auto,f_auto";

export const resizeUrlForThumbnail = (url) => {
  const firstIndex = url.indexOf("upload/");
  const lastIndex = url.indexOf("/v");
  // first condition checks if Cloudinary filter is forgotten seeding the DB
  // second and thrid condition is for if any doesn't exist in string eg.imgur or picsum url
  if (firstIndex + 7 === lastIndex || firstIndex < 0 || lastIndex < 0)
    return url;
  const finalUrl =
    url.slice(0, firstIndex + 7) +
    THUMBNAIL_RESIZE_OPTIONS +
    url.slice(lastIndex);
  return finalUrl;
};

export const resizeUrlForCard = (url) => {
  const firstIndex = url.indexOf("upload/");
  const lastIndex = url.indexOf("/v");
  if (firstIndex + 7 === lastIndex || firstIndex < 0 || lastIndex < 0)
    return url;
  const finalUrl =
    url.slice(0, firstIndex + 7) + CARD_RESIZE_OPTIONS + url.slice(lastIndex);
  return finalUrl;
};
