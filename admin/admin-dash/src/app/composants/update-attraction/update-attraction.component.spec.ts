import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAttractionComponent } from './update-attraction.component';

describe('UpdateAttractionComponent', () => {
  let component: UpdateAttractionComponent;
  let fixture: ComponentFixture<UpdateAttractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAttractionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAttractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
