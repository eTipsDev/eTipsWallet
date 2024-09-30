import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycUIComponent } from './kyc-ui.component';

describe('KycUIComponent', () => {
  let component: KycUIComponent;
  let fixture: ComponentFixture<KycUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KycUIComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KycUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
