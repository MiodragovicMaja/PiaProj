
import { Component, OnInit } from '@angular/core';
import { KnjizaraService } from 'src/app/service/knjizara.service';
import { makeRegUserFromRequest, makeModeratorFromRequest, User } from 'src/app/models/registration-request';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: Array<any>;
  registrationRequests: Array<any>;
  request: any;
  bookRequests: Array<any>;

  constructor(private service: KnjizaraService) {
    this.users=new Array<any>();
    this.registrationRequests=new Array<any>();
  }

  ngOnInit(): void {
    this.getRequests();
    this.getUsers();
    this.getBookRequests();
  }


  getUsers(){
    this.service.getUsers().subscribe(data=>{
      this.users=[];
      data.forEach(user => {
        this.users.push(user);
      });
    })
  }

  getRequests(){
    this.service.getRegistrationRequests().subscribe(data=>{
      this.registrationRequests=[];
      data.forEach(request => {
        this.registrationRequests.push(request);
      });
    }, err => {
      console.log(err);
    })
  }
  getBookRequests(){
    this.service.getBookRequests().subscribe(data=>{
      this.bookRequests=[];
      data.forEach(request => {
        this.bookRequests.push(request);
      });
    }, err => {
      console.log(err);
    })
  }




changeUserType(user: any) {
  let edited=user;
  if (user.userType === 'regUser') {
    edited.userType = "moderator";
  } else {
    edited.userType = "regUser";
  }
  this.service.updateUser(edited).subscribe(res => {

  });
}


acceptRequest(request: any) {
  console.log(request);
  this.service.registerUser(request).subscribe(res => {
    this.ngOnInit();
  });
}

acceptBookRequest(request: any) {
  console.log(request);
  this.service.addBook(request).subscribe(res => {
    this.ngOnInit();
  });
}

deleteRegistrationRequest(request: any) {

  this.service.deleteUserRegistrationRequest(request._id).subscribe(res => {
    let index = 0;
      this.registrationRequests.forEach(element => {
        if (element.id === request.id) {
          this.registrationRequests.splice(index, 1);
        }
        index++;
      });
    this.ngOnInit();
  });
}

deleteBookRequest(request: any) {

  this.service.deleteBookRequest(request._id).subscribe(res => {
    let index = 0;
      this.bookRequests.forEach(element => {
        if (element.id === request.id) {
          this.bookRequests.splice(index, 1);
        }
        index++;
      });
    this.ngOnInit();
  });
}


}
