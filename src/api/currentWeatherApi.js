import { ACTIVE } from '../constants/entriesStatuses';
import { errorPayload } from '../actions/helpers';

export function getByCity(id, name) {
  let queryParams = '';
  if (id) {
    queryParams = `id=${id}`;
  } else if (name) {
    queryParams = `q=${name}`;
  } else {
    throw new Error('Must supply name or id of the city');
  }
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?${queryParams}&units=metric&appid=f02d635f892fac9d584b06a155ac9a60`
  ).then(response =>
    response.json().then(json => {
      if (!response.ok) {
        const code = parseInt(json.cod, 10);
        let message = '';

        if (code === 404) {
          message = `City with name ${name} not found`;
        }

        return Promise.reject(
          errorPayload({
            code,
            message,
            fromApi: true,
            name,
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
