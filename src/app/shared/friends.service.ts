import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import {
  Observable,
} from 'rxjs/Observable';
import {
  Friend,
} from "../../shared/friend.model";

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(private httpClient: HttpClient) { }

  getFriends(): Observable<Friend[]> {
    return this.httpClient.get<Friend[]>('http://localhost:3000/friends');
  }

  saveFriend(friend: Friend): Observable<Friend> {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });

    return this.httpClient.put<Friend>(`http://localhost:3000/friends/${friend.id}`, friend, { headers: headers });

  }

  addFriend(friend: Friend): Observable<Friend> {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });

    console.log(`in addFriend ${JSON.stringify(friend)}`);

    return this.httpClient.post<Friend>(`http://localhost:3000/friends/`, friend, { headers: headers });

  }
}
