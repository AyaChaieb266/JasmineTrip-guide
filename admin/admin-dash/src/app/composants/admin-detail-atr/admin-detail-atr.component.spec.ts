import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDetailAtrComponent } from './admin-detail-atr.component';

describe('AdminDetailAtrComponent', () => {
  let component: AdminDetailAtrComponent;
  let fixture: ComponentFixture<AdminDetailAtrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDetailAtrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDetailAtrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
