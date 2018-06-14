import { Component, OnInit } from '@angular/core';
import { Friend } from '../../../shared/friend.model';
import { Gender } from '../shared/gender.enum';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FriendsService } from '../../shared/friends.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {

  model: Friend = { id: 5, firstName: 'Erik', lastName: 'Hudson', gender: Gender.Male, fav: true };

  // addNewPersonForm = new FormGroup({
  //   firstName: new FormControl(this.model.firstName, [Validators.required]),
  //   lastName: new FormControl(this.model.lastName, [Validators.required]),
  //   gender: new FormControl(this.model.gender, [Validators.required]),
  //   fav: new FormControl(this.model.fav, [Validators.required]),
  //   id: new FormControl(this.model.id, [Validators.required]),
  // });

  addNewPersonForm: FormGroup = null;

  genders = Gender;

  constructor(private router: Router, private fb: FormBuilder, private friendService: FriendsService) { }

  ngOnInit() {
    this.addNewPersonForm = this.fb.group({
      id: [this.model.id, [Validators.required]],
      firstName: [this.model.firstName, [Validators.required]],
      lastName: [this.model.lastName, [Validators.required]],
      gender: [this.model.gender, [Validators.required]],
      fav: [this.model.fav, [Validators.required]],
    })
  }

  onSubmit() {
    console.log("In onSubmit");
    console.log(this.model);
    // Only form has the changed data
    console.log(this.addNewPersonForm.controls.lastName.value);
    let response = this.friendService.addFriend(this.addNewPersonForm.value).subscribe(resp => {
      console.log(resp);
      this.router.navigate(['/people']);
    });
    console.log(response);

  }
}
