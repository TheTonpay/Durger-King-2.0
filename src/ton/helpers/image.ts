export function getClearnetAddress(url: string) {
  if (url.startsWith("tonstorage://")) {
    return `https://tonbyte.com/gateway/${url.replace("tonstorage://", "")}`;
  }

  return url;
}
