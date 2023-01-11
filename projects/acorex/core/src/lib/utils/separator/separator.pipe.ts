import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { AXConfig } from '../../services/config';

@Pipe({ name: 'separator' })
@Injectable({
  providedIn: 'root'
})

// export class AXSeparatorPipe2 implements PipeTransform {
//   transform(value: any) {
//     if (value) {
//       return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
//     } else {
//       return '0';
//     }
//   }
// }
export class AXSeparatorPipe implements PipeTransform {
  transform(value: number | string, currency: string = '', decimal: number = 0, locale: string = AXConfig.get('layout.rtl') ? 'fa' : 'en'): string {
    return (
      new Intl.NumberFormat(locale, {
        minimumFractionDigits: 0,
        maximumFractionDigits: decimal
      }).format(Number(value)) + (currency != '' ? ' ' + currency : '')
    );
  }
}
