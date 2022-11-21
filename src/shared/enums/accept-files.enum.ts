export enum ALLOWED_IMPORTS_MIMETYPES {
  'application/vnd.oasis.opendocument.spreadsheet' = 'ods',
  'application/wps-office.xls' = 'xls',
  'application/wps-office.xlsx' = 'xlsx',
  'application/vnd.ms-excel' = 'xls',
  'application/excel' = 'xls',
  'application/x-msexcel' = 'xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' = 'xlsx',
}

export namespace ALLOWED_IMPORTS_MIMETYPES {
  export function isValid(mimetype: string): boolean {
    return Object.keys(ALLOWED_IMPORTS_MIMETYPES).includes(mimetype);
  }
}
