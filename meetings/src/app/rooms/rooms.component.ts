import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Meeting } from '../models/meeting.model';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent implements OnInit {
  public displayedColumns: string[] = [
    'position',
    'userName',
    'agenda',
    'date',
    'time',
    'room',
  ];
  public dataSource: Meeting[] = [];
  public rooms: string[] = [];
  private selectedRow!: Meeting;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.initializeData();
  }

  public onChange(event: any): void {
    this.selectedRow = event;
    this.dataSource = this.dataService.meetings.filter(
      (meetings) => meetings.room === event.value
    );
  }

  private initializeData(): void {
    this.dataSource = this.dataService.meetings;
    this.rooms = this.dataService.rooms;
    this.dataService.changeNotify.subscribe(() => {
      if (!!this.selectedRow) {
        this.onChange(this.selectedRow);
      } else {
        this.dataSource = this.dataService.meetings;
      }
    });
  }
}
