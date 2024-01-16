import { optionsOpenweather } from "../utils/constants";

class ApiOpenweather {
    constructor(options) {
        this._url = options.url;
        this._apiKey = options.apiKey;
    }

    _checkResponse(res) {
        if (!res.ok) {
            return new Error(res.status);
        }
        return res.json();
    }

    currentWeather(city) {
        return fetch(`${this._url}?q=${city}&appid=${this._apiKey}&units=metric&lang=ru`).then(this._checkResponse);
    }

}

const apiOpenweather = new ApiOpenweather(optionsOpenweather);

export default apiOpenweather;