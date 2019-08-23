import { ACTIVE } from '../constants/entriesStatuses';

export function getByCityName(name) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=f02d635f892fac9d584b06a155ac9a60`
  ).then(response =>
    response.json().then(json => {
      if (!response.ok) {
        return Promise.reject(
          `Error occurred while fetching weather data, please try later. Details: ${
            json.message
          }`
        );
      }

      return {
        id: json.id,
        city: json.name,
        temp: json.main.temp,
        status: ACTIVE
      };
    })
  );
}
