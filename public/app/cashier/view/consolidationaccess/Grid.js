Ext.define('Cashier.view.consolidationaccess.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.consolidationaccessgrid',
    store: 'Consolidationaccess',
    bindPrefixName: 'Consolidationaccess',
    itemId: 'Consolidationaccess',
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
                    flex: 1,
                    dataIndex: 'user_email',
                    hideable: false,
                    text: 'User Email'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_value',
                    flex: 1,
                    dataIndex: 'group_consolidation',
                    hideable: false,
                    text: 'Group Consolidation'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
});


