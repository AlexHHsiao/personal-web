import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appDate]'
})
export class DateDirective {

  constructor(private el: ElementRef) {
    if (el.nativeElement.innerHTML !== undefined) {
      console.log('xx')
    }
  }

}
