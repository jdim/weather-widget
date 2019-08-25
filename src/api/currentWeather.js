import { ACTIVE } from '../constants/entriesStatuses';
import { errorPayload } from '../actions/helpers';

export function getByCityName(cityName) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=f02d635f892fac9d584b06a155ac9a60`
  ).then(response =>
    response.json().then(json => {
      if (!response.ok) {
        const code = parseInt(json.cod, 10);
        let message = '';

        if (code === 404) {
          message = `City with name ${cityName} not found`;
        }

        return Promise.reject(
          errorPayload({
            code,
            message,
            fromApi: true,
            cityName,
            origin: json
          })
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
