Ext.define('Erems.view.suratperingatan.Grid',{
	extend         :'Erems.library.template.view.Grid',
	alias          :'widget.suratperingatangrid',
	store          :'Suratperingatan',
	bindPrefixName :'Suratperingatan',
	newButtonLabel :'Proses Spr',
	initComponent  : function() {
		var me = this;

		Ext.applyIf(me, {
			contextMenu : me.generateContextMenu(),
			dockedItems : me.generateDockedItems(),
			viewConfig  : {},
			selModel    : Ext.create('Ext.selection.CheckboxModel', {}),
			columns     : [
				{
					xtype     : 'rownumberer',
					width     : 40,
					resizable : true
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_cluster',
					width     : 100,
					dataIndex : 'cluster',
					text      : 'Cluster'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_unit_number',
					width     : 100,
					dataIndex : 'unit_number',
					hideable  : false,
					text      : 'Unit No'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_purchaseletter_no',
					width     : 150,
					dataIndex : 'purchaseletter_no',
					hideable  : false,
					text      : 'Purchaseletter No'
				},
				// added by rico 03082023
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_sppjb_no',
					width     : 150,
					dataIndex : 'sppjb_no',
					hideable  : false,
					text      : 'PPJB No'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_purchase_date',
					width     : 100,
					dataIndex : 'purchase_date',
					hideable  : false,
					text      : 'Purchase Date',
					renderer  : Ext.util.Format.dateRenderer('d-m-Y'),
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_tandatangan_date',
					width     : 100,
					dataIndex : 'tandatangan_date',
					hideable  : false,
					text      : 'PPJB Sign Date',
					renderer  : Ext.util.Format.dateRenderer('d-m-Y'),
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_nama_customer',
					width     : 150,
					dataIndex : 'customer_name',
					hideable  : false,
					text      : 'Nama Customer'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_harga_total_jual',
					width     : 100,
					dataIndex : 'harga_total_jual',
					hideable  : false,
					text      : 'Harga Total Jual'
				},
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
						itemId     : 'btnProsesSpr',
						margin     : '0 5 0 0',
						iconCls    : 'icon-new',
						disabled   : true,
						bindAction : me.bindPrefixName + 'Create',
						text       : me.newButtonLabel
					},
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

});