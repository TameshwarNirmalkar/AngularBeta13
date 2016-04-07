// Libraries
import {bootstrap}        from 'angular2/platform/browser'
import {APP_BASE_HREF, ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import { bind } from "angular2/core";
import { HTTP_PROVIDERS } from 'angular2/http';
import 'rxjs/add/operator/map'; //this is fix for .map() method in http response.

// Custom Components
import {AppComponent}     from './app/app'

bootstrap(AppComponent, [
	ROUTER_PROVIDERS,
	bind(LocationStrategy).toClass(HashLocationStrategy),
	HTTP_PROVIDERS
]);