import axios, { AxiosInstance } from 'axios'
import { API_URL, HTTP_STATUS } from '../constants';
import { store } from '../redux/store';

export default class BaseService {

  public static TOKEN: string

  protected api:AxiosInstance

  constructor() {
    this.api = axios.create({baseURL: API_URL})
    this.setRequestInterceptor()
  }

  private setRequestInterceptor() {
    this.api.interceptors.request.use(function (request){

      request.headers['Content-Type'] = 'application/json'
      request.headers['Accept'] = 'application/json'

      if (BaseService.TOKEN) {
        request.headers['Authorization'] = 'Bearer ' + BaseService.TOKEN
      } else if (request.headers['Authorization']) {
        delete(request.headers['Authorization'])
      }

      return request
    })
  }

  handleHttpError(method, msg, error, hasErrorAlert = false) {

    const errorJSON = (error.toJSON && typeof(error.toJSON) === 'function')? error.toJSON() : null

    // token has expired or revoked
    if (error.response?.status === HTTP_STATUS.UNAUTHORIZED) {

      // go back to SignIn page
      console.log('TODO: implement go back to sign in')

    } else if (hasErrorAlert) {

      // show error alert
      console.log('TODO: implement error alert')
    }

    console.error(method + ': ' + error, errorJSON )
    throw new Error(msg)
  }

  dispatch(action) {
    store.dispatch(action)
  }

  getState() {
    return store.getState()
  }
}