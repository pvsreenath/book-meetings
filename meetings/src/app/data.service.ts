import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './models/user.model';
import { Meeting } from './models/meeting.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public user: User = {
    userName: 'Leo',
    password: 'Password123',
  };
  public changeNotify = new Subject();
  public rooms: string[] = ['1', '2', '3', '4', '5', '6'];
  public meetings: Meeting[] = [];

  constructor() {}
}
