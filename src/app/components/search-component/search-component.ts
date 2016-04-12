import {Component, Inject}               from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouteParams, ROUTER_PROVIDERS, RouterLink} from 'angular2/router';
import {NgFor, NgIf, NgClass} from 'angular2/common';

import {SearchService} from '../../services/search/search.service';
import {OrderBy} from "../../pipes/orderBy/orderBy";
import * as _ from 'underscore';
import {LoadingMask} from '../../directive/loadingmask/loadingmask';
import OffClickDirective from '../../directive/clickoutsidehide/clickoutsidehide';

@Component({
	selector: 'search-component',
	templateUrl: 'build/app/components/search-component/search-component.html',
	directives: [NgFor, NgIf, ROUTER_DIRECTIVES, LoadingMask, OffClickDirective],
	providers: [SearchService],
	pipes: [OrderBy]
})

export class SearchComponent {
	private assetsList: Array<Object>;
	private singleList: Object;
	private asset_id: string;
	private platform: string;
	private reverse: boolean = true;
	public predicate: string = '+asset_name'
	public searchresponsedata: Array<Object>;
	public isShow: boolean = true;
	public isOn:boolean = false;
	public loadSpiner:boolean = false;
	public assetloadSpiner:boolean = true;
	public cachedAssets: Array<Object>;
	public list:Array<Object>;
	constructor(private _SearchList: SearchService, public params: RouteParams, private router: Router) {
		this.loadSpiner = false;
		_SearchList.getAssetsList().map(res => res.json()).subscribe(assetsdata => {
			this.loadSpiner = true;
			this.assetsList = assetsdata.assets;
			this.cachedAssets = assetsdata.assets;// cached data;
			this.platform = this.params.get('platform');
			this.asset_id = this.params.get('asset_id');
			if (this.asset_id !== null){
			 	//this.getanassets(this.asset_id);
			}
			this.clickedOutside = this.clickedOutside.bind(this);
		});
	}

	onKey(value:string) {
		if(value.length >= 3){
			this.loadSpiner = false;
			this._SearchList.searchAnAsset(value).map(res => res.json()).subscribe(searchdata => {
				this.assetsList = searchdata.assets;
				//this.searchresponsedata = searchdata.assets;
				this.searchresponsedata = _.uniq(searchdata.assets, function(a) {
					return a["asset_name"].toLowerCase();
				});
				this.loadSpiner = true;
			});
			this.isShow = false;
		}
		else if(value.length <= 2){
			this.assetsList = this.cachedAssets;
			this.isShow = true;
			this.loadSpiner = true;
		}
		else{
			this.isShow = true;
			this.loadSpiner = true;
		}
	}

	getanassets(id:string) {
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

	sortOrder(v:string){
		this.isShow = true;
		if(this.predicate === v){
			this.predicate = '-asset_name';
			this.isOn = true;
		}
		else{
			this.predicate = '+asset_name';
			this.isOn = false;
		}
	}

	clickedOutside(){
        this.isShow = true;
  }

}
