import {Injectable, Renderer2} from '@angular/core';

@Injectable()

export class FullScreenService {

  constructor() {
  }

  bodyScrollTop: any;
  renderer: Renderer2;

  private iosFix(value: boolean) {
    if (value) {
      this.bodyScrollTop = document.body.scrollTop;
    }
    this.renderer.setStyle(document.body, 'overflow', (value) ? 'hidden' : '');
    this.renderer.setStyle(document.body, 'position', (value) ? 'fixed' : '');
    this.renderer.setStyle(document.body, 'left', (value) ? '0' : '');
    this.renderer.setStyle(document.body, 'right', (value) ? '0' : '');
    this.renderer.setStyle(document.body, 'top', (value) ? -this.bodyScrollTop + 'px' : '');
    if (!value) {
      this.renderer.setProperty(document.body, 'scrollTop', this.bodyScrollTop);
    }
  }

  adjustBodyWidth(flag: boolean) {
    if (flag) {
      const oldWidth = document.getElementById('mini-bar').clientWidth;
      if (navigator.userAgent.match(/iPhone|iPad|iPod/i) !== null) {
        this.iosFix(true);
      }

      this.renderer.setStyle(document.body, 'overflow', 'hidden');
      const newWidth = document.getElementById('mini-bar').clientWidth;
      const offset = Math.abs(oldWidth - newWidth);
      this.renderer.setStyle(document.body, 'margin-right', offset.toString() + 'px');
      this.renderer.setStyle(document.getElementById('mini-bar-nav'), 'padding-right', offset.toString() + 'px');
      if (document.getElementById('chat-list')) {
        this.renderer.setStyle(document.getElementById('chat-list'), 'margin-right', offset.toString() + 'px');

      }
    } else if (!flag) {
      this.renderer.setStyle(document.body, 'margin-right', '0');
      if (navigator.userAgent.match(/iPhone|iPad|iPod/i) !== null) {
        this.iosFix(false);
      }

      this.renderer.setStyle(document.body, 'overflow', '');
      this.renderer.setStyle(document.getElementById('mini-bar-nav'), 'padding-right', '0');
    }
  }
}
