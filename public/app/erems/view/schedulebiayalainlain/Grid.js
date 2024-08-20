Ext.define('Erems.view.schedulebiayalainlain.Grid',{
	extend         :'Erems.library.template.view.Grid',
	alias          :'widget.schedulebiayalainlaingrid',
	store          :'Schedulebiayalainlain',
	bindPrefixName :'Schedulebiayalainlain',
	newButtonLabel :'New',
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
					resizable : true
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_paymentflag',
					width     : 100,
					dataIndex : 'paymentflag',
					hideable  : false,
					text      : 'Payment Flag'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_nama_customer',
					width     : 150,
					dataIndex : 'customer_name',
					hideable  : false,
					text      : 'Customer Name'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_unit_number',
					width     : 80,
					dataIndex : 'unit_number',
					hideable  : false,
					text      : 'Unit Number'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_cluster_code',
					width     : 80,
					dataIndex : 'cluster_code',
					hideable  : false,
					text      : 'Cluster Code'
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
					itemId    : 'colms_purchaseletter_no',
					width     : 120,
					dataIndex : 'purchaseletter_no',
					hideable  : false,
					text      : 'Purchaseletter No'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_pricetype',
					width     : 80,
					dataIndex : 'pricetype',
					hideable  : false,
					text      : 'Pricetype'
				},
				{
					xtype     : 'numbercolumn',
					itemId    : 'colms_harga_netto',
					width     : 100,
					dataIndex : 'harga_netto',
					hideable  : false,
					text      : 'Harga Netto'
				},
				{
					xtype     : 'numbercolumn',
					itemId    : 'colms_harga_total_jual',
					width     : 100,
					dataIndex : 'harga_total_jual',
					hideable  : false,
					text      : 'Harga Total Jual'
				},
				{
					xtype     : 'numbercolumn',
					itemId    : 'colms_total_biaya',
					width     : 100,
					dataIndex : 'biayalainlain_total',
					hideable  : false,
					text      : 'Total Biaya'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_paymenttype_name',
					width     : 100,
					dataIndex : 'paymenttype_name',
					hideable  : false,
					text      : 'Payment Type'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_va_no',
					width     : 80,
					dataIndex : 'va_no',
					hideable  : false,
					text      : 'VA Mandiri'
				},
				
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_va_bca',
					width     : 80,
					dataIndex : 'va_no_bca',
					hideable  : false,
					text      : 'VA BCA'
				},	
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_addon',
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
						action     : 'destroy',
						disabled   : true,
						hidden     : true,
						itemId     : 'btnDelete',
						bindAction : me.bindPrefixName + 'Delete',
						iconCls    : 'icon-delete',
						text       : 'Delete Selected'
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