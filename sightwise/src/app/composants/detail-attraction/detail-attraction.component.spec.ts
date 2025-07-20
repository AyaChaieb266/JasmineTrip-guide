import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAttractionComponent } from './detail-attraction.component';

describe('DetailAttractionComponent', () => {
  let component: DetailAttractionComponent;
  let fixture: ComponentFixture<DetailAttractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailAttractionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailAttractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
