import {bootstrap} from 'angular2/platform/browser';
import {Component, provide} from 'angular2/core';
import {APP_BASE_HREF, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig} from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';

//import {Home} from './components/home/home';
import {Search} from './components/search/search';
import {Browse} from './components/browse/browse';
import { NamesList } from './services/NameList';
import {PackageList} from './services/packages/PackageList';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.html',
  providers: [NamesList, PackageList],
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
	{path: '/', component: Browse, name: 'Browse'},
  {path: '/search', component: Search, name: 'Search'}
])
export class AppComponent {
  constructor() {}
}

bootstrap(AppComponent,[ ROUTER_PROVIDERS, HTTP_PROVIDERS ]);
