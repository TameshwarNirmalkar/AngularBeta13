/**
 * CommonClass
 */

export class CommonClass {
    constructor() {}
    /**
     * this method is for get object and filter file_formats which is an array and change to toString().
     */
    convertArrayToString(d:Object){
        let file_id = _.pluck(d["file_formats"], 'file_id').toString();
        return file_id;
    }
    /**
     * this method is for like(1+) and unlike(0) count, if it is zero don't show count 
     */
    likeUnlike(count:number){
        return (count > 0) ? count : '';
    }
    
    readURL(input, imgid) {
        console.log(input,':',input.target.value);
        if (input.target.files && input.target.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function () {
                $('#'+imgid).attr('src', reader.result);
                //$(input.target).addClass('temp').css('background', '#c00');
                //$(input.target).addClass('temp');
            }
            
            reader.readAsDataURL(input.target.files[0]);
        }
    }
       
}