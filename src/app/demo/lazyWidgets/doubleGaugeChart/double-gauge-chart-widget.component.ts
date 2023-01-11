import { Component, OnInit } from '@angular/core';

import { NgZone } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { AXWidgetComponent } from '@acorex/layout';
import { AXGaugeChartConfig, AXGaugeChartData } from '../gaugeChart/gauge-chart-widget.component';

am4core.useTheme(am4themes_animated);

@Component({
  template: ` <div id="{{ uid }}" style="width: 100%; height:100%;"></div> `
})
export class DoubleGaugeChartWidgetComponent extends AXWidgetComponent implements OnInit {
  items: AXGaugeChartConfig = new AXGaugeChartConfig();

  private chart: am4charts.GaugeChart;
  constructor(private zone: NgZone) {
    super();
  }

  ngOnInit() {

    this.items.items[0] = new AXGaugeChartData();
    this.items.items[0].value = 23;
    this.items.items[0].minValue = 10;
    this.items.items[0].maxValue = 70;
    this.items.items[0].title = 'BMI 1';
    //
    this.items.items[1] = new AXGaugeChartData();
    this.items.items[1].value = 60;
    this.items.items[1].minValue = 20;
    this.items.items[1].maxValue = 10;
    this.items.items[1].title = 'BMI 2';
    // items: [
    //   {
    //     minValue: 10,
    //     maxValue: 70,
    //     title: 'BMI 1',
    //     value: 23
    //   },
    //   {
    //     minValue: 20,
    //     maxValue: 100,
    //     title: 'BMI 2',
    //     value: 60
    //   }
    // ]
    //}

  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      // create chart
      this.chart = am4core.create(this.uid, am4charts.GaugeChart);
      this.chart.exporting.menu = new am4core.ExportMenu();
      this.chart.hiddenState.properties.opacity = 0;
      this.chart.rtl = true;

      const labelList = new am4core.ListTemplate(new am4core.Label());
      labelList.template.isMeasured = false;
      labelList.template.background.strokeWidth = 1;
      labelList.template.fontSize = 15;
      labelList.template.padding(5, 10, 5, 10);
      labelList.template.y = am4core.percent(50);
      labelList.template.horizontalCenter = 'middle';

      const axis = this.chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
      axis.min = this.items.items[0].minValue;
      axis.max = this.items.items[0].maxValue;
      axis.strictMinMax = true;
      axis.renderer.inside = true;
      // axis.renderer.ticks.template.inside = true;
      // axis.stroke = chart.colors.getIndex(3);
      axis.renderer.radius = am4core.percent(97);
      // axis.renderer.radius = 80;
      axis.renderer.line.strokeOpacity = 1;
      axis.renderer.line.strokeWidth = 5;
      axis.renderer.line.stroke = this.chart.colors.getIndex(0);
      axis.renderer.ticks.template.disabled = false;
      axis.renderer.ticks.template.stroke = this.chart.colors.getIndex(0);
      axis.renderer.labels.template.radius = 25;
      axis.renderer.labels.template.fontSize = '10px';
      axis.renderer.ticks.template.strokeOpacity = 1;
      axis.renderer.grid.template.disabled = true;
      axis.renderer.ticks.template.length = 10;
      axis.hiddenState.properties.opacity = 1;
      axis.hiddenState.properties.visible = true;
      axis.setStateOnChildren = true;
      axis.renderer.hiddenState.properties.endAngle = 180;

      const hand = this.chart.hands.push(new am4charts.ClockHand());
      hand.fill = axis.renderer.line.stroke;
      hand.stroke = axis.renderer.line.stroke;
      hand.axis = axis;
      hand.pin.radius = 14;
      hand.startWidth = 10;
      hand.showValue(this.items.items[0].value);

      const label = labelList.create();
      label.parent = this.chart.chartContainer;
      label.x = am4core.percent(40);
      label.background.stroke = this.chart.colors.getIndex(0);
      label.fill = this.chart.colors.getIndex(0);
      label.text = '0';
      label.text = Math.round(hand.value).toString();

      const axis2 = this.chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
      axis2.min = this.items.items[1].minValue;
      axis2.max = this.items.items[1].maxValue;
      axis2.strictMinMax = true;
      axis2.renderer.line.strokeOpacity = 1;
      axis2.renderer.line.strokeWidth = 5;
      axis2.renderer.line.stroke = this.chart.colors.getIndex(3);
      axis2.renderer.ticks.template.stroke = this.chart.colors.getIndex(3);
      axis2.renderer.ticks.template.disabled = false;
      axis2.renderer.ticks.template.strokeOpacity = 1;
      axis2.renderer.grid.template.disabled = true;
      axis2.renderer.ticks.template.length = 10;
      axis2.hiddenState.properties.opacity = 1;
      axis2.hiddenState.properties.visible = true;
      axis2.setStateOnChildren = true;
      axis2.renderer.hiddenState.properties.endAngle = 180;

      const hand2 = this.chart.hands.push(new am4charts.ClockHand());
      hand2.fill = axis2.renderer.line.stroke;
      hand2.stroke = axis2.renderer.line.stroke;
      hand2.axis = axis2;
      hand2.pin.radius = 10;
      hand2.startWidth = 10;
      hand2.showValue(this.items.items[1].value);

      const label2 = labelList.create();
      label2.parent = this.chart.chartContainer;
      label2.x = am4core.percent(60);
      label2.background.stroke = this.chart.colors.getIndex(3);
      label2.fill = this.chart.colors.getIndex(3);
      label2.text = '0';
      label2.text = Math.round(hand2.value).toString();

      const legend = new am4charts.Legend();
      legend.isMeasured = false;
      legend.y = am4core.percent(87);
      legend.verticalCenter = 'bottom';
      legend.parent = this.chart.chartContainer;
      legend.data = [
        {
          name: this.items.items[0].title,
          fill: this.chart.colors.getIndex(0)
        },
        {
          name: this.items.items[1].title,
          fill: this.chart.colors.getIndex(3)
        }
      ];

      const charts = this.chart;
      legend.itemContainers.template.events.on('hit', (ev) => {
        const index = ev.target.dataItem.index;

        if (!ev.target.isActive) {
          charts.hands.getIndex(index).hide();
          charts.xAxes.getIndex(index).hide();
          labelList.getIndex(index).hide();
        } else {
          charts.hands.getIndex(index).show();
          charts.xAxes.getIndex(index).show();
          labelList.getIndex(index).show();
        }
      });
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
