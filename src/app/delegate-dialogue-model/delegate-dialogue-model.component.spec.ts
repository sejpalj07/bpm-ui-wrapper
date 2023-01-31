import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegateDialogueModelComponent } from './delegate-dialogue-model.component';

describe('DelegateDialogueModelComponent', () => {
  let component: DelegateDialogueModelComponent;
  let fixture: ComponentFixture<DelegateDialogueModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelegateDialogueModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelegateDialogueModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
