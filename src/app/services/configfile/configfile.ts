/**
 * ServerConfig
 */
const downloadserver = {
    "server": "beta-storage.acg.autodesk.com"
};
export class ServerConfig{
    public ds:string = downloadserver.server;
    constructor() {
        console.log(downloadserver);
    }
}