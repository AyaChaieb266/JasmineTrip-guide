import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionAcceuilComponent } from './attraction-acceuil.component';

describe('AttractionAcceuilComponent', () => {
  let component: AttractionAcceuilComponent;
  let fixture: ComponentFixture<AttractionAcceuilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttractionAcceuilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttractionAcceuilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
