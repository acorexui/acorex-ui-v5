export class AXBaseMenuItem {
  uid?: string = new Date().getTime().toString();
  id?: string;
  name?: string;
  text?: string;
  tooltip?: string;
  tooltipPlacement?: 'top' | 'right' | 'bottom' | 'left';
  icon?: string;
  visible?: boolean = true;
  disable?: boolean = false;
  selected?: boolean = false;
  groupName?: string;
  data?: any;
  style?: string = 'ax light';
  orderIndex?: number = 0;
  endIcon?: string;
  startIcon?: string;
  onClick?: (e?: any) => void;
}

export class AXMenuItem extends AXBaseMenuItem {
  items?: AXMenuItem[];
  parentId?: string;
  divider?: boolean = false;
}

export class AXButtonItem extends AXBaseMenuItem {
  dropdown?: boolean = false;
  submitBehavior?: boolean = false;
  cancelBehavior?: boolean = false;
}

export class AXCheckItem {
  text?: string;
  value?: any;
  selected?: boolean;
}
