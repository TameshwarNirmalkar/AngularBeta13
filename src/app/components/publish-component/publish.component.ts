import { Component } from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouteParams, ROUTER_PROVIDERS, RouterLink} from 'angular2/router';
import {NgFor, NgIf, NgClass} from 'angular2/common';
import * as _ from 'underscore';
import moment from 'moment';
import $ from 'jquery';
import {LoadingMask} from '../../directive/loadingmask/loadingmask';
import {SearchService} from '../../services/search/search.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'publish-component',
    templateUrl: 'build/app/components/publish-component/publish.component.html',
    directives: [ROUTER_DIRECTIVES, LoadingMask],
    providers: [SearchService]
})

/**
 * PublishComponent
 */
export class PublishComponent {
    constructor(public params: RouteParams, private router: Router, private _PublishSearchService: SearchService) {}
    ngOnInit() {
        console.log('PublishComponent initialize');  
    }
    publishPackage(){
        let body = 'asset_name=Alien&description=Mint colored alien';
        console.log( this._PublishSearchService);
        this._PublishSearchService.createAnAsset(body).subscribe(resp => {
            console.log(resp);
        })
    }
}