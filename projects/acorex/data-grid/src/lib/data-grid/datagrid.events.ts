export interface AXGridRowEvent {
    data: any;
    rowIndex: number;
    rowLevel: number;
}
export interface AXGridRowCommandEvent extends AXGridRowEvent {
    command: string;
    htmlEvent:UIEvent
}
export interface AXGridCellEvent extends AXGridRowEvent {
    column: any;
    value: any;
}


export interface AXGridRowParams extends AXGridRowEvent {
}
export interface AXGridCellParams extends AXGridCellEvent {
}

export interface AXGridRowSelectionEvent {
    items: AXGridRowEvent[];
}
