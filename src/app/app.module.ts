import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app container/app.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//component
import { SensorListComponent } from '../sensors/components/sensor-list/sensor-list.component';
import { SwitchButtonComponent } from 'src/sensors/components/switch-button/switch-button.component';

//modules
import { MaterialsModule } from '../materials/materials.module';
import { SensorModule } from '../sensors/sensor.module';

//store
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects'
import { reducer, CustomSerializer } from './router store/reducers/index';
import { StoreRouterConnectingModule } from '@ngrx/router-store';




@NgModule({
  declarations: [
    AppComponent,
    SensorListComponent,
    SwitchButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    SensorModule,
    CommonModule,
    StoreModule.forRoot(reducer,{}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({ serializer: CustomSerializer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
