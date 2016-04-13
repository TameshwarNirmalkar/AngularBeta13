
import {Component, Inject}               from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouteParams, ROUTER_PROVIDERS, RouterLink} from 'angular2/router';
import {NgFor, NgIf, NgClass} from 'angular2/common';

import {SearchService} from '../../services/search/search.service';

@Component({
	selector: 'asset-component',
	templateUrl: 'build/app/components/search-component/single-asset-component.html',
	directives: [NgFor, NgIf, ROUTER_DIRECTIVES],
	providers: [SearchService]
})

export class SingleAssetComponent {

	private assetid: String;
	private singleList: Object;

	constructor(private _SingleAssetList: SearchService, public params: RouteParams, private router: Router) {
		this.assetid = this.params.get('asset_id');
		this.getanassets(this.assetid);
	}

	getanassets(id: String) {
		this._SingleAssetList.getAnAsset(id).map(res => res.json()).subscribe(a => {
			this.singleList = a;
		});
	}
}