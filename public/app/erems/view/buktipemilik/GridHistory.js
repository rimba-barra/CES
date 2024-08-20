Ext.define('Erems.view.buktipemilik.GridHistory', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.buktipemilikgridhistory',
    store: 'Buktipemilikhistory',
    bindPrefixName: 'Buktipemilikhistory',
    height: 150,
	id: 'buktipemilikhistorygrid',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            // contextMenu: me.generateContextMenu(),
            // dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer',
                    width: 40,
					resizable: true
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_purchaseletter_no',
                    width: 150,
                    dataIndex: 'purchaseletter_no',
                    text: 'Purchaseletter No'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_customer_name',
                    width: 150,
                    dataIndex: 'customer_name',
                    text: 'Customer Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_tanggal_akta_subrogasi',
                    width: 100,
                    dataIndex: 'tanggal_akta_subrogasi',
                    text: 'Tgl. Subrogasi',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_no_akta_subrogasi',
                    width: 150,
                    dataIndex: 'no_akta_subrogasi',
                    text: 'No. Akta Subrogasi'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_notaris',
                    width: 150,
                    dataIndex: 'notaris',
                    text: 'Notaris'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_approve_date',
                    width: 100,
                    dataIndex: 'approve_date',
                    text: 'Tgl. Batal',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
            ]
        });

        me.callParent(arguments);
    },
});