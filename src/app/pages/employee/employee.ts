import { Component, inject, OnInit } from '@angular/core';
import { ApiResponseModel, EmployeeModel } from '../../models/Employee.model';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee',
  imports: [FormsModule],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class Employee implements OnInit {

  employeeObj: EmployeeModel = new EmployeeModel();
  http = inject(HttpClient);
  employeeList: EmployeeModel[] = [];
  filteredEmployeeList: EmployeeModel[] = [];
  searchText: string = '';

  ngOnInit(): void {
    this.getAllEmployees();
  }

  onSaveEmployee() {
    console.log(this.employeeObj);
    let newEmployeeObj = {
      empName: this.employeeObj.empName,
      contactNo: this.employeeObj.contactNo,
      email: this.employeeObj.email,
      deptName: this.employeeObj.deptName,
      designation: this.employeeObj.designation,
      createdDate: this.employeeObj.createdDate.toISOString(),
      userName: this.employeeObj.userName,
      password: this.employeeObj.password,
      sickLeaveBalance: this.employeeObj.sickLeaveBalance,
      paidLeaveBalance: this.employeeObj.paidLeaveBalance,
      role: this.employeeObj.role
    }
    console.log('Prepared Employee Object: ', newEmployeeObj);
    this.http.post<ApiResponseModel>('https://api.freeprojectapi.com/api/LeaveTracker/CreateNewEmployee', newEmployeeObj).subscribe({
      next: (res: ApiResponseModel) => {
        debugger;
        console.log('Employee saved successfully', res);
        alert(res.message);
        this.getAllEmployees();
      },
      error: (err) => {
        debugger;
        if (err && err.status) {
          console.error('Status:', err.status, 'Response:', err.error ?? err);
          alert("Error from API: " + err.error.message);
        }
      }
    });
  }

  getAllEmployees() {
    this.http.get<EmployeeModel[]>('https://api.freeprojectapi.com/api/LeaveTracker/getAllEmployee').subscribe({
      next: (res: EmployeeModel[]) => {
        console.log('Employees fetched successfully', res);
        this.employeeList = res;
        this.filteredEmployeeList = res;
      },
      error: (error: any) => {
        console.error('Error fetching employees', error.message);
      }
    })
  }

  onSearchEmployee() {
    if (!this.searchText.trim()) {
      this.filteredEmployeeList = this.employeeList;
      return;
    }

    const searchLower = this.searchText.toLowerCase();
    this.filteredEmployeeList = this.employeeList.filter(emp => 
      emp.empName?.toLowerCase().includes(searchLower) ||
      emp.email?.toLowerCase().includes(searchLower) ||
      emp.deptName?.toLowerCase().includes(searchLower) ||
      emp.contactNo?.toLowerCase().includes(searchLower)
    );
  }

  onClearSearch() {
    this.searchText = '';
    this.filteredEmployeeList = this.employeeList;
  }

  onEdit(emp: EmployeeModel) {
    this.employeeObj = emp;
  }

  onUpdateEmployee() {
    this.http.put<ApiResponseModel>('https://api.freeprojectapi.com/api/LeaveTracker/UpdateEmployee?id=' + this.employeeObj.empId, this.employeeObj).subscribe({
      next: (res: ApiResponseModel) => {
        console.log('Employee updated successfully', res);
        alert(res.message);
        this.getAllEmployees();
      },
      error: (err) => {
        console.error('Error updating employee', err.message);
        alert("Error from API: " + err.error.message);
      }
    })
  }

  onDelete(employeeId: number) {
    debugger;
    const isConfirm = confirm("Are you sure you want to delete this employee?");
    if (!isConfirm) return;
    this.http.delete<ApiResponseModel>('https://api.freeprojectapi.com/api/LeaveTracker/DeleteEmployee?id=' + employeeId).subscribe({
      next: (res: ApiResponseModel) => {
        console.log('Employee updated successfully', res);
        alert(res.message);
        this.getAllEmployees();
      },
      error: (err) => {
        console.error('Error updating employee', err.message);
        alert("Error from API: " + err.error.message);
      }
    })
  }
}
