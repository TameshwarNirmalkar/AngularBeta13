import { Component } from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouteParams, ROUTER_PROVIDERS, RouterLink} from 'angular2/router';
import {NgFor, NgIf, NgClass} from 'angular2/common';
import * as _ from 'underscore';
import moment from 'moment';
import $ from 'jquery';
import {LoadingMask} from '../../directive/loadingmask/loadingmask';

@Component({
    selector: 'publish-component',
    templateUrl: 'build/app/components/publish-component/publish.component.html',
    directives: [ROUTER_DIRECTIVES, LoadingMask],
})

/**
 * PublishComponent
 */
export class PublishComponent {
    constructor(public params: RouteParams, private router: Router) {}
    ngOnInit() {
        console.log('PublishComponent initialize');  
    }
}