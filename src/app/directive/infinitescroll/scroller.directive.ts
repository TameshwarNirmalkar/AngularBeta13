import {Directive, ElementRef, Renderer, Input} from 'angular2/core';
import { BrowserDomAdapter } from 'angular2/platform/browser'

@Directive({
  selector: '[scrollable]',
  host: {
    '(scroll)': 'onScroll()'
  }
})

export class ScrollableDirective{
  @Input() _scrollEnd: boolean;
  _el: HTMLElement;
  _renderer: Renderer;
  _DOM = new BrowserDomAdapter();
  //_scrollEnd = false;
  constructor(el:ElementRef){
      this._el = el.nativeElement;
  }

  onScroll(){
    if( $(this._el).scrollTop() + $(this._el).innerHeight() >= $(this._el)[0].scrollHeight)
    {
        //offsetlimit +=20;
        //_self.scrollPagination(limit, offsetlimit);
       this._scrollEnd = true;
    }
  }

}
