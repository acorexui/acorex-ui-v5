import { Component, OnInit, NgZone } from '@angular/core';
import { AXWidgetComponent } from '@acorex/layout';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

export class AXLinearXAxis {
  fieldName: string;
  invert?: boolean;
}

export class AXLinearYAxis {
  fieldName: string;
  invert?: boolean;
}

export class AXLinearSeries {
  xField: string;
  yField: string;
  title: string;
  tooltip?: string;
}
export class AXLinearChart {
  xAxis: AXLinearXAxis;
  yAxis: AXLinearYAxis;
  series: AXLinearSeries[];
}

export class AXLinearData {}

@Component({
  template: ` <div id="{{ uid }}" style="width: 100%; height:100%; direction: ltr"></div> `
})
export class LinearChartWidgetComponent extends AXWidgetComponent implements OnInit {
  config: AXLinearChart = {
    xAxis: {
      fieldName: 'month',
      invert: false
    },
    yAxis: {
      fieldName: 'weight',
      invert: false
    },
    series: [
      {
        xField: 'month',
        yField: 'weight',
        title: 'Weight(kg)',
        tooltip: '{weight}(kg) {month}'
      },
      {
        xField: 'month',
        yField: 'height',
        title: 'Height(m)',
        tooltip: '{weight}(kg) {month}'
      }
    ]
  };

  data = [
    {
      weight: '50',
      height: '150',
      month: 'فروردین'
    },
    {
      weight: '60',
      height: '160',
      month: 'اردیبهشت'
    },
    {
      weight: '55',
      height: '110',
      month: 'خرداد'
    },
    {
      weight: '70',
      height: '150',
      month: 'تیر'
    },
    {
      weight: '72',
      height: '180',
      month: 'مرداد'
    },
    {
      weight: '65',
      height: '190',
      month: 'شهریور'
    },
    {
      weight: '69',
      height: '160',
      month: 'مهر'
    },
    {
      weight: '50',
      height: '150',
      month: 'آبان'
    },
    {
      weight: '70',
      height: '155',
      month: 'آذر'
    },
    {
      weight: '60',
      height: '150',
      month: 'دی'
    }
    ,
    {
      weight: '70',
      height: '90',
      month: 'بهمن'
    },
    {
      weight: '65',
      height: '80',
      month: 'اسفند'
    }
  ];
  private chart: am4charts.XYChart;
  constructor(private zone: NgZone) {
    super();
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.chart = am4core.create(this.uid, am4charts.XYChart);
      this.chart.data = this.data;

      // Create category axis
      // this.chart.rtl = true;
      // for (const i of this.config.xAxis) {
      const categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = this.config.xAxis.fieldName;
      // categoryAxis.renderer.opposite = true;
      categoryAxis.renderer.inversed = this.config.xAxis.invert;
      // }

      // for (const i of this.config.yAxis) {
      // Create value axis
      const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.inversed = this.config.yAxis.invert;
      valueAxis.title.text = this.config.yAxis.fieldName;
      valueAxis.renderer.minLabelPosition = 0.01;
      // }

      for (const i of this.config.series) {
        // Create series
        const series = this.chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = i.yField;
        series.dataFields.categoryX = i.xField;
        series.name = i.title;
        series.bullets.push(new am4charts.CircleBullet());
        // series.stroke = am4core.color(i.color == null ? this.chart.colors.getIndex(0) : i.color);
        // series.strokeWidth = i.strockWidth;
        // series.tooltipText = 'Place taken by {name} in {categoryX}: {valueY}';
        series.tooltipText = i.tooltip;
        series.legendSettings.valueText = '{valueY}';
        series.visible = true;
      }

      // Add chart cursor
      this.chart.cursor = new am4charts.XYCursor();
      this.chart.cursor.behavior = 'zoomY';

      this.chart.legend = new am4charts.Legend();
    });
    setTimeout(() => {
      this.isBusy = false;
    }, 500);
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
