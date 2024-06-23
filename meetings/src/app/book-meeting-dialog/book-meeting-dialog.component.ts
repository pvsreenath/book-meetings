import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { Meeting } from '../models/meeting.model';

@Component({
  selector: 'app-book-meeting-dialog',
  templateUrl: './book-meeting-dialog.component.html',
  styleUrls: ['./book-meeting-dialog.component.css'],
})
export class BookMeetingDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<BookMeetingDialogComponent>,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private cd: ChangeDetectorRef
  ) {}

  meetingForm!: FormGroup;
  rooms: string[] = [];
  timeError = false;
  roomSearch = false;

  ngOnInit(): void {
    this.meetingForm = this.formBuilder.group({
      userName: [null, [Validators.required]],
      date: [null, [Validators.required]],
      startTime: [null, [Validators.required]],
      endTime: [null, [Validators.required]],
      room: [null, [Validators.required]],
      agenda: [null, [Validators.required]],
    });
    this.meetingForm.controls.userName.setValue(this.dataService.user.userName);
    this.rooms = this.dataService.rooms;
  }

  onSubmit() {
    if (this.durationInMinutes() < 30) {
      this.timeError = true;
    } else {
      const meetings: Meeting[] = [...this.dataService.meetings];
      meetings.push(this.meetingForm.value);
      this.dataService.meetings = meetings;
      this.dataService.changeNotify.next();
      this.dialogRef.close();
    }
  }

  durationInMinutes(): number {
    const [startHours, startMinutes] = this.meetingForm.value.startTime
      .split(':')
      .map(Number);
    const [endHours, endMinutes] = this.meetingForm.value.endTime
      .split(':')
      .map(Number);
    if (startHours < 9 || endHours > 18) {
      return 0;
    }
    const startDate = new Date();
    startDate.setHours(startHours, startMinutes);
    const endDate = new Date();
    endDate.setHours(endHours, endMinutes);

    console.log(endDate.getTime(), ',', startDate.getTime());
    // getTime() will return time in milliseconds hennce dividing the difference it by 60000 to get in in mins
    const duration = (endDate.getTime() - startDate.getTime()) / 60000;
    return duration;
  }

  // areDatesEqual(date1: Date, date2: Date): boolean {
  //   return (
  //     date1.getFullYear() === date2.getFullYear() &&
  //     date1.getMonth() === date2.getMonth() &&
  //     date1.getDate() === date2.getDate()
  //   );
  // }
  onClose() {
    this.dialogRef.close();
  }

  searchRooms() {
    this.roomSearch = !this.roomSearch;
    this.cd.detectChanges();
  }
}
