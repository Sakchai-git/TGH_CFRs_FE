import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LoaderUtil } from '@shared/utils/loader.util';
// import { LoaderUtil } from '../../utils/loader.util';
import { DxLoadPanelComponent } from 'devextreme-angular';

@Component({
  selector: 'uc-loader',
  templateUrl: 'uc-loader.component.html',
  styleUrls: ['./uc-loader.component.scss'],
})
export class UcLoaderComponent implements OnInit, OnDestroy {
  @Input() loaderName: any;
  @Input() loaderText: any;

  @ViewChild('loadPanel', { static: true }) loadPanel:
    | DxLoadPanelComponent
    | undefined;
  loadingVisible = false;

  constructor(private loaderUtil: LoaderUtil) {}

  ngOnInit(): void {
    if (!this.loaderName) {
      //this.loaderName = 'mainLoader';
      throw new Error('Loader must have a name supplied.');
    }
    if (!this.loaderText) {
      this.loaderText = 'Loading...';
    }
    this.loaderUtil._register(this);
  }

  ngOnDestroy(): void {
    this.loaderUtil._unregister();
  }

  public displayLoading(isShow: boolean = true) {
    this.loadingVisible = isShow;
    // console.log('Loader: ', isShow);
  }

  onShown() {
    // console.log('onShown');
  }

  onHidden() {
    // console.log('onHidden');
  }
}
