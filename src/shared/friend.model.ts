import { Gender } from "../app/people/shared/gender.enum";

export interface Friend {
  id: number,
  firstName: string,
  lastName: string,
  gender: Gender,
  fav: boolean
}
