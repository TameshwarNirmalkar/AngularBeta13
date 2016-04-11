import {Component, Directive, ElementRef, Input} from 'angular2/core';
@Component({
    selector: 'loading-mask',
    templateUrl: 'build/app/directive/loadingmask/loadingmask.tpl.html'
})
export class LoadingMask {
    constructor(el: ElementRef) {
    }
}
