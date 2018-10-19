import {Component, ElementRef, EventEmitter, HostListener, OnInit, Output, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('home') homeSelection: ElementRef;
  @ViewChild('who') whoSelection: ElementRef;
  @ViewChild('project') projectSelection: ElementRef;
  @ViewChild('experience') experienceSelection: ElementRef;
  @ViewChild('gallery') gallerySelection: ElementRef;

  @Output() scrollToComponent = new EventEmitter<String>();

  currentSelection: any;
  isMobile: boolean;
  selectedIcon = '../../assets/img/dot-selected.svg';
  unselectedIcon = '../../assets/img/dot.svg';

  constructor(private renderer: Renderer2) {
  }

  ngOnInit() {
    this.isMobile = window.innerWidth < 769;
    this.currentSelection = this.homeSelection.nativeElement;

    if (!this.isMobile) {
      this.renderer.setStyle(this.currentSelection, 'border-bottom', '5px solid #5c8bff');
      this.renderer.setStyle(this.currentSelection, 'line-height', '35px');
      this.renderer.setStyle(this.currentSelection, 'height', '35px');
    } else {
      this.renderer.setStyle(this.currentSelection, 'color', '#5c8bff');
      this.currentSelection.querySelector('img').src = this.selectedIcon;
    }
  }

  selectMenu(selection: string, event: Event) {
    this.changeSelectionRender(event.target);
    this.scrollToComponent.emit(selection);
  }

  applyHover(event: Event) {
    if (event.target !== this.currentSelection && !this.isMobile) {
      this.renderer.setStyle(event.target, 'line-height', '25px');
    }
  }

  removeHover(event: Event) {
    if (event.target !== this.currentSelection && !this.isMobile) {
      this.renderer.setStyle(event.target, 'line-height', '40px');
    }
  }

  changeMenu(selection: String) {
    switch (selection) {
      case 'H': {
        if (this.currentSelection !== this.homeSelection) {
          this.changeSelectionRender(this.homeSelection.nativeElement);
        }

        break;
      }

      case 'W': {
        if (this.currentSelection !== this.homeSelection) {
          this.changeSelectionRender(this.whoSelection.nativeElement);
        }

        break;
      }

      case 'P': {
        if (this.currentSelection !== this.homeSelection) {
          this.changeSelectionRender(this.projectSelection.nativeElement);
        }

        break;
      }

      case 'E': {
        if (this.currentSelection !== this.homeSelection) {
          this.changeSelectionRender(this.experienceSelection.nativeElement);
        }

        break;
      }

      case 'G': {
        if (this.currentSelection !== this.homeSelection) {
          this.changeSelectionRender(this.gallerySelection.nativeElement);
        }

        break;
      }

      default: {
        break;
      }
    }
  }

  changeSelectionRender(element: any) {

    if (!this.isMobile) {
      this.renderer.setStyle(this.currentSelection, 'border-bottom', 'none');
      this.renderer.setStyle(this.currentSelection, 'line-height', '40px');
      this.renderer.setStyle(this.currentSelection, 'height', '40px');

      this.currentSelection = element;
      this.renderer.setStyle(this.currentSelection, 'border-bottom', '5px solid #5c8bff');
      this.renderer.setStyle(this.currentSelection, 'line-height', '35px');
      this.renderer.setStyle(this.currentSelection, 'height', '35px');
    } else {
      this.renderer.setStyle(this.currentSelection, 'color', 'black');
      this.currentSelection.querySelector('img').src = this.unselectedIcon;
      this.currentSelection = element;
      this.renderer.setStyle(this.currentSelection, 'color', '#5c8bff');
      this.currentSelection.querySelector('img').src = this.selectedIcon;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 769 && !this.isMobile) {
      this.renderer.setStyle(this.currentSelection, 'border-bottom', 'none');
      this.renderer.setStyle(this.currentSelection, 'line-height', '40px');
      this.renderer.setStyle(this.currentSelection, 'height', '40px');
      this.renderer.setStyle(this.currentSelection, 'color', '#5c8bff');
      this.currentSelection.querySelector('img').src = this.selectedIcon;

      this.isMobile = true;
    } else if (event.target.innerWidth > 768 && this.isMobile) {
      this.isMobile = false;

      this.renderer.setStyle(this.currentSelection, 'border-bottom', '5px solid #5c8bff');
      this.renderer.setStyle(this.currentSelection, 'line-height', '35px');
      this.renderer.setStyle(this.currentSelection, 'height', '35px');
      this.renderer.setStyle(this.currentSelection, 'color', 'black');
      this.currentSelection.querySelector('img').src = this.unselectedIcon;
    }
  }

}

