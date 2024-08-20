Ext.define('Hrd.view.registertrainingbytype.EmployeeGrid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.registertrainingbytypeemployeegrid',
    storeConfig: {
        id: 'ScheduleTrainingEmployeeGridStore',
        idProperty: 'employee_id',
        extraParams: {
            mode_read:'employee'
        }
    },
    columnLines: false,
    bindPrefixName: 'Registertrainingbytype',
    newButtonLabel: 'New',
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
                   dataIndex: 'employee_nik',
                   text: 'N.I.K'
                },
                {
                   dataIndex: 'employee_name',
                   text: 'Employee Name',
                   width:200
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
                        text: "Select Employee"
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