export function encodeQuery(object: { [key: string]: any }): string {
  const kvArray: string[] = [];
  for (const key in object) {
    if (!object.hasOwnProperty(key)) {
      continue;
    }
    const kv = encodeURIComponent(key) + "=" + encodeURIComponent(object[key]);
    kvArray.push(kv);
  }
  return kvArray.join("&");
}
