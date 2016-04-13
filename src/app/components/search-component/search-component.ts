//// <reference path="../../../../typings/tsd.d.ts" />
/// <reference path="../../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../../typings/underscore/underscore.d.ts" />

import {Component, Inject, ElementRef}               from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouteParams, ROUTER_PROVIDERS, RouterLink} from 'angular2/router';
import {NgFor, NgIf, NgClass} from 'angular2/common';

import {SearchService} from '../../services/search/search.service';
import {OrderBy} from "../../pipes/orderBy/orderBy";
import * as _ from 'underscore';
//import * as $ from 'jquery';
import {LoadingMask} from '../../directive/loadingmask/loadingmask';
import OffClickDirective from '../../directive/clickoutsidehide/clickoutsidehide';
//import { InfiniteScroll } from '../../directive/infinitescroll/infinite-scroll';
declare var jQuery: JQueryStatic;

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
	constructor(private _SearchList: SearchService, public params: RouteParams, private router: Router, private el:ElementRef) {
		this.loadSpiner = false;
		_SearchList.getAssetsList().map(res => res.json()).subscribe(assetsdata => {
			this.loadSpiner = true;
			this.assetsList = assetsdata.assets;
			this.cachedAssets = assetsdata.assets;// cached data;
			this.platform = this.params.get('platform');
			this.asset_id = this.params.get('asset_id');
		})
	}

	ngOnInit(){
		let _self = this;
		let limit:number = 20;
		let offsetlimit:number = 0;
		console.log(this.el.nativeElement);
		$(this.el.nativeElement).find('[data-role="search-list-panel"]').on('scroll',  function(){
			if( $(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight)
			{
				offsetlimit +=20;
				_self.scrollPagination(limit, offsetlimit);
			}
		})
	}

	scrollPagination(limit, offsetlimit){
		this.loadSpiner = false;
		//this.assetsList = $.merge(this.assetsList, this.cachedAssets);
		console.log(  limit, ':', offsetlimit  );
		this._SearchList.inrementalAssets(limit, offsetlimit).map(res => res.json()).subscribe(aslist => {
			console.log( aslist.assets );
			this.assetsList = $.merge(this.assetsList,aslist.assets);
			this.loadSpiner = true;
		})
	}

	ngDoCheck(){
		let _self = this;
		$(document).on('click', function(){
			//console.log('doc click', _self);
			_self.isShow = true;
		})
	}

	onKey(value:string) {
		if(value.length >= 3){
			this.loadSpiner = false;
			this._SearchList.searchAnAsset(value).map(res => res.json()).subscribe(searchdata => {
				this.assetsList = searchdata.assets;
				this.searchresponsedata = _.uniq(searchdata.assets, function(a) {
					return a["asset_name"].toLowerCase();
				});
				// let x = _.pluck(searchdata.assets, 'asset_name');
				// console.log(x);
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

	getanassets(e:Event, id:string) {
		this.assetloadSpiner = false;
		this._SearchList.getAnAsset(id).map(res => res.json()).subscribe(a => {
			this.singleList = a;
			this.isShow = true;
			this.assetloadSpiner = true;
		});
		e.stopPropagation();
	}

	isRouteActive(route) {
		return this.router.isRouteActive(this.router.generate(route));
	}

	getPlatform(){
		return this.platform;
	}

	sortOrder(e:Event,v:string){
		this.isShow = true;
		if(this.predicate === v){
			this.predicate = '-asset_name';
			this.isOn = true;
			return false;
		}
		else{
			this.predicate = '+asset_name';
			this.isOn = false;
		}
		e.stopPropagation();
	}

	clickedOutside(){
        this.isShow = true;
  }

	onScroll (event) {
      console.log('scrolled!!', event);
  }

}
