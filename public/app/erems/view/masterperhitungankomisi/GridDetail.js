Ext.define('Erems.view.masterperhitungankomisi.GridDetail', {
//    extend: 'Ext.grid.Panel',	
	extend: 'Erems.library.template.view.Grid',
	alias: 'widget.masterperhitungankomisigriddetail',
	itemId: 'masterperhitungankomisigriddetail',
	store: 'Masterperhitungankomisidetail',
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
//							bindAction: 'MasterperhitungankomisiDetailCreate'
						},
						{
							text: 'Edit',
							itemId: 'btnEdit',
							iconCls: 'icon-edit',
							action: 'update',
							disabled: true,
//							bindAction: 'MasterperhitungankomisiDetailUpdate'
						},
						{
							text: 'Delete Selected',
							itemId: 'btnDelete',
							iconCls: 'icon-delete',
							action: 'destroy',
							disabled: true,
//							bindAction: 'MasterperhitungankomisiDetailDelete'
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
					text: 'komisi_perhitungan_detail_id',
					dataIndex: 'komisi_perhitungan_detail_id',
					hidden: true,
				},
				{
					xtype: 'gridcolumn',
					text: 'Price Type id',
					dataIndex: 'pricetype_id',
					width: 'auto',
					hidden: true,
				},
				{
					xtype: 'gridcolumn',
					text: 'Pricetype',
					dataIndex: 'pricetype_display',
					width: '20%',
				},
				{
					xtype: 'gridcolumn',
					text: 'Collection',
					dataIndex: 'collection_name',
					width: 'auto',
				},
				{
					xtype: 'numbercolumn',
					text: '% Uang Masuk',
					dataIndex: 'persen_uangmasuk_coll',
					align: 'right',
					width: '20%'
				},
				{
					xtype: 'numbercolumn',
					text: '% Pencairan Komisi',
					dataIndex: 'persen_pencairan_komisi',
					align: 'right',
					width: '20%'
				},
			]
		});
		me.callParent(arguments);
	}
});