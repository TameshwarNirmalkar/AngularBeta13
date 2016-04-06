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
var NameList_1 = require('../../services/NameList');
var About = (function () {
    function About(list) {
        this.list = list;
        console.log("About us: ", list);
    }
    About.prototype.addName = function (newname) {
        this.list.add(newname.value);
        newname.value = '';
    };
    About = __decorate([
        core_1.Component({
            selector: 'aboutus-component',
            templateUrl: 'app/components/about/about.html',
            directives: [common_1.NgFor],
            providers: [NameList_1.NamesList]
        }), 
        __metadata('design:paramtypes', [NameList_1.NamesList])
    ], About);
    return About;
}());
exports.About = About;
