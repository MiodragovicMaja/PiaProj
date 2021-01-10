import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KnjizaraService } from 'src/app/service/knjizara.service';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit {

  bookId :any;
  book: any;
  tip:any;
  oldBook: any;
  editBook: boolean;

  commnetText:string;

  constructor(private route:ActivatedRoute, public service: KnjizaraService) {
    this.commnetText= '';
    this.tip= this.service.getUserType();

   }

  ngOnInit(): void {
    this.bookId = this.route.snapshot.params['id'];
    console.log(this.bookId);
    this.getBook();

  }

  apdateBookUser(book){
    this.editBook = book;
    this.oldBook = book;
    this.service.updateBookProfile(this.book).subscribe(res => {

      this.editBook = undefined;
      this.oldBook = undefined;

    }, err => {
      console.log(err);
    })
  }

  reject(){
    this.editBook = false;

  }
  edit(){
    this.editBook = true;
    this.oldBook = this.book;}

  getBook(){
    this.service.getBook(this.bookId).subscribe(ress => {
      console.log(ress)
      this.book = ress;
    });
  }


  imaKomentar(){
    for(let i = 0; i < this.book.nizKomentara.length; i++){
      if(this.book.nizKomentara[i].username === this.service.getUsername()){
        return true;
      }
    }
    return false;
  }

  comment(){
    this.service.comment(this.bookId, this.service.getUsername(), this.commnetText).subscribe(ress => {
      this.ngOnInit();
    });
  }
}
