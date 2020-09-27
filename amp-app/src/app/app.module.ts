import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRouting } from './app.routing';
import { AppComponent } from './app/app.component';
import { CoursesModule } from './courses/courses.module';
import { HeaderComponent } from "./core/header/header.component";
import { FooterComponent } from "./core/footer/footer.component";
import { LogoComponent } from "./core/logo/logo.component";
import { BreadcrumbsComponent } from './core/breadcrumbs/breadcrumbs.component';
import { LoginComponent } from './core/login/login.component';
import { LogoffComponent } from './core/logoff/logoff.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginFormComponent } from './core/login-form/login-form.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from "@angular/common/http";
import { TokenInterceptor } from "./interceptors/token.interceptor";
import { LoaderComponent } from './loader/loader.component';
import { MatProgressSpinnerModule } from "@angular/material";
import { SharedModule } from './shared/shared.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { CoreModule } from "./core/core.module";
import { FormComponent } from './form/form.component';
import { FormLineComponent } from './form/form-line/form-line.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoaderComponent,
    FormComponent,
    FormLineComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRouting,
    CoursesModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, "assets/", ".json"),
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
