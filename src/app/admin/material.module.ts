import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from "@angular/material/paginator"
import { MatSortModule } from "@angular/material/sort"

@NgModule({
    exports: [
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatTableModule,
        MatButtonModule,
        MatCardModule,
        MatPaginatorModule,
        MatSortModule
    ]
})

export class MaterialModule { }