/**
 * ServerConfig
 */
const DOMAIN = 'https://beta-login-123d.acg.autodesk.com';
const DOWNLOAD = 'beta-storage.acg.autodesk.com';
const TOKENKEY = '7BA5A8F9-5D7B-48A7-832E-7BEF7615DE55';
const AFC = 'DY1ONB'; //FJKB32
const SERVER_CONSTANT = {
    "AFC": AFC,
    "DOMAIN": DOMAIN,
    "SERVER": "beta-storage.acg.autodesk.com",
    "ACGI_ASSETS" : DOMAIN+"/api/v2/assets/",
    "ACGI_SEARCH": DOMAIN+"/api/v2/assets?q=",
    "ACGI_MOREASSETS": DOMAIN+"/api/v2/assets/?limit=",
    "ACGI_DOWNLOAD": 'https://'+DOWNLOAD+'/api/v2/files/download?file_ids=',
    "ACGI_TOKEN": TOKENKEY,
    "ACG_CREATEASSET": DOMAIN+'api/v2/assets?'
};
export class ServerConfig{
    public acgiasset:string = SERVER_CONSTANT.ACGI_ASSETS;
    public acgisearch:string = SERVER_CONSTANT.ACGI_SEARCH;
    public acgimoreasset:string = SERVER_CONSTANT.ACGI_MOREASSETS;
    public acgidownload:string = SERVER_CONSTANT.ACGI_DOWNLOAD;
    public acgitoken:string = SERVER_CONSTANT.ACGI_TOKEN;
    public acgcreateasset:string = SERVER_CONSTANT.ACG_CREATEASSET;
    public acgafc:string = SERVER_CONSTANT.AFC;
    constructor() {}
}