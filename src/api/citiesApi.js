import { errorPayload } from '../actions/helpers';

export function getCities() {
  return fetch('/city-list-ru.min.json').then(response =>
    response.json().then(json => {
      if (!response.ok) {
        return Promise.reject(
          errorPayload({
            code: response.status,
            message: 'Error occurred while fetching cities',
            fromApi: true,
            origin: json
          })
        );
      }

      return json;
    })
  );
}
