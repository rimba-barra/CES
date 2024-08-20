Ext.define('Hrd.view.perjalanandinas.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.perjalanandinasgrid',
    storeConfig: {
        id: 'PerjalanandinasGridStore',
        idProperty: 'perjalanandinas_id',
        extraParams: {}
    },
    columnLines: false,
    bindPrefixName: 'Perjalanandinas',
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
                   xtype:'datecolumn',
                   format:'d-m-Y',
                   dataIndex: 'perjalanandinas_date',
                   width:100,
                   text:'Tanggal'
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