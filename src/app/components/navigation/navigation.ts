// Libraries
import {Component}         from 'angular2/core';
import {ROUTER_DIRECTIVES, Router, Location} from 'angular2/router';

const COMPONENT_CONSTANT = {
    
};

@Component({
    selector    : 'navigation',
    templateUrl : 'build/app/components/navigation/navigation.html',
    directives  : [ROUTER_DIRECTIVES]
})
export class NavigationComponent {
    constructor(public _r:Router, public loc:Location){}
    ngOnInit(){
        console.log( this._r.hostComponent.name );
    }
    
    getLinkStyle(path) {
        return this.loc.path().indexOf(path) > -1;
    }
}