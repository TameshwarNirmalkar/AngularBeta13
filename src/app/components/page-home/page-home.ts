// Libraries
import {Component} from 'angular2/core';
import {SliderComponent}  from '../slider-component/slider-component';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouteParams, ROUTER_PROVIDERS} from 'angular2/router';

@Component({
    templateUrl  : 'build/app/components/page-home/page-home.html',
    directives: [SliderComponent, ROUTER_DIRECTIVES]
})
export class HomePageComponent { 
	constructor() {
    }
}