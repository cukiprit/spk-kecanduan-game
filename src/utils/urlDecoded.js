const base64UrlDecode = (str) => {
  // const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  // const jsonPayload = decodeURIComponent(
  //   atob(base64)
  //     .split("")
  //     .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
  //     .join("")
  // );
  // return JSON.parse(jsonPayload);

  let base64Url = str.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

export { base64UrlDecode };
