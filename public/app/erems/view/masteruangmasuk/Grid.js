Ext.define('Erems.view.masteruangmasuk.Grid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.masteruangmasukgrid',
    store: 'Masteruangmasuk',
    bindPrefixName: 'Masteruangmasuk',
    newButtonLabel: 'New Cashsources',
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
                    dataIndex: 'cashsources',
                    hideable: false,
                    text: 'Cash Source'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});