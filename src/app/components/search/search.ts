import {Component} from 'angular2/core';
import {NgFor} from 'angular2/common';

import {NamesList} from '../../services/NameList';

@Component({
    selector: 'aboutus-component',
    templateUrl: 'app/components/about/about.html',
    directives: [NgFor],
    providers: [NamesList]
})
export class Search {
    constructor(public list: NamesList) {
      console.log("About us: ",list);
    }
    addName(newname) {
        this.list.add(newname.value);
        newname.value = '';
    }
}
