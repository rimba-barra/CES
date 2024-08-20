Ext.define('Hrd.view.uangdinas.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.uangdinasgrid',
    storeConfig: {
        id: 'UangdinasGridStore',
        idProperty: 'uangdinas_id',
        extraParams: {}
    },
    columnLines: false,
    bindPrefixName: 'Uangdinas',
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
                   dataIndex: 'mastersk_nomor',
                   width:200,
                   text: 'Nomor SK'
                },
                {
                   dataIndex: 'is_default',
                   width:75,
                   text: 'Is Default'
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