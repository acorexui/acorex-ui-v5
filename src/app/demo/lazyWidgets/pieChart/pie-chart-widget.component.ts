import { Component, OnInit, NgZone } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { AXWidgetComponent } from '@acorex/layout';

am4core.useTheme(am4themes_animated);

export class AXPieChart {
  value: string;
  category: string;
  tooltip?: string;
}

@Component({
  template: ` <div id="{{ uid }}" style="width: 100%; height:100%; direction: rtl;"></div> `
})
export class PieChartWidgetComponent extends AXWidgetComponent implements OnInit {
  private chart: am4charts.PieChart;

  constructor(private zone: NgZone) {
    super();
  }

  config: AXPieChart = {
    value: 'weight',
    category: 'season',
    tooltip: '{weight} {season}'
  };

  data = [
    {
      season: 'بهار',
      weight: 81
    },
    {
      season: 'تابستان',
      weight: 165.8
    },
    {
      season: 'پاییز',
      weight: 139.9
    },
    {
      season: 'زمستان',
      weight: 128.3
    }
  ];

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      // Create chart instance
      this.chart = am4core.create(this.uid, am4charts.PieChart);

      this.chart.rtl = true;
      // Add and configure Series
      const pieSeries = this.chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = this.config.value;
      pieSeries.dataFields.category = this.config.category;

      // Let's cut a hole in our Pie chart the size of 30% the radius
      this.chart.innerRadius = am4core.percent(30);

      // Put a thick white border around each Slice
      pieSeries.slices.template.stroke = am4core.color('#fff');
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;
      // change the cursor on hover to make it apparent the object can be interacted with
      pieSeries.slices.template.tooltipText = this.config.tooltip;
      pieSeries.slices.template.cursorOverStyle = [
        {
          property: 'cursor',
          value: 'pointer'
        }
      ];

      pieSeries.alignLabels = false;
      pieSeries.labels.template.bent = false;
      pieSeries.labels.template.fontSize = '10px';
      pieSeries.labels.template.radius = 3;
      pieSeries.labels.template.padding(0, 0, 0, 0);

      pieSeries.ticks.template.disabled = true;

      // Create a base filter effect (as if it's not there) for the hover to return to
      const shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter());
      shadow.opacity = 0;

      // Create hover state
      const hoverState = pieSeries.slices.template.states.getKey('hover'); // normally we have to create the hover state, in this case it already exists

      // Slightly shift the shadow and make it more prominent on hover
      const hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter());
      hoverShadow.opacity = 0.7;
      hoverShadow.blur = 5;

      // Add a legend
      this.chart.legend = new am4charts.Legend();

      this.chart.data = this.data;
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
