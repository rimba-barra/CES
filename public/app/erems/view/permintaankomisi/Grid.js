Ext.define('Erems.view.permintaankomisi.Grid', {
	extend: 'Erems.library.template.view.Grid',
	alias: 'widget.permintaankomisigrid',
	store: 'Permintaankomisi',
	bindPrefixName: 'Permintaankomisi',
	// itemId:'',
	newButtonLabel: 'New Permintaan Komisi',
	initComponent: function () {
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
					header: 'komisi_permintaan_id',
					dataIndex: 'komisi_permintaan_id',
					hidden: true
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_cluster_code',
//					width: 100,
					dataIndex: 'cluster_code',
					hideable: false,
					text: 'Cluster'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_block_code',
//					width: 150,
					dataIndex: 'block_code',
					hideable: false,
					text: 'Block'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_unit_number',
					width: 130,
					dataIndex: 'unit_number',
					hideable: false,
					text: 'Unit Number'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_purchaseletter_no',
					width: 130,
					dataIndex: 'purchaseletter_no',
					hideable: false,
					text: 'Purchaseletter No'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_customer_name',
					width: 130,
					dataIndex: 'customer_name',
					hideable: false,
					text: 'Customer Name'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_pricetype',
					width: 130,
					dataIndex: 'pricetype',
					hideable: false,
					text: 'Pricetype'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_perhitungan_komisi',
					width: 130,
					dataIndex: 'perhitungan_komisi',
					hideable: false,
					text: 'Perhitungan Komisi'
				},				
				{
					xtype: 'numbercolumn',
					itemId: 'colms_harga_netto',
//					width: 100,
					dataIndex: 'harga_netto',
					hideable: false,
					align: 'right',
					text: 'Harga Netto'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_harga_netto_komisi',
//					width: 100,
					dataIndex: 'harga_netto_komisi',
					hideable: false,
					align: 'right',
					text: 'Harga Netto Komisi'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_harga_total_jual',
//					width: 100,
					dataIndex: 'harga_total_jual',
					hideable: false,
					align: 'right',
					text: 'Harga Total Jual'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_total_payment',
//					width: 100,
					dataIndex: 'total_payment',
					hideable: false,
					align: 'right',
					text: 'Total Payment'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_persentase_pembayaran',
//					width: 100,
					dataIndex: 'persentase_pembayaran',
					hideable: false,
					align: 'right',
					text: 'Persentase Pembayaran (%)'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_total_komisi',
//					width: 100,
					dataIndex: 'total_komisi',
					hideable: false,
					align: 'right',
					text: 'Total Komisi Diterima'
				},
				{
                    xtype: 'datecolumn',
                    itemId: 'colms_added_date',
                    width: 100,
                    dataIndex: 'addon',
                    hideable: false,
                    text: 'Created On'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_added_by',
                    width: 100,
                    dataIndex: 'addby',
                    hideable: false,
                    text: 'Created By'
                },
				me.generateActionColumn()
			]
		});

		me.callParent(arguments);
	},
	generateActionColumn: function () {
		var me = this;
		var ac = {
			xtype: 'actioncolumn',
			hidden: true,
			itemId: 'actioncolumn',
			width: 50,
			resizable: false,
			align: 'right',
			hideable: false,
			renderer: function (value, metadata, record) {
				if (record.get('flag_delete') == 0) {
//					this.items[0].disabled = true;
					this.items[1].disabled = true;					
				} else {
//					this.items[0].disabled = false;
					this.items[1].disabled = false;
				}
			},
			items: [
				{
					text: 'Edit',
					iconCls: 'icon-edit',
					bindAction: me.bindPrefixName + 'Update',
					altText: 'Edit',
					tooltip: 'Edit',
				},
				{
					text: 'Delete',
					iconCls: 'icon-delete',
					bindAction: me.bindPrefixName + 'Delete',
					altText: 'Delete',
					tooltip: 'Delete',
					hidden:true
				},
				{
					text: 'View',
					iconCls: 'icon-search',
					bindAction: me.bindPrefixName + 'Read',
					altText: 'View',
					tooltip: 'View',
					hidden:true
				}
			]
		}
		return ac;
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
                    {
						xtype: 'button',
						action: 'view',
						itemId: 'btnView',
						bindAction: me.bindPrefixName + 'Read',
						margin: '0 5 0 0',
						//padding:5,
						iconCls: 'icon-search',
						text: 'View',
						disabled: true
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
    },
});


