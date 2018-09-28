import {Injectable} from '@angular/core';

@Injectable()

class ApiHelper {
  private url: string;
  private hasParam: boolean;

  constructor(url) {
    this.hasParam = false;
    this.url = url;
  }

  dictionary(url) {
    this.url += url;
    return this;
  }

  param(param) {
    if (!this.hasParam) {
      this.hasParam = true;
      this.url += '?' + param;
    } else {
      this.url += '&' + param;
    }

    return this;
  }

  getUrl() {
    return this.url;
  }
}

export class ApiServerService {
  createUrl(url) {
    return new ApiHelper(url);
  }
}
