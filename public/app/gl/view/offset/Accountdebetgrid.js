Ext.define('Gl.view.offset.Accountdebetgrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.accountdebetgrid',
    store: 'Accountdebet',
    bindPrefixName: 'Offset',
    newButtonLabel: 'Add New',
    title: 'Grid Debet (Max 4 row)',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            //contextMenu: me.generateContextMenu(),
           // dockedItems: me.generateDockedItems(),
            viewConfig: {},
            //selModel: Ext.create('Ext.selection.CheckboxModel', {}),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coa_debet',
                    width: 150,
                    dataIndex: 'coa_debet',
                    hideable: false,
                    text: 'COA CODE'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_name_debet',
                    width: 300,
                    dataIndex: 'name_debet',
                    hideable: false,
                    text: 'COA DESC'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_type_debet',
                    width: 60,
                    dataIndex: 'type_debet',
                    hideable: false,
                    text: 'TYPE'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_kelsub_debet',
                    width: 300,
                    dataIndex: 'kelsub_debet',
                    hideable: false,
                    text: 'SUB GROUP'
                },
               // me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});


