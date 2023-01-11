import { Injectable } from '@angular/core';
import { AXNavigatorParam } from '../classes/navigator.class';

@Injectable()
export abstract class AXNavigator {
    abstract navigate(params: AXNavigatorParam);
    abstract popup(params: AXNavigatorParam);
}