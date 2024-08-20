Ext.define('Cashier.view.reportparam.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.reportparamgrid',
    store: 'Reportparam',
    bindPrefixName: 'Reportparam',
    itemId: 'Reportparam',
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
                    itemId: 'colms_projectname',
                    width: 200,
                    dataIndex: 'projectname',
                    hideable: false,
                    text: 'Project'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ptname',
                    width: 200,
                    dataIndex: 'ptname',
                    hideable: false,
                    text: 'Pt'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code',
                    width: 200,
                    dataIndex: 'code',
                    hideable: false,
                    text: 'Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_object',
                    width: 200,
                    dataIndex: 'object',
                    hideable: false,
                    text: 'Object Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_value',
                    width: 200,
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


