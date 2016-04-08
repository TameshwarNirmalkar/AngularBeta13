import {Component, Inject}               from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouteParams, ROUTER_PROVIDERS, RouterLink} from 'angular2/router';
import {NgFor, NgIf, NgClass} from 'angular2/common';

import {SearchService} from '../../services/search/search.service';
import {OrderBy} from "../../pipes/orderBy/orderBy"


@Component({
	selector: 'search-component',
	templateUrl: 'dist/app/components/search-component/search-component.html',
	directives: [NgFor, NgIf, ROUTER_DIRECTIVES],
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

	constructor(private _SearchList: SearchService, public params: RouteParams, private router: Router) {
		_SearchList.getAssetsList().map(res => res.json()).subscribe(assetsdata => {
			this.assetsList = assetsdata.assets;
			this.platform = this.params.get('platform');
			this.asset_id = this.params.get('asset_id');
			if (this.asset_id !== null){
			 	//this.getanassets(this.asset_id);
			}
		});
	}

	onKey(value: string) {
		if(value.length >= 3){
			this._SearchList.searchAnAsset(value).map(res => res.json()).subscribe(searchdata => {
				this.assetsList = searchdata.assets;
			});
			this.isShow = true;
		}
		else{
			this.isShow = true;
		}
	}


	getanassets(id: String) {
		this._SearchList.getAnAsset(id).map(res => res.json()).subscribe(a => {
			this.singleList = a;
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
        }
        else{
			this.predicate = '+asset_name';
        }

	}
}
