Ext.define('Hrd.view.transferdata.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.transferdatagrid',
    storeConfig: {
        id: 'TransferdataGridStore',
        idProperty: 'overtime_id',
        extraParams: {}
    },
    columnLines: false,
    bindPrefixName: 'Transferdata',
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
                   dataIndex: 'employee_employee_name',
                   text: 'Employee Name'
                },
                {
                   xtype:'numbercolumn',
                   dataIndex: 'value',
               
                   text: 'Value'
                }
            ]
        });
        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var me = this;
        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [


                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }
        ];
        return dockedItems;
    }
});