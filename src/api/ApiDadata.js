import { optionsDadata } from "../utils/constants";

class ApiDadata {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }

    _checkResponse(res) {
        if (!res.ok) {
            return new Error(res.status);
        }
        return res.json();
    }

    getСities(query) {
        return fetch(this._url, {
            method: 'POST',
            mode: 'cors',
            headers: this._headers,
            body: JSON.stringify({
                "query": query,
                "from_bound": { "value": "city" },
                "to_bound": { "value": "settlement" }
            })
        })
            .then(this._checkResponse);
    }

}
const apiDadata = new ApiDadata(optionsDadata);

export default apiDadata;