"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var http_1 = require('angular2/http');
var TOKENKEY = 'E9C0E03D-3CD3-49F2-A623-2B8FE9D679D8';
var PackageList = (function () {
    function PackageList(http) {
        this.http = http;
    }
    PackageList.prototype.createAuthorizationHeader = function (headers) {
        headers.append('X-AFC', 'FJKB32');
    };
    PackageList.prototype.retrieveData = function () {
        var headers = new http_1.Headers();
        this.createAuthorizationHeader(headers);
        var path = 'https://api.acg.autodesk.com/api/v2/assets/';
        return this.http.get(path, {
            headers: headers
        });
    };
    PackageList = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(http_1.Http)), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PackageList);
    return PackageList;
}());
exports.PackageList = PackageList;
