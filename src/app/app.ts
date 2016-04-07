// Libraries
import {Component}                      from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {NgIf} from 'angular2/common';

// Custom Components
import {NavigationComponent} from './components/navigation/navigation';
import {HomePageComponent}   from './components/page-home/page-home';
import {AboutPageComponent}  from './components/page-about/page-about';
import {TopHeader}  from './components/topheader/topheader';
import { FooterComponent } from './components/footer/footer';
import {RegisterComponent}  from './components/register-component/register-component';
import {SignInComponent}  from './components/sign-in-component/sign-in-component';
import {SearchComponent}  from './components/search-component/search-component';
//import { SingleAssetComponent } from '../asset-component/single-asset-component';

@Component({
	selector: 'my-app',
	templateUrl: 'dist/app/app.html',
	directives: [TopHeader, FooterComponent, ROUTER_DIRECTIVES, NgIf]
})
@RouteConfig([
	{
		path: '/',
		name: 'Home',
		component: HomePageComponent
	},
	{
		path: '/register',
		name: 'Register',
		component: RegisterComponent
	},
	{
		path: '/signin',
		name: 'SignIn',
		component: SignInComponent
	},
	{
		path: '/assets',
		name: 'Assets',
		component: SearchComponent
	}
])

export class AppComponent {
	private platform: String = "Web";


	constructor() {
		console.log('app initiated.', this.platform);
	}

}