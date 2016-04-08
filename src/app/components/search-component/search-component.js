System.register(['angular2/core', 'angular2/router', 'angular2/common', '../../services/search/search.service', "../../pipes/orderBy/orderBy"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, common_1, search_service_1, orderBy_1;
    var SearchComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (search_service_1_1) {
                search_service_1 = search_service_1_1;
            },
            function (orderBy_1_1) {
                orderBy_1 = orderBy_1_1;
            }],
        execute: function() {
            SearchComponent = (function () {
                function SearchComponent(_SearchList, params, router) {
                    var _this = this;
                    this._SearchList = _SearchList;
                    this.params = params;
                    this.router = router;
                    this.reverse = true;
                    this.predicate = '+asset_name';
                    this.isShow = true;
                    _SearchList.getAssetsList().map(function (res) { return res.json(); }).subscribe(function (assetsdata) {
                        _this.assetsList = assetsdata.assets;
                        _this.platform = _this.params.get('platform');
                        _this.asset_id = _this.params.get('asset_id');
                        if (_this.asset_id !== null) {
                        }
                    });
                }
                SearchComponent.prototype.onKey = function (value) {
                    var _this = this;
                    if (value.length >= 3) {
                        this._SearchList.searchAnAsset(value).map(function (res) { return res.json(); }).subscribe(function (searchdata) {
                            _this.assetsList = searchdata.assets;
                        });
                        this.isShow = true;
                    }
                    else {
                        this.isShow = true;
                    }
                };
                SearchComponent.prototype.getanassets = function (id) {
                    var _this = this;
                    this._SearchList.getAnAsset(id).map(function (res) { return res.json(); }).subscribe(function (a) {
                        _this.singleList = a;
                    });
                };
                SearchComponent.prototype.isRouteActive = function (route) {
                    return this.router.isRouteActive(this.router.generate(route));
                };
                SearchComponent.prototype.getPlatform = function () {
                    return this.platform;
                };
                SearchComponent.prototype.sortOrder = function (v) {
                    if (this.predicate === v) {
                        this.predicate = '-asset_name';
                    }
                    else {
                        this.predicate = '+asset_name';
                    }
                };
                SearchComponent = __decorate([
                    core_1.Component({
                        selector: 'search-component',
                        templateUrl: 'dist/app/components/search-component/search-component.html',
                        directives: [common_1.NgFor, common_1.NgIf, router_1.ROUTER_DIRECTIVES],
                        providers: [search_service_1.SearchService],
                        pipes: [orderBy_1.OrderBy]
                    }), 
                    __metadata('design:paramtypes', [search_service_1.SearchService, router_1.RouteParams, router_1.Router])
                ], SearchComponent);
                return SearchComponent;
            }());
            exports_1("SearchComponent", SearchComponent);
        }
    }
});
