import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@NgModule({
    exports: [
        MatListModule,
        MatSidenavModule,
        MatIconModule
    ]
})

export class MaterialModule { }