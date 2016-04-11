import {Component, Inject}               from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouteParams, ROUTER_PROVIDERS, RouterLink} from 'angular2/router';
import {NgFor, NgIf, NgClass} from 'angular2/common';

import {SearchService} from '../../services/search/search.service';
import {OrderBy} from "../../pipes/orderBy/orderBy";
//import * as _ from 'underscore';
import {LoadingMask} from '../../directive/loadingmask/loadingmask';

@Component({
	selector: 'search-component',
	templateUrl: 'build/app/components/search-component/search-component.html',
	directives: [NgFor, NgIf, ROUTER_DIRECTIVES, LoadingMask],
	providers: [SearchService],
	pipes: [OrderBy]
})

export class SearchComponent {
	private assetsList: Array<Object>;
	private singleList: Object;
	private asset_id: String;
	private platform: String;
	private reverse: Boolean = true;
	public predicate: String = '+asset_name'
	public searchresponsedata: Array<Object>;
	public isShow: Boolean = true;
	public isOn:Boolean = false;
	public loadSpiner:Boolean = false;
	public assetloadSpiner:Boolean = true;
	public cachedAsets: Array<Object>;
	constructor(private _SearchList: SearchService, public params: RouteParams, private router: Router) {
		this.loadSpiner = false;
		_SearchList.getAssetsList().map(res => res.json()).subscribe(assetsdata => {
			this.loadSpiner = true;
			this.assetsList = this.cachedAsets = assetsdata.assets;
			this.platform = this.params.get('platform');
			this.asset_id = this.params.get('asset_id');
			if (this.asset_id !== null){
			 	//this.getanassets(this.asset_id);
			}
		});
	}

	onKey(value: string) {
		if(value.length >= 3){
			this.loadSpiner = false;
			this._SearchList.searchAnAsset(value).map(res => res.json()).subscribe(searchdata => {
				this.assetsList = searchdata.assets;
				this.searchresponsedata = searchdata.assets;
				this.loadSpiner = true;
			});
			this.isShow = false;
		}
		else if(value.length <= 0){
			this.assetsList = this.cachedAsets;
		}
		else{
			this.isShow = true;
			this.loadSpiner = true;
		}
	}

	getanassets(id: String) {
		this.assetloadSpiner = false;
		this._SearchList.getAnAsset(id).map(res => res.json()).subscribe(a => {
			this.singleList = a;
			this.isShow = true;
			this.assetloadSpiner = true;
		});
	}

	isRouteActive(route) {
		return this.router.isRouteActive(this.router.generate(route));
	}

	getPlatform(){
		return this.platform;
	}

	sortOrder(v){
		// this.reverse = (this.predicate === v) ? !this.reverse : false;
		// this.predicate = v;
		if(this.predicate === v){
			this.predicate = '-asset_name';
			this.isOn = true;
		}
		else{
			this.predicate = '+asset_name';
			this.isOn = false;
		}

	}
}
