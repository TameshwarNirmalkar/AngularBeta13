/**
 * ServerConfig
 */
const DOMAIN = 'https://beta-login-123d.acg.autodesk.com';
const DOWNLOAD = 'beta-storage.acg.autodesk.com';
const TOKENKEY = '00DED5F8-E2D9-4A1E-B3D6-F79EFCA7A885';
const SERVER_CONSTANT = {
    "DOMAIN": DOMAIN,
    "SERVER": "beta-storage.acg.autodesk.com",
    "ACGI_ASSETS" : DOMAIN+"/api/v2/assets/",
    "ACGI_SEARCH": DOMAIN+"/api/v2/assets?q=",
    "ACGI_MOREASSETS": DOMAIN+"/api/v2/assets/?limit=",
    "ACGI_DOWNLOAD": 'https://'+DOWNLOAD+'/api/v2/files/download?file_ids=',
    "ACGI_TOKEN": TOKENKEY
};
export class ServerConfig{
    public acgiasset:string = SERVER_CONSTANT.ACGI_ASSETS;
    public acgisearch:string = SERVER_CONSTANT.ACGI_SEARCH;
    public acgimoreasset:string = SERVER_CONSTANT.ACGI_MOREASSETS;
    public acgidownload:string = SERVER_CONSTANT.ACGI_DOWNLOAD;
    public acgitoken:string = SERVER_CONSTANT.ACGI_TOKEN;
    
    constructor() {}
}