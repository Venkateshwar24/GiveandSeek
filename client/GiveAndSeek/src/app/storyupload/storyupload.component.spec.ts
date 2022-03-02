import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryuploadComponent } from './storyupload.component';

describe('StoryuploadComponent', () => {
  let component: StoryuploadComponent;
  let fixture: ComponentFixture<StoryuploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoryuploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
