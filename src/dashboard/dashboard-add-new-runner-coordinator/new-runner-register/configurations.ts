import { InjectionToken } from '@angular/core';

/** Runtime configuration used by the new-runner registration form. */
export interface Configuration {
  /** URL template used to resolve a nationality flag image. */
  flagUrl: string;
}

/** Default configuration for the registration form. */
export const ConfigurationMain: Configuration = {
  flagUrl: 'https://flagsapi.com/__nationality__/flat/32.png',
};

/** Injection token for registration-form configuration. */
export const CONFIGURATION = new InjectionToken<Configuration>('CONFIGURATION');
