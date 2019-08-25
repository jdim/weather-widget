export function errorPayload(payload = {}) {
  if (!payload.message) {
    throw Error('Error payload must contain "message" property');
  }
  if (payload.fromApi && !payload.code) {
    throw Error('Error from api must contain must contain "code" property');
  }
  return payload;
}
