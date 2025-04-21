import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetWordComponent } from './get-word.component';

describe('GetWordComponent', () => {
  let component: GetWordComponent;
  let fixture: ComponentFixture<GetWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetWordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
