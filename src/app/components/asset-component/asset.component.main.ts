
import {Component, Inject}               from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouteParams, ROUTER_PROVIDERS, RouterLink} from 'angular2/router';
import {NgFor, NgIf, NgClass} from 'angular2/common';
import {SearchComponent}  from '../../components/search-component/search-component';
import { PublishComponent } from '../../components/publish-component/publish.component';
//import {SearchService} from '../../services/search/search.service';

// @RouteConfig([
// 	{
// 		path: 'assets.search',
// 		name: 'Search',
// 		component: SearchComponent
// 	},
// 	// {
// 	// 	path: '/authors',
// 	// 	name: 'Authors',
// 	// 	component: AuthorsComponent
// 	// },
// 	{
// 		path: 'assets.publish',
// 		name: 'Publish',
// 		component: PublishComponent
// 	}
// ])

@Component({
	selector: 'asset-component-main',
	templateUrl: 'build/app/components/asset-component/asset-component.html',
	directives: [NgFor, NgIf, ROUTER_DIRECTIVES],
	//providers: [SearchService]
})

export class AssetComponentMain {

	private assetid: String;
	private singleList: Object;
	private router: Router
	private params: RouteParams;

	constructor() {
	}
}