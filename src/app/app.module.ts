import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountSettingComponent } from './Components/account-setting/account-setting.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { GettingStartedComponent } from './Components/getting-started/getting-started.component';
import { HeaderComponent } from './Components/header/header.component';
import { HomeComponent } from './Components/home/home.component';

import { LoaderComponent } from './Components/loader/loader.component';
import { NotificationsComponent } from './Components/notifications/notifications.component';
import { QrCodeComponent } from './Components/qr-code/qr-code.component';
import { ReferenceComponent } from './Components/reference/reference.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { SignUpDetailsComponent } from './Components/sign-up-details/sign-up-details.component';
import { TipsUIComponent } from './Components/tips-ui/tips-ui.component';
import { VerifyEmailComponent } from './Components/verify-email/verify-email.component';
import { WelcomeComponent } from './Components/welcome/welcome.component';
import { WithdrawUIComponent } from './Components/withdraw-ui/withdraw-ui.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { KycUIComponent } from './Components/kyc-ui/kyc-ui.component';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AccountSettingComponent,
    DashboardComponent,
    ForgetPasswordComponent,
    GettingStartedComponent,
    HeaderComponent,
    HomeComponent,
    KycUIComponent,
    LoaderComponent,
    NotificationsComponent,
    QrCodeComponent,
    ReferenceComponent,
    SignInComponent,
    SignUpComponent,
    SignUpDetailsComponent,
    TipsUIComponent,
    VerifyEmailComponent,
    WelcomeComponent,
    WithdrawUIComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule, 
    RouterModule,
    FormsModule,
    QRCodeModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
