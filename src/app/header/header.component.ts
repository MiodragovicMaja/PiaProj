import {Component} from '@angular/core'
import { KnjizaraService } from '../service/knjizara.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})
export class HeaderComponent{


  constructor(public service: KnjizaraService) { }

}
