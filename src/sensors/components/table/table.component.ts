import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MainState } from 'src/sensors/store/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromSensorsSelectors from '../../store/selectors/sensors.selectors';
import * as fromSensorsActions from 'src/sensors/store/actions/sensors.action';

@Component({
  selector: 'ss-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  showProgressBar$: Observable<boolean>;

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'unitSymbol', 'value', 'type', 'edit', 'delete'];

  @ViewChild (MatSort) sort: MatSort;
  @ViewChild (MatPaginator) pagination: MatPaginator;

  constructor(private store: Store<MainState>) { }

  ngOnInit(): void {
    this.store.dispatch(fromSensorsActions.loadSensors());
    this.refreshTable();
  }

  refreshTable () {
    this.showProgressBar$ = this.store.select(fromSensorsSelectors.getLoading);
    
    this.store.select(fromSensorsSelectors.getSensors).subscribe( data =>{     
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.pagination;
      this.dataSource.sort = this.sort; 
    });
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDelete(id: number) {
    this.store.dispatch(fromSensorsActions.deleteSensor({ id }));
  }

}
