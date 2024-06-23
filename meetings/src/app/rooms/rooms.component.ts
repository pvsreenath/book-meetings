import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent implements OnInit {
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.changeNotify.subscribe(() => {
      if (!!this.selectedRow) {
        this.onChange(this.selectedRow);
      } else {
        this.dataSource = this.dataService.meetings;
      }
    });
  }
  displayedColumns: string[] = [
    'position',
    'userName',
    'agenda',
    'date',
    'time',
    'room',
  ];
  dataSource = this.dataService.meetings;
  rooms = this.dataService.rooms;
  selectedRow!: any;

  onChange(event: any) {
    this.selectedRow = event;
    this.dataSource = this.dataService.meetings.filter(
      (meetings) => meetings.room === event.value
    );
  }
}
