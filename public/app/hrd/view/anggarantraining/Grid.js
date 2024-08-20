Ext.define('Hrd.view.anggarantraining.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.anggarantraininggrid',
    storeConfig: {
        id: 'AnggarantrainingGridStore',
        idProperty: 'anggarantraining_id',
        extraParams: {}
    },
    columnLines: false,
    bindPrefixName: 'Anggarantraining',
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
                   dataIndex: 'nilai',
               
                   text: 'Nilai Anggaran'
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