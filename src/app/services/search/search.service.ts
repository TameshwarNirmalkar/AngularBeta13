import {Component, Injectable, Inject}               from 'angular2/core';
import {Http, Response, Headers, BaseRequestOptions, RequestOptions} from 'angular2/http';

/**
 * Server config import
 */
import { ServerConfig } from '../configfile/configfile';

export class SearchService{
	private _ServerConfig = new ServerConfig();
	resdata: Object;
	constructor( @Inject(Http) private http: Http) { }
	createAuthorizationHeader(headers: Headers) {
		headers.append('X-AFC', this._ServerConfig.acgafc);
		headers.append('X-Session', this._ServerConfig.acgitoken);
	}
	/**
		@ GET: all the packages list
	*/
	getAssetsList() {
		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		return this.http.get(this._ServerConfig.acgiasset, {
			headers: headers
		});
	}

	/**
		@ GET: get a packages
	*/
	getAnAsset(id:String) {
		let opt = new BaseRequestOptions();
		let headers = new Headers();
		headers.append('Content-Type','application/x-www-form-urlencoded');
		this.createAuthorizationHeader(headers);
		return this.http.get(this._ServerConfig.acgiasset+id, {
			headers: headers
		});
	}

	/**
	 *  @ Get list of package with 1000 data 
	 */
	searchAnAsset(q: String) {
		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		return this.http.get(this._ServerConfig.acgisearch+q, {
			headers: headers
		});
	}

	/**
	 *	@ GET load assets for with limit:20 and offsetlimit:incremental of 20;
	 */
	incrementalAssets(limit:number, offsetlimit:number) {
		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		return this.http.get(this._ServerConfig.acgimoreasset+limit+"&offset="+offsetlimit, {
			headers: headers
		});
	}
	
	/**
	 * @GET downloadAsset: for donwloading assets. 
	 */
	downloadAsset(file_ids:string, asset_id:string){
		let headers = new Headers();
		headers.append('ContentType','application/zip, application/octet-stream');
		this.createAuthorizationHeader(headers);
		return this.http.get(this._ServerConfig.acgidownload+file_ids+'&asset_id='+asset_id, {
			headers: headers
		});
	}
	
	/**
	 * @Post: Create an asset
	 */
	createAnAsset(body:string){
		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		return this.http.post(this._ServerConfig.acgcreateasset+body, '', {headers: headers});
	}
	
	/**
	 * @Post File upload
	 */
	uploadAsset(body:string){
		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		return this.http.post(this._ServerConfig.acgcreateasset+body, '', {headers: headers});
	}
	
	/**
	 * @Post: Association with asset.
	 */
	addSourceToAsset(body:string){
		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		return this.http.post(this._ServerConfig.acgcreateasset+body, '', {headers: headers});
	}
}
