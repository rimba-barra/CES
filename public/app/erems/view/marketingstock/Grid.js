Ext.define('Erems.view.marketingstock.Grid',{
	extend: 'Erems.library.template.view.GridDS2',
	storeConfig: {
		id          : 'MarketingStockGridStore',
		idProperty  : 'marketstock_id',
		extraParams : {}
	},
	alias          :'widget.marketingstockgrid',
	bindPrefixName :'Marketingstock',
	newButtonLabel :'New Marketstock',
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
					itemId    : 'colms_id',
					width     : 60,
					align     : 'right',
					dataIndex : 'cluster_code',
					text      : 'Code'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_code',
					width     : 100,
					dataIndex : 'unit_unit_number',
					hideable  : false,
					text      : 'Unit Number'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_kawasanname',
					width     : 100,
					dataIndex : 'cluster_cluster',
					hideable  : false,
					text      : 'Kawasan name'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_nama_type',
					width     : 100,
					dataIndex : 'nama_type',
					hideable  : false,
					text      : 'Type'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_landsize',
					width     : 80,
					dataIndex : 'unit_land_size',
					hideable  : false,
					text      : 'Land Size'
				},
				{
					itemId: 'colms_kelebihan',
					xtype     : 'gridcolumn',
					width     : 100,
					dataIndex : 'unit_kelebihan',
					hideable  : false,
					text      : 'Land Over size'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_building_size',
					width     : 80,
					dataIndex : 'unit_building_size',
					hideable  : false,
					text      : 'Building Size'
				},
				{
					xtype     : 'numbercolumn',
					itemId    : 'colms_harga_jual_tunai',
					width     : 120,
					dataIndex : 'hargajual_tunai',
					hideable  : false,
					text      : 'Hrg Jual Total Tunai'
				},
				{
					xtype     : 'numbercolumn',
					itemId    : 'colms_harga_jual_kpr',
					width     : 120,
					dataIndex : 'hargajual_kpr',
					hideable  : false,
					text      : 'Hrg Jual Total KPR'
				},
				{
					xtype     : 'numbercolumn',
					itemId    : 'colms_harga_jual_inhouse',
					width     : 120,
					dataIndex : 'hargajual_inhouse',
					hideable  : false,
					text      : 'Hrg Jual Total Inhouse'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_state',
					width     : 50,
					dataIndex : 'unitstatus_status',
					hideable  : false,
					text      : 'State'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_progress',
					width     : 60,
					dataIndex : 'unit_progress',
					hideable  : false,
					text      : 'Progress'
				},
				{
					xtype     :'booleancolumn',
					dataIndex : 'unit_is_readysell',
					text      : 'Siap Jual',
					falseText : ' ',
					trueText  : '&#10003;'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_virtualaccount_bca',
					dataIndex : 'unit_virtualaccount_bca',
					hideable  : false,
					text      : 'VA BCA'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_virtualaccount_mandiri',
					dataIndex : 'unit_virtualaccount_mandiri',
					hideable  : false,
					text      : 'VA MANDIRI'
				},
				{
					xtype     :'booleancolumn',
					dataIndex : 'is_holdmanagement',
					text      : 'Hold Management',
					falseText : ' ',
					trueText  : '&#10003;'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_notes_holdmanagement',
					dataIndex : 'notes_holdmanagement',
					hideable  : false,
					text      : 'Notes Hold Management'
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
						disabled   :true,
						bindAction : me.bindPrefixName + 'Create',
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
						bindAction : me.bindPrefixName + 'Update'
					},
					{
						xtype      : 'button',
						action     : 'delete',
						disabled   : true,
						hidden     : true,
						itemId     : 'btnDelete',
						bindAction : me.bindPrefixName + 'Delete',
						iconCls    : 'icon-delete',
						text       : 'Delete Selected'
					},
					{
						xtype      : 'button',
						action     : 'sync',
						disabled   : true,
						hidden     : true,
						itemId     : 'btnSync',
						margin     : '0 5 0 0',
						iconCls    : 'icon-refresh',
						text       : 'Sync SF',
					},
					{
						xtype      : 'button',
						action     : 'print',
						hidden     : true,
						itemId     : 'btnPrint',
						margin     : '0 5 0 0',
						bindAction : me.bindPrefixName + 'Print',
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
					bindAction : me.bindPrefixName + 'Update',
					altText    : 'Edit',
					tooltip    : 'Edit'
				},
				{
					text       : 'Delete',
					iconCls    : 'icon-delete',
					bindAction : me.bindPrefixName + 'Delete',
					altText    : 'Delete',
					tooltip    : 'Delete'
				}
			]
		};
		return ac;
	},
});