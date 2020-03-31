import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMatFilter]'
})
export class MatFilterDirective implements OnInit {

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    const formField = this.el.nativeElement.querySelector('mat-form-field');
    const sortHeaderContainer = this.el.nativeElement.querySelector('.mat-sort-header-container');

    this.renderer.removeChild(this.el.nativeElement, formField);
    this.renderer.setStyle(this.el.nativeElement, 'padding', '12px');
    this.renderer.setStyle(formField, 'display', 'block');
    this.renderer.setStyle(sortHeaderContainer, 'padding', '5px');
    this.renderer.setStyle(sortHeaderContainer, 'justify-content', 'center');
    this.renderer.appendChild(this.el.nativeElement, formField);
  }

  // @HostListener('click', ['$event.target'])
  // onClick(target) {
  //   if (target.classList.contains('mat-form-field')) {
  //     console.log('event', target);
  //   }
  // }
}
