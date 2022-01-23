import {SERVER_NAME} from './urls';

interface IRequestParams {
  body?: {[key: string]: any};
}

interface IRequest extends IRequestParams {
  url: string;
  method: string;
}

class API {
  private request = <ResponseType>({
    url,
    method,
    body,
  }: IRequest): Promise<ResponseType> => {
    const FETCH_PARAMS: RequestInit = {
      method,
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    };

    //проверка body на undefined и длину
    if (body && Object.keys(body).length > 0) {
      FETCH_PARAMS.body = JSON.stringify(body);
    }

    let requestUrl = SERVER_NAME + url;

    return new Promise((resolve, reject) => {
      fetch(requestUrl, FETCH_PARAMS)
        .then((response) => this.checkResponse<ResponseType>(response))
        .then((json) => {
          resolve(json);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  private checkResponse = async <ResponseType>(
    response: Response
  ): Promise<ResponseType> => {
    const {status} = response;
    switch (status) {
      case 200:
      case 201:
      case 202:
      case 203:
        return response.json();
      case 204:
        throw {status, message: 'Неверное тело запроса'};
      case 401:
      case 403:
        throw {status, message: 'Неавторизован'};
      case 404:
        throw {status, message: 'Не удалось найти запрос'};
      default:
        throw {
          status,
          message: 'Произошла ошибка, пожалуйста попробуйте повторить позднее',
        };
    }
  };

  public GET = <ResponseType>(url: string, params?: IRequestParams) =>
    this.request<ResponseType>({url, method: 'GET', ...params});
  public POST = <ResponseType>(url: string, params: IRequestParams) =>
    this.request<ResponseType>({url, method: 'POST', ...params});
  public PATCH = <ResponseType>(url: string, params: IRequestParams) =>
    this.request<ResponseType>({url, method: 'PATCH', ...params});
  public PUT = <ResponseType>(url: string, params: IRequestParams) =>
    this.request<ResponseType>({url, method: 'PUT', ...params});
  public DELETE = <ResponseType>(url: string, params: IRequestParams) =>
    this.request<ResponseType>({url, method: 'DELETE', ...params});
}

export const request = new API();
