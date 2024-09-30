export interface KYC {
    "firstName": string,
  "lastName": string,
  "mobileNumber": string,
  "image":string,
  "BankDetails":{
    "account_holder":string,
    "account_type":string,
    "account_number":string,
    "branch":string,
    "bank":string,
  },
  "idNumber": string,
  "externalUniqueId": string,
  "work": string,
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
  passedAWSLiveness:boolean
}