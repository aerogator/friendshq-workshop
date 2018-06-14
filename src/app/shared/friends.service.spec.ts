import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Friend } from "../../shared/friend.model";
import { FriendsService } from './friends.service';
import { Gender } from '../people/shared/gender.enum';

describe('FriendsService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let friendsService: FriendsService;
  let friend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        FriendsService,
      ],
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    friendsService = TestBed.get(FriendsService);

    friend = {
      'id': 1,
      'firstName': 'Michelle',
      'lastName': 'Mulroy',
      'gender': Gender.Female,
      'fav': true
    };
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  describe('#construction', () => {
    it('should be created', () => {
      expect(friendsService).toBeDefined();
    });
  });

  describe('#getFriends', () => {
    it('should get all friends', () => {
      const expectedFriends: Friend[] = [friend];

      friendsService.getFriends()
        .subscribe(data => {
          expect(data).toEqual(expectedFriends);
        });

      const req = httpTestingController.expectOne(`http://localhost:3000/friends`);

      expect(req.request.method).toEqual('GET');
      req.flush(expectedFriends);
    });
  });

  describe('#saveFriend', () => {
    it('should save a friend', () => {
      let alteredFriend = {
        'id': 1,
        'firstName': 'Felicity',
        'lastName': 'Hudson',
        'gender': Gender.Female,
        'fav': true
      };

      friendsService.saveFriend(alteredFriend).subscribe(data => {
        expect(data).toEqual(alteredFriend);
      });

      const req = httpTestingController.expectOne(`http://localhost:3000/friends/${alteredFriend.id}`);
      expect(req.request.method).toEqual('PUT');

      req.flush(alteredFriend);
    });
  });

  describe('#addFriend', () => {
    it('should add a friend', () => {
      let alteredFriend = {
        'id': 100,
        'firstName': 'Felicity',
        'lastName': 'Hudson',
        'gender': Gender.Female,
        'fav': true
      };

      friendsService.addFriend(alteredFriend).subscribe(data => {
        expect(data).toEqual(alteredFriend);
      });

      const req = httpTestingController.expectOne(`http://localhost:3000/friends/`);
      expect(req.request.method).toEqual('POST');

      req.flush(alteredFriend);
    });
  });

});
