import { Injectable } from '@angular/core';
import { User } from './models/user.model';
import { Meeting } from './models/meeting.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}
  user: User = {
    userName: 'Leo',
    password: 'Password123',
  };

  changeNotify = new Subject();

  rooms: string[] = ['1', '2', '3', '4', '5', '6'];

  meetings: Meeting[] = [];
}
