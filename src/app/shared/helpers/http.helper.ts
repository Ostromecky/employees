import { HttpParameterCodec, HttpParams } from '@angular/common/http';

export const toHttpParams = (data: any) => {
  let httpParams = new HttpParams({encoder: new ParamsEncoder()});
  Object.keys(data).forEach((key) => {
    if (data[key]) {
      httpParams = httpParams.append(`_${key}`, data[key]);
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
