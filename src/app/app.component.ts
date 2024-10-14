import { AuthService } from '@shared/service/auth.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslationService } from './modules/i18n';
// language list
import { locale as enLang } from './modules/i18n/vocabs/en';
import { locale as chLang } from './modules/i18n/vocabs/ch';
import { locale as esLang } from './modules/i18n/vocabs/es';
import { locale as jpLang } from './modules/i18n/vocabs/jp';
import { locale as deLang } from './modules/i18n/vocabs/de';
import { locale as frLang } from './modules/i18n/vocabs/fr';

import AutoComplete from 'devextreme/ui/autocomplete';
import DataGrid from 'devextreme/ui/data_grid';
import DateBox from 'devextreme/ui/date_box';
import Lookup from 'devextreme/ui/lookup';
import NumberBox from 'devextreme/ui/number_box';
import SelectBox from 'devextreme/ui/select_box';
import TagBox from 'devextreme/ui/tag_box';
import TextArea from 'devextreme/ui/text_area';
import TextBox from 'devextreme/ui/text_box';
@Component({
  // tslint:disable-next-line:component-selector
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  locale: string = 'th';
  dxUIDefaultOptions: any = {
    DateBox: {
      showClearButton: true,
      calendarOptions: {
        showTodayButton: true,
      },
      openOnFieldClick: false,
      useMaskBehavior: true,
      displayFormat: 'dd/MM/yyyy',
      dateSerializationFormat: 'yyyy-MM-ddTHH:mm:ss',
      onFocusIn: (e: any) => {
        // // console.log('onFocusIn:e', e);
        if (e.element) {
          // // console.log('onFocusIn-element', e.element);
          const htmlElm: HTMLElement = e.element as HTMLElement;
          // // console.log('onFocusIn-htmlElm', htmlElm);
          const htmlInputElm: HTMLInputElement | null = htmlElm.querySelector(
            'input.dx-texteditor-input'
          );
          if (htmlInputElm && htmlInputElm.type !== 'hidden') {
            // // console.log('onFocusIn-htmlInputElm', htmlInputElm);
            htmlInputElm.setSelectionRange(0, htmlInputElm.value.length);
            htmlInputElm.select();
          }
        }
      },
      onEnterKey: (e: any) => {
        if (e.component) {
          e.component.blur();
        }
      },
      onClosed: (e: any) => {
        if (e.component) {
          e.component.blur();
        }
      },
      // onFocusOut: function(e: any) {
      //   //  // console.log('onFocusOut:e', e);
      //   setTimeout(function() {
      //     //  // console.log('onFocusOut:e.component', e.component);
      //     e.component.close();
      //   }, 10);
      // }
    },

    SelectBox: {
      // displayExpr: (item: any) => {
      //   return item && '(' + item.Code + ')     ' + item.Name;
      // },
      //itemTemplate: 'item',
      //valueExpr: 'ID',
      placeholder: 'กรุณาเลือกข้อมูล',
      showClearButton: false,
      searchEnabled: true,
      readOnly: false,
    },
    Lookup: {
      placeholder: 'กรุณาเลือกข้อมูล',
      showClearButton: true,
      searchEnabled: true,
      readOnly: false,
      searchTimeout: 1,
      showDataBeforeSearch: true,
      showCancelButton: true,
      popupHeight: '300px',
      position: undefined,
    },
    TagBox: {
      showSelectionControls: true,
      applyValueMode: 'useButtons',
      displayExpr: 'Name',
      valueExpr: 'ID',
      placeholder: 'กรุณาเลือกข้อมูล',
      showClearButton: true,
      searchEnabled: true,
      readOnly: false,
    },
    TextBox: {
      showClearButton: true,
      placeholder: '',
      readOnly: false,
      // onFocusIn: (e: any) => {
      //   // // console.log('onFocusIn-1', e);
      //   if (e.element) {
      //     // // console.log('onFocusIn-element', e.element);
      //     const htmlElm: HTMLElement = e.element as HTMLElement;
      //     // // console.log('onFocusIn-htmlElm', htmlElm);
      //     const htmlInputElm: HTMLInputElement | null = htmlElm.querySelector(
      //       'input.dx-texteditor-input'
      //     );
      //     if (htmlInputElm && htmlInputElm.type !== 'hidden') {
      //       // // console.log('onFocusIn-htmlInputElm', htmlInputElm);
      //       htmlInputElm.setSelectionRange(0, htmlInputElm.value.length);
      //       htmlInputElm.select();
      //     }
      //   }
      // },
    },
    TextArea: {
      showClearButton: true,
      placeholder: '',
      readOnly: false,
      minHeight: '85px',
      stylingMode: 'outlined',
      autoResizeEnabled: true,
      onFocusIn: (e: any) => {
        // // console.log('onFocusIn-1', e);
        if (e.element) {
          // // console.log('onFocusIn-element', e.element);
          const htmlElm: HTMLElement = e.element as HTMLElement;
          // // console.log('onFocusIn-htmlElm', htmlElm);
          const htmlInputElm: HTMLInputElement | null = htmlElm.querySelector(
            'input.dx-texteditor-input'
          );
          if (htmlInputElm && htmlInputElm.type !== 'hidden') {
            // // console.log('onFocusIn-htmlInputElm', htmlInputElm);
            htmlInputElm.setSelectionRange(0, htmlInputElm.value.length);
            htmlInputElm.select();
          }
        }
      },
    },
    NumberBox: {
      step: 1,
      // format: '#,##0.00',
      format: '0#,###.###############',
      onFocusIn: (e: any) => {
        // // console.log('onFocusIn-1', e);
        if (e.element) {
          // // console.log('onFocusIn-element', e.element);
          const htmlElm: HTMLElement = e.element as HTMLElement;
          // // console.log('onFocusIn-htmlElm', htmlElm);
          const htmlInputElm: HTMLInputElement | null = htmlElm.querySelector(
            'input.dx-texteditor-input'
          );
          if (htmlInputElm && htmlInputElm.type !== 'hidden') {
            // // console.log('onFocusIn-htmlInputElm', htmlInputElm);
            htmlInputElm.setSelectionRange(0, htmlInputElm.value.length);
            htmlInputElm.select();
          }
        }
      },
    },
    DataGrid: {
      allowColumnReordering: true,
      allowColumnResizing: true,
      showBorders: true,
      showColumnLines: true,
      showRowLines: true,
      focusedRowEnabled: true,
      columnAutoWidth: true,
      columnResizingMode: 'nextColumn',
      hoverStateEnabled: true,
      sorting: { mode: 'multiple' },
      // rowAlternationEnabled: false,
      // wordWrapEnabled: true,
      keyExpr: 'id',
      noDataText: 'ไม่มีข้อมูล กดค้นหาเพื่อแสดงข้อมูล',
      scrolling: {
        useNative: true,
        columnRenderingMode: 'virtual',
      },
      export: {
        enabled: false,
      },
      loadPanel: {
        enabled: false,
      },
      groupPanel: {
        visible: false,
        emptyPanelText: 'ลากคอลัมน์มาวางที่นี่ เพื่อจัดกรุ๊ปข้อมูล',
      },
      editing: {
        texts: {
          addRow: 'เพิ่มรายการ',
          confirmDeleteTitle: 'ยืนยันลบ!',
          confirmDeleteMessage: 'คุณต้องการลบข้อมูลรายการนี้ ใช่หรือไม่?',
          saveRowChanges: 'OK',
        },
      },
      headerFilter: {
        visible: true,
      },
      filterRow: {
        visible: true,
      },
      columnChooser: {
        enabled: true,
        emptyPanelText: 'ลากคอลัมน์มาวางที่นี่ เพื่อซ่อน',
        title: 'เลือกคอลัมน์ที่ต้องการซ่อน',
      },
      showInColumnChooser: { enabled: false },
      // summary: {
      //   recalculateWhileEditing: true,
      //   groupItems: [
      //     {
      //       column: 'NetAmount',
      //       displayFormat: '{0}',
      //       showInGroupFooter: true,
      //       summaryType: 'sum',
      //       valueFormat: '#,##0.00'
      //     }
      //   ],
      //   totalItems: [
      //     {
      //       column: 'NetAmount',
      //       displayFormat: '{0}',
      //       summaryType: 'sum',
      //       valueFormat: '#,##0.00'
      //     }
      //   ]
      // },
      selection: {
        mode: 'none',
      },
      paging: {
        enabled: true,
        pageSize: 10,
      },
      pager: {
        visible: true,
        showPageSizeSelector: true,
        allowedPageSizes: [10, 20, 50],
        showInfo: true,
      },
    },
    Switch: {
      width: '50px',
    },
    AutoComplete: {
      placeholder: 'กรุณาเลือกข้อมูล',
      showClearButton: true,
      readOnly: false,
      minSearchLength: 0,
      searchTimeout: 1,
      openOnFieldClick: true,
      onFocusIn: (e: any) => {
        // // console.log('onFocusIn-1', e);
        if (e.element) {
          // // console.log('onFocusIn-element', e.element);
          const htmlElm: HTMLElement = e.element as HTMLElement;
          // // console.log('onFocusIn-htmlElm', htmlElm);
          const htmlInputElm: HTMLInputElement | null = htmlElm.querySelector(
            'input.dx-texteditor-input'
          );
          if (htmlInputElm && htmlInputElm.type !== 'hidden') {
            // // console.log('onFocusIn-htmlInputElm', htmlInputElm);
            htmlInputElm.setSelectionRange(0, htmlInputElm.value.length);
            htmlInputElm.select();
          }
        }
      },
    },
  };

  constructor(
    private translationService: TranslationService,
    private authService: AuthService
  ) {
    // register translations
    // this.translationService.loadTranslations(
    //   enLang,
    //   chLang,
    //   esLang,
    //   jpLang,
    //   deLang,
    //   frLang
    // );

    this.setDxUIDefaultOptions();
    // locale(this.locale);
  }

  ngOnInit() {
    //this.modeService.init();

    //ตรวจสอบ AccessToken
    if (!this.authService.checkValidAccessToken()) {
      this.authService.logout();
    } else {
      this.authService.getUserProfile().subscribe({
        next: (res) => {
          this.authService.setUserProfile(res);
        },
      });
    }
  }

  setDxUIDefaultOptions() {
    Lookup.defaultOptions({
      device: { deviceType: 'desktop' },
      options: this.dxUIDefaultOptions.Lookup,
    });

    TextBox.defaultOptions({
      device: { deviceType: 'desktop' },
      options: this.dxUIDefaultOptions.TextBox,
    });

    TextArea.defaultOptions({
      device: { deviceType: 'desktop' },
      options: this.dxUIDefaultOptions.TextArea,
    });

    NumberBox.defaultOptions({
      device: { deviceType: 'desktop' },
      options: this.dxUIDefaultOptions.NumberBox,
    });

    SelectBox.defaultOptions({
      device: { deviceType: 'desktop' },
      options: this.dxUIDefaultOptions.SelectBox,
    });

    DateBox.defaultOptions({
      device: { deviceType: 'desktop' },
      options: this.dxUIDefaultOptions.DateBox,
    });

    TagBox.defaultOptions({
      device: { deviceType: 'desktop' },
      options: this.dxUIDefaultOptions.TagBox,
    });

    DataGrid.defaultOptions({
      device: { deviceType: 'desktop' },
      options: this.dxUIDefaultOptions.DataGrid,
    });

    AutoComplete.defaultOptions({
      device: { deviceType: 'desktop' },
      options: this.dxUIDefaultOptions.AutoComplete,
    });
  }
}
