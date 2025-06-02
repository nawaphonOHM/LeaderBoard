import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {DashboardTableData} from '../interfaces/dashboard-table-data';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {FulNamePipe} from '../pipes/fulName-pipe';
import {NgOptimizedImage} from '@angular/common';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {TimeMinSecondMilliSecondPipe} from '../pipes/time-min-second-milli-second-pipe';

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
    NgOptimizedImage,
    MatSortHeader,
    MatSort,
    TimeMinSecondMilliSecondPipe
  ],
  templateUrl: './dashboard-table.html',
  styleUrl: './dashboard-table.scss'
})
export class DashboardTable implements AfterViewInit{
  @ViewChild(MatSort) sort: MatSort | null = null;

  protected readonly columnDefs = ['no', 'fullName', 'nationality', 'timeUsedInMillisecond'];

  protected readonly data: DashboardTableData[] = [
    {
      firstName: 'Nawaphon',
      lastName: 'Isarathanachaikul',
      nationalityUrlImage: 'https://flagsapi.com/TH/flat/32.png',
      timeUsedInMillisecond: 9000
    },
    {
      firstName: 'John',
      lastName: 'Doe',
      nationalityUrlImage: 'https://flagsapi.com/US/flat/32.png',
      timeUsedInMillisecond: 1000
    },
  ]

  protected readonly sortedData = new MatTableDataSource(this.data);

  constructor(readonly changeDetectorRef: ChangeDetectorRef) {}


  ngAfterViewInit(): void {
    this.sortedData.sort = this.sort;
    this.sortedData.sort?.sort({
      id: 'timeUsedInMillisecond',
      start: 'asc',
      disableClear: true
    })

    this.changeDetectorRef.detectChanges();
  }

}
