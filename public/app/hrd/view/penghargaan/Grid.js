Ext.define('Hrd.view.penghargaan.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.penghargaangrid',
    storeConfig: {
        id: 'PenghargaanGridStore',
        idProperty: 'penghargaan_id',
        extraParams: {}
    },
    columnLines: false,
    bindPrefixName: 'Penghargaan',
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
                   width:200,
                   text: 'Nama Karyawan'
                },
                {
                   dataIndex: 'jenispenghargaan_code',
                   width:100,
                   text: 'Jenis Penghargaan'
                },
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