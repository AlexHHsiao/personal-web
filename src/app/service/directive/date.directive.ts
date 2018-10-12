import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appDate]'
})
export class DateDirective {

  constructor(private el: ElementRef) {


      console.log(el)

  }

}
