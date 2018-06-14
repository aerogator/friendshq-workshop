import { Pipe, PipeTransform } from '@angular/core';
import { Friend } from '../../../shared/friend.model';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(friend: Friend, args?: any): any {
    let delim = (args) ? args : ' ';
    return `${friend.firstName}${delim}${friend.lastName}`;
  }

}
