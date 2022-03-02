import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-documents-view',
  templateUrl: './documents-view.component.html',
  styleUrls: ['./documents-view.component.css']
})
export class DocumentsViewComponent implements OnInit {
  @Input() storyDocuments = [];
  constructor() { }

  ngOnInit(): void {
  }

}
