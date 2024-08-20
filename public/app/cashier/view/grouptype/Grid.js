Ext.define('Cashier.view.grouptype.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.grouptypegrid',
    store: 'Grouptype',
    bindPrefixName: 'Grouptype',
    itemId: 'Grouptype',
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
                    width: 120,
                    dataIndex: 'grouptype',
                    hideable: false,
                    text: 'Group Type'
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


