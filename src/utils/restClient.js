import {isConnected} from './net-info';
import {regex} from './regex';
// import {MyDeviceInfo} from "./deviceInfo";

const successResponseStatuses = [200, 104, 202];
let authToken = null;

const fetchRetry = (url, delay, limit, fetchOptions = {}) => {
  return new Promise((resolve, reject) => {
    function success(response) {
      resolve(response);
    }

    function failure(error) {
      limit--;
      if (limit) {
        setTimeout(fetchUrl, delay);
      } else {
        // this time it failed for real
        reject(error);
      }
    }

    function fetchUrl() {
      return fetch(url, fetchOptions).then(success).catch(failure);
    }

    fetchUrl();
  });
};

export class RestClient {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
    this._headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      //'Device-Info': JSON.stringify(MyDeviceInfo)
    });
  }

  setAuthorization(authToken, customer_id) {
    this._headers.set('Authorization', authToken);
    this._headers.set('member_id', customer_id);
    this._headers.set('login_type', 'customer');
  }

  setAuthorizationCountry(country) {
    this._headers.set('country_id', country._id);
  }

  clearAuthorization() {
    this._headers.delete('authorization');
  }

  setHeaders(headers) {
    this._headers = headers;
  }

  getHeader() {
    return this._headers;
  }

  getAuthToken() {
    return this._headers.map.authorization;
  }

  _getInitData(method, url, data) {
    let init = {
      method: method,
      headers: this._headers,
      cache: 'no-cache',
      keepalive: false,
      redirect: 'follow',
    };

    if (data !== null) {
      init.body = JSON.stringify(data);
    }

    let APIURL = `${this._baseUrl}/${url}`;

    return {init, APIURL};
  }

  _callWithBody(method, url, data) {
    let init = {
      body: JSON.stringify(data),
      method: method,
      headers: this._headers,
      cache: 'no-cache',
      keepalive: false,
      redirect: 'follow',
    };
    return this.callRequest(init, url);
  }

  _callWithoutBody(method, url) {
    let init = {
      method: method,
      headers: this._headers,
      cache: 'no-cache',
      keepalive: false,
      redirect: 'follow',
    };
    return this.callRequest(init, url);
  }

  _callWithoutBodyNode(method, url) {
    let init = {
      method: method,
      headers: this._headers,
      cache: 'no-cache',
      keepalive: false,
      redirect: 'follow',
    };
    return this.callRequest(init, url);
  }

  _callWithFormBody(method, url, data) {
    let init = {
      body: data,
      method: method,
      headers: new Headers({
        //'Content-Type': 'multipart/form-data; charset=utf-8; boundary="another cool boundary"',
        'Content-Type': 'multipart/form-data',
        Authorization: this._headers.map.authorization,
        member_id: this._headers.map.member_id,
        login_type: this._headers.map.login_type,
      }),
      cache: 'no-cache',
      keepalive: false,
      redirect: 'follow',
    };
    return this.callRequest(init, url);
  }

  callRequest(init, url) {
    let APIURL = `${this._baseUrl}/${url}`;
    console.log({
      // DO NOT USE THIS TYPE FOR REDUCERS. JUST FOR DEBUGGING ONLY
      type: 'REST_API_REQUEST_INITIATED',
      payload: {
        url: APIURL,
        init: {
          ...init,
          headers: Object.keys(this._headers.map).map((k) => {
            return `${k}: ${this._headers.map[k]}`;
          }),
        },
      },
    });

    return isConnected()
      .then(() =>
        fetchRetry(APIURL, 300, 3, init)
          .then((response) => {
            return response.json().then((json) => {
              console.log({
                // DO NOT USE THIS TYPE FOR REDUCERS. JUST FOR DEBUGGING ONLY
                type: 'REST_API_RESPONSE_RECEIVED',
                payload: {
                  url: APIURL,
                  init: {
                    ...init,
                    headers: Object.keys(this._headers.map).map((k) => {
                      return `${k}: ${this._headers.map[k]}`;
                    }),
                  },
                  type: response.type,
                  status: response.status,
                  ok: response.ok,
                  response: json,
                },
              });
              if (successResponseStatuses.indexOf(response.status) > -1) {
                return Promise.resolve(json);
              } else {
                return Promise.reject({
                  error: json,
                  message:
                    json.hasOwnProperty('err') &&
                    json.err.length > 0 &&
                    json.err[0].hasOwnProperty('msg')
                      ? json.err[0].msg
                      : json.hasOwnProperty('error')
                      ? json.error.msg
                      : json.hasOwnProperty('message')
                      ? json.message
                      : json.msg,
                  status: response.status,
                });
              }
            });
          })
          .catch((error) => {
            /* console.log({
               // DO NOT USE THIS TYPE FOR REDUCERS. JUST FOR DEBUGGING ONLY
               type: 'REST_API_ERROR_RECEIVED',
               payload: {
                 url: APIURL,
                 error,
                 message: error.message
               }
             });*/
            // Invalid Login
            if (error.status === 401) {
              regex.clearData();
            }
            return Promise.reject(error);
          }),
      )
      .catch((error) => {
        if (typeof error === 'boolean') {
          // showToast("Oops! The device seems to be disconnected. Please connect to a working internet connection and try again.")
        }
        return Promise.reject(error);
      });
  }

  getWithBody(url, data) {
    return this._callWithBody('GET', url, data);
  }

  get(url) {
    return this._callWithoutBody('GET', url);
  }

  getNodeJs(url) {
    return this._callWithoutBodyNode('GET', url);
  }

  postWithBody(url, data) {
    return this._callWithBody('POST', url, data);
  }

  post(url) {
    return this._callWithoutBody('POST', url);
  }

  postWithFormBody(url, data) {
    return this._callWithFormBody('POST', url, data);
  }
}

const LOCAL_URL = '';

export const hasLocalUrl = true;

// STAGING (DEVELOPMENT)

const STAGING_URL = 'https://api.hoookedupworks.com/api';
//const STAGING_URL = "http://34.206.114.59:3003/api";
const STAGING_SOCKET_URL = 'https://api.hoookedupworks.com';
const STAGING_LIVE_PORT_URL = '';
const STAGING_S3_URL = 'https://d3nxqgkzw2f14c.cloudfront.net/';
const STAGING_S3_LAMDA_URL = 'https://d1zbb1oaurv4fp.cloudfront.net/';
const STAGING_S3_DOCUMENT_URL =
  'https://hoookedup-production-uploads.s3.amazonaws.com/';

// LIVE (PRODUCTION)
const PRODUCTION_URL = '';
const PRODUCTION_SOCKET_URL = '';
const PRODUCTION_LIVE_PORT_URL = '';
const PRODUCTION_S3_URL = 'https://d192a4z5wljn2.cloudfront.net/';
const PRODUCTION_S3_LAMDA_URL = 'https://d2uyhvsr5urmpl.cloudfront.net/';
const PRODUCTION_S3_DOCUMENT_URL =
  'https://hoookedup-production-uploads.s3.amazonaws.com/';

const PRODUCTION_LINK_PREVIEW = '';

// SET BASE URL (Change URL When Upload On Live)
export const API_URL = hasLocalUrl ? STAGING_URL : PRODUCTION_URL;
export const SOCKET_URL = hasLocalUrl
  ? STAGING_SOCKET_URL
  : PRODUCTION_SOCKET_URL;
const LIVE_PORT_URL = hasLocalUrl
  ? STAGING_LIVE_PORT_URL
  : PRODUCTION_LIVE_PORT_URL;
export const S3_URL = hasLocalUrl ? STAGING_S3_URL : PRODUCTION_S3_URL;
export const S3_LAMDA_URL = hasLocalUrl
  ? STAGING_S3_LAMDA_URL
  : PRODUCTION_S3_LAMDA_URL;
export const S3_DOCUMENT = hasLocalUrl
  ? STAGING_S3_DOCUMENT_URL
  : PRODUCTION_S3_DOCUMENT_URL;

const LINK_PREVIEW = PRODUCTION_LINK_PREVIEW;

export const defaultRestClient = new RestClient(API_URL);
export const defaultRestClientLinkPreview = new RestClient(LINK_PREVIEW);
export const defaultRestClientNodeJs = new RestClient(API_URL);

// Link Preview URL
export const defaultPHPLinkPreview = `${LINK_PREVIEW}/link-preview/`;

// Socket Messenger URL
// Socket URL
export const SOCKET_URL_ORDER = SOCKET_URL;
