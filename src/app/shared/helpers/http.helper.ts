import { HttpParameterCodec, HttpParams } from '@angular/common/http';

export const toHttpParams = (data: any) => {
  let httpParams = new HttpParams({encoder: new ParamsEncoder()});
  Object.keys(data).forEach((key: string) => {
    if (data[key] && !Object.is(key, 'filter')) {
      httpParams = httpParams.append(`_${key}`, data[key]);
    }
    if (Object.is(key, 'filter')) {
      const paramObj: object = data[key];

      Object.keys(paramObj).forEach((objKey: string) => {
        if (paramObj[objKey]) {
          httpParams = httpParams.append(`${objKey}_like`, paramObj[objKey]);
        }
      });
    }
  });
  return httpParams;
};

class ParamsEncoder implements HttpParameterCodec {
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }

  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }

  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }

  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}
