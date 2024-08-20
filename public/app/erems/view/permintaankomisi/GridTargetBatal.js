Ext.define('Erems.view.permintaankomisi.GridTargetBatal', {
//    extend: 'Ext.grid.Panel',	
	extend: 'Erems.library.template.view.Grid',
	alias: 'widget.permintaankomisigridtargetbatal',
	itemId: 'permintaankomisigridtargetbatal',
	store: 'Permintaankomisitargetbatal',
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
							text: ' Target Komisi Yang Digunakan Unit Sebelumnya'
						}
					]
				},
				{
					xtype: 'pagingtoolbar',
					dock: 'bottom',
					id: 'targetBatalPaging',
					width: 360,
					hideRefresh: true,
					displayInfo: true,
					store: this.getStore()
				}
			],
			columns: [
				{
					xtype: 'gridcolumn',
					text: 'Code',
					dataIndex: 'code',
					width: '50',
					sortable: false,
				},
				{
					xtype: 'gridcolumn',
					text: 'Tahun',
					dataIndex: 'tahun',
					width: '50',
					sortable: false,
				},
				{
					xtype: 'numbercolumn',
					text: 'Persentase',
					dataIndex: 'persentase',
					align: 'right',
					renderer: Ext.util.Format.numberRenderer('0,000.0000'),
					width: '80',
					sortable: false,
				},
				{
					xtype: 'numbercolumn',
					text: 'Bulan Ini',
					dataIndex: 'target_bulan_ini',
					align: 'right',
					width: '120',
					sortable: false,
				},
				{
					xtype: 'numbercolumn',
					text: 'Nominal Hitung',
					dataIndex: 'sisa_target_bulan_ini',
					align: 'right',
					width: '120',
					sortable: false,
				}
			]
		});
		me.callParent(arguments);
	}
});