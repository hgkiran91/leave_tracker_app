import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../service/master-service';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [UpperCasePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  employeeId: number = 0;
  leaveBalanceData: any = {};
  masterService = inject(MasterService);

  ngOnInit(): void {
    this.getLeaveBalanceData();
  }

  constructor() {
    const localData = localStorage.getItem('leaveUser');
    if (localData != null) {
      const parse = JSON.parse(localData);
      this.employeeId = parse.empId;
    }
  }

  getLeaveBalanceData() {
    this.masterService.getLeaveBalanceByEmpID(this.employeeId).subscribe({
      next: (result: any) => {
        this.leaveBalanceData = result;
      },
      error: (error: any) => {
        console.log('Error fetching leave balance data:', error);
      }
    })
  }

}
