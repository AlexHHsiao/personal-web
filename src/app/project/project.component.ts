import {Component, OnInit} from '@angular/core';
import {GithubService} from '../service/github/github.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  repoList: any;
  errorFetch = false;

  constructor(private githubService: GithubService) {
  }

  ngOnInit() {
    this.githubService.getGithubRepo().subscribe((data) => {
      this.repoList = data;
    }, (error) => {
      this.repoList = [];
      this.errorFetch = true;
    });
  }

  openProject(url) {
    window.open(url);
  }

}
