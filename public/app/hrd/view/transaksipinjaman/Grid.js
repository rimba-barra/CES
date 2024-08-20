Ext.define('Hrd.view.transaksipinjaman.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.transaksipinjamangrid',
    storeConfig: {
        id: 'TransaksipinjamanGridStore',
        idProperty: 'pinjaman_id',
        extraParams: {}
    },
    columnLines: false,
    bindPrefixName: 'Transaksipinjaman',
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
                   xtype:'datecolumn',
                   dataIndex: 'date',
                   format:'d-m-Y',
                   text: 'Date'
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