const getUrl = ({ url, params }) => {
  const urlObj = new URL(url, window.location.origin);

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
    body: ['GET', 'HEAD'].includes(method) ? null : JSON.stringify(body),
    credentials: 'include',
  });

  const data = await response.json().catch(() => {});

  if (!response.ok) throw { ...response, data: await data };
  return { ...response, data: await data };
};

export default httpQuery;
