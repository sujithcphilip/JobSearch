import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent
} from './home.component';
import { FormsModule } from '@angular/forms';
import { MultiselectComponent } from '../multiselect/multiselect.component';
import { PaginationControlsComponent, PaginationControlsDirective, NgxPaginationModule } from 'ngx-pagination';
import { ApisService } from '../apis.service';
import { HttpClientModule } from '@angular/common/http';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent, MultiselectComponent ],
      imports: [FormsModule, NgxPaginationModule, HttpClientModule],
      providers: [ApisService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('random color', () => {
    expect(component.getColor("5b2bd7f99d73a1001456c30d", 10)).toEqual("rgba(197, 147, 221, 0.8)");
  });
});
