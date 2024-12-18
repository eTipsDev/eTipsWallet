export interface KYC {

  userDetails:{
    "firstName":string,
    "lastName":string,
    "email":string,
    "mobileNumber":string,
    "id_image": string,
    "photo": string,
    "idNumber": string,
    "work": string,
  },
  "BankDetails":{
    "account_holder":string,
    "account_type":string,
    "account_number":string,
    "branch":string,
    "bank":string,
  },
  "externalUniqueId": string,
  "address": {
    "addressType": string, // options below
    "city": string,
    "code": string,
    "country": string,
    "line1": string,
    "line2": string, // not required, can be empty string
    "line3": string, // not required, can be empty string
    "state": string //province
  },
  "customerId":string,
  "wallet":string
  passedAWSLiveness:boolean,
  kyc:boolean
}