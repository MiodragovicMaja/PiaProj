import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KnjizaraService } from 'src/app/service/knjizara.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {



  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  showErrorMessage = false;
  showServerErrorMessage = false;



  constructor(private router: Router, private service: KnjizaraService) {

  }



  login(): void {
    if (this.loginForm.invalid) {
      this.showErrorMessage = true;
      return;
    }
    const username = this.loginForm.value.username;

    this.service.login(this.loginForm.value).subscribe(data => {

      this.service.setCredentials(username, data.userType);
      this.service.nextPage();
      this.showErrorMessage = false;
    },
      err => {
        console.log(err.message);
        this.showErrorMessage = true;
      });


    this.loginForm.reset();
  }

  register(): void {
    this.router.navigate(['/registration']);
  }


}
