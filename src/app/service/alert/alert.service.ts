import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {NotifAlertComponent} from '../../shared/notif-alert/notif-alert.component';
import {Observable} from 'rxjs/Observable';

@Injectable()

export class AlertService {
  private subject = new Subject<any>();

  constructor() {
  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  success(message: string) {
    this.alert('success', message);
  }

  error(message: string) {
    this.alert('error', message);
  }

  info(message: string) {
    this.alert('info', message);
  }

  warn(message: string) {
    this.alert('warn', message);
  }

  alert(type: string, message: string) {
    this.subject.next({type: type, message: message});
  }

  clear() {
    // clear alerts
    this.subject.next();
  }
}
