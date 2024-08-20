Ext.define('Erems.view.purchaseletterpbb.DetailGrid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.purchaseletterpbbdetailgrid',
    store: 'Purchaseletterpbbdetail',
   	bindPrefixName: 'Purchaseletterpbbdetail',
    newButtonLabel: 'New Detail',
    height: 200,
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
                    itemId: 'colms_nop_dibayar',
                    width: 100,
					align: 'right',
                    dataIndex: 'nop_dibayar',
                    hideable: false,
                    text: 'NOP. Dibayar'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_tahun',
                    width: 75,
                    dataIndex: 'tahun',
                    hideable: false,
                    text: 'Tahun'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_pokok',
                    width: 100,
					align: 'right',
                    dataIndex: 'pokok',
                    hideable: false,
                    text: 'POKOK'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_denda',
                    width: 100,
					align: 'right',
                    dataIndex: 'denda',
                    hideable: false,
                    text: 'DENDA'
                },
				{
                    xtype: 'numbercolumn',
                    itemId: 'colms_total',
                    width: 100,
					align: 'right',
                    dataIndex: 'total',
                    hideable: false,
                    text: 'TOTAL'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_tahun_bayar',
                    width: 75,
                    dataIndex: 'tahun_bayar',
                    hideable: false,
                    text: 'Tahun Bayar'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_keterangan',
                    width: 75,
                    dataIndex: 'keterangan',
                    hideable: false,
                    text: 'Keterangan'
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
                        action: 'create_detail',
                       	itemId: 'btnNew',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Add New'
                    },
					{
                        xtype: 'button',
                        action: 'edit_detail',
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit',
						disabled: true
                    },
					{
                        xtype: 'button',
                        action: 'delete_detail',
                        itemId: 'btnDelete',
                        margin: '0 5 0 0',
                        iconCls: 'icon-delete',
                        text: 'Delete',
						disabled: true
                    }
                ]
            }
        ];
        return dockedItems;
    }
	
});