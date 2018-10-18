import {
  Component, OnInit, Input, OnDestroy,
  ViewChild, Output, EventEmitter, ChangeDetectorRef, TemplateRef, AfterViewInit, OnChanges, SimpleChanges, SimpleChange
} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { MatTableDataSource, MatSort, MatTable, MatPaginator } from '@angular/material';



@Component({
  selector: 'material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.css'],
})

export class MaterialTableComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {


  displayedColumns: string[];
  @Input() rows: any[] | MatTableDataSource<any[]>;
  @Input() columns: MaterialTableColumn[];
  @Input() filter = false;
  @Input() pagination = true;
  @Input() selected: any;
  @Input() recalculate: EventEmitter<any>;
  @Input() sortCol: string;
  @Input() pageSize: number;
  @Input() sortDirection ? = 'asc';


  @Output() select = new EventEmitter();
  @Output() dblClick = new EventEmitter();
  // @ViewChild('table') table: MatTable;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  sub: Subscription;
  sinResultados = true;
  pageSizeOptions: number[];

  constructor(private cd: ChangeDetectorRef) {

  }

  ngOnChanges(changes: SimpleChanges) {
    const columns: SimpleChange = changes.columns;
    if (columns && columns.currentValue) {
      this.columns = columns.currentValue;
      if (this.columns.length > 0) {
        this.onRecalculate();
      }
    }
    const rows: SimpleChange = changes.rows;
    if (rows && rows.currentValue) {
      this.rows = rows.currentValue;
      if (this.rows) {
        this.onRecalculate();
      }
    }
  }

  ngOnInit() {
    if (this.sortCol) {
      if (this.sortCol.includes('|')) {
        [this.sortCol, this.sortDirection] = this.sortCol.split('|');
      } else if (!this.sortDirection) {
          this.sortDirection = 'asc';
      }
    }
    this.sortCol = (this.sortCol) ? this.sortCol : (this.columns.length) ? this.columns[0].prop : null;
    if (this.recalculate) {
      this.recalculate.subscribe(x => {
        this.onRecalculate();
      });
    }

    if (this.pagination) {
      this.pageSize = (this.pageSize) ? this.pageSize : 25;
      this.pageSizeOptions = (this.pageSize) ?
        [(this.pageSize * 1), (this.pageSize * 2), (this.pageSize * 3), (this.pageSize * 4)] : [5, 10, 25, 100];
    }
  }

  ngAfterViewInit() {
    if (this.rows instanceof MatTableDataSource) {
      this.rows.sortingDataAccessor = (item, property) => {
        return this.getCellValueSorting(item, property);
      };
      this.rows.sort = this.sort;
      this.rows.paginator = this.paginator;
      this.rows.filterPredicate = this.filterGrid();
    }
    this.onRecalculate();
  }

  /**
   * modifica la funcion de filtrado original para contemplar las columnas multinivel
   */
  private filterGrid(): (data: any[], filter: string) => boolean {
    return (row: any[], filter: string) => {
      const stringColumn: string[] = [];
      for (const col of this.columns) {
        stringColumn.push(this.getCellValue(col, row));
      }
      const stringCol = stringColumn.join(' ').toLowerCase();
      return stringCol.includes(filter);
    };
  }

  ngOnDestroy() {

  }

  /**
   * Obtiene el valor mostrado de una celda
   * @param col
   * @param row
   */
  private getCellValue(col: MaterialTableColumn, row: any, replaceHtml: boolean = false) {
    let value: any = '';

    if (this.getVal(row, col.prop)) {
      value = this.getVal(row, col.prop);
    }
    if (col.cellTransform) {
      value = col.cellTransform(value, row);
    }
    return (replaceHtml && value)  ? value.toString().replace(/(<([^>]+)>)/ig, '') : value;
  }

  /**
 * Obtiene el valor de la celda utilizado para ordenar
 * @param col
 * @param row
 */
  private getCellOrderValue(col: MaterialTableColumn, row: any) {
    let value: any = '';

    if (this.getVal(row, col.prop)) {
      value = this.getVal(row, col.prop);
    }
    if (col.cellOrder) {
      value = col.cellOrder(value, row);
    } else if (col.cellTransform) {
      value = col.cellTransform(value, row);
    }
    return value;
  }

  private getCellValueSorting(row: any, path: string) {

    const col = this.columns.find(c => c.prop === path);
    if (col) {
      return this.getCellOrderValue(col, row);
    } else { return null; }
  }
  private getVal(val: any, path: string) {
    if (path.indexOf('.') > 0) {
      const [key, newPath] = path.split('.', 2);
      if (val[key]) {
        return this.getVal(val[key], newPath);
      } else { return undefined; }
    } else {
      if (val[path]) {
        return val[path];
      } else { return undefined; }
    }
  }

  public onRecalculate() {
    this.displayedColumns = (this.columns)  ? (this.columns.filter(x => (!x.hidden)).map(y => y.prop)) : [];
    this.showSinResultados();
    this.detectChanges();
  }

  public showSinResultados() {

    if (this.rows instanceof MatTableDataSource) {
      this.sinResultados = (this.rows && this.rows.data && this.rows.data.length === 0);
    } else if (this.rows && this.rows.length) {
      this.sinResultados = (this.rows && this.rows.length === 0);
    } else {
      this.sinResultados = true;
    }
    return this.sinResultados;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.rows.filter = filterValue;
  }
  onClick(event: any, row) {
    event.stopImmediatePropagation();
    this.selected = row;
    this.select.emit(row);
  }

  onDblClick(event: any, row) {
    event.stopImmediatePropagation();
    this.selected = row;
    this.dblClick.emit(row);
  }
  detectChanges() {
    this.cd.markForCheck();
    this.cd.detectChanges();
    /* this.cd.reattach();
    this.cd.detectChanges();
    this.cd.detach(); */
  }

  myTrackById(a, b) {

  }
}










export class MaterialTableColumn {

  prop: string;
  name: string;
  width?: string;
  headerTemplate?: TemplateRef<any>;
  headerClass?: string;
  cellTemplate?: TemplateRef<any>;
  cellTransform?: any; // se pasa una funcion con parametros (celda, row)
  cellOrder?: any; // se pasa una funcion para determinar el orden. con parametros (celda, row)
  hidden?: false; // determina si esa columna se oculta

}
