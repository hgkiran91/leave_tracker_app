import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterService } from '../../service/master-service';
import { DatePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-leave-request',
  imports: [FormsModule, DatePipe, UpperCasePipe],
  templateUrl: './leave-request.html',
  styleUrl: './leave-request.css',
})
export class LeaveRequest implements OnInit {

  ngOnInit(): void {
    this.loadLeaveRequestByEmp();
  }

  leaveRequests: any[] = [];

  newLeaveRequest: any = {
    "leaveId": 0,
    "empId": 0,
    "leaveDate": new Date(),
    "fromDate": "",
    "toDate": "",
    "reason": "",
    "leaveType": ""
  }

  masterService = inject(MasterService);

  constructor() {
    const localData = localStorage.getItem('leaveUser');
    if (localData != null) {
      const parse = JSON.parse(localData);
      this.newLeaveRequest.empId = parse.empId;
    }
  }

  loadLeaveRequestByEmp() {
    this.masterService.getLeaveRequestByEmployeeID(this.newLeaveRequest.empId).subscribe({
      next: (result: any) => {
        this.leaveRequests = result;
        console.log('Leave requests loaded:', this.leaveRequests);
      }, error: (error: any) => {
        console.log('Error fetching leave requests:', error);
      }
    })
  }

  onSaveLeave() {
    this.masterService.onAddLeaveRequest(this.newLeaveRequest).subscribe({
      next: (response: any) => {
        console.log('Leave request saved successfully:', response);
        alert('Leave request submitted successfully!');
      },
      error: (error: any) => {
        console.error('Error occurred while saving leave request:', error);
      }
    })
  }

}
