import { AfterViewInit, Component, NgZone, OnInit } from '@angular/core';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit, AfterViewInit {
  constructor(private ngZone: NgZone) {}
  ngAfterViewInit(): void {
    // @ts-ignore
    google.accounts.id.initialize({
      client_id:
        '409117596155-vpq1jo5p9p1d59ag0iqj2kqpr0mfneoj.apps.googleusercontent.com',
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true,
    });
    // @ts-ignore
    google.accounts.id.renderButton(
      // @ts-ignore
      document.getElementById('google-button'),
      { theme: 'outline', size: 'large', width: '100%' }
    );
    // @ts-ignore
    google.accounts.id.prompt((notification: PromptMomentNotification) => {});
  }

  ngOnInit(): void {}

  async handleCredentialResponse(response: any) {
    // Here will be your response from Google.
    const responsePayload = this.parseJwt(response.credential);
    if (!responsePayload.email_verified) {
    } else {
      // We are passing the signed in email id to oAuth.
      // If we pass an email id to oAuth consent.
      // If the user has already given the oAuth consent. it will get auto selected.
      console.log(responsePayload);
    }
  }

  parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  }
}
