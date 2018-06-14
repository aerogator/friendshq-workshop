import { PeopleComponent } from "./people/people.component";
import { DashboardComponent } from "./dashboard/dashboard.component"
import { Routes } from "@angular/router";
import { PersonListComponent } from "./people/person-list/person-list.component";
import { PersonFormComponent } from "./people/person-form/person-form.component";

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'people',
    component: PeopleComponent,
    children: [
      {
        path: '',
        component: PersonListComponent
      },
      {
        path: 'add',
        component: PersonFormComponent
      },

    ]
  },
  {
    path: '**',
    component: PeopleComponent
  },
];
