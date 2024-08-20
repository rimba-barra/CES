Ext.define('Cashier.view.mtest.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.mtestgrid',
    store: 'Mtest',
    bindPrefixName: 'Mtest',
    itemId: 'Mtest',
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
                    itemId: 'colms_host',
                    width: 120,
                    dataIndex: 'host',
                    hideable: false,
                    text: 'Hostname'
                },
               
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
});


