Ext.define('Erems.view.mastersiteplanlegend.GridDetail', {
//    extend: 'Ext.grid.Panel',	
	extend: 'Erems.library.template.view.Grid',
	alias: 'widget.mastersiteplanlegendgriddetail',
	itemId: 'mastersiteplanlegendgriddetail',
	store: 'Mastersiteplanlegenddetail',
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
//							bindAction: 'MastersiteplanlegendDetailCreate'
						},
						{
							text: 'Edit',
							itemId: 'btnEdit',
							iconCls: 'icon-edit',
							action: 'update',
//							bindAction: 'MastersiteplanlegendDetailUpdate'
						},
						{
							text: 'Delete Selected',
							itemId: 'btnDelete',
							iconCls: 'icon-delete',
							action: 'destroy',
//							bindAction: 'MastersiteplanlegendDetailDelete'
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
					text: 'siteplanlegenddetail_id',
					dataIndex: 'siteplanlegenddetail_id',
					hidden: true,
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_rule',
					width: '95%',
					dataIndex: 'display_rule',
					hideable: false,
					text: 'Rule'
				},
			]
		});
		me.callParent(arguments);
	}
});