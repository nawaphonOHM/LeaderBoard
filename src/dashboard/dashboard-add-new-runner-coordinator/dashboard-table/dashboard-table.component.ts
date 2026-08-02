import { Component, effect, viewChild, inject } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { FullNamePipe } from './full-name.pipe';
import { NgOptimizedImage } from '@angular/common';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { TimeMinSecondMilliSecondPipe } from './time-min-second-milli-second.pipe';
import { DashboardStateService } from '../dashboard-state.service';
import { DashboardTableData } from '../dashboard-table-data';

@Component({
  selector: 'app-dashboard-table',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    FullNamePipe,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    NgOptimizedImage,
    MatSortHeader,
    MatSort,
    TimeMinSecondMilliSecondPipe,
    MatNoDataRow,
  ],
  templateUrl: './dashboard-table.component.html',
  styleUrl: './dashboard-table.component.scss',
})
/** Renders and sorts the runners held by the dashboard state service. */
export class DashboardTableComponent {
  /** Column identifiers used by the table header and row definitions. */
  protected readonly columnDefs = ['no', 'fullName', 'nationality', 'timeUsedInMillisecond'];

  /** Material table data source populated from the current runner signal. */
  protected readonly sortedData = new MatTableDataSource<DashboardTableData>([]);

  /** Required view query for the table's Material sort controller. */
  protected readonly matSortSignal = viewChild.required(MatSort);

  private readonly dashboardState = inject(DashboardStateService);

  /** Connects dashboard state and the table's default sort order. */
  constructor() {
    effect(() => {
      this.sortedData.data = [...this.dashboardState.runners()];
    });

    effect(() => {
      const matsort = this.matSortSignal();

      matsort.sort({
        id: 'timeUsedInMillisecond',
        start: 'asc',
        disableClear: true,
      });

      this.sortedData.sort = matsort;
    });
  }
}
