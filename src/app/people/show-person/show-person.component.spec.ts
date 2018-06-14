import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPersonComponent } from './show-person.component';
import { FullNamePipe } from '../../people/shared/full-name.pipe';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Gender } from '../../people/shared/gender.enum';
import { Friend } from "../../../shared/friend.model";
import { freemem } from 'os';

fdescribe('ShowPersonComponent', () => {
  let component: ShowPersonComponent;
  let fixture: ComponentFixture<ShowPersonComponent>;
  let nameDisplayEl: DebugElement;
  let favEl: DebugElement;
  let friend: Friend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShowPersonComponent,
        FullNamePipe,
      ]
    });

    friend = {
      'id': 1,
      'firstName': 'Michelle',
      'lastName': 'Mulroy',
      'gender': Gender.Female,
      'fav': true
    };

    fixture = TestBed.createComponent(ShowPersonComponent);
    component = fixture.componentInstance;

    nameDisplayEl = fixture.debugElement.query(By.css("h5.mb-1"));
    favEl = fixture.debugElement.query(By.css("span.fa"));
  });

  it('should be created', () => {
    expect(component).toBeDefined();
  });

  it('should run the like method', () => {
    component.friend = friend;

    let expectedFav = !friend.fav;
    expect(component.like).toBeDefined();

    component.like();

    expect(component.friend.fav).toBe(expectedFav);

  });

  it('should emit notify event', (done) => {
    component.friend = friend;
    component.notify.subscribe(g => {
      expect(g).toEqual(component.friend);
      done();
    });
    component.like();
  });

  it('should display the full name', () => {
    component.friend = friend;
    fixture.detectChanges();
    expect(nameDisplayEl.nativeElement.textContent).toContain('Michelle Mulroy');

  });

  it('should un-like the friend when clicked on', (done) => {
    let updatedFriend;
    component.friend = friend;
    fixture.detectChanges();
    expect(nameDisplayEl.nativeElement.textContent).toContain('Michelle Mulroy');
    expect(favEl.classes.fa).toBe(true);
    expect(favEl.classes["fa-heart"]).toBe(true);
    expect(favEl.classes["fa-heart-o"]).toBe(undefined);

    component.notify.subscribe(f => {
      updatedFriend = f;
      done();
    });

    favEl.triggerEventHandler('click', null);
    expect(updatedFriend.fav).toBe(false);
    // expect(favEl.classes.fa).toBe(true);
    // expect(favEl.classes["fa-heart"]).toBe(true);
    // expect(favEl.classes["fa-heart-o"]).toBe(true);
    // expect(component.friend.fav).toBe(false);

    // click it again
    favEl.triggerEventHandler('click', null);
    expect(updatedFriend.fav).toBe(true);
  });
});
