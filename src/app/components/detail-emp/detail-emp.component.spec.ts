import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEmpComponent } from './detail-emp.component';

describe('DetailEmpComponent', () => {
  let component: DetailEmpComponent;
  let fixture: ComponentFixture<DetailEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailEmpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
