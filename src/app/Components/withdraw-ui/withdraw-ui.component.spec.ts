import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawUIComponent } from './withdraw-ui.component';

describe('WithdrawUIComponent', () => {
  let component: WithdrawUIComponent;
  let fixture: ComponentFixture<WithdrawUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithdrawUIComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WithdrawUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
