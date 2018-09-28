import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable()

export class HeaderService {

  githubHeader: HttpHeaders;

  constructor() {
    this.githubHeader = new HttpHeaders()
      .set('Authorization', 'token 629d07c8ef4f01b056fe843c09df11d798ec55bc');
  }

  getGithubHeader() {
    return this.githubHeader;
  }
}
