import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../service/master-service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-leave-balance',
  imports: [FormsModule, DatePipe, AsyncPipe],
  templateUrl: './leave-balance.html',
  styleUrl: './leave-balance.css',
})
export class LeaveBalance implements OnInit {

  allEmployeeList$: Observable<any[]> = new Observable<any[]>;
  constructor() {
    this.allEmployeeList$ = this.masterService.getAllEmployees();
    const localData = localStorage.getItem('leaveUser');
    if (localData!=null) {
      const parse = JSON.parse(localData);
      this.newLeaveObj.updateBy = parse.empId;
    }
  }
  ngOnInit(): void {
    this.getAllLeaves();
  }

  masterService = inject(MasterService);
  newLeaveObj: any = {
    "balanceId": 0,
    "empId": 0,
    "updatedDate": new Date(),
    "count": 0,
    "updateBy": 0,
    "leaveType": ""
  }

  @ViewChild("formModel") formModelViewChild!: ElementRef;
  modal: any;

  openModel() {
    if (this.formModelViewChild) {
      this.formModelViewChild.nativeElement.style.display = 'block';
    }
  }

  closeModel() {
    if (this.formModelViewChild) {
      this.formModelViewChild.nativeElement.style.display = 'none';
    }
  }

  leaveBalanceList: any[] = [];
  getAllLeaves() {
    this.masterService.getAllLeave().subscribe({
      next: (res: any[]) => {
        console.log(res);
        this.leaveBalanceList = res;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  onSaveBalance() {
    // console.log("New Leave Object: ", this.newLeaveObj);
    // const newDate = new Date(this.newLeaveObj.updatedDate);
    // const formatted = newDate.toISOString();
    // console.log(formatted);
    this.masterService.onAddLeave(this.newLeaveObj).subscribe({
      next: (result: any) => {
        alert("Leave balance added successfully");
        this.getAllLeaves();
      },
      error: (err: any) => {
        console.log(err);
        alert("Error while adding leave balance");
      }
    })
  }

}
