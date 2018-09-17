import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateYmdHm'
})

/**
 * 日時をフォーマット変換するパイプ
 */
export class DateYmdHm implements PipeTransform {

  transform(date: number): string {
    moment.locale("ja");
    return moment(date).format('YYYY/MM/DD(d) HH:mm');
  }

}
