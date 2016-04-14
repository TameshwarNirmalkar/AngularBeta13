import {Directive, ElementRef, Renderer, Input} from 'angular2/core';
import { BrowserDomAdapter } from 'angular2/platform/browser'

@Directive({
  selector: '[scrollable]',
  host: {
    '(scroll)': 'onScroll()'
  }
})

export class ScrollableDirective{
  _el: HTMLElement;
  _renderer: Renderer;
  _DOM = new BrowserDomAdapter();
  constructor(el:ElementRef){
      this._el = el.nativeElement;
  }

  onScroll(){
    //console.log( this._el.scrollTop, ':', this._el.scrollHeight, ':', this._el.innerHTML);
    if( this._el.scrollTop + this._el.offsetHeight >= this._el.scrollHeight)
    {
        console.log('scrolling logic');
    }
  }

}
