Ext.define('Cashier.view.bankloan.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.bankloangrid',
    store: 'Bankloan',
    bindPrefixName: 'Bankloan',
    itemId: 'Bankloan',
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
                    itemId: 'colms_periode',
                    width: 120,
                    dataIndex: 'periode',
                    hideable: false,
                    text: 'Periode'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_pt_name',
                    width: 300,
                    dataIndex: 'pt_name',
                    hideable: false,
                    text: 'PT'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_subholding',
                    width: 120,
                    dataIndex: 'subholding',
                    hideable: false,
                    text: 'Subholding'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
});


