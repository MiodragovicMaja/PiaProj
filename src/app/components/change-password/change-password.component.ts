import { Component, OnInit } from '@angular/core';
import { KnjizaraService } from 'src/app/service/knjizara.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  showPasswordErrorMessage: boolean;
  showPasswordPatternErrorMessage: boolean;
  showPasswordEmptyMessage: boolean;
  notification: boolean;

  password: string;
  cPassword: string;
  oldPassword: string;

  constructor(private service: KnjizaraService) {

    this.cPassword = '';
    this.oldPassword = '';
    this.password = '';
   }

  ngOnInit(): void {
  }




  change() {
    this.showPasswordErrorMessage = false;
    this.showPasswordPatternErrorMessage = false;
    this.showPasswordEmptyMessage = false;

    if (this.oldPassword === '' || this.password === '' || this.oldPassword === this.password) {
      this.showPasswordEmptyMessage = true;
      return;
    }
    if (this.password !== this.cPassword) {
      this.showPasswordErrorMessage = true;
      return;
    }

    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-z].[A-Za-z\d@$!%*?&]{6,}$/;
    if (this.password.match(pattern)===null) {
      this.showPasswordPatternErrorMessage = true;
      return;
    }
    this.showPasswordErrorMessage = false;
    this.showPasswordPatternErrorMessage = false;

    this.service.changePassword(this.oldPassword, this.password).subscribe(data => {
      this.cancel();
      this.notification = true;
    }, err => {
      console.log(err);
    });
  }

  cancel() {
    this.showPasswordErrorMessage = false;
    this.showPasswordPatternErrorMessage = false;
    this.cPassword = '';
    this.password = '';
  }
}
