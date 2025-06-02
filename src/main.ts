import { bootstrapApplication } from '@angular/platform-browser';
import {Dashboard} from './dashboard/dashboard';

bootstrapApplication(Dashboard)
  .catch((err) => console.error(err));
