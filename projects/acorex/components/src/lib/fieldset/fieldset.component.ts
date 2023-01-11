import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AXBaseSizableComponent, AXElementSize } from '../base/element.class';

@Component({
    selector: 'ax-fieldset',
    templateUrl: './fieldset.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('visibilityChanged', [
            state(
                'shown',
                style({
                    height: '*',
                    opacity: 1
                })
            ),
            state(
                'hidden',
                style({
                    height: '0px',
                    opacity: 0,
                    padding: 0
                })
            ),
            transition('Void => *', animate('0ms')),
            transition('shown => hidden', animate('200ms')),
            transition('hidden => shown', animate('200ms'))
        ])
    ]
})
export class AXFieldsetComponent implements AXBaseSizableComponent {
    @Input()
    size: AXElementSize = "md";

    @Input()
    caption: string = '';

    @Input()
    allowCollapse: boolean = false;

    collapsed: boolean = false;
    toggle() {
        if (this.allowCollapse) {
            this.collapsed = !this.collapsed;
        }
    }
}
