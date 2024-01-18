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
        return fetch(`${this._url}/suggest/address`, {
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

    getCityByCoordinates(lon, lat) {
        return fetch(`${this._url}/geolocate/address`, {
            method: 'POST',
            mode: 'cors',
            headers: this._headers,
            body: JSON.stringify({
                "lon": lon,
                "lat": lat,

            })
        })
            .then(this._checkResponse);
    }

}
const apiDadata = new ApiDadata(optionsDadata);

export default apiDadata;