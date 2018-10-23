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

  constructor(private githubService: GithubService) {
  }

  ngOnInit() {
    this.githubService.callByUrl(this.repo.languages_url).subscribe((data) => {
      this.languageCollection = data;
    }, (error) => {
      this.languageCollection = {};
    });

    this.githubService.callByUrl(this.repo.contributors_url).subscribe((data) => {
      this.contributorCollection = data;
    }, (error) => {
      this.contributorCollection = [];
    });
  }

  dateFormater(date: string) {
    const dateArr = date.split('-');
    return dateArr[1] + ' / ' + dateArr[2].substring(0, 2) + ' / ' + dateArr[0];
  }

  openProfile(url) {
    event.preventDefault();
    window.open(url);
  }

  repoLanguageCounter() {
    if (this.languageCollection) {
      const total = Object['values'](this.languageCollection).reduce((sum, currentVal) => {
        return sum + currentVal;
      }, 0);

      const languageDetail = Object['keys'](this.languageCollection).reduce((acc, currentVal) => {
        return acc + '  ' + currentVal + ': ' + (this.languageCollection[currentVal] / total * 100).toFixed(2) + '%';
      }, '');

      return languageDetail;
    }
  }
}
