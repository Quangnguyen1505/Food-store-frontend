import { Component, EventEmitter, Output } from '@angular/core';
import { AdminFoodService } from '../../services/admin-food.service';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';


@Component({
  selector: 'app-admin-food',
  templateUrl: './admin-food.component.html',
  styleUrls: ['./admin-food.component.css']
})
export class AdminFoodComponent {
  dataSource!: any[];
  totocalCount!: number;
  limit = 8;
  displayedColumns: string[] = ["id", "name", "price", "tag", "imageUrl", "cookTime", "action"];
  
  constructor(
    private foodService: AdminFoodService, 
    private activatedRoute: ActivatedRoute,
    private matDiaLog: MatDialog
  ) {
  }

  ngOnInit() {
      this.loadcustomer();
  }
  loadcustomer(){
    this.foodService.getAll(1).subscribe((response) => {
      this.dataSource = response.metadata.foods;
      this.totocalCount = response.metadata.totalCount;
    });
  }

  onPageChange(event: PageEvent) {
    let page = event.pageSize
    
    this.foodService.getAll(page).subscribe((response) => {
      this.dataSource = response.metadata.foods;
      this.totocalCount = response.metadata.totalCount;
    });
  }

  openDialogEdit(code: any){
    this.Openpopup(code, 'Edit Customer', DialogBodyComponent)
  }

  openDialogDel(code: any){
    this.Openpopup(code, 'Del Customer', DialogDeleteComponent)
  }

  addcustomer(){
    this.Openpopup(0, 'Add Customer',DialogBodyComponent);
  }

  Openpopup(code: any, title: any,component:any) {
    var _popup = this.matDiaLog.open(component, {
      width: '40%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: title,
        code: code
      }
    });
    // _popup.afterClosed().subscribe(item => {
    //   // console.log(item)
    //   this.loadcustomer();
    // })
  }

}
