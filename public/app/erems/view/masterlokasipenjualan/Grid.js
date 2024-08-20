Ext.define('Erems.view.masterlokasipenjualan.Grid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.masterlokasipenjualangrid',
    store: 'Masterlokasipenjualan',
    bindPrefixName: 'Masterlokasipenjualan',
    newButtonLabel: 'New Saleslocation',
    initComponent: function() {
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
                    itemId: 'colms_id',
                    width: 60,
                    align: 'right',
                    dataIndex: 'code',
                    text: 'Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code',
                    width: 100,
                    dataIndex: 'saleslocation',
                    hideable: false,
                    text: 'Sales Location'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});