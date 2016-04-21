import { Component } from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouteParams, ROUTER_PROVIDERS, RouterLink} from 'angular2/router';
import {NgFor, NgIf, NgClass} from 'angular2/common';
import * as _ from 'underscore';
import moment from 'moment';
import $ from 'jquery';
import {LoadingMask} from '../../directive/loadingmask/loadingmask';
import {SearchService} from '../../services/search/search.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NavigationComponent } from '../navigation/navigation';

@Component({
    selector: 'publish-component',
    templateUrl: 'build/app/components/publish-component/publish.component.html',
    directives: [ROUTER_DIRECTIVES, LoadingMask, NavigationComponent],
    providers: [SearchService, ToastsManager]
})

/**
 * PublishComponent
 */
export class PublishComponent {
    
    public assetsobject: Object = {
        "asset_name":"",
        "tags": "",
        "description": "",
        "media_type_id": 61,
        "software": 99,
        "publish": false,
        "progress_status": 1,
        "parent_asset_id": "",
        "license_id": "MIT",
        "asset_taxonomy": "",
        "language": "en",
        "region": "US",
        "member_id": ""
    };
    public assetupload: Object = {
        "unzip":false,
        "fileurl": "",
        "filename": "",
        "public": false,
        "software": 99,
        "use_https": false
        
    };
    private _asset_id:number;
    constructor(public params: RouteParams, private router: Router, private _PublishSearchService: SearchService, public toastr: ToastsManager) {}
    ngOnInit() {
        console.log('PublishComponent initialize');  
    }
    publishPackage(){
        let body = $.param( this.assetsobject );
        /**
         * Step 1. Create an Asset.
         */
        this._PublishSearchService.createAnAsset(body).map(res => res.json()).subscribe(resp => {
            console.log(resp);
        })
        /**
         * Step 2. File upload.
         */
        // this._PublishSearchService.uploadAsset(body).subscribe(resp => {
        //     console.log(resp);
        // })
        /**
         * Step 3. Create an Asset.
         */
        // this._PublishSearchService.addSourceToAsset(body).subscribe(resp => {
        //     console.log(resp);
        // })
        
        /**
         * Thumbnails api call.
         */
    }
}