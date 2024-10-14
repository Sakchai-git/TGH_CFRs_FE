import { Injectable } from '@angular/core';
import { UcLoaderComponent } from '@shared/components/uc-loader/uc-loader.component';
import DataGrid from 'devextreme/ui/data_grid';

@Injectable()
export class LoaderUtil {
  private loaderCache: UcLoaderComponent | null = null;

  _register(loader: UcLoaderComponent): void {
    // console.log('register : ' + loader.loaderName);
    this.loaderCache = loader;
    DataGrid.defaultOptions({
      device: {
        deviceType: 'desktop',
      },
      options: {
        loadPanel: this.loaderCache.loadPanel,
      },
    });
  }

  _unregister(): void {
    // console.log('unregister : ' + loaderToRemove.loaderName);
    this.loaderCache = null;
    DataGrid.defaultOptions({
      device: {
        deviceType: 'desktop',
      },
      options: {
        loadPanel: null,
      },
    });
  }

  show(): void {
    this.showLoader();
  }

  showLoader() {
    if (!this.isShowing) {
      if (this.loaderCache) {
        // console.log('LoaderService: ', 'loaderCache');
        this.loaderCache.displayLoading(true);
      }
      // else {
      //     console.log('LoaderService: ', 'null');
      // }
    }
  }

  hide(): void {
    // console.log('LoaderService: ', 'begin');
    // let loaderSubscription: Subscription = new Observable((observableLoader) => {
    //     // observable execution

    //     observableLoader.next();
    //     console.log('LoaderService: ', 'next');
    //     observableLoader.complete();
    //     console.log('LoaderService: ', 'complete');
    // }).subscribe();
    // loaderSubscription.unsubscribe();
    // console.log('LoaderService: ', 'unsubscribe');
    // if (callback) {
    //     callback();
    // }
    // console.log('LoaderService: ', 'end');
    this.hideLoader();
  }

  hideLoader() {
    if (this.isShowing) {
      if (this.loaderCache) {
        // console.log('LoaderService: ', 'loaderCache');
        this.loaderCache.displayLoading(false);
      }
      // else {
      //     console.log('LoaderService: ', 'null');
      // }
    }
  }

  get isShowing(): boolean | undefined {
    let showing = undefined;
    if (this.loaderCache) {
      showing = this.loaderCache.loadingVisible;
    }
    return showing;
  }
}
