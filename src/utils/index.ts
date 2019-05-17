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

export function validateMail(rule: any, value: string, callback: any) {
  let pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (value === "") {
    callback(new Error("请输入邮箱"));
  } else if (!pattern.test(value)) {
    callback(new Error("邮箱格式错误"));
  } else {
    callback();
  }
}
