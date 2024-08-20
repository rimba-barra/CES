Ext.define('Cashier.view.tipepph.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.tipepphgrid',
    store: 'Tipepph',
    bindPrefixName: 'Tipepph',
    itemId: 'Tipepph',
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
                    itemId: 'colms_tipepph',
                    width: 120,
                    dataIndex: 'tipepph',
                    hideable: false,
                    text: 'Tipe PPH'
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


