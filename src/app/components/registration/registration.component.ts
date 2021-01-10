import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { KnjizaraService } from 'src/app/service/knjizara.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  registrationForm: FormGroup = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    place: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    cPassword: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  showPasswordErrorMessage: boolean;
  showServerErrorMessage: boolean;
  showErrorMessage: boolean;
  showPasswordPatternErrorMessage: boolean;
  showSuccsessfulRequest: boolean;
  data: any;
  photo: File;
  photoURL: string;

  constructor(private service: KnjizaraService, private router: Router) {}


  checkPhoto(event: Event) {
    //console.log("checkPhoto");
    this.photo = (event.target as HTMLInputElement).files[0];

    //console.log(this.photo);
    const reader = new FileReader();
    reader.onload = () => {
      this.photoURL = reader.result as string;
      //console.log(this.photoURL);
    }
    reader.readAsDataURL(this.photo);
  }


  registerUser(): void {
    this.showPasswordErrorMessage = false;
    this.showErrorMessage = false;
    this.showServerErrorMessage = false;
    this.showPasswordPatternErrorMessage = false;
    this.showSuccsessfulRequest = false;

    if (this.registrationForm.invalid) {
      this.showErrorMessage = true;
      return;
    }
    if (this.registrationForm.value.password !== this.registrationForm.value.cPassword) {
      this.showPasswordErrorMessage = true;
      return;
    }
    if (this.photo == null) {
      console.log("Da li je dodata slika");
      return
    }


    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-z].[A-Za-z\d@$!%*?&]{6,}$/;

    if (this.registrationForm.value.password.match(pattern) === null) {
      this.showPasswordPatternErrorMessage = true;
      return;
    }
    this.showPasswordErrorMessage = false;
    this.showErrorMessage = false;
    this.showServerErrorMessage = false;
    this.showPasswordPatternErrorMessage = false;

    const regUser = {
      firstname: this.registrationForm.value.firstname,
      lastname: this.registrationForm.value.firstname,
      email: this.registrationForm.value.email,
      place: this.registrationForm.value.place,
      date: this.registrationForm.value.date,
      username: this.registrationForm.value.username,
      password: this.registrationForm.value.password,
      userType: 'regUser',
      photo: this.photo,
      photoPath: ""
    };
    console.log(regUser);
    this.service.registerRequest(regUser).subscribe(data => {
      this.showSuccsessfulRequest = true;
      console.log(data);
      this.registrationForm.reset();
    },
      err => { console.log(err); });
    this.registrationForm.reset();
  }
}
