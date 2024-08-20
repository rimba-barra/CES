Ext.define('Cashier.view.generatefile.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.generatefilegrid',
    store: 'Generatefile',
    bindPrefixName: 'Generatefile',
    itemId: 'Generatefile',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_generatefile',
                    width: 120,
                    dataIndex: 'generatefile',
                    hideable: false,
                    text: 'Jenis usaha'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    width: 200,
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Description'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
});


