import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {APP_BASE_HREF, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig} from 'angular2/router';


@Component({
    selector: 'hello-app',
    template: `
        <h1>Hello, {{name}}!</h1>
        Say hello to: <input [value]="name" (input)="name = $event.target.value">
        <p>Tameshwar</p>
    `
})
export class HelloApp {
    name: string = 'World';
}

bootstrap(HelloApp);