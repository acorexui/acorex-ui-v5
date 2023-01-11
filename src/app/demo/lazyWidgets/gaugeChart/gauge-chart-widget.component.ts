import { Component, OnInit, Input } from '@angular/core';

import { NgZone } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { AXWidgetComponent } from '@acorex/layout';
import { AXValidation, AXValidationRules, propertyEditor } from '@acorex/components';
import { AXTranslator } from '@acorex/core';
import { AXConditionalColorModel } from 'projects/acorex/components/src/public-api';

am4core.useTheme(am4themes_animated);

export class AXGaugeRange {
  title: string;
  color: string;
  minValue: number;
  maxValue: number;
}

export class AXGaugeChartData {
  @propertyEditor({
    editorClass: 'ax/editors/number',
    title: AXTranslator.get('common.value'),
    order: 3,
  })
  value: number;

  @propertyEditor({
    editorClass: 'ax/editors/number',
    title: 'Min Value',
    order: 1,
  })
  minValue: number;

  @propertyEditor({
    editorClass: 'ax/editors/number',
    title: 'Max Value',
    order: 2,
  })
  maxValue: number;

  @propertyEditor({
    editorClass: 'ax/editors/text',
    title: AXTranslator.get('common.title'),
    order: 0,
    editorOptions: {
      readonly: true
    }
  })
  title: string;

  @propertyEditor({
    editorClass: 'ax/editors/range',
    title: 'دامنه ها',
    order: 5,
  })
  ranges: AXGaugeRange[];



  get isConfigured(): boolean {
    return this.value && (this.ranges && this.ranges.length > 0);
  }
}

export class AXGaugeChartConfig {
  items: AXGaugeChartData[] = [];
}

@Component({
  template: `
    <div class="widget-title">{{title}}</div>
    <div id="{{ uid }}" style="width: 100%; height:100%;"></div>
  `,
  host: { style: ' height:100%;' }
})
export class GaugeChartWidgetComponent extends AXWidgetComponent implements OnInit {


  // @propertyEditor({
  //   editorClass: 'ax/editors/number',
  //   title: 'common.value',
  //   order: 3,
  //   editorOptions: {
  //     minValue: '$$minValue',
  //     maxValue: '$$maxValue'
  //   }
  // })
  value: number;

  // @propertyEditor({
  //   editorClass: 'ax/editors/number',
  //   title: 'Min Value',
  //   order: 1,
  //   editorOptions: {
  //     validation: {
  //       rules: [{ type: 'required' }]
  //     }
  //   }
  // })
  minValue: number;

  // @propertyEditor({
  //   editorClass: 'ax/editors/number',
  //   title: 'Max Value',
  //   order: 2,
  //   editorOptions: {
  //     validation: (context, p) => {
  //       const rules: any = [{ type: 'required' }];
  //       rules.push({
  //         type: 'callback',
  //         message: 'این مقدار باید بزرگتر از (کمترین مقدار) باشد',
  //         value: () => {
  //           return Number(context.data.minValue) < p.value;
  //         }
  //       });
  //       return { rules };
  //     }
  //   }
  // })
  maxValue: number;

  // @propertyEditor({
  //   editorClass: 'ax/editors/text',
  //   title: 'common.title',
  //   order: 0,
  //   editorOptions: {
  //     validation: {
  //       rules: [{ type: 'required' }]
  //     }
  //   }
  // })
  title: string;

  // @propertyEditor({
  //   editorClass: 'ax/editors/range',
  //   title: 'دامنه ها',
  //   order: 5,
  // })
  ranges: AXGaugeRange[];


  // @propertyEditor({
  //   editorClass: 'ax/editors/conditional-color',
  //   title: 'فرمت نمایشی شرطی',
  //   order: 6,
  //   editorOptions: {
  //     dataType: (context, b) => {
  //       return context.data.visible ? 'boolean' : 'string';
  //     },

  //   }
  // })
  rules: AXConditionalColorModel[] = [];


  // @propertyEditor({
  //   editorClass: 'ax/editors/switch',
  //   title: 'نمایش',
  //   order: 7,
  //   editorOptions: {
  //   }
  // })
  visible: boolean = true;

  @propertyEditor({
    editorClass: 'ax/editors/select',
    title: 'رنگ زمینه',
    order: 6,
    editorOptions: {
      valueField: 'id',
      validation: {
        rules: [
          {
            type: 'required'
          }
        ]
      },
      remoteOperation: false,
      items: (a, b) => {
        return (e) => {
          const data = Array.from({ length: 100 }, (v, i) => {
            return {
              id: i, text: `Item ${i + 1}`
            };
          })
          const result = {
            items: data,//.slice(e.skip, e.skip + e.take),
            totalCount: 100
          };
          debugger
          return data;
        };
      }
    }
  })
  aaa: string;

  // @propertyEditor({
  //   editorClass: 'ax/editors/date',
  //   title: 'تاریخ',
  //   order: 10,
  //   editorOptions: {
  //     type: 'jalali',
  //     clearButton: true
  //   }
  // })
  sampleDate: Date;

  get isConfigured(): boolean {
    return this.value && (this.ranges && this.ranges.length > 0);
  }


  private chart: am4charts.GaugeChart;
  private hand: am4charts.ClockHand;
  private label: am4core.Label;
  private label2: am4core.Label;


  constructor(private zone: NgZone) {
    super();
  }

  private lookUpGrade(value, grades: AXGaugeRange[]) {
    for (let i = 0; i < grades.length; i++) {
      if (grades[i].minValue < value && grades[i].maxValue >= value) {
        return grades[i];
      }
    }
    return grades[0];
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.isBusy = false;
    if (this.isConfigured) {
      this.redraw();
    }
  }



  redraw() {
    this.isBusy = true;
    this.zone.runOutsideAngular(async () => {
      //const val = Number(await this.getValue('value'));

      if (this.chart) {
        this.chart.dispose();
        this.chart = null;
      }
      this.chart = am4core.create(this.uid, am4charts.GaugeChart);
      this.chart.rtl = true;
      this.chart.responsive.enabled = true;
      this.chart.hiddenState.properties.opacity = 0;
      this.chart.fontSize = 11;
      this.chart.innerRadius = am4core.percent(80);
      this.chart.resizable = false;
      this.chart.padding(0, 0, 0, 0);
      this.chart.margin(0, 0, 0, 0);

      //const item = this.config;
      const axis = this.chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
      axis.min = Number(this.minValue);
      axis.max = Number(this.maxValue);
      axis.strictMinMax = true;
      axis.renderer.radius = am4core.percent(80);
      axis.renderer.inside = true;
      axis.renderer.line.strokeOpacity = 0.1;
      axis.renderer.ticks.template.disabled = false;
      axis.renderer.ticks.template.strokeOpacity = 1;
      axis.renderer.ticks.template.strokeWidth = 0.5;
      axis.renderer.ticks.template.length = 5;
      axis.renderer.grid.template.disabled = true;
      axis.renderer.labels.template.radius = am4core.percent(15);
      axis.renderer.labels.template.fontSize = '0.9em';
      /**
       * Axis for ranges
       */

      const axis2 = this.chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
      axis2.min = Number(this.minValue);
      axis2.max = Number(this.maxValue);
      axis2.strictMinMax = true;
      axis2.renderer.labels.template.disabled = true;
      axis2.renderer.ticks.template.disabled = true;
      axis2.renderer.grid.template.disabled = false;
      axis2.renderer.grid.template.opacity = 0.5;
      axis2.renderer.labels.template.bent = true;
      axis2.renderer.labels.template.fill = am4core.color('#000');
      axis2.renderer.labels.template.fontWeight = 'bold';
      axis2.renderer.labels.template.fillOpacity = 0.3;

      /**
       * Ranges
       */

      for (const r of this.ranges) {
        const range = axis2.axisRanges.create();
        range.axisFill.fill = am4core.color(r.color);
        range.axisFill.fillOpacity = 0.8;
        range.axisFill.zIndex = -1;
        range.value = r.minValue > Number(this.minValue) ? r.minValue : Number(this.minValue);
        range.endValue = r.maxValue < Number(this.maxValue) ? r.maxValue : Number(this.maxValue);
        range.grid.strokeOpacity = 0;
        // range.stroke = am4core.color(grading.color).lighten(-0.1);
        // range.label.text = r.title; // .toUpperCase();
        // range.label.location = 0.5;
        // range.label.inside = true;
        // range.label.fontFamily = 'Tahoma';
        // range.label.reverseOrder = false;
        // // range.label.radius = am4core.percent(10);
        // range.label.paddingBottom = -5; // ~half font size
        // range.label.fontSize = '1em';
      }

      //const matchingGrade = this.lookUpGrade(val, this.ranges);

      /**
       * Label 1
       */

      this.label = this.chart.radarContainer.createChild(am4core.Label);
      this.label.isMeasured = false;
      this.label.fontSize = '2em';
      this.label.x = am4core.percent(50);
      this.label.paddingBottom = 15;
      this.label.horizontalCenter = 'middle';
      this.label.verticalCenter = 'bottom';
      // // label.dataItem = data;
      // label.text = val.toFixed(1);
      // // label.text = "{score}";
      // label.fill = am4core.color(matchingGrade.color);

      /**
       * Label 2
       */

      this.label2 = this.chart.radarContainer.createChild(am4core.Label);
      this.label2.isMeasured = false;
      this.label2.fontSize = '1.5em';
      this.label2.horizontalCenter = 'middle';
      this.label2.verticalCenter = 'bottom';


      /**
       * Hand
       */

      this.hand = this.chart.hands.push(new am4charts.ClockHand());
      this.hand.axis = axis2;
      this.hand.innerRadius = am4core.percent(55);
      this.hand.startWidth = 8;
      this.hand.pin.disabled = true;

      this.hand.fill = am4core.color('#444');
      this.hand.stroke = am4core.color('#000');

      // legens
      // const legend = new am4charts.Legend();
      // legend.isMeasured = false;
      // legend.y = am4core.percent(87);
      // legend.scale = 0.7;
      // //      legend.fontSize=8;
      // legend.verticalCenter = 'bottom';
      // legend.parent = this.chart.chartContainer;
      // legend.data = [];
      // this.props.ranges.forEach(p => {
      //   legend.data.push(
      //     {
      //       name: p.title,
      //       fill: p.color
      //     },
      //   );
      // });
      this.refresh();
    });

    setTimeout(() => {
      this.isBusy = false;
    }, 500);
  }

  refresh() {
    super.refresh();
    this.isBusy = true;
    this.zone.runOutsideAngular(async () => {
      const val = Number(await this.getValue('value'));
      this.hand.value = val;
      //
      const matchingGrade = this.lookUpGrade(val, this.ranges);
      this.label.text = val.toFixed(1);
      this.label.fill = am4core.color(matchingGrade.color);

      this.label2.text = matchingGrade.title.toUpperCase();
      this.label2.fill = am4core.color(matchingGrade.color);
      this.hand.value = val;
    });
    setTimeout(() => {
      this.isBusy = false;
    }, 500);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
        this.chart = null;
      }
    });
  }
}
