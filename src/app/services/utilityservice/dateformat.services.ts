/**
 * DateFormatClass
 */
const DEFAULT_FORMAT:string = 'MMM DD, YYYY';
const FROMNOW_FORMAT:string = 'YYYY, MM, DD';

export class DateFormatClass {
    constructor() {}
    
    defaultDateFromat(d:string){
        return moment(d).format(DEFAULT_FORMAT);
    }
    
    dateHumanizeFromNow(d:string){
		let endtoday = moment(d).format(FROMNOW_FORMAT);
        return moment(endtoday).fromNow();
    }
}