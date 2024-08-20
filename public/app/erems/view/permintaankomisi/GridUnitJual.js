Ext.define('Erems.view.permintaankomisi.GridUnitJual', {
//    extend: 'Ext.grid.Panel',	
	extend: 'Erems.library.template.view.Grid',
	alias: 'widget.permintaankomisigridunitjual',
	itemId: 'permintaankomisigridunitjual',
	store: 'Permintaankomisilistunit',
	bindPrefixName: 'Permintaankomisi',
	height: 150,
	initComponent: function () {
		var me = this;
		Ext.applyIf(me, {
			enableColumnHide: false,
			enableColumnMove: false,
			sortableColumns: false,
			viewConfig: {markDirty: false},
			columnLines: true,
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'top',
					height: 28,
					items: [
						{
							xtype: 'label',
							text: ' List Unit Terjual Sales Yang Bersangkutan'
						}
					]
				},
				{
					xtype: 'pagingtoolbar',
					dock: 'bottom',
					id: 'unitJualPaging',
					width: 360,
					hideRefresh: true,
					displayInfo: true,
					store: this.getStore()
				}
			],
			columns: [
				{
					xtype: 'datecolumn',
					text: 'First Purchase Date',
					dataIndex: 'firstpurchase_date',
					format: 'd-m-Y',
					width: '130',
					sortable: false,
				},
				{
					xtype: 'gridcolumn',
					text: 'Cluster Code',
					dataIndex: 'cluster_code',
					width: '80',
					sortable: false,
				},
				{
					xtype: 'gridcolumn',
					text: 'Nomor Unit',
					dataIndex: 'unit_number',
					width: '80',
					sortable: false,
				},
				{
					xtype: 'numbercolumn',
					text: 'Harga Netto',
					dataIndex: 'harga_netto',
					align: 'right',
					width: '130',
					sortable: false,
				},
//				{
//					xtype: 'numbercolumn',
//					text: 'Harga Netto Komisi',
//					dataIndex: 'harga_netto_komisi',
//					align: 'right',
//					width: '150',
//					sortable: false,
//				},
				{
					xtype: 'gridcolumn',
					text: 'Sudah dibuat Permintaan Komisi?',
					dataIndex: 'status_permintaan_komisi',
					width: '150',
					sortable: false,
				},
				{
					xtype: 'datecolumn',
					text: 'Addon',
					dataIndex: 'addon',
					format: 'd-m-Y',
					width: '130',
					sortable: false,
				},
			]
		});
		me.callParent(arguments);
	}
});