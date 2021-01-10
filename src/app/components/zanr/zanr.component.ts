import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { KnjizaraService } from 'src/app/service/knjizara.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-zanr',
  templateUrl: './zanr.component.html',
  styleUrls: ['./zanr.component.css']
})
export class ZanrComponent implements OnInit {

  constructor(private service: KnjizaraService) { }

  ngOnInit(): void {
  }

  zanrForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),})

    newGenre(): void {


      const newZanr = {
        name: this.zanrForm.value.name,
      };
      this.service.newZanr(newZanr).subscribe(data => {
        this.zanrForm.reset();
      },
        err => { console.log(err); });
      this.zanrForm.reset();
    }

}
