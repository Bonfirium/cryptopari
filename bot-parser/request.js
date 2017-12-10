const request = require("request-promise");

class RequestBody {
    constructor() {
        this.body = "";
    }

    async setBodyByUrl(url) {
        let body = await request(url);
        this.body = body;
    };
}

module.exports = RequestBody;