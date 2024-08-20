Ext.define('Erems.view.marketingstock.SelectUnitGrid', {
	extend      : 'Erems.library.template.view.GridDS2',
	storeConfig : {
		id          : 'MarketingStockUnitGridStore',
		idProperty  : 'unit_id',
		extraParams : {}
	},
	alias          : 'widget.selectunitgrid',
	bindPrefixName : 'Marketingstock',
	newButtonLabel : 'New Marketstock',
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
					dataIndex : 'unit_id',
					text      : 'ID'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_cluster',
					width     : 100,
					dataIndex : 'cluster_cluster',
					hideable  : false,
					text      : 'Cluster'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_block',
					width     : 100,
					dataIndex : 'block_block',
					hideable  : false,
					text      : 'Block name'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_kavnumber',
					width     : 100,
					dataIndex : 'unit_number',
					hideable  : false,
					text      : 'Kav. number'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_pt_name',
					width     : 100,
					dataIndex : 'pt_name',
					hideable  : false,
					text      : 'PT.Name'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_typename',
					width     : 100,
					dataIndex : 'type_name',
					hideable  : false,
					text      : 'Type'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_category',
					width     : 100,
					dataIndex : 'productcategory_productcategory',
					hideable  : false,
					text      : 'Category'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_land_size',
					width     : 100,
					dataIndex : 'land_size',
					hideable  : false,
					text      : 'Land Size'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_building_size',
					width     : 100,
					dataIndex : 'building_size',
					hideable  : false,
					text      : 'Building Size'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_kelebihan',
					width     : 100,
					dataIndex : 'kelebihan',
					hideable  : false,
					text      : 'Kelebihan'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_floor',
					width     : 100,
					dataIndex : 'floor',
					hideable  : false,
					text      : 'Floor'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_progress',
					width     : 100,
					dataIndex : 'progress',
					hideable  : false,
					text      : 'Progress'
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
				dock   : 'bottom',
				height : 28,
				items  : [
					{
						xtype   : 'button',
						action  : 'select',
						hidden  : false,
						itemId  : 'btnNews',
						margin  : '0 5 0 0',
						iconCls : 'icon-approve',
						text    : 'Select Unit'
					}
				]
			},
			{
				xtype       : 'pagingtoolbar',
				dock        : 'bottom',
				itemId      :'pgselectunitgrid',
				width       : 360,
				displayInfo : true,
				store       : this.getStore()
			}
		];
		return dockedItems;
	}
});