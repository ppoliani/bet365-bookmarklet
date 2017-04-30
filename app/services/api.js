import 'whatwg-fetch'

export default async (url, method='GET', body={}, headers={}) => {
  try {
    const options = {
      method,
      headers: Object.assign({}, {
        'content-type': 'application/json'
      }, headers)
    };

    if(method !== 'GET') {
      options['body'] = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    if(response.status >= 400) throw new Error(response.status);
    const json = await response.json()

    return json;
  }
  catch(error) {
    throw error;
  }
}
