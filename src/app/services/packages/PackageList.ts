import {provide, Provider, Injectable, Inject} from 'angular2/core';
import {Http, Response, Headers, BaseRequestOptions} from 'angular2/http';

const TOKENKEY = 'E9C0E03D-3CD3-49F2-A623-2B8FE9D679D8';

@Injectable()
export class PackageList{
  resdata: Object;
  constructor( @Inject(Http) private http: Http) {}
  createAuthorizationHeader(headers:Headers) {
    headers.append('X-AFC', 'FJKB32');
    //headers.append('X-Session', TOKENKEY);
  }
  retrieveData(){
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    var path = 'https://api.acg.autodesk.com/api/v2/assets/';
    return this.http.get(path,{
      headers: headers
    })
  }
}
