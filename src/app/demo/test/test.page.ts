import { Component } from '@angular/core';
import { AXBasePageComponent, AXDialogService } from '@acorex/components';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss']
})
export class TestPage extends AXBasePageComponent {
  loading: boolean = false;

  constructor(
    private http: HttpClient,
    private dialogServce: AXDialogService
    ) {
    super();
  }

  submit() {}


  _handleShowDialog()
  {
    this.dialogServce.confirm('Hi','Thi is a test message');
  }
}
