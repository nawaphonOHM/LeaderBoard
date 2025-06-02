import { Component } from '@angular/core';
import {DashboardTableData} from '../interfaces/dashboard-table-data';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {FulNamePipe} from '../pipes/fulName-pipe';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-dashboard-table',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    FulNamePipe,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    NgOptimizedImage
    MatSort
  ],
  templateUrl: './dashboard-table.html',
  styleUrl: './dashboard-table.scss'
})
export class DashboardTable {
  @ViewChild(MatSort) sort: MatSort | null = null;

  protected columnDefs = ['no', 'fullName', 'nationality', 'timeUsedInMillisecond'];

  protected data: DashboardTableData[] = [
    {
      firstName: 'John',
      lastName: 'Doe',
      nationalityUrlImage: 'https://flagsapi.com/US/flat/32.png',
      timeUsedInMillisecond: 1000
    },
  ]

  protected sortedData = new MatTableDataSource(this.data);

}
