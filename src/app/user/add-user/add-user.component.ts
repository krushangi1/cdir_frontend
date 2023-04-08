import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit{
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

  }
  onSubmit(){}
}
