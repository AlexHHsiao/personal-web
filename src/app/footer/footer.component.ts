import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Output() topScroll = new EventEmitter<String>();

  year: number;

  constructor() { }

  ngOnInit() {
    this.year = new Date().getFullYear();
  }

  goToTop() {
    this.topScroll.emit('H');
  }
}
