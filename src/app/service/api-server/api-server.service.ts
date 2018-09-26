import {Injectable} from '@angular/core';

@Injectable()

export class ApiServerService {

  private url: string;
  private hasParam: boolean;

  constructor() {
    this.hasParam = false;
  }

  dictionary(url) {
    this.url += url;
    return this;
  }

  param(param) {
    if (!this.hasParam) {
      this.hasParam = true;
      this.url = '?' + param;
    } else {
      this.url = '&' + param;
    }

    return this;
  }

  getUrl() {
    return this.url;
  }
}
