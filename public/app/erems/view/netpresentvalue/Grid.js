Ext.define('Erems.view.netpresentvalue.Grid', {
	extend         : 'Erems.library.template.view.Grid',
	alias          : 'widget.netpresentvaluegrid',
	store          : 'Netpresentvalue',
	bindPrefixName : 'Netpresentvalue',
	newButtonLabel : 'Add New',
	initComponent  : function () {
		var me = this;

		Ext.applyIf(me, {
			contextMenu : me.generateContextMenu(),
			dockedItems : me.generateDockedItems(),
			viewConfig  : {

			},
			selModel : Ext.create('Ext.selection.CheckboxModel', {
				mode: "SINGLE"
			}),
			columns: [
				{
					xtype: 'rownumberer'
				},
				{
					xtype     : 'gridcolumn',
					header    : 'npv_id',
					dataIndex : 'npv_id',
					hidden    : true
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
					width     : 90,
					dataIndex : 'cluster',
					hideable  : false,
					text      : 'Cluster'
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
					itemId    : 'colms_purchaseletter_no',
					width     : 150,
					dataIndex : 'purchaseletter_no',
					hideable  : false,
					text      : 'Purchaseletter No'
				},
				{
					xtype     : 'datecolumn',
					itemId    : 'colms_purchaseletter_date',
					width     : 110,
					dataIndex : 'purchaseletter_date',
					hideable  : false,
					text      : 'Purchaseletter Date',
					format    : 'd-m-Y'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_customer_name',
					width     : 120,
					dataIndex : 'customer_name',
					hideable  : false,
					text      : 'Customer Name'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_pricetype',
					width     : 60,
					dataIndex : 'pricetype',
					hideable  : false,
					text      : 'Pricetype'
				},
				{
					xtype     : 'numbercolumn',
					itemId    : 'colms_harga_total_jual',
					width     : 120,
					dataIndex : 'harga_total_jual',
					hideable  : false,
					text      : 'Harga Total Jual'
				},
				{
					xtype     : 'numbercolumn',
					itemId    : 'colms_total_payment',
					width     : 100,
					dataIndex : 'total_payment',
					hideable  : false,
					text      : 'Total Payment'
				},
				{
					xtype     :'datecolumn',
					itemId    : 'colms_addon',
					width     : 80,
					dataIndex : 'addon',
					hideable  : false,
					text      : 'Tanggal Buat',
					format    : 'd-m-Y'
				},
				{
					xtype     : 'numbercolumn',
					itemId    : 'colms_npv_standard',
					width     : 110,
					dataIndex : 'npv_standard',
					hideable  : false,
					text      : 'NPV Awal'
				},
				{
					xtype     : 'numbercolumn',
					itemId    : 'colms_npv_realisasi',
					width     : 110,
					dataIndex : 'npv_realisasi',
					hideable  : false,
					text      : 'NPV Akhir'
				},
				{
					xtype     : 'numbercolumn',
					itemId    : 'colms_npv_nilai_persen',
					width     : 90,
					dataIndex : 'npv_nilai_persen',
					hideable  : false,
					text      : 'Total NPV (%)'
				},
				me.generateActionColumn()
			]
		});

		me.callParent(arguments);
	},
	generateDockedItems : function(){
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
						margin     : '0 5 0 0',
						bindAction : me.bindPrefixName + 'Delete',
						iconCls    : 'icon-delete',
						text       : 'Delete'
					},
					{
						xtype   : 'button',
						action  : 'prinout',
						margin  : '0 5 0 0',
						iconCls : 'icon-print',
						text    : 'Print'
                    }
				]
			},
			{
				xtype       : 'pagingtoolbar',
				dock        : 'bottom',
				width       : 360,
				displayInfo : true,
				store       : me.getStore()
			},
		];
		return dockedItems;
	}
});