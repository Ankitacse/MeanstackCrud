import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule,
  MatDividerModule, MatFormFieldModule, MatInputModule, MatDialogModule,
  MatProgressSpinnerModule, MatSelectModule, MatDatepickerModule,
  MatNativeDateModule, MatCardModule, MatSlideToggleModule, MatListModule,
  MatStepperModule, MatRadioModule, MatCheckboxModule, MatExpansionModule,
  MatProgressBarModule, MatSidenavModule, MatChipsModule, MatTooltipModule,
  MatTabsModule, MatTableModule,MatTreeModule, MatAutocompleteModule, MatPaginatorModule
} from '@angular/material';

import {} from '@angular/material/tree';

@NgModule({
 
  exports:[
    MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule, MatDividerModule,
    MatFormFieldModule, MatInputModule, MatDialogModule, MatProgressSpinnerModule,
    MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatCardModule,
    MatSlideToggleModule, MatListModule, MatStepperModule, MatRadioModule,
    MatCheckboxModule, MatExpansionModule, MatProgressBarModule,
    MatSidenavModule, MatChipsModule, MatTooltipModule,
    MatTabsModule,MatPaginatorModule,
    MatTableModule, MatAutocompleteModule,MatTreeModule
  ]
})
export class CoustomMaterailModule { }
