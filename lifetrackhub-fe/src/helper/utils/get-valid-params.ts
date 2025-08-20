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

export function getValidParams(paramsStr: string) {
  const allParam = paramsStr.split('&');
  let validParams = '';
  for (let i = 0; i < allParam.length; i++) {
    const param = allParam[i].split('=');
    if (param.length > 1 && param[1]) {
      if (validParams.length > 0) validParams += '&';

      validParams += `${param[0]}=${param[1]}`;
    }
  }
  return validParams ? `?${validParams}` : validParams;
}

export function getUpdatedUrl(url: string) {
  const splitUrl = url.split('?');
  const validParams = splitUrl.length > 1 ? getValidParams(splitUrl[1]) : '';
  return `${splitUrl[0]}${validParams}`;
}
