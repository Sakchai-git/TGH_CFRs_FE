import { LoaderUtil } from '@shared/utils/loader.util';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';
import { find, each } from 'lodash';
import * as moment from 'moment';

@Injectable()
export class BaseUtil {
  constructor(private loaderUtil: LoaderUtil) {}

  /* ============== User Permission ======================== */
  checkPermissionView(permissions: any, menuCode: string) {
    let isCanView = false;
    if (menuCode) {
      if (permissions) {
        const userPermission = permissions.find((item: any) => {
          return item.menuCode === menuCode;
        });
        if (userPermission && userPermission.isView) {
          isCanView = true;
        }
      }
    }
    return isCanView;
  }

  checkPermissionEdit(permissions: any, menuCode: string) {
    let isCanEdit = false;
    if (menuCode) {
      if (permissions) {
        const userPermission = permissions.find((item: any) => {
          return item.menuCode === menuCode;
        });
        if (userPermission && userPermission.isEdit) {
          isCanEdit = true;
        }
      }
    }
    return isCanEdit;
  }

  /* ============== Alert ======================== */
  alertInfo(
    message: string,
    title: string | undefined = undefined,
    callback: any = undefined
  ) {
    title = title ? title : 'Info';
    Swal.fire({
      title: title,
      text: message,
      icon: 'info',
    }).then(() => {
      if (callback) {
        callback();
      }
    });
  }

  alertSuccess(
    message: string,
    title: string | undefined = undefined,
    callbackS: any = undefined
  ) {
    title = title ? title : 'Success!';
    Swal.fire({
      title: title,
      text: message,
      icon: 'success',
      confirmButtonText: 'ตกลง',
      timer: 4000,
      showCancelButton: false,
      showConfirmButton: false,
    }).then(() => {
      if (callbackS) {
        callbackS();
      }
    });
  }

  alertWarning(
    message: string,
    title: string | undefined = undefined,
    callbackS: any = undefined
  ) {
    title = title ? title : 'Warning!';
    Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      showCancelButton: false,
      confirmButtonText: 'ตกลง',
    }).then(() => {
      if (callbackS) {
        callbackS();
      }
    });
  }

  alertError(
    message: string,
    title: string | undefined = undefined,
    callbackS: any = undefined
  ) {
    title = title ? title : 'Error!';
    Swal.fire({
      title: title,
      text: message,
      icon: 'error',
      showCancelButton: false,
      confirmButtonText: 'ตกลง',
    }).then(() => {
      if (callbackS) {
        callbackS();
      }
    });
  }

  alertSaveSuccess(callbackS: any = undefined) {
    this.hideLoader();
    Swal.fire({
      title: 'Success!',
      text: 'Processing is completed.',
      icon: 'success',
      timer: 1500,
      showCancelButton: false,
      showConfirmButton: false,
      customClass: {
        popup: 'pb-10',
      },
    }).then(() => {
      if (callbackS) {
        callbackS();
      }
    });
  }

  alertConfirm(
    message: string,
    title: string | undefined = undefined,
    callbackS: any = undefined,
    callbackF: any = undefined
  ) {
    title = title ? title : 'Confirm?';
    Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ไม่ไช่',
    }).then((result) => {
      if (result.value) {
        if (callbackS) {
          callbackS();
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        if (callbackF) {
          callbackF();
        }
      }
    });
  }
  alertSaveError(err: any) {
    console.log('alertSaveError', err);
    this.hideLoader();
    const errorMessage = err.message || err.error.message || '';
    if (errorMessage) {
      this.alertWarning(errorMessage, 'Validate Save');
    }
  }

  alertDownloadError(callbackS: any = undefined) {
    const message = 'เกิดข้อผิดพลาดในการดาวน์โหลดไฟล์ กรุณาลองอีกครั้ง';
    const title = 'Download Failed';
    this.alertError(message, title, callbackS);
  }

  showLoader() {
    this.loaderUtil.show();
  }

  hideLoader() {
    this.loaderUtil.hide();
  }

  errorMethod = (error: any): any => {
    //this.loaderService.hide();
    console.log(error);
    // this.toast.fire({
    //   icon: 'error',
    //   title: `Error Message : ${error && error.message ? error.message : 'กรุณราติดต่อ Admin'}`
    // })
    this.alertError(error.message || error.error.message || '', 'Error');
    this.hideLoader();
    return throwError(error);
  };

  dateFormat(date: string, format?: string) {
    if (!date) return '';
    format = format ? format : 'DD/MM/YYYY';
    return moment(date).format(format);
  }

  datetimeFormat(date: string, format?: string) {
    if (!date) return '';
    format = format ? format : 'DD/MM/YYYY HH:mm';
    return moment(date).format(format);
  }

  getMonth() {
    // moment.locale('th');
    let dataMonth: any = [];
    each(moment.months(), (item, index) => {
      dataMonth.push({ id: index + 1, name: item });
    });
    return dataMonth;
  }
  getYear() {
    let dataYear: any = [];
    let dates = moment().add(10, 'y');
    for (let index = 0; index > -20; index--) {
      dataYear.push(dates.year() + index);
      // dates = moment(dates).add(1, 'y');
    }

    return dataYear;
  }

  getMonthName(monthId: any, dataMonth: any) {
    let filterData = find(dataMonth, {
      id: monthId,
    });
    return filterData?.name;
  }
  // getDatetimeDisplay(datetime: any) {
  //   if (datetime) {
  //     const createDatetimeDisplay = moment(datetime);
  //     return createDatetimeDisplay.year() === 1
  //       ? null
  //       : `${createDatetimeDisplay.format('DD/MM/')}${
  //           createDatetimeDisplay.year() + 543
  //         } ${createDatetimeDisplay.format('HH:mm')}`;
  //   }
  //   return '';
  // }
  getBankShortName(bankId: any, dataBank: any) {
    let filterData = find(dataBank, {
      bankId: bankId,
    });
    return filterData?.bankShortName;
  }

  getReportType() {
    return [
      {
        code: 'pdf',
        name: 'PDF',
      },
      {
        code: 'xlsx',
        name: 'Excel',
      },
    ];
  }

  downloadFile(blobFile: any, fileName: string) {
    let blob: any = new Blob([blobFile], {
      type: 'application/octet-stream',
    });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
