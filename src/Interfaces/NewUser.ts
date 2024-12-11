export interface NewUser {

    userDetails:{
        firstName:string,
        lastName:string,
        email:string,
        mobileNumber:string,
    }
    settings:{
        termsAndCon:Boolean,
        privacy_policy:Boolean,
        email_notificaton:boolean,
    }
    kyc:boolean ,
    customerRegister: boolean,
    uploadedDoc: boolean,
}