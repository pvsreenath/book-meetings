import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { User } from '../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { BookMeetingDialogComponent } from '../book-meeting-dialog/book-meeting-dialog.component';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {

  user!: User

  constructor(private dataService: DataService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.user = this.dataService.user
  }

  openBookMeetingDialog(){
    const dialogRef = this.dialog.open(BookMeetingDialogComponent, {
      width: '750px',
    })
    dialogRef.afterClosed().subscribe((data)=>{
      console.log(data)
    })
  }
}
