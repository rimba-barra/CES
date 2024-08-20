Ext.define('Cashier.view.code.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.codegrid',
    store: 'Code',
    bindPrefixName: 'Code',
    itemId: 'Code',
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
                    itemId: 'colms_code',
                    width: 120,
                    dataIndex: 'code',
                    hideable: false,
                    text: 'Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_objectname',
                    width: 200,
                    dataIndex: 'objectname',
                    hideable: false,
                    text: 'Object'
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
                    itemId: 'colms_rptfile',
                    width: 200,
                    dataIndex: 'rptfile',
                    hideable: false,
                    text: 'Report file'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
});


