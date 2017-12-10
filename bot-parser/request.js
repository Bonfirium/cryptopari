const request = require("request-promise");

class RequestBody {
    constructor() {
        this.body = "";
    }

    async setBodyByUrl(url) {
        this.body = await this.getHTML(url);
    };

    async getHTML(url) {
        return await request(url);
    }
}

module.exports = RequestBody;