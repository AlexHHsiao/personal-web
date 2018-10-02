import {Component, Input, OnInit} from '@angular/core';
import {GithubService} from '../../service/github/github.service';

@Component({
  selector: 'app-github-project',
  templateUrl: './github-project.component.html',
  styleUrls: ['./github-project.component.scss']
})
export class GithubProjectComponent implements OnInit {

  @Input() repo: any;

  languageCollection: any;
  contributorCollection: any;

  constructor(private githubService: GithubService) { }

  ngOnInit() {
    console.log(this.repo)

    this.githubService.callByUrl(this.repo.languages_url).subscribe((data) => {
      console.log(data)
      this.languageCollection = data;
    }, (error) => {
      this.languageCollection = [];
    });

    this.githubService.callByUrl(this.repo.contributors_url).subscribe((data) => {
      console.log(data)
      this.contributorCollection = data;
    }, (error) => {
      this.contributorCollection = [];
    });

  }

}
