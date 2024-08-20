Ext.define('Erems.view.masterprofitsharing.Grid',{
    extend:'Erems.library.template.view.Grid',
    alias:'widget.masterprofitsharinggrid',
    store:'Masterprofitsharing',
    bindPrefixName:'Masterprofitsharing',
   // itemId:'',
    newButtonLabel:'New Profit Sharing',
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
                    width: 50,
                    align: 'right',
					hidden: true,
                    dataIndex: 'profitsharing_id',
                    text: 'ID'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_code',
                    width: 75,
                    dataIndex: 'code',
                    hideable: false,
                    text: 'Kode'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_keterangan',
                    width: 200,
                    dataIndex: 'keterangan',
                    hideable: false,
                    text: 'Name'
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_tanah_permeter_awal',
                    width: 100,
                    dataIndex: 'tanah_permeter_awal',
                    hideable: false,
                    align: 'right',
                    text: 'Tanah/Meter Awal'
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_nilai_lahan_gross',
                    width: 100,
                    dataIndex: 'nilai_lahan_gross',
                    hideable: false,
                    align: 'right',
                    text: 'Nilai Lahan Gross'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_efisiensi_lahan',
                    width: 100,
                    dataIndex: 'efisiensi_lahan',
                    hideable: false,
                    align: 'right',
                    text: 'Efisiensi Lahan'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_komisi_marketing',
                    width: 100,
                    dataIndex: 'komisi_marketing',
                    hideable: false,
                    align: 'right',
                    text: 'Komisi Marketing'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_management_fee',
                    width: 100,
                    dataIndex: 'management_fee',
                    hideable: false,
                    align: 'right',
                    text: 'Management Fee'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_royalty',
                    width: 100,
                    dataIndex: 'royalty',
                    hideable: false,
					align: 'right',
                    text: 'Royalty'
                },
				
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
	
	generateDockedItems: function() {
        var me = this;

        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'create',
                        hidden: true,
                        itemId: 'btnNew',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Create',
                        text: me.newButtonLabel
                    },
                    {
                        xtype: 'button',
                        action: 'update',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit',
                        bindAction: me.bindPrefixName + 'Update'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnDelete',
                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    },
                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }
        ];
        return dockedItems;
    }
});


