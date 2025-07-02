export const getValidRequestParams = (url: string) => {
  const params = url.split('&');
  let newUrl = '';

  const firstParam = params[0].split('=');
  if (firstParam[1].length > 0) {
    newUrl = `${firstParam[0]}=${firstParam[1]}`;
  }

  for (let i = 1; i < params.length; i++) {
    const param = params[i].split('=');
    if (param[1].length > 0) {
      if (newUrl.length > 0) newUrl += '&';
      newUrl += `${param[0]}=${param[1]}`;
    }
  }
  return newUrl;
};
