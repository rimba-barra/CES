Ext.define('Cashier.view.configdb.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.configdbgrid',
    store: 'Configdb',
    bindPrefixName: 'Configdb',
    itemId: 'Configdb',
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
                    itemId: 'colms_base_db',
                    width: 120,
                    dataIndex: 'base_db',
                    hideable: false,
                    text: 'Base Database'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_for_apps',
                    width: 120,
                    dataIndex: 'for_apps',
                    hideable: false,
                    text: 'For Application'
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


