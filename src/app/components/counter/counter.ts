import {Component, Injectable, Inject} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {Http, Response} from 'angular2/http';
import 'rxjs/add/operator/map';
import {PackageList} from '../../services/packages/PackageList';


@Component({
    selector: 'counter-component',
    templateUrl: 'app/components/counter/counter.html',
    directives: [NgFor]
    //providers: [PackageList]
})

@Injectable()
export class Counter {
    counterList: Array<Object>;
    constructor(private packagelistService: PackageList) {
      packagelistService.retrieveData().map(res => res.json()).subscribe(assetsdata => {
        this.counterList = assetsdata.assets;
      });
    }
}
