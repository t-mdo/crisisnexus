const environment =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

const URLS = {
  development: 'http://dev.crisisnexus.com:3000',
  production: 'https://www.crisisnexus.com',
};

const getUrl = ({ url, params }) => {
  const urlObj = new URL(url, URLS[environment]);

  Object.entries(params).forEach(([key, value]) => {
    urlObj.searchParams.append(key, value);
  });
  return urlObj.href;
};

const httpQuery = async ({ url, method = 'GET', body = {}, params = {} }) => {
  const headers = {
    'Access-Control-Allow-Credentials': 'true',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const response = await fetch(getUrl({ url, params }), {
    method,
    headers,
    body: method !== 'GET' && JSON.stringify(body),
    credentials: 'include',
  });

  const data = await response.json().catch(() => {});

  if (!response.ok) throw { ...response, message: data?.message };
  return { ...response, data: await data };
};

export default httpQuery;
