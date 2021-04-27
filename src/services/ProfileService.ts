import moment from 'moment'
import { HTTP_STATUS } from '../constants'
import BaseService from './BaseService';
import { ProfileModel } from '../models/ProfileModel';
import { setToken } from '../features/profile/ProfileSlice'

/**
 * ProfileService
 * A service to handle the profile's persistence at the API web service
 *
 * @extends BaseService
 */
export default class ProfileService extends BaseService {

  // Retrieve profile
  async load():Promise<ProfileModel | undefined> {
    try {

      const res = await this.api.get('profile')

      return this.mapToStore(res.data)

    } catch (error) {

      const method = 'ProfileServiceApi.load'
      let msg = 'Server error in attempt to load profile'
      this.handleHttpError(method, msg, error)
    }
  }

  // Authenticate profile
  async signIn(email:string, password:string): Promise<ProfileModel | undefined> {

    try {

      const res = await this.api.post('profile/auth', {
        email,
        password,
        device: 'web'
      })

      if (res.status === HTTP_STATUS.OK) {

        BaseService.TOKEN = res.data.token
        this.dispatch(setToken(BaseService.TOKEN))

        return this.mapToStore(res.data.profile)
      }

    } catch (error) {

      const method = 'ProfileServiceApi.signIn'
      let msg = 'The authentication has fail due to a server error!'
      if (error.response && error.response.status === HTTP_STATUS.FORBIDDEN) {
        msg = 'The email or password is invalid!'
      }
      this.handleHttpError(method, msg, error)
    }
  }

  // Create or update a profile
  async save(profile: ProfileModel): Promise<ProfileModel> {

    try {

      let profileToSave = this.mapToApi(profile)
      let uri = 'profile'

      // update
      if (profileToSave['id']) {

        delete(profileToSave['password'])
        const res = await this.api.put(uri, profileToSave)
        profile = this.mapToStore(res.data)

      // create
      } else {

        const res = await this.api.post(uri, profileToSave)
        profile = this.mapToStore(res.data)
      }

    } catch (error) {

      const method = 'ProfileServiceApi.save'
      let msg = 'Unable to save the profile due a server error. Try again later!'
      if (error.response && error.response.status === HTTP_STATUS.CONFLICT) {
        msg = 'A profile with the same email already exists'
      }
      this.handleHttpError(method, msg, error)
    }

    return profile
  }

  // Revoke the user's access token and clear states and storage data to log the user out
  async signOut(revoke=true):Promise<void> {
    try {

      if (revoke) {
        // revoke the current token
        await this.api.get('profile/revoke')
      }

    } catch (error) {

      const method = 'ProfileServiceApi.signOut'
      const msg = 'The logout has fail'
      this.handleHttpError(method, msg, error)
    }
  }

  // Map profile's data to be saved in the server
  private mapToApi(profile: ProfileModel): object {
    return {
      'id': profile.id,
      'email': profile.email,
      'password': profile.password,
      'firstname': profile.firstName,
      'lastname': profile.lastName,
      'gender': profile.gender,
      'birthday': (profile.birthday)? moment(profile.birthday).format('YYYY-MM-DD'): null,
      'state': profile.state,
      'city': profile.city,
      'postalcode': profile.postalCode,
      'balance': profile.balance,
      'target_total_savings': profile.targetTotalSavings,
      'target_monthly_savings': profile.targetMonthlySavings,
    }
  }

  // Map profile's data from the server
  private mapToStore(profile): ProfileModel {
    return {
      id: profile['id'],
      email: profile['email'],
      firstName: profile['firstname'],
      lastName: profile['lastname'],
      gender: profile['gender'],
      birthday: (profile['birthday'])? new Date(profile['birthday']) : null,
      state: profile['state'],
      city: profile['city'],
      postalCode: profile['postalcode'],
      balance: profile['balance'],
      balanceSignal: (profile['balance'] < 0)? 'owed' : 'saved',
      targetTotalSavings: profile['target_total_savings'],
      targetMonthlySavings: profile['target_monthly_savings'],
      password: '',
      confirmation: '',
    }
  }
}