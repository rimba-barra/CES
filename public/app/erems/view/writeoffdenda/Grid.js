Ext.define('Erems.view.writeoffdenda.Grid', {
	extend         : 'Erems.library.template.view.Grid',
	alias          : 'widget.writeoffdendagrid',
	store          : 'Writeoffdenda',
	bindPrefixName : 'Writeoffdenda',
	newButtonLabel : 'New Write Off',
	initComponent  : function() {
		var me = this;

		Ext.applyIf(me, {
			contextMenu : me.generateContextMenu(),
			dockedItems : me.generateDockedItems(),
			viewConfig  : {},
			selModel    : Ext.create('Ext.selection.CheckboxModel', {}),
			columns     : [
				{
					xtype : 'rownumberer'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_writeoff_no',
					width     : 150,
					dataIndex : 'writeoff_no',
					text      : 'Write Off No'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_addon',
					width     : 150,
					dataIndex : 'addon',
					hideable  : false,
					text      : 'Write Off Date',
					renderer  : Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_cluster',
					width     : 100,
					align     : 'right',
					dataIndex : 'cluster',
					text      : 'Cluster'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_block',
					width     : 60,
					dataIndex : 'block',
					hideable  : false,
					text      : 'Block'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_unit_number',
					width     : 60,
					dataIndex : 'unit_number',
					hideable  : false,
					text      : 'Unit'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_customer_name',
					width     : 150,
					dataIndex : 'customer_name',
					hideable  : false,
					text      : 'Customer Name'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_purchaseletter_no',
					width     : 150,
					dataIndex : 'purchaseletter_no',
					hideable  : false,
					text      : 'Purchase Letter No.'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_note',
					width     : 300,
					dataIndex : 'note',
					hideable  : false,
					text      : 'Note'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_addon1',
					width     : 80,
					dataIndex : 'addon',
					hideable  : false,
					text      : 'Addon',
					renderer  : Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_addby_name',
					width     : 150,
					dataIndex : 'addby_name',
					hideable  : false,
					text      : 'Addby'
				},
				
				me.generateActionColumn()
			]
		});

		me.callParent(arguments);
	},
	
	generateDockedItems: function() {
		var me = this;

		var dockedItems = [
			{
				xtype  : 'toolbar',
				dock   : 'top',
				height : 28,
				items  : [
					{
						xtype      : 'button',
						action     : 'create',
						hidden     : true,
						itemId     : 'btnNew',
						margin     : '0 5 0 0',
						iconCls    : 'icon-new',
						bindAction : me.bindPrefixName+'Create',
						text       : me.newButtonLabel
					},
					{
						xtype      : 'button',
						action     : 'update',
						disabled   : true,
						hidden     : true,
						itemId     : 'btnEdit',
						margin     : '0 5 0 0',
						iconCls    : 'icon-edit',
						text       : 'Edit',
						bindAction : me.bindPrefixName+'Update'
					},
					// {
					// 	xtype      : 'button',
					// 	action     : 'destroy',
					// 	disabled   : true,
					// 	hidden     : true,
					// 	itemId     : 'btnDelete',
					// 	bindAction : me.bindPrefixName+'Delete',
					// 	iconCls    : 'icon-delete',
					// 	text       : 'Delete Selected'
					// },
					{
						xtype      : 'button',
						action     : 'print',
						hidden     : true,
						itemId     : 'btnPrint',
						margin     : '0 5 0 0',
						bindAction : me.bindPrefixName+'Print',
						iconCls    : 'icon-print',
						text       : 'Print / Save'
					}
				]
			},
			{
				xtype       : 'pagingtoolbar',
				dock        : 'bottom',
				width       : 360,
				displayInfo : true,
				store       : this.getStore()
			}
		];
		return dockedItems;
	},
	generateActionColumn: function() {
		var me = this;
		var ac = {
			xtype     : 'actioncolumn',
			hidden    : true,
			itemId    : 'actioncolumn',
			width     : 50,
			resizable : false,
			align     : 'right',
			hideable  : false,
			items     : [
				{
					text       : 'Edit',
					iconCls    : 'icon-edit',
					bindAction : me.bindPrefixName+'Update',
					altText    : 'Edit',
					tooltip    : 'Edit'
				},
				// {
				// 	text       : 'Delete',
				// 	iconCls    : 'icon-delete',
				// 	bindAction : me.bindPrefixName+'Delete',
				// 	altText    : 'Delete',
				// 	tooltip    : 'Delete'
				// },
				{
					text       : 'View',
					iconCls    : 'icon-search',
					className  : 'view',
					bindAction : me.bindPrefixName + 'Read',
					altText    : 'View',
					tooltip    : 'View'
				}
			]
		};
		return ac;
	}
});