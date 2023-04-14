import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from '../service/user.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  updateUser: User;
  contactForm: any;
  id: number;
  editMode :boolean;
  submitted = false;
  updateUserId:number;
user: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.editMode=this.userService.getEditMode();
    this.initForm();
    this.updateUserId=this.userService.getUpdateId();
    this.userService.getDirectory(this.updateUserId).subscribe((data)=>{
      this.updateUser=data;
      console.log(this.updateUser);
      this.id=this.updateUser.directoryId;})
  }

  initForm() {
    let contactName = '';
    let phoneDetails = new FormArray([]);
    let emailsDetails = new FormArray([]);
    let addressDetails = new FormArray([]);

    this.contactForm = new FormGroup({
      fullName: new FormControl(contactName, Validators.required),
      contacts: phoneDetails,
      emails: emailsDetails,
      addresses: addressDetails,
    });


    if(this.editMode){
      this.updateUserId=this.userService.getUpdateId();
      this.userService.getDirectory(this.updateUserId).subscribe((data)=>{
        this.updateUser=data;
        console.log(this.updateUser);

        this.id=this.updateUser.directoryId;
        contactName = this.updateUser.fullName;

      // add existing phone details to the form
      if(this.updateUser['contacts']){
        for(let contact of this.updateUser.contacts){
          const newContact = new FormGroup({
            'type': new FormControl(contact.type, Validators.required),
            'no': new FormControl(contact.no, [
              Validators.required,
              Validators.minLength(10),
              Validators.pattern('[0-9 ]{10}'),
            ])
          });
          (<FormArray>this.contactForm.get('contacts')).push(newContact);
        }
      }

      // add existing email details to the form
      if (this.updateUser.emails) {
        for (let email of this.updateUser.emails) {
          const newEmail = new FormGroup({
            'type': new FormControl(email.type, Validators.required),
            'email': new FormControl(email.email, [
              Validators.required,
              Validators.email,
            ])
          });
          (<FormArray>this.contactForm.get('emails')).push(newEmail);
        }
      }

       // add existing address details to the form
       if (this.updateUser.addresses) {
        for (let address of this.updateUser.addresses) {
          const newAddress = new FormGroup({
            'city': new FormControl(address.city, Validators.required),
            'state': new FormControl(address.state, Validators.required),
            'zipcode': new FormControl(address.zipcode, [
              Validators.required,
              Validators.minLength(5),
              Validators.maxLength(5),
              Validators.pattern('[0-9]{5}'),
            ])
          });
          (<FormArray>this.contactForm.get('addresses')).push(newAddress);
        }
      }});
    }


  }

  onBack() {
    this.router.navigate(['users']);
  }

  addPhoneDetails() {
    (<FormArray>this.contactForm.get('contacts')).push(
      new FormGroup({
        type: new FormControl(null, Validators.required),
        no: new FormControl(null, [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern('[0-9 ]{10}'),
        ])
      })
    );
  }

  addEmailDetails() {
    (<FormArray>this.contactForm.get('emails')).push(
      new FormGroup({
        type: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
      })
    );
  }

  addAddressDetails() {
    (<FormArray>this.contactForm.get('addresses')).push(
      new FormGroup({
        city: new FormControl(null, Validators.required),
        state: new FormControl(null, Validators.required),
        zipcode: new FormControl(null, [Validators.required]),
      })
    );
  }

  removePhoneDetails(index: number) {
    (<FormArray>this.contactForm.get('contacts')).removeAt(index);
  }

  removeAddressDetails(index: number) {
    (<FormArray>this.contactForm.get('addresses')).removeAt(index);
  }

  removeEmailDetails(index: number) {
    (<FormArray>this.contactForm.get('emails')).removeAt(index);
  }

  get f() {
    return this.contactForm.controls;
  }
  get email() {
    return this.contactForm.get('email');
  }

  onSubmit(data: any) {
    this.submitted = true;
    if (this.contactForm.invalid) {
      return;
    }

    if (confirm('Are you sure you want to add contact?')) {
      this.userService.saveDirectory(data).subscribe((data) => {
        this.contactForm.reset();
        this.submitted = false;
        this.router.navigate(['users']);
      });
    } else {
      return;
    }
  }

  onUpdate(data:any){
    console.log(data);
    this.userService.updateDirectory(this.id,data).subscribe((data)=>{
      this.router.navigate(['users']);
    })


    return;
  }

  backToContacts() {
    this.router.navigate(['users']);
  }

}
