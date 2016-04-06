import {Component, Injectable, Inject, Pipe} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {Http, Response} from 'angular2/http';
import 'rxjs/add/operator/map';
import {PackageList} from '../../services/packages/PackageList';
//import {DatePipe} from '../../filters/ArraySortPipe/pipe';

@Pipe({name: 'date', pure: true})

@Component({
    selector: 'packages-component',
    templateUrl: 'app/components/browse/browse.html',
    directives: [NgFor],
    providers: [PackageList],
    //pipes: [date]
})

@Injectable()
export class Browse {
    assetsList: Array<Object>;
    constructor(private packagelistService: PackageList) {
      packagelistService.retrieveData().map(res => res.json()).subscribe(assetsdata => {
        this.assetsList = assetsdata.assets;
      });
    }
}
