import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, APP_INITIALIZER } from '@angular/core';
import { APP_ROUTE } from './app.routes';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { JwtInterceptor } from '@core/interceptor/jwt.interceptor';
import { ErrorInterceptor } from '@core/interceptor/error.interceptor';
import { DirectionService } from '@core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { provideToastr } from 'ngx-toastr';
import { ConfigService } from '@config';

export function initConfig(appConfig: ConfigService) {
  return () => appConfig.setConfig();
}


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(APP_ROUTE),
    provideAnimations(),
    provideToastr({
      timeOut: 8000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
      progressBar: true,
    }), // Toastr providers
    // { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    DirectionService,
    { provide: DateAdapter, useClass: MomentDateAdapter },
    { provide: MAT_DATE_LOCALE, useValue: 'zh-TW' },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'YYYY-MM-DD',
        },
        display: {
          dateInput: 'YYYY-MM-DD',
          monthYearLabel: 'YYYY MMM',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'YYYY MMM',
        },
      },
    }, {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      multi: true,
      deps: [ConfigService],
    },
    importProvidersFrom(FeatherModule.pick(allIcons)),

  ],

};
