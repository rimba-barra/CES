Ext.define('Erems.view.mastermovereason.Grid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.mastermovereasongrid',
    store: 'Mastermovereason',
    bindPrefixName: 'Mastermovereason',
    newButtonLabel: 'New Movereason',
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
                    text: 'CODE'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code',
                    width: 100,
                    dataIndex: 'movereason',
                    hideable: false,
                    text: 'Move Reason'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});