import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {HeaderComponent} from '../header/header.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @ViewChild('home') homeComp: ElementRef;
  @ViewChild('who') whoComp: ElementRef;
  @ViewChild('memories') memoriesComp: ElementRef;
  @ViewChild('structure') structureComp: ElementRef;
  @ViewChild('gallery') galleryComp: ElementRef;

  @ViewChild('header') header: HeaderComponent;

  isScrolling: boolean;
  waitScroll: any;

  constructor() {
    this.isScrolling = false;
  }

  ngOnInit() {
  }

  scrollToComponent(selection: String) {

    if (this.isScrolling) {

      clearInterval(this.waitScroll);

      this.waitScroll = setInterval(() => {
        if (!this.isScrolling) {
          this.scrollToComponent(selection);
          clearInterval(this.waitScroll);
        }
      }, 10);
    } else {

      this.isScrolling = true;

      switch (selection) {
        case 'H': {
          this.smoothScroll(window.scrollY, 0);
          break;
        }

        case 'W': {
          this.smoothScroll(window.scrollY, this.whoComp.nativeElement.offsetTop);
          break;
        }

        case 'M': {
          this.smoothScroll(window.scrollY, this.memoriesComp.nativeElement.offsetTop);
          break;
        }

        case 'C': {
          this.smoothScroll(window.scrollY, this.structureComp.nativeElement.offsetTop);
          break;
        }

        case 'G': {
          this.smoothScroll(window.scrollY, this.galleryComp.nativeElement.offsetTop);
          break;
        }

        default: {
          break;
        }
      }
    }
  }

  smoothScroll(currentY, targetY) {

    if (currentY > targetY) {

      const distance = currentY - targetY;
      let changeDistance = currentY - targetY;

      const scrollIntervat = setInterval(() => {

        changeDistance -= distance / 100;
        window.scrollTo(0, targetY + changeDistance);

        if (changeDistance <= 0) {
          window.scrollTo(0, targetY);
          this.isScrolling = false;
          clearInterval(scrollIntervat);
        }

      }, 5);

    } else if (currentY < targetY) {
      const distance = targetY - currentY;
      let changeDistance = 0;

      const scrollIntervat = setInterval(() => {

        changeDistance += distance / 100;
        window.scrollTo(0, currentY + changeDistance);

        if (changeDistance >= distance) {
          window.scrollTo(0, targetY);
          this.isScrolling = false;
          clearInterval(scrollIntervat);
        }

      }, 5);
    }
  }

  @HostListener('window:scroll', []) onScroll() {

    if (!this.isScrolling) {
      if (window.scrollY < this.whoComp.nativeElement.offsetTop) {
        this.header.changeMenu('H');
      } else if (window.scrollY >= this.whoComp.nativeElement.offsetTop && window.scrollY < this.memoriesComp.nativeElement.offsetTop) {
        this.header.changeMenu('W');
      } else if (window.scrollY >= this.memoriesComp.nativeElement.offsetTop && window.scrollY < this.structureComp.nativeElement.offsetTop) {
        this.header.changeMenu('M');
      } else if (window.scrollY >= this.structureComp.nativeElement.offsetTop && window.scrollY < this.galleryComp.nativeElement.offsetTop) {
        this.header.changeMenu('C');
      } else if (window.scrollY >= this.galleryComp.nativeElement.offsetTop) {
        this.header.changeMenu('G');
      }
    }
  }

  topBtn(top: string) {
    this.scrollToComponent(top);
    this.header.changeMenu(top);
  }
}
