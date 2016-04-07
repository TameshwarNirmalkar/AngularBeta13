import {Component}                      from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';


@Component({
	selector: 'sign-in-component',
	templateUrl: 'dist/app/components/sign-in-component/sign-in-component.html',
	directives: [ROUTER_DIRECTIVES]
})

export class SignInComponent { 

	username: String;
	userpass: String;

	constructor(){
		console.log('sign in component initialize');
	}

	loginSubmit(){
		alert( this.username +'\n\n'+ this.userpass);

	}

}