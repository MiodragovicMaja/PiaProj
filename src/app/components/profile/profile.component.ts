import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { KnjizaraService } from 'src/app/service/knjizara.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username: string;
  user: any;
  book:any;
  oldUser: any;
  editUser: boolean;
  oldBook: any;
  editBook: any;
  photo: File;
  photoURL: string;
  bookRequests: Array<any>;
  loggedUser:any;
  constructor(private route:ActivatedRoute, private router: Router,public service: KnjizaraService) {
    this.editUser = false;
    this.editBook = undefined;
    this.loggedUser= '';
  }

  ngOnInit(): void {

    this.getBookRequests();
    this.username = this.route.snapshot.params['username'];
    this.service.getUserInfo(this.username).subscribe(data => {
      console.log(data)
      this.user = data;
      this.oldUser = data;
      console.log(this.user)
      this.loggedUser= this.service.getUsername();
      console.log(this.loggedUser)

    });
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


  apdateUser(){
    this.service.updateUserProfile(this.user).subscribe(res => {
      this.oldUser = this.user;
      this.editUser = false;

    }, err => {
      console.log(err);
    })
  }

  apdateBookUser(book){
    this.editBook = book;
    this.oldBook = book;
    this.service.updateUserProfile(this.user).subscribe(res => {
      this.oldUser = this.user;
      this.editUser = false;
      this.editBook = undefined;
      this.oldBook = undefined;

    }, err => {
      console.log(err);
    })
  }

  reject(){
    this.editUser = false;
    this.user = this.oldUser;
  }
  edit(){
    this.editUser = true;
    this.oldUser = this.user;}



rejectBook(book:any){
  this.editBook = undefined;
  this.book = this.oldBook;
}
editBookProfile(book:any){
  this.editBook = book;
  this.oldBook = book;}



addComment(book:any){
  this.router.navigate([`/bookPage/${book}`]);
}

changePassword(): void {
  this.router.navigate(['/changepassword']);
}

acceptBookRequest(request: any) {
  console.log(request);
  this.service.addBook(request).subscribe(res => {
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
