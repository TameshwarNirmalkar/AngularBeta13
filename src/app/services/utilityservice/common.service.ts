/**
 * CommonClass
 */

export class CommonClass {
    constructor() {}
    
    convertArrayToString(d:Object){
        let file_id = _.pluck(d["file_formats"], 'file_id').toString();
        return file_id;
    }
}