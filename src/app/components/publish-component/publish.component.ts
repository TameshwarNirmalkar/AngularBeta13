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
    public formelement: Object = {
        "asset_name":"",
        "tags": "",
        "description": "",
        "media_type_id": 61,
        "software": 99,
        "publish": true,
        "progress_status": 1,
        //"parent_asset_id": "",
        "license_id": "MIT",
        //"asset_taxonomy": "",
        "language": "en",
        "region": "US",
        //"member_id": ""
    };
    constructor(public params: RouteParams, private router: Router, private _PublishSearchService: SearchService) {}
    ngOnInit() {
        console.log('PublishComponent initialize');  
    }
    publishPackage(){
        let body = $.param( this.formelement ).replace('+', ' ');
        //console.log( decodeURIComponent($.param( this.formelement ).replace(/\+/g, ' ') ) );
        console.log( body );
        this._PublishSearchService.createAnAsset(body).subscribe(resp => {
            console.log(resp);
        })
    }
}