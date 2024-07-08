import { Component, OnInit } from '@angular/core';
import { AdminDiscountService } from '../../services/admin-discount.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogBodyDiscountComponent } from '../dialog-body-discount/dialog-body-discount.component';
import { DialogDeleteDiscountComponent } from '../dialog-delete-discount/dialog-delete-discount.component';

@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.css']
})
export class AdminDiscountComponent implements OnInit{
  dataSource!: any[];
  totalCount!: number;
  displayedColumns: string[] = ["id", "code", "name", "value", "start_date", "end_date", "count", "action"];
  constructor(
    private adminDiscountService: AdminDiscountService,
    private matDiaLog: MatDialog
  ){}
  ngOnInit(): void {
    this.getAllDiscounts();
  }

  getAllDiscounts(){
    this.adminDiscountService.getDiscounts(1).subscribe((data) => {
      this.dataSource = data?.metadata;
      this.totalCount = data?.metadata?.length;
    });
  }

  addDiscount(){
    this.Openpopup(0, "Add Discount", DialogBodyDiscountComponent);
  }

  openDialogEdit(code: any){
    this.Openpopup(code, "Edit Discount", DialogBodyDiscountComponent);
  }

  openDialogDel(code: any){
    this.Openpopup(code, "Delete Discount", DialogDeleteDiscountComponent);
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
    _popup.afterClosed().subscribe(item => {
      this.getAllDiscounts();
    })
  }

  onPageChange(e: PageEvent){
    let page = e.pageSize;
    this.adminDiscountService.getDiscounts(page).subscribe((data) => {
      this.dataSource = data?.metadata;
      this.totalCount = data?.metadata?.length;
    })
  }
}
