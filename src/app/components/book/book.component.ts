import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KnjizaraService } from 'src/app/service/knjizara.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  books: Array<any>;
  readingBook: any;
  pages:number;
  pagesRead:number;


  constructor(private router:Router,public service: KnjizaraService) {
    this.books= new Array();
    this.readingBook = undefined;
   }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(){
    this.service.getBooks().subscribe(data=>{
      this.books=[];
      data.forEach(book => {
        this.books.push(book);
      });
    }, err => {
      console.log(err);
    })
  }

  bookPage(book: any){
    this.router.navigate([`/bookPage/${book._id}`])
    console.log(book._id);
  }

  readList(book:any){
    this.service.addToReadList(book.title).subscribe(res=>{

    });
  }
  addToReadingList(book: any){
    this.service.addToReadingList(book._id,this.pages, this.pagesRead).subscribe(res=>{
        this.readingBook = undefined;
        this.pagesRead = 0;
        this.pages = 0;
       });
     }
  readingList(book: any){
    this.readingBook = book;
       }
}
