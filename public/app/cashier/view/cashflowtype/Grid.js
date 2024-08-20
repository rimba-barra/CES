Ext.define('Cashier.view.cashflowtype.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.cashflowtypegrid',
    store: 'Cashflowtype',
    bindPrefixName: 'Cashflowtype',
    itemId: 'Cashflowtype',
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
                    itemId: 'colms_grouptype',
                    width: 200,
                    dataIndex: 'grouptype',
                    hideable: false,
                    text: 'Group Type'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_cashflowtype_ids',
                    width: 120,
                    dataIndex: 'cashflowtype_ids',
                    hideable: false,
                    text: 'Cashflow ID'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_cashflowtype',
                    width: 200,
                    dataIndex: 'cashflowtype',
                    hideable: false,
                    text: 'Cashflow Type'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    width: 200,
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Description'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_type',
                    width: 50,
                    align: 'center',
                    dataIndex: 'dataflow',
                    hideable: false,
                    text: 'Type'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_sort',
                    width: 50,
                    align: 'center',
                    dataIndex: 'sort',
                    hideable: false,
                    text: 'Sort'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
});


