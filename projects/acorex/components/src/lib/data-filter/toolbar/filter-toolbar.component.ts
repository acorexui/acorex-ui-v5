import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { AXHtmlUtil, AXMenuItem } from '@acorex/core';
import { AXFilterPanelComponent } from '../filter-panel/filter-panel.component';
import { AXToolbarItem } from '../../toolbar/toolbar-item';
import { AXToolbarMenuComponent } from '../../toolbar/menu/toolbar-menu.component';
import { AXMenuComponent } from '../../menu/menu.component';


@Component({
    selector: 'ax-toolbar-filter-view',
    templateUrl: './filter-toolbar.component.html',
    styleUrls: ['./filter-toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: AXToolbarItem, useExisting: AXToolbarFilterViewComponent }]
})
export class AXToolbarFilterViewComponent {
    constructor() { }
    _uid: string = AXHtmlUtil.getUID();

    @ViewChild('menu', { static: true }) menu: AXToolbarMenuComponent;
    @ViewChild('contextMenu', { static: true }) contextMenu: AXMenuComponent;

    @Input()
    filterPanel: AXFilterPanelComponent;

    contextMenuItems: AXMenuItem[] = [
        // {
        //     name: 'addFolder',
        //     startIcon: 'fas fa-folder',
        //     text: 'New Folder',
        // },
        {
            name: 'remove',
            startIcon: 'fas fa-trash',
            text: 'Delete',
        },
    ];



    menuItems: AXMenuItem[] = [
        {
            name: 'root',
            startIcon: 'fas fa-filter',
            text: 'Select All',
            items: [
                {
                    name: 'selectAll',
                    style: 'f',
                    text: 'Select All',
                },
                // {
                //     split: true,
                //     name: 'addFolder',
                //     startIcon: 'fas fa-folder',
                //     text: 'New Folder',
                // },
                {
                    divider: true,
                    name: 'save',
                    startIcon: 'fas fa-save',
                    text: 'Save'
                },
                {
                    divider: true,
                    name: 'saveAs',
                    startIcon: 'fas fa-save',
                    text: 'Save As...'
                }
            ]
        }

    ];

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.selectAll();
            this.addPredefinedList();
        }, 100);
    }

    addPredefinedList() {
        this.filterPanel.predefinedFilters.forEach(c => {
            const item = {
                name: c.name,
                text: c.title,
                type: 'f',
                startIcon: 'fas',
                data: c.value,
                style: this._uid,
                uid: AXHtmlUtil.getUID()
            };
            this.root.items.splice(1, 0, item);
        });
        this.update();
    }

    public selectAll(): void {
        this.setCurrent(this.root.items[0]);
        this.filterPanel.clear();
        this.update();
        this.menu.close();
        // this.contextMenu.close();
    }

    itemClick(e: AXMenuItem) {

        if (e.style === 'f') {
            if (e.name === 'selectAll') {
                this.selectAll();
            }
            else {
                this.setCurrent(e);
                this.filterPanel.load(e.data);
            }
        }
        else {
            if (e.name === 'saveAs') {
                const name = prompt('Please enter the name;');
                if (name) {
                    const item = {
                        text: name,
                        type: 'f',
                        style: this._uid,
                        startIcon: 'fas',
                        data: this.filterPanel.value,
                        uid: AXHtmlUtil.getUID()
                    };
                    this.root.items.splice(1, 0, item);
                    this.setCurrent(item);
                }

            }
            if (e.name === 'save') {
                const selected = this.findSelected();
                if (selected) {
                    selected.data = this.filterPanel.value;
                }
            }
        }
        this.update();
    }

    private findSelected(): AXMenuItem {
        return this.root.items.find(c => c.selected);
    }

    private get root(): AXMenuItem {
        return this.menuItems[0];
    }

    public update(): void {
        this.menu.update();
        setTimeout(() => {
            // this.contextMenu.update();
        }, 100);

    }

    private setCurrent(e: AXMenuItem) {
        this.root.text = e.text;
        this.root.items.filter(c => c.style === 'f').forEach(c => {
            c.selected = false;
            c.startIcon = 'fas';
        });
        e.selected = true;
        e.startIcon = 'fas fa-check';
        this.root.items.find(c => c.name === 'save').visible = e.name !== 'selectAll';
    }

    onCtxClick(e: AXMenuItem) {
        const target = this.contextMenu.currentTarget as HTMLElement;
        const menuId = target.getAttribute('data-uid');
        if (e.name === 'remove' && menuId) {
            this.root.items = this.root.items.filter(c => c.uid !== menuId);
            this.selectAll();
        }
    }
}
