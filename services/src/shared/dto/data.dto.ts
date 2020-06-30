export class DataDto<T> {
  data: T[];
  count: number;

  constructor(dataSrc?: DataDto<T>) {
    if (dataSrc) {
      this.data = dataSrc.data;
      this.count = dataSrc.count;
    }
  }
}
