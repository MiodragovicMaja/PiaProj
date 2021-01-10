import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { KnjizaraService } from 'src/app/service/knjizara.service';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {
  constructor(private service: KnjizaraService) { }

  ngOnInit(): void {
  }


  registrationForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    authors: new FormControl('', Validators.required),
    genres: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });


  newBook(): void {


    const newBook = {
      title: this.registrationForm.value.title,
      authors: this.registrationForm.value.authors,
      date: this.registrationForm.value.date,
      genres: this.registrationForm.value.genres,
      description: this.registrationForm.value.description
    };
    this.service.newBook(newBook).subscribe(data => {
      this.registrationForm.reset();
    },
      err => { console.log(err); });
    this.registrationForm.reset();
  }

}
