import { Component, Inject, ElementRef} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouteParams, ROUTER_PROVIDERS, RouterLink} from 'angular2/router';
import {NgFor, NgIf, NgClass,FORM_DIRECTIVES} from 'angular2/common';
import * as _ from 'underscore';
import moment from 'moment';
import $ from 'jquery';
import {LoadingMask} from '../../directive/loadingmask/loadingmask';
import {SearchService} from '../../services/search/search.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NavigationComponent } from '../navigation/navigation';
import { CommonClass } from '../../services/utilityservice/common.service';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'publish-component',
    templateUrl: 'build/app/components/publish-component/publish.component.html',
    directives: [ROUTER_DIRECTIVES, LoadingMask, NavigationComponent, FORM_DIRECTIVES],
    providers: [SearchService, ToastsManager]
    // host: {
    //      "onchange": "filePath(e)"
    // }
})

/**
 * PublishComponent
 */
export class PublishComponent {
    myLabel:boolean = false;
    private commonclass = new CommonClass();
    private _asset_id:number = null;
    private _file_id:number = null;
    private _publishloadSpiner:boolean = true;
    public filesToUpload: Array<File>;
    private assetsobject: Object = {
        "asset_name":"",
        "tags": "",
        "description": "",
        "media_type_id": 61,
        "software": 99,
        "publish": false,
        "progress_status": 1,
        "parent_asset_id": "",
        "license_id": "MIT",
        "asset_taxonomy": "",
        "language": "en",
        "region": "US",
        "member_id": ""
    };
    private assetupload: Object = {
        "unzip":false,
        "public": true,
        "software": 99,
        "use_https": true
    };
    private sourcetoassetbody: Object = {
        "id": this._asset_id,
        "file_ids": this._file_id 
    }; 
    //private uploader:FileUploader = new FileUploader({url: URL});
    constructor(public params: RouteParams, private router: Router, private _PublishSearchService: SearchService, public toastr: ToastsManager) {}
    ngOnInit() {
        //console.log('PublishComponent initialize'); 
    }
    filePath(e:Event) {
        if (e.target["files"] && e.target["files"][0]) {
            let filenameT:string = e.target["files"][0].name;
            this.assetupload["filename"] = filenameT;
            this.filesToUpload = <Array<File>> e.target["files"];
        }
    }
    
    makeFileRequest(url: string, params: Array<Object>, files: Array<File>) {
        return new Promise((resolve, reject) => {
            
            let formData: FormData = new FormData();
            let xhr:XMLHttpRequest = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            
            xhr.open("POST", url, true);
            formData.append("file", files[0], files[0].name);
            xhr.setRequestHeader("X-AFC", "DY1ONB");
            xhr.setRequestHeader('X-Session','4BA8DB99-61A8-4253-AE40-EEFA531AB407');
            xhr.send(formData);
        });
    }
    
    publishPackage(){
        this._publishloadSpiner = false;
        let body = $.param( this.assetsobject );
        /**
         * Step 1. Create an Asset.
         */
        this._PublishSearchService.createAnAsset(body).map(res => res.json()).subscribe(resp => {
            //console.log(resp);
            this._asset_id = resp.asset_id;
           // this.toastr.success('Asset successfully created', 'Successfully');
           let fileuploadbody = $.param( this.assetupload );
            this.makeFileRequest('https://beta-storage.acg.autodesk.com/api/v2/files/upload?'+fileuploadbody,[],this.filesToUpload).then((result) => {
                this._file_id = result["files"][0].file_id;
                //this.toastr.success('Asset successfully created', 'Successfully');
            }, (error) => {
                this.toastr.error(error.msg, 'Error');
            }).then((res) => {
                let sourcebody = '/'+this._asset_id+'/sources?file_ids='+this._file_id;
                this._PublishSearchService.addSourceToAsset(sourcebody).subscribe(resp => {
                    this._publishloadSpiner = true;
                    this.toastr.success('Asset successfully created', 'Successfully');
                })    
            });
        })
        /**
         * Step 2. File upload.
         */
        
                
        
        
        
        /**
         * Step 3. Create an Asset.
         */
        
        
        /**
         * Thumbnails api call.
         */
    }
    onBlurMethod($event){
       if($event.target.value == "" || $event.target.value == null){
            this.myLabel = false;
       }else{
            this.myLabel = true;
       }
    }
    onKeyup($event){
        if($event.target.value == "" || $event.target.value == null){
            this.myLabel = false;
       }else{
            this.myLabel = true;
       }
    }
}