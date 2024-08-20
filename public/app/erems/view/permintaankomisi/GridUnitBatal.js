Ext.define('Erems.view.permintaankomisi.GridUnitBatal', {
//    extend: 'Ext.grid.Panel',	
	extend: 'Erems.library.template.view.Grid',
	alias: 'widget.permintaankomisigridunitbatal',
	itemId: 'permintaankomisigridunitbatal',
	store: 'Permintaankomisilistunitbatal',
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
							text: ' List Unit Yang Batal'
						}
					]
				},
				{
					xtype: 'pagingtoolbar',
					dock: 'bottom',
					id: 'unitBatalPaging',
					width: 360,
					hideRefresh: true,
					displayInfo: true,
					store: this.getStore()
				}
			],
			selModel: Ext.create('Ext.selection.CheckboxModel', {
				mode: 'SINGLE'
			}),
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
					xtype: 'numbercolumn',
					text: 'Komisi Sudah Cair',
					dataIndex: 'komisi_cair',
					align: 'right',
					width: '130',
					sortable: false,
				},
			]
		});
		me.callParent(arguments);
	}
});