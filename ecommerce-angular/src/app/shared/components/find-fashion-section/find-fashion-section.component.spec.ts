import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindFashionSectionComponent } from './find-fashion-section.component';

describe('FindFashionSectionComponent', () => {
  let component: FindFashionSectionComponent;
  let fixture: ComponentFixture<FindFashionSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindFashionSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindFashionSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
