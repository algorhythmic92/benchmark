type RequestOptions = {
  queryParams?: { [key: string]: any };
  pathParams?: { [key: string]: any };
  body?: any;
  headers?: { [key: string]: string };
};

type ResponseHandler<T> = (response: Response) => Promise<T>;

export default async function request<T>(
  url: string,
  method: string,
  options: RequestOptions = {},
  responseHandler: ResponseHandler<T> = (response) => response.json()
): Promise<T> {
  // Replace path parameters in the URL
  for (const [key, value] of Object.entries(options.pathParams || {})) {
    url = url.replace(`:${key}`, encodeURIComponent(value));
  }

  // Construct the query string
  const queryString = new URLSearchParams(options.queryParams || {}).toString();
  if (queryString) {
    url += `?${queryString}`;
  }

  // Set up fetch options
  const fetchOptions: RequestInit = {
    method: method.toUpperCase(),
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  };

  // Include body if it's a POST, PUT, PATCH request
  if (['POST', 'PUT', 'PATCH'].includes(method.toUpperCase()) && options.body) {
    fetchOptions.body = JSON.stringify(options.body);
  }

  try {
    console.log(`URL: ${url}`);
    console.log(`fetchOptions: ${fetchOptions}`);
    const response = await fetch(url, fetchOptions);
    return await responseHandler(response);
  } catch (error) {
    console.error('HTTP Request Failed', error);
    throw error;
  }
}

// Example usage
(async () => {
  try {
    const response = await request<any>(
      'https://api.example.com/users/:userId',
      'GET',
      {
        pathParams: { userId: 123 },
        queryParams: { active: true },
      },
      (response) => response.json()
    );
    console.log(response);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
