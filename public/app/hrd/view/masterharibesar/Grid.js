Ext.define('Hrd.view.masterharibesar.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.masterharibesargrid',
    store: 'Masterharibesar',
    bindPrefixName: 'Masterharibesar',
    newButtonLabel: 'New Hari Besar',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            defaults: {
                xtype: 'gridcolumn',
            },
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                
                {
                    xtype: 'datecolumn',
                    dataIndex: 'holiday_date',
                    text: 'Date',
                    format: 'd-m-Y',
                },
                {
                    dataIndex: 'holiday_name',
                    text: 'Holiday Name'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});