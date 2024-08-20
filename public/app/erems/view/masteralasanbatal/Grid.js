Ext.define('Erems.view.masteralasanbatal.Grid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.masteralasanbatalgrid',
    store: 'Masteralasanbatal',
    bindPrefixName: 'Masteralasanbatal',
    newButtonLabel: 'New Cancelreason',
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
                    dataIndex: 'cancelreason',
                    hideable: false,
                    text: 'Cancel reason'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});