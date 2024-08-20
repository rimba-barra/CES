Ext.define('Hrd.view.holiday.CalendarGrid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.holidaycalendargrid',
    storeConfig: {
        id: 'HolidayCalendarGridStore',
        idProperty: 'calendar_id',
        extraParams: {
            mode_read:'all'
        }
    },
    columnLines: false,
    bindPrefixName: 'Holiday',
    newButtonLabel: 'New Holiday',
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {},
            defaults: {
                xtype: 'gridcolumn',
                align: 'center'


            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                   dataIndex: 'year',
                   text: 'Year'
                },
                {
                   dataIndex: 'department_department',
                   text: 'Department'
                },
                
                me.generateActionColumn()
            ]
        });
        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            },
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'select',
                        disabled: true,
                        margin: '0 5 0 0',
                        text: "Select Unit"
                    }
                ]
            }
        ];
        return dockedItems;
    },
    generateActionColumn: function() {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            hidden: true,
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'right',
            hideable: false,
            items: [
            
            ]
        };
        return ac;
    }
});