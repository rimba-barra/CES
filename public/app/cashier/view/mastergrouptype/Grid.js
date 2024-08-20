Ext.define('Cashier.view.mastergrouptype.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.mastergrouptypegrid',
    store: 'Mastergrouptype',
    bindPrefixName: 'Mastergrouptype',
    itemId: 'Mastergrouptype',
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
                    itemId: 'colms_mastergrouptype',
                    width: 120,
                    dataIndex: 'mastergrouptype',
                    hideable: false,
                    text: 'Jenis usaha'
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


