import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialWordComponent } from './special-word.component';

describe('SpecialWordComponent', () => {
  let component: SpecialWordComponent;
  let fixture: ComponentFixture<SpecialWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialWordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
