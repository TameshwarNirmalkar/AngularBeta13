/**
 * DateFormatClass
 */
const defaultformat:string = 'MMM DD, YYYY';
const fromNowformat:string = 'YYYY, MM, DD';

export class DateFormatClass {
    constructor() {}
    
    defaultDateFromat(d:string){
        return moment(d).format(defaultformat);
    }
    
    dateHumanizeFromNow(d:string){
		let endtoday = moment(d).format(fromNowformat);
        return moment(endtoday).fromNow();
    }
}