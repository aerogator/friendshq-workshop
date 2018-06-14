import { Component, OnInit } from '@angular/core';
import { Friend } from '../../../shared/friend.model';
import { FriendsService } from '../../shared/friends.service';

@Component({
  selector: 'app-person-list',
  templateUrl: 'person-list.component.html',
  styleUrls: ['./person-list.component.css']

})

export class PersonListComponent implements OnInit {
  displayBanner = false;

  friends = [
    {
      "id": 1,
      "firstName": "Michelle",
      "lastName": "Mulroy",
      "gender": "female",
      "fav": true
    },
    {
      "id": 2,
      "firstName": "Venkat",
      "lastName": "Subramanian",
      "gender": "male",
      "fav": true
    },
    {
      "id": 3,
      "firstName": "Matt",
      "lastName": "Forsythe",
      "gender": "none",
      "fav": false
    },
    {
      "id": 4,
      "firstName": "Nate",
      "lastName": "Schutta",
      "gender": "male",
      "fav": true
    }
  ];

  constructor(private friendsService: FriendsService) { }

  ngOnInit() {
    this.friendsService.getFriends()
      .subscribe(friends => this.friends = friends);
  }

  handleNotify(friend: Friend) {
    this.friendsService.saveFriend(friend).subscribe(resp => {
      //console.log(resp);
      this.displayBanner = true;
      setTimeout(() => {
        this.displayBanner = false;
      }, 3000);
    });


  }
}
