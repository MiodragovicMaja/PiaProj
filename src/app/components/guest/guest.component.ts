import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KnjizaraService } from 'src/app/service/knjizara.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {
  books: Array<any>;
  booksOriginal: Array<any>;
  events: Array<any>;
  filter:string;
  zanrovi: Array<any>;
  zanr: string;
  options: any;
  tip:any;

  constructor(private router:Router, private service:KnjizaraService) {
    this.books= new Array();
    this.booksOriginal= new Array();
    this.zanrovi= new Array();
    this.events= new Array();
    this.filter = '';
    this.zanr= '';
    this.tip=this.service.getUserType();
  }

  ngOnInit(): void {
    this.getBooks();
    this.getZanrovi();
    this.getEvents();
  }

  searchTitle(){
    this.books = this.service.filterByTitle(this.filter, this.books)
  }
  searchGenre(){
    console.log(this.zanr);
    this.books = this.service.filterByGenre(this.zanr, this.books)

  }
  searchAuthors(){
    this.books = this.service.filterByAuthor(this.filter, this.books)
  }

  getEvents() {
    this.service.getEvents().subscribe(data=>{
      this.events=[];
      data.forEach(event => {
        console.log(event);
        console.log(event.dateTo);
        if(new Date(event.dateTo).getTime() > new Date().getTime()) {
          this.events.push(event);
        }
      });
    }, err => {
      console.log(err);
    })
  }

  getZanrovi() {
    this.service.getZanrovi().subscribe(data=>{
      this.zanrovi=[];
      data.forEach(book => {
        this.zanrovi.push(book);
      });
    }, err => {
      console.log(err);
    })
  }

  getBooks(){
    this.service.getBooks().subscribe(data=>{
      this.booksOriginal=[];
      data.forEach(book => {
        this.booksOriginal.push(book);
      });
      this.books = this.booksOriginal;
    }, err => {
      console.log(err);
    })
  }

  bookPage(book: any){
    this.router.navigate([`/bookPage/${book._id}`])
    console.log(book._id);
  }

  clearFilters(){
    this.books = this.booksOriginal;

  }


}
