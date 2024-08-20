Ext.define('Erems.view.profitsharingproses.Grid', {
	extend: 'Erems.library.template.view.Grid',
	alias: 'widget.profitsharingprosesgrid',
	store: 'Profitsharingproses',
	bindPrefixName: 'Profitsharingproses',
	// itemId:'',
	newButtonLabel: 'New Process',
	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			contextMenu: me.generateContextMenu(),
			dockedItems: me.generateDockedItems(),
			viewConfig: {

			},
//			selModel: Ext.create('Ext.selection.CheckboxModel', {
//
//			}),
			columns: [
				{
					xtype: 'rownumberer'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_purchaseletter_id',
					width: 50,
					align: 'right',
					hidden: true,
					dataIndex: 'purchaseletter_id',
					text: 'ID'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_cluster',
					width: 100,
					hideable: false,
					dataIndex: 'cluster_code',
					text: 'Cluster Code'
				},
//				{
//					xtype: 'gridcolumn',
//					itemId: 'colms_block',
//					width: 60,
//					dataIndex: 'block',
//					hideable: false,
//					text: 'Block'
//				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_unit_number',
					width: 60,
					dataIndex: 'unit_number',
					hideable: false,
					text: 'Unit'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_purchase_date',
					width: 120,
					dataIndex: 'purchase_date',
					hideable: false,
					text: 'Purchase Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_customer_name',
					width: 150,
					dataIndex: 'customer_name',
					hideable: false,
					text: 'Customer Name'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_harga_netto',
					width: 150,
					dataIndex: 'harga_netto',
					align: 'right',
					hideable: false,
					text: 'Harga Netto'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_harga_total_jual',
					width: 150,
					dataIndex: 'harga_total_jual',
					align: 'right',
					hideable: false,
					text: 'Harga Total Jual'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_total_payment',
					width: 150,
					dataIndex: 'total_payment',
					align: 'right',
					hideable: false,
					text: 'Total Payment'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_rs_tanah_partner',
					width: 150,
					dataIndex: 'rs_tanah_partner',
					align: 'right',
					hideable: false,
					text: 'RS-Tanah Partner'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_rs_bangunan_partner',
					width: 150,
					dataIndex: 'rs_bangunan_partner',
					align: 'right',
					hideable: false,
					text: 'RS-Bangunan Partner'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_rs_tanah_ciputra',
					width: 150,
					dataIndex: 'rs_tanah_ciputra',
					align: 'right',
					hideable: false,
					text: 'RS-Tanah Ciputra'
				}
			]
		});

		me.callParent(arguments);
	},

	generateDockedItems: function () {
		var me = this;

		var dockedItems = [
			{
				xtype: 'toolbar',
				dock: 'top',
				height: 28,
				items: [
					{
						xtype: 'button',
						action: 'pre_process',
						// disabled: true,
						//hidden: true,
						itemId: 'btnPreProcess',
						margin: '0 5 0 0',
						iconCls: 'icon-new',
						text: 'Pre Process',
						//bindAction: me.bindPrefixName + 'Update'
					},
					{
						xtype: 'button',
						action: 'new_process',
						// disabled: true,
//						hidden: true,
						itemId: 'btnNew',
						margin: '0 5 0 0',
						iconCls: 'icon-new',
//						bindAction: me.bindPrefixName + 'Create',
//						bindAction: 'ProfitsharingprosesCreate',
						text: me.newButtonLabel
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