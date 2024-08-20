Ext.define('Cashier.view.globalparam.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.globalparamgrid',
    store: 'Globalparam',
    bindPrefixName: 'Globalparam',
    itemId: 'Globalparam',
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
                    itemId: 'colms_name',
                    width: 300,
                    dataIndex: 'name',
                    hideable: false,
                    text: 'Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_value',
                    width: 120,
                    dataIndex: 'value',
                    hideable: false,
                    text: 'Value'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
});


