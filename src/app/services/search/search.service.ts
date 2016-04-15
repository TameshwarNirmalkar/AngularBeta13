import {Component, Injectable, Inject}               from 'angular2/core';
import {Http, Response, Headers, BaseRequestOptions} from 'angular2/http';

/**
 * Server config import
 */
import { ServerConfig } from '../configfile/configfile';

export class SearchService{
	private _ServerConfig = new ServerConfig();
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

	/* @ Get list of package with 1000 data */
	searchAnAsset(q: String) {
		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		var path = 'https://beta-login-123d.acg.autodesk.com/api/v2/assets?q='+ q ;
		return this.http.get(path, {
			headers: headers
		})
	}

	/**
	 *	@ GET load assets for with limit:20 and offsetlimit:incremental of 20;
	 */
	inrementalAssets(limit:number, offsetlimit:number) {
		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		var path = 'https://beta-login-123d.acg.autodesk.com/api/v2/assets/?limit='+limit+"&offset="+offsetlimit ;
		return this.http.get(path, {
			headers: headers
		})
	}
	
	/**
	 * @GET downloadAsset: for donwloading assets. 
	 */
	downloadAsset(file_ids:string, asset_id:string){
		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		var path = 'https://'+this._ServerConfig.ds+'/api/v2/files/download?file_ids='+file_ids+'&asset_id='+asset_id;
		return this.http.get(path, {
			headers: headers
		})
	}
}
