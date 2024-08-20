Ext.define('Erems.view.masternotaris.Grid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.masternotarisgrid',
    store: 'Masternotaris',
    bindPrefixName: 'Masternotaris',
    newButtonLabel: 'New Notaris',
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
                    itemId: 'colms_code',
                    width: 60,
                    align: 'right',
                    dataIndex: 'code',
                    text: 'Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_notaris',
                    width: 100,
                    dataIndex: 'notaris',
                    hideable: false,
                    text: 'Notaris name'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_alamat',
                    width: 100,
                    dataIndex: 'alamat',
                    hideable: false,
                    text: 'Address'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_city',
                    width: 100,
                    dataIndex: 'city_name',
                    hideable: false,
                    text: 'City'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_telp',
                    width: 100,
                    dataIndex: 'telp',
                    hideable: false,
                    text: 'Telp'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});