Ext.define('Cashier.view.masterdocumenttype.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.masterdocumenttypegrid',
    store: 'Masterdocumenttype',
    bindPrefixName: 'Masterdocumenttype',
    itemId: 'Masterdocumenttype',
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
                    itemId: 'colms_documenttype',
                    width: 120,
                    dataIndex: 'documenttype',
                    hideable: false,
                    text: 'Document Type'
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


