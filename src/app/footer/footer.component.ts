import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Output() topScroll = new EventEmitter<String>();

  year: number;

  private github = 'https://github.com/AlexHHsiao';
  private linkedin = 'https://www.linkedin.com/in/alex-xiao-603986b7/';
  private resume = '/assets/file/AlexXiaoResume.pdf';

  constructor() { }

  ngOnInit() {
    this.year = new Date().getFullYear();
  }

  goToTop() {
    this.topScroll.emit('H');
  }

  goToLink(type: string) {
    switch (type) {
      case 'github': {
        window.open(this.github);
        break;
      }

      case 'linkedin': {
        window.open(this.linkedin);
        break;
      }

      case 'resume': {
        window.open(this.resume);
        break;
      }

      default: {
        break;
      }
    }
  }
}
