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
var core_1 = require('angular2/core');
var common_1 = require('angular2/common');
require('rxjs/add/operator/map');
var PackageList_1 = require('../../services/packages/PackageList');
var Browse = (function () {
    function Browse(packagelistService) {
        var _this = this;
        this.packagelistService = packagelistService;
        packagelistService.retrieveData().map(function (res) { return res.json(); }).subscribe(function (assetsdata) {
            _this.assetsList = assetsdata.assets;
        });
    }
    Browse = __decorate([
        core_1.Pipe({ name: 'date', pure: true }),
        core_1.Component({
            selector: 'packages-component',
            templateUrl: 'app/components/browse/browse.html',
            directives: [common_1.NgFor],
            providers: [PackageList_1.PackageList],
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [PackageList_1.PackageList])
    ], Browse);
    return Browse;
}());
exports.Browse = Browse;
