Ext.define('Erems.view.permintaankomisi.GridSalesInfo', {
//    extend: 'Ext.grid.Panel',	
	extend: 'Erems.library.template.view.Grid',
	alias: 'widget.salesinfogrid',
	itemId: 'salesinfogrid',
	store: 'Masterpencairankomisidetail',
	height: 150,
	initComponent: function () {
		var me = this;
		Ext.applyIf(me, {
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'top',
					height: 28,
					items: [
						{
							text: 'Add New',
							itemId: 'btnAdd',
							iconCls: 'icon-add',
							action: 'create',
//							bindAction: 'MasterpencairankomisiDetailCreate'
						},
						{
							text: 'Edit',
							itemId: 'btnEdit',
							iconCls: 'icon-edit',
							action: 'update',
							disabled: true,
//							bindAction: 'MasterpencairankomisiDetailUpdate'
						},
						{
							text: 'Delete Selected',
							itemId: 'btnDelete',
							iconCls: 'icon-delete',
							action: 'destroy',
							disabled: true,
//							bindAction: 'MasterpencairankomisiDetailDelete'
						},
					]
				}
			],
			enableColumnHide: false,
			enableColumnMove: false,
			sortableColumns: false,
			viewConfig: {markDirty: false},
			columnLines: true,
			selModel: Ext.create('Ext.selection.CheckboxModel', {}),
			columns: [
//				{xtype: 'rownumberer'},
				{
					xtype: 'gridcolumn',
					text: 'Penerima Komisi',
					dataIndex: 'penerima_komisi',
					width: '20%',
				},
				{
					xtype: 'gridcolumn',
					text: 'Nama Penerima',
					dataIndex: 'reff_name',
					width: '25%',
				},
				{
					xtype: 'numbercolumn',
					text: 'Nilai Komisi',
					dataIndex: 'komisi_value',
					align: 'right',
					renderer:  Ext.util.Format.numberRenderer('0,000.0000'),
					width: '20%'
				},
				{
					xtype: 'gridcolumn',
					text: 'Keterangan',
					dataIndex: 'keterangan',
					width: '35%'
				},
			]
		});
		me.callParent(arguments);
	}
});