import { Component, Input, OnInit } from '@angular/core';
import { User } from './service/user.model';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  users:User[] | undefined;
  @Input() editMode:number;

}
