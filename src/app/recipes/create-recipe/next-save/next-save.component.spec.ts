import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextSaveComponent } from './next-save.component';

describe('NextSaveComponent', () => {
  let component: NextSaveComponent;
  let fixture: ComponentFixture<NextSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextSaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
