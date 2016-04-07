import {Component, Injectable, Inject}               from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, RouteParams, ROUTER_PROVIDERS} from 'angular2/router';
import {Http, Response, Headers, BaseRequestOptions} from 'angular2/http';

export class SearchService{
	
	resdata: Object;
	constructor( @Inject(Http) private http: Http) { }
	createAuthorizationHeader(headers: Headers) {
		headers.append('X-AFC', 'FJKB32');
		//headers.append('X-Session', TOKENKEY);
	}
	/**
		@ GET: all the packages list 
	*/
	getAssetsList() {
		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		var path = 'https://beta-login-123d.acg.autodesk.com/api/v2/assets/';
		return this.http.get(path, {
			headers: headers
		})
	}

	/**
		@ GET: get a packages 
	*/
	getAnAsset(id:String) {
		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		var path = 'https://beta-login-123d.acg.autodesk.com/api/v2/assets/' + id;
		return this.http.get(path, {
			headers: headers
		})
	}
}