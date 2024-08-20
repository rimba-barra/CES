Ext.define('Erems.view.revenuesharingprint.Grid', {
	extend: 'Erems.library.template.view.Grid',
	alias: 'widget.revenuesharingprintgrid',
	store: 'Revenuesharingprint',
	bindPrefixName: 'Revenuesharingprint',
	// itemId:'',
	newButtonLabel: '',
	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			contextMenu: me.generateContextMenu(),
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'top',
					height: 28,
					items: [
						{
							xtype: 'button',
							action: 'exportExcel',
//							hidden: true,
							itemId: 'btnExport',
							margin: '0 5 0 0',
							//padding:5,
							iconCls: 'icon-print',
//							bindAction: me.bindPrefixName + 'Read',
							text: 'Export to Excel',
//							disabled: true
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
			],
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
					header: 'Purchaseletter_ID',
					dataIndex: 'purchaseletter_id',
					hideable: false,
					hidden: true
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_cluster_code',
					//width: '100%',
					dataIndex: 'cluster_code',
					hideable: false,
					text: 'Cluster Code'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_unit_number',
					//width: '100%',
					dataIndex: 'unit_number',
					hideable: false,
					text: 'Unit Number'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_type_name',
					//width: '100%',
					dataIndex: 'type_name',
					hideable: false,
					text: 'Type'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_land_size',
//					width: '12%',
					dataIndex: 'land_size',
					hideable: false,
					text: 'Land Size',
					align: 'right'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_building_size',
//					width: '12%',
					dataIndex: 'building_size',
					hideable: false,
					text: 'Building Size',
					align: 'right'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_purchase_date',
					//width: '100%',
					dataIndex: 'purchase_date',
					hideable: false,
					text: 'Purchase Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y'),
					align: 'center'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_customer_name',
					width: '15%',
					dataIndex: 'customer_name',
					hideable: false,
					text: 'Customer Name'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_harga_netto',
//					width: '12%',
					dataIndex: 'harga_netto',
					hideable: false,
					text: 'Harga Netto',
					align: 'right'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_harga_total_jual',
//					width: '12%',
					dataIndex: 'harga_total_jual',
					hideable: false,
					text: 'Harga Total Jual',
					align: 'right'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_process_date',
					//width: '100%',
					dataIndex: 'process_date',
					hideable: false,
					text: 'Tanggal Proses',
					renderer: Ext.util.Format.dateRenderer('d-m-Y'),
					align: 'center'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_payment',
//					width: '12%',
					dataIndex: 'payment',
					hideable: false,
					text: 'Penerimaan',
					align: 'right'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_rs_total_partner_dpp',
//					width: '12%',
					dataIndex: 'rs_total_partner_dpp',
					hideable: false,
					text: 'RS-Partner DPP',
					align: 'right'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_rs_total_partner_ppn',
//					width: '12%',
					dataIndex: 'rs_total_partner_ppn',
					hideable: false,
					text: 'RS-Partner PPN',
					align: 'right'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_rs_total_partner_pph',
//					width: '12%',
					dataIndex: 'rs_total_partner_pph',
					hideable: false,
					text: 'RS-Partner PPH',
					align: 'right'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_rs_total_ciputra_dpp',
//					width: '12%',
					dataIndex: 'rs_total_ciputra_dpp',
					hideable: false,
					text: 'RS-Partner DPP',
					align: 'right'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_rs_total_ciputra_ppn',
//					width: '12%',
					dataIndex: 'rs_total_ciputra_ppn',
					hideable: false,
					text: 'RS-Partner PPN',
					align: 'right'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_rs_total_ciputra_pph',
//					width: '12%',
					dataIndex: 'rs_total_ciputra_pph',
					hideable: false,
					text: 'RS-Partner PPH',
					align: 'right'
				}
			]
		});

		me.callParent(arguments);
	}
});


