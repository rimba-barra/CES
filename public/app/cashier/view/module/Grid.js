Ext.define('Cashier.view.module.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.modulegrid',
    store: 'Module',
    bindPrefixName: 'Module',
    itemId: 'Module',
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
                    itemId: 'colms_modulename',
                    width: 120,
                    dataIndex: 'modulename',
                    hideable: false,
                    text: 'Module Name'
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


