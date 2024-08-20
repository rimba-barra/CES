Ext.define('Gl.view.offset.Accountcreditgrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.accountcreditgrid',
    store: 'Accountcredit',
    bindPrefixName: 'Offset',
    newButtonLabel: 'Add New',
    title: 'Grid Credit (Max 4 row)',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            //  contextMenu: me.generateContextMenu(),
            // dockedItems: me.generateDockedItems(),
            viewConfig: {},
            // selModel: Ext.create('Ext.selection.CheckboxModel', {}),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coa_credit',
                    width: 150,
                    dataIndex: 'coa_credit',
                    hideable: false,
                    text: 'COA CODE'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_name_credit',
                    width: 300,
                    dataIndex: 'name_credit',
                    hideable: false,
                    text: 'COA DESC'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_type_credit',
                    width: 60,
                    dataIndex: 'type_credit',
                    hideable: false,
                    text: 'TYPE'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_kelsub_credit',
                    width: 300,
                    dataIndex: 'kelsub_credit',
                    hideable: false,
                    text: 'SUB GROUP'
                },
            ]
        });
        me.callParent(arguments);
    }
});


