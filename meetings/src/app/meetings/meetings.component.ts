import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css'],
})
export class MeetingsComponent implements OnInit {
  constructor(private dataService: DataService, private cd: ChangeDetectorRef) {}



  ngOnInit(): void {
    this.dataService.changeNotify.subscribe(() => {
      this.dataSource = this.dataService.meetings;
      this.cd.detectChanges()
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
  deleteMeeting(row: any) {
    this.dataService.meetings = this.dataService.meetings.filter(
      (meeting) =>
        !(
          meeting.room === row.room &&
          meeting.date == row.date &&
          meeting.startTime === row.startTime
        )
    );
    this.dataSource = this.dataService.meetings;
    this.dataService.changeNotify.next();
  }
}
