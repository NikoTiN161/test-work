export const optionsDadata = {
    url: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs',
    headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json",
        "Authorization": `Token ${process.env.REACT_APP_APIDADATA}`
    }
}

export const optionsOpenweather = {
    url: 'https://api.openweathermap.org/data/2.5',
    apiKey: process.env.REACT_APP_OPENWEATHER
}