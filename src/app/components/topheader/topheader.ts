// Libraries
import {Component}         from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {SearchComponent} from '../search-component/search-component';

@Component({
    selector    : 'topheader',
    templateUrl : 'dist/app/components/topheader/topheader.html',
    directives: [ROUTER_DIRECTIVES]
})
export class TopHeader { }