Ext.define('Erems.view.permintaankomisi.GridTargetJual', {
//    extend: 'Ext.grid.Panel',	
	extend: 'Erems.library.template.view.Grid',
	alias: 'widget.permintaankomisigridtargetjual',
	itemId: 'permintaankomisigridtargetjual',
	store: 'Permintaankomisitargetjual',
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
							text: ' Target Bulan Ini'
						}
					]
				},
				{
					xtype: 'pagingtoolbar',
					dock: 'bottom',
					id: 'targetJualPaging',
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
					renderer:  Ext.util.Format.numberRenderer('0,000.0000'),
					width: '80',
					sortable: false,
				},
				{
					xtype: 'numbercolumn',
					text: 'Bulan Ini',
//					dataIndex: 'target_' + parseInt(Ext.Date.format(me.getFormdatadetail().down('[name=permintaan_komisi_date]').getValue(), 'm')),
//					dataIndex: 'target_' + parseInt(Ext.Date.format(_myAppGlobal.getController('Permintaankomisi').getFormdatadetail().down('[name=permintaan_komisi_date]').getValue(), 'm')),
					dataIndex: 'target_bulan_ini',
					align: 'right',
					width: '120',
					sortable: false,
				},
				{
					xtype: 'numbercolumn',
					text: 'Nominal Hitung',
					dataIndex: 'sisa',
					align: 'right',
					width: '120',
					sortable: false,
				},
				{
					xtype: 'numbercolumn',
					text: 'Komisi Progresif',
					dataIndex: 'komisi_progresif',
					align: 'right',
					width: '120',
					sortable: false,
				},
			]
		});
		me.callParent(arguments);
	}
});