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
import { Address } from '../service/address.model';
import { Contact } from '../service/contact.model';
import { Email } from '../service/email.model';
import { User } from '../service/user.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  directory: User;
  updateEmail:Email[];
  updateContact:Contact[];
  updateAddress:Address[];
  createsAt:string;
  contactForm: any;
  id: number;
  editMode :boolean;
  submitted = false;
  directoryId:number;
user: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.editMode=this.userService.getEditMode();
    console.log("---after init");
    console.log(this.editMode);

    this.initForm();
    if(!this.editMode){
      this.contactForm.reset();
    }

    // if(this.editMode){
    // this.directoryId=this.userService.getUpdateId();
    // this.userService.getDirectory(this.directoryId).subscribe((data)=>{
    //   this.directory=data;
      // this.initForm();
    //   console.log(this.directory);
    //   this.updateAddress=data.addresses;
    //   this.updateContact=data.contacts;
    //   this.updateEmail=data.emails;

    //   this.id=this.directory.directoryId;});}

  }

  initForm() {
    let contactName = this.directory?this.directory.fullName:'';
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
      this.directoryId=this.userService.getUpdateId();
      this.userService.getDirectory(this.directoryId).subscribe((data)=>{
        this.directory=data;

        console.log(this.directory);

        this.updateAddress=data.addresses;
        this.updateContact=data.contacts;
        this.updateEmail=data.emails;
        this.id=this.directory.directoryId;


      // add existing phone details to the form
      if(this.directory['contacts']){
        for(let contact of this.directory.contacts){
          const newContact = new FormGroup({
            'contactId': new FormControl(contact.contactId),
            'directoryId': new FormControl(this.id),
            'type': new FormControl('', Validators.required),
            'no': new FormControl('', [
              Validators.required,
              Validators.minLength(10),
              Validators.pattern('[0-9 ]{10}'),
            ])
          });
          (<FormArray>this.contactForm.get('contacts')).push(newContact);
        }
      }

      // add existing email details to the form
      if (this.directory.emails) {
        for (let email of this.updateEmail) {
          const newEmail = new FormGroup({
            'emaiId': new FormControl(email.emaiId),
            'directory': new FormControl(this.id),
            'type': new FormControl('', Validators.required),
            'email': new FormControl('', [
              Validators.required,
              Validators.email,
            ])
          });
          (<FormArray>this.contactForm.get('emails')).push(newEmail);
        }
      }

       // add existing address details to the form
       if (this.directory.addresses) {
        for (let address of this.directory.addresses) {
          const newAddress = new FormGroup({
            'addressId': new FormControl(address.addressId),
            'directory': new FormControl(this.id),
            'city': new FormControl('', Validators.required),
            'state': new FormControl('', Validators.required),
            'zipcode': new FormControl('', [
              Validators.required,
              Validators.minLength(5),
              Validators.maxLength(5),
              Validators.pattern('[0-9]{5}'),
            ])
          });
          (<FormArray>this.contactForm.get('addresses')).push(newAddress);
        }
      }
     }  );

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
    console.log("--------addEmail pressed");

    (<FormArray>this.contactForm.get('emails')).push(
      new FormGroup({
        type: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
      })
    );
    console.log("--------addEmail pressed");

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
    this.userService.updateDirectory(data,this.id).subscribe((data)=>{
      this.router.navigate(['users']);
    });
    this.editMode=false;
    this.userService.setEditMode(this.editMode);
    this.editMode=this.userService.getEditMode();
    console.log("---after update");
    console.log(this.editMode);


    // this.contactForm.reset();
    this.contactForm.reset();
    return;
  }

  backToContacts() {
    this.editMode=false;
    this.userService.setEditMode(this.editMode);
    this.editMode=this.userService.getEditMode();
    console.log("--------------on back to contact");
    console.log(this.editMode);
    this.contactForm.reset();
    this.router.navigate(['users']);
  }

}
