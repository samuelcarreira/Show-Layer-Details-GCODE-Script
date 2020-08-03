import { Component, OnInit, Input } from '@angular/core';

import { ProcessGcodeService } from '../process-gcode.service';

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.scss']
})
export class UploadfileComponent implements OnInit {
  @Input('acceptedTypes') public acceptedTypes: string;

  constructor() { }

  ngOnInit(): void {
  }

  onFilesAdded(files: FileList) {
    if (!files.length) {
      return;
    }

    new ProcessGcodeService(files.item(0));
  }

}
