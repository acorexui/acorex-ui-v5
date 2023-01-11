import { Component, OnInit, NgZone } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

import { AXWidgetComponent } from '@acorex/layout';

am4core.useTheme(am4themes_animated);

export class AXBarXAxis {
  fieldName: string;
  invert?: boolean;
}
export class AXBarYAxis {
  fieldName: string;
  invert?: boolean;
}
export class AXBarSeries {
  xField: string;
  yField: string;
  title: string;
  color?: string;
  tooltip?: string;
}
export class AXBarChart {
  xAxis: AXBarXAxis;
  yAxis: AXBarYAxis;
  series: AXBarSeries;
}

@Component({
  template: `<div id="{{ uid }}" style="width: 100%; height:100%; direction: ltr;"></div>`
})
export class BarChartWidgetComponent extends AXWidgetComponent implements OnInit {
  private chart: am4charts.XYChart;

  constructor(private zone: NgZone) {
    super();
  }
  config: AXBarChart = {
    xAxis: {
      fieldName: 'month'
    },
    yAxis: {
      fieldName: 'weight'
    },
    series: {
      xField: 'month',
      yField: 'weight',
      title: 'weight',
      tooltip: '{weight}(kg) {month} '
    }
  };

  data = [
    {
      weight: 50,
      month: 'فروردین'
    },
    {
      weight: 60,
      month: 'اردیبهشت'
    },
    {
      weight: 55,
      month: 'خرداد'
    },
    {
      weight: 70,
      month: 'تیر'
    },
    {
      weight: 72,
      month: 'مرداد'
    },
    {
      weight: 65,
      month: 'شهریور'
    },
    {
      weight: 69,
      month: 'مهر'
    },
    {
      weight: 50,
      month: 'آبان'
    },
    {
      weight: 70,
      month: 'آذر'
    },
    {
      weight: 60,
      month: 'دی'
    }
    ,
    {
      weight: 70,
      month: 'بهمن'
    },
    {
      weight: 65,
      month: 'اسفند'
    }
  ];

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.chart = am4core.create(this.uid, am4charts.XYChart);
      this.chart.scrollbarX = new am4core.Scrollbar();

      // Add data
      this.chart.data = this.data;

      // Create axes
      const categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = this.config.xAxis.fieldName;
      // categoryAxis.renderer.inversed = true
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 30;
      categoryAxis.renderer.labels.template.horizontalCenter = 'right';
      categoryAxis.renderer.labels.template.verticalCenter = 'middle';
      categoryAxis.renderer.labels.template.rotation = 270;
      categoryAxis.tooltip.disabled = true;
      categoryAxis.renderer.minHeight = 110;

      const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.minWidth = 50;

      // Create series
      const series = this.chart.series.push(new am4charts.ColumnSeries());
      series.sequencedInterpolation = true;
      series.dataFields.valueY = this.config.series.yField;
      series.dataFields.categoryX = this.config.series.xField;
      series.tooltipText = this.config.series.tooltip;
      series.columns.template.strokeWidth = 0;

      series.tooltip.pointerOrientation = 'vertical';

      series.columns.template.column.cornerRadiusTopLeft = 10;
      series.columns.template.column.cornerRadiusTopRight = 10;
      series.columns.template.column.fillOpacity = 0.8;

      // on hover, make corner radiuses bigger
      const hoverState = series.columns.template.column.states.create('hover');
      hoverState.properties.cornerRadiusTopLeft = 0;
      hoverState.properties.cornerRadiusTopRight = 0;
      hoverState.properties.fillOpacity = 1;

      series.columns.template.adapter.add('fill', (fill, target) => {
        return this.chart.colors.getIndex(target.dataItem.index);
      });

      // Cursor
      this.chart.cursor = new am4charts.XYCursor();
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
