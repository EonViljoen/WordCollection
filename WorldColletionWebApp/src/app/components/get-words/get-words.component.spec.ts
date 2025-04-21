import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetWordsComponent } from './get-words.component';

describe('GetWordsComponent', () => {
  let component: GetWordsComponent;
  let fixture: ComponentFixture<GetWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetWordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
