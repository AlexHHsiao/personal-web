import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {AlertService} from '../../service/alert/alert.service';

@Component({
  selector: 'app-notif-alert',
  templateUrl: './notif-alert.component.html',
  styleUrls: ['./notif-alert.component.scss']
})
export class NotifAlertComponent implements OnInit {

  @ViewChild('notifAlert') notifAlert: ElementRef;
  alertInfo = {
    message: '',
    type: ''
  };

  constructor(private alertService: AlertService, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.alertService.getAlert().subscribe((alertInfo) => {
      this.alertInfo = alertInfo;
      console.log(alertInfo);
      if (window.innerWidth <= 768) {
        this.renderer.setStyle(this.notifAlert.nativeElement, 'animation-name', 'notif-show-mobile');
        this.renderer.setStyle(this.notifAlert.nativeElement, 'top', '20px');

        setTimeout(() => {
          this.renderer.setStyle(this.notifAlert.nativeElement, 'animation-name', 'notif-miss-mobile');
          this.renderer.setStyle(this.notifAlert.nativeElement, 'top', '-300px');
        }, 1000);
      } else {
        this.renderer.setStyle(this.notifAlert.nativeElement, 'animation-name', 'notif-show-desktop');
        this.renderer.setStyle(this.notifAlert.nativeElement, 'right', '30px');

        setTimeout(() => {
          this.renderer.setStyle(this.notifAlert.nativeElement, 'animation-name', 'notif-miss-desktop');
          this.renderer.setStyle(this.notifAlert.nativeElement, 'right', '-300px');
        }, 1000);
      }
    });
  }

  alertType(type) {
    switch (type) {
      case 'success': {
        return 'alert-success';
      }
      case 'error': {
        return 'alert-error';
      }
      case 'info': {
        return 'alert-info';
      }
      case 'warn': {
        return 'alert-warn';
      }
      default: {
        return 'alert-success';
      }
    }
  }
}
