import {Injectable} from '@angular/core';
import {ApiServerService} from '../api-server/api-server.service';
import {HttpClient} from '@angular/common/http';
import {HeaderService} from '../header/header.service';

@Injectable()

export class GithubService {

  private githubServer = 'https://api.github.com/users/alexhhsiao';

  constructor(private apiServiceService: ApiServerService, private http: HttpClient, private headerService: HeaderService) {
  }

  getGithubRepo() {
    const url = this.apiServiceService.createUrl(this.githubServer).dictionary('/repos').param('per_page=100').getUrl();
    console.log(url);
    return this.http.get(url, {headers: this.headerService.getGithubHeader()});
  }

}
