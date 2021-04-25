export class ProfileModel {
  id: number | null = null
  email: string = ''
  password: string = ''
  confirmation: string = ''
  firstName: string = ''
  lastName: string = ''
  gender: 'M' | 'F' | '' = ''
  birthday: Date | null = null
  state: string = ''
  city: string = ''
  postalCode: string = ''
  balance: any = 0
  balanceSignal: 'saved' | 'owed' = 'saved'
  targetTotalSavings: any = 0
  targetMonthlySavings: any = 0
}