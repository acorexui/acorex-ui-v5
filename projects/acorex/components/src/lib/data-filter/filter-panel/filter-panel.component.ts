import { Component, Input, ViewChild, ViewChildren, QueryList, ViewEncapsulation, ChangeDetectionStrategy, Output, EventEmitter, ChangeDetectorRef, ElementRef, ViewContainerRef } from '@angular/core';
import { AXFilterColumnGroup, AXFilterColumnComponent, AXFilterCondition, AXFilterPredefined } from '../filter.class';
import { AXMenuItem, AXHtmlUtil, AXKeyboardEvent } from '@acorex/core';
import { AXMenuComponent } from '../../menu/menu.component';
import { AXTextBoxComponent } from '../../textbox/textbox.component';
import { AXToastService } from '../../toast/toast.service';
import { AXValueEvent } from '../../base/events.class';




@Component({
    selector: 'ax-filter-panel',
    templateUrl: './filter-panel.component.html',
    styleUrls: ['./filter-panel.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFilterPanelComponent {

    @ViewChild('panel', { static: true }) panel: ElementRef<HTMLDivElement>;
    @ViewChild('footer', { static: true }) footer: ElementRef<HTMLDivElement>;
    @ViewChild('savedList', { static: true }) savedList: ElementRef<HTMLDivElement>;
    @ViewChild('body', { static: true }) body: ElementRef<HTMLDivElement>;
    @ViewChild('menu', { static: false }) menu: AXMenuComponent;
    @ViewChild('tbxName', { static: true }) tbxName: AXTextBoxComponent;

    @ViewChildren(AXFilterColumnComponent) filters: QueryList<AXFilterColumnComponent>;

    @Input()
    groups: AXFilterColumnGroup[] = [];

    @Input()
    predefinedFilters: AXFilterPredefined[] = [];

    @Input()
    mode: 'click' | 'immediate' = 'click';

    saveItems: AXMenuItem[] = [
        {
            name: 'saveAs',
            text: 'Save',
            startIcon: 'fas fa-save',
            items: [
                {
                    name: 'save',
                    text: 'Save current'
                },
                {
                    name: 'saveAs',
                    text: 'Save as New'
                }
            ]
        },

    ];

    @Output()
    filterChange: EventEmitter<AXFilterCondition[]> = new EventEmitter<AXFilterCondition[]>();

    constructor(private cdr: ChangeDetectorRef, private toast: AXToastService) { }

    apply() {
        this.filterChange.emit(this.value);
        this.updateMenu();
    }

    public clear() {
        this.filters.forEach(e => {
            e.clear();
        });
        this.predefinedFilters.forEach(c => {
            (c as any).selected = false;
        });
        this.filterChange.emit(this.value);
        this.updateMenu();
    }

    onValueChange(e) {
        if (this.mode === 'immediate') {
            setTimeout(() => {
                this.filterChange.emit(this.value);
                this.updateMenu();
            }, 50);

        }
    }

    onCheckValueChange(v, e: AXValueEvent<boolean>) {


        if (!e.value && this.mode === 'immediate') {
            this.filters.forEach(c => {
                if (c.field === v.field) {
                    c.clear();
                }
            })
            setTimeout(() => {
                this.filterChange.emit(this.value.filter(c => c.field !== v.field));
                this.updateMenu();
            }, 50);

        }
    }

    get value(): AXFilterCondition[] {
        const con: AXFilterCondition[] = [];
        if (this.filters) {
            this.filters.forEach(e => {

                if (e.active && e.condition && ((e.condition.value != null) || (e.condition.value == null && (e.condition.condition === 'is-empty' || e.condition.condition === 'is-not-empty')))) {
                    con.push(e.condition);
                }
            });
        }
        return con;
    }



    public load(filters: AXFilterCondition[]): void {
        this.filters.forEach(e => {
            e.clear();
        });
        this.cancelSaveFilter();
        filters.forEach(f => {
            const col = this.filters.find(c => c.field === f.field);
            if (col) {
                col.setFilter(f.value, f.condition);
            }

        });
        this.filterChange.emit(this.value);
        this.updateMenu();
    }

    ngAfterViewInit(): void {
        const footer = this.panel.nativeElement.querySelector('.footer');
        if (!footer) {
            this.body.nativeElement.style.height = 'calc(100% - 110px)';
        }
        setTimeout(() => {
            if (this.predefinedFilters) {
                this.setFilterByIndex(0);
            }
            else {
                this.clear();
            }
        }, 100);
        this.applySize();
    }

    setFilterByIndex(index: number) {
        const f = this.predefinedFilters[index];
        if (f) {
            this.setFilterByName(f.name);
        }
    }

    setFilterByName(name: string) {
        const f = this.predefinedFilters.find(c => c.name === name);
        if (f) {
            this.load(f.value);
            this.predefinedFilters.forEach(c => {
                (c as any).selected = false;
            });
            (f as any).selected = true;
        }
    }



    removeFilter(f: AXFilterPredefined) {
        this.predefinedFilters = this.predefinedFilters.filter(c => c.name != f.name);
        this.updateMenu();
    }

    private get
        currentFilter(): AXFilterPredefined {
        return this.predefinedFilters.find(c => (c as any).selected);
    }


    private applySize() {
        let h = 0;
        h += this.footer.nativeElement.getBoundingClientRect().height;
        h += this.savedList.nativeElement.getBoundingClientRect().height;
        h += 10;
        this.body.nativeElement.style.height = `calc(100% - ${h}px)`;
    }

    // SAVE FILTERS

    private updateMenu(): void {
        setTimeout(() => {
            this.saveItems[0].items[0].visible = this.currentFilter != null;
            this.saveItems[0].items[1].visible = this.currentFilter != null;
            // this.menu.update();
        }, 100);
    }

    applySaveFilter() {
        const f = this.currentFilter;
        if (f) {
            // TODO
            // this.tbxName.validate().then(c => {
            //     if (c.result) {
            //         f.value = this.value;
            //         (f as any).isInEdit = false;
            //         (f as any).isNew = false;
            //         f.title = this.tbxName.value;
            //         this.toast.success('Filter saved successfully.');
            //         this.updateMenu();
            //     }
            // });
        }
    }

    cancelSaveFilter() {
        const f = this.currentFilter;
        if (f) {
            if ((f as any).isNew) {
                this.removeFilter(f);
            }
            else {
                (f as any).isInEdit = false;
            }
        }
        this.updateMenu();
    }

    onMenuItemClick(e: AXMenuItem) {
        if (e.name === 'save') {
            this.applySaveFilter();
        }
        if (e.name === 'saveAs') {
            const f = {
                name: AXHtmlUtil.getUID(),
                title: '',
                value: this.value
            };
            this.predefinedFilters.push(f);
            (f as any).isNew = true;
            this.setFilterByName(f.name);
            this.handleRenameClick(f)
        }
    }

    tbxNameOnKey(e: AXKeyboardEvent) {
        if (e.type === 'keyup' && e.key === 'Enter') {
            this.applySaveFilter();
        }
        if (e.type === 'keyup' && e.key === 'Escape') {
            this.cancelSaveFilter();
        }
    }

    handleRenameClick(f: AXFilterPredefined) {
        (f as any).isInEdit = true;
        this.cdr.detectChanges();
        setTimeout(() => {
            this.tbxName.value = f.title;
            this.tbxName.focus();
        }, 50);
    }
}
