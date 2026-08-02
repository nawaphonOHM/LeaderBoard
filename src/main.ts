import { bootstrapApplication } from '@angular/platform-browser';
import { DashboardComponent } from './dashboard/dashboard.component';

/**
 * Bootstraps the standalone leaderboard application.
 *
 * @remarks
 * Angular owns the application lifecycle after the root dashboard component
 * has been created.
 */
bootstrapApplication(DashboardComponent).catch((err) => console.error(err));
