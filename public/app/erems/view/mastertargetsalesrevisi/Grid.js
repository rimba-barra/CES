Ext.define('Erems.view.mastertargetsalesrevisi.Grid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.MastertargetsalesrevisiGrid',
	itemId: 'MastertargetsalesrevisiGrid',
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
							xtype: 'button',
							text: 'Generate 1 Year Target',
							itemId: 'btnGenerateTargetSalesrevisi',
							iconCls: 'icon-add'
						},
						{
							xtype: 'button',
							text: 'Edit',
							itemId: 'btnEdit',
							iconCls: 'icon-edit',
							bindAction: 'MastertargetsalesrevisiUpdate',
							disabled: true
						},
						{
							xtype: 'button',
							text: 'Print / Save',
							itemId: 'btnPrint',
							iconCls: 'icon-print',
							bindAction: 'MastertargetsalesrevisiPrint'
						},
						{
							xtype: 'button',
							action: 'export_excel',
							itemId: 'btnPrint',
							margin: '0 5 0 0',
							iconCls: 'icon-print',
							text: 'Export Excel'
						}
					]
				},
				{
					xtype: 'toolbar',
					layout: 'hbox',
					width: '100%',
					bodyStyle: 'background:none;border:0px',
					items: [
						{xtype: 'splitter', width: 30},
						{
							xtype: 'radiogroup',
							fieldLabel: 'View Grid',
							name: 'radiogroup_view_grid',
							columns: 3,
							width: '90%',
							items: []
						}
					]

				},
				{
					xtype: 'pagingtoolbar',
					dock: 'bottom',
					displayInfo: true,
					store: me.getStore(),
					plugins: Ext.create('PagingToolbarPageSize')
				}
			],
			viewConfig: {markDirty: false},
			columnLines: true,
			selModel: Ext.create('Ext.selection.CheckboxModel', {}),
			plugins: [
				Ext.create('Ext.grid.plugin.CellEditing', {
					clicksToEdit: 1
				})
			],
			columns: [
				{xtype: 'rownumberer'},
				{
					xtype: 'gridcolumn',
					text: 'ID',
					dataIndex: 'targetsales_revisi_id',
					hidden: true,
					hideable: false,
					width: 40,
					align: 'right'
				},
				{
					xtype: 'gridcolumn',
					text: 'Tahun',
					dataIndex: 'tahun',
					hideable: false,
					sortable: false,
					width: 60
				},
				{
					xtype: 'gridcolumn',
					text: 'Bulan',
					dataIndex: 'bulan',
					hideable: false,
					sortable: false,
					width: 100,
				},
//				{xtype: 'gridcolumn', hideable: false, sortable: false, width: 150, align: 'right', cls: 'text-center', cls: 'text-center', text: 'Collection<br/>Target (Rp)', dataIndex: 'collection_target_v_read', },
//				{
//					xtype: 'actioncolumn',
//					hideable: false,
//					resizable: false,
//					sortable: false,
//					width: 50,
//					align: 'right',
//					items: [
//						{
//							text: 'Edit',
//							iconCls: 'icon-edit',
//							bindAction: 'MastertargetsalesUpdate',
//							altText: 'Edit',
//							tooltip: 'Edit'
//						}
//					]
//				}
			]
		});
		me.callParent(arguments);
	}
});