import { useLocation } from 'react-router-dom';

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function getUpdatedUrl(url: string) {
  const params = url.split('&');
  let newUrl = params[0];
  for (let i = 1; i < params.length; i++) {
    const param = params[i].split('=');
    if (param[1].length > 0) {
      newUrl += `&${param[0]}=${param[1]}`;
    }
  }
  return newUrl;
}

export interface ParamsObject {
  name: string;
  value: string;
}
