Ext.define('Erems.view.masterim.GridDetail', {
//    extend: 'Ext.grid.Panel',	
	extend: 'Erems.library.template.view.Grid',
	alias: 'widget.masterimgriddetail',
	itemId: 'masterimgriddetail',
	store: 'Masterimdetail',
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
//							bindAction: 'MasterimDetailCreate'
						},
						{
							text: 'Edit',
							itemId: 'btnEdit',
							iconCls: 'icon-edit',
							action: 'update',
//							bindAction: 'MasterimDetailUpdate'
						},
						{
							text: 'Delete Selected',
							itemId: 'btnDelete',
							iconCls: 'icon-delete',
							action: 'destroy',
//							bindAction: 'MasterimDetailDelete'
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
					text: 'internalmemo_detail_id',
					dataIndex: 'internalmemo_detail_id',
					hidden: true,
				},
				{
					xtype: 'gridcolumn',
					text: 'Group',
					dataIndex: 'group_name',
					width: '20%',
				},
				{
					xtype: 'gridcolumn',
					text: 'Reward',
					dataIndex: 'reward',
					width: 'auto',
					width: '20%'
				},
				{
					xtype: 'numbercolumn',
					text: 'Amount',
					dataIndex: 'amount',
					align: 'right',
					width: '20%',
					renderer:  Ext.util.Format.numberRenderer('0,000.0000'),
				},
				{
					xtype: 'gridcolumn',
					text: 'Notes',
					dataIndex: 'notes',
					width: '25%',
				},
			]
		});
		me.callParent(arguments);
	}
});