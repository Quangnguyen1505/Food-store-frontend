import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit{
  @Input()
  currentPage: number = 1;
  @Input()
  total: any;
  @Input()
  limit: number = 8;
  @Input()
  link: string = '';
  @Input()
  tag: any;

  @Output() changePage = new EventEmitter<number>();

  pages: number[] = [];

  ngOnInit(): void {
    const pageCount = Math.ceil(this.total / this.limit);
    this.pages = this.range(1, pageCount);

    if(!this.link){
      const link = ''
      this.link = link + this.tag;
    }
    
  }

  range(start: number, end: number): number[] {
    return [...Array(end).keys()].map(num => num + start);
  }
}
