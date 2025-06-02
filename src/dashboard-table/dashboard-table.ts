import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, ViewChild} from '@angular/core';
import {DashboardTableData} from '../interfaces/dashboard-table-data';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {FulNamePipe} from '../pipes/fulName-pipe';
import {NgOptimizedImage} from '@angular/common';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {TimeMinSecondMilliSecondPipe} from '../pipes/time-min-second-milli-second-pipe';
import {
  DashBoardAddNewRunnerCoordinatorRadioTower
} from '../services/dash-board-add-new-runner-coordinator-radio-tower';
import {filter, Subscription} from 'rxjs';

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
    TimeMinSecondMilliSecondPipe,
    MatNoDataRow
  ],
  templateUrl: './dashboard-table.html',
  styleUrl: './dashboard-table.scss'
})
export class DashboardTable implements AfterViewInit, OnDestroy{
  @ViewChild(MatSort) sort: MatSort | null = null;

  protected readonly columnDefs = ['no', 'fullName', 'nationality', 'timeUsedInMillisecond'];

  protected readonly data: DashboardTableData[] = []

  protected readonly sortedData = new MatTableDataSource(this.data);

  private readonly requestNewDialogListener: Subscription;

  constructor(
    readonly changeDetectorRef: ChangeDetectorRef,
    readonly dashBoardAddNewRunnerCoordinatorRadioTower: DashBoardAddNewRunnerCoordinatorRadioTower) {
    this.requestNewDialogListener = dashBoardAddNewRunnerCoordinatorRadioTower.requestNewObservable()
      .pipe(filter(messages => messages.state === 'SEND_REQUEST'))
      .subscribe((result) => {
        this.data.push(result.data as DashboardTableData)

        this.sortedData.data = this.data
      })
  }

  ngOnDestroy(): void {
    this.requestNewDialogListener.unsubscribe()
  }


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
