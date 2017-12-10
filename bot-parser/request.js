const request = require("request-promise");

class RequestBody {
    constructor() {
        this.body = "";
    }

    async setBodyByUrl() {
        this.body = await this.getHTML("http://www.gosugamers.net/dota2/gosubet");
    };

    async getHTML(url) {
        return await request(url);
    }
}

module.exports = RequestBody;