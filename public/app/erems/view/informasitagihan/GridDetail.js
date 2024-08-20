Ext.define('Erems.view.informasitagihan.GridDetail', {
	extend         : 'Erems.library.template.view.Grid',
	alias          : 'widget.informasitagihangriddetail',
	itemId         : 'informasitagihangriddetail',
	store          : 'Informasitagihandetail',
	bindPrefixName : 'Informasitagihan',
	requires       : ['Erems.template.ComboBoxFields'],
	initComponent: function () {
		var me = this;
		Ext.applyIf(me, {
			dockedItems : me.generateDockedItems(),
			viewConfig  : {},
			selType     : 'cellmodel',
			selModel : Ext.create('Ext.selection.CheckboxModel', {
				mode : "SINGLE"
			}),
			columns : [
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_tagihan_id',
					header    : 'tagihan_id',
					dataIndex : 'tagihan_id',
					hidden    : true
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_tagihan_detail_id',
					text      : 'tagihan_detail_id',
					dataIndex : 'tagihan_detail_id',
					hidden    : true,
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_cluster_id',
					text      : 'cluster_id',
					dataIndex : 'cluster_id',
					hidden    : true,
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_unit_id',
					text      : 'unit_id',
					dataIndex : 'unit_id',
					hidden    : true,
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_cluster',
					text      : 'cluster',
					dataIndex : 'cluster',
					hidden    : true,
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_purchaseletter_id',
					text      : 'purchaseletter_id',
					dataIndex : 'purchaseletter_id',
					hidden    : true,
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_pricetype_id',
					text      : 'pricetype_id',
					dataIndex : 'pricetype_id',
					hidden    : true,
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_customer_id',
					text      : 'customer_id',
					dataIndex : 'customer_id',
					hidden    : true,
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_tagihan_no',
					text      : 'Nomor',
					dataIndex : 'tagihan_no',
					width     : 220
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_cluster_code',
					text      : 'Cluster Code',
					dataIndex : 'cluster_code',
					width     : 75
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_unit_number',
					text      : 'Unit No',
					dataIndex : 'unit_number',
					width     : 60
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_purchaseletter_no',
					text      : 'Purchaseletter No',
					dataIndex : 'purchaseletter_no',
					width     : 160
				},
				{
					xtype     : 'datecolumn',
					itemId    : 'colms_purchase_date',
					text      : 'Purchase Date',
					dataIndex : 'purchase_date',
					width     : 85
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_customer_name',
					text      : 'Nama Customer',
					dataIndex : 'customer_name',
					width     : 150
				},
				{
					xtype     : 'numbercolumn',
					itemId    : 'colms_harga_total_jual',
					text      : 'Harga Total Jual',
					dataIndex : 'harga_total_jual',
					width     : 100
				},
				{
					xtype     : 'numbercolumn',
					itemId    : 'colms_total_payment',
					text      : 'Total Payment',
					dataIndex : 'total_payment',
					width     : 100
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_deleted',
					text      : 'deleted',
					dataIndex : 'deleted',
					hidden    : true,
				},
			]
		});
		me.callParent(arguments);	
	},
	generateDockedItems: function() {
		var me = this;
		return [
			{
				layout    : 'hbox',
				dock      : 'top',
				height    : 28,
				bodyStyle : 'border:0px; background:none;',
				margin    : '0 0 5px 10px',
				items     : [
					{
						xtype   : 'button',
						action  : 'printout',
						hidden  : false,
						padding : '3px 40px 3px 40px',
						iconCls : 'icon-print',
						text    : 'Print'
					},
				]
			},
			{
				layout    : 'hbox',
				dock      : 'top',
				bodyStyle : 'border:0px; background:none;',
				margin    : '0 0 0 10px',
				items     : [
					{
						xtype : 'label',
						text  : 'Informasi Tagihan',
						width : 110
					},
				]
			},
			{
				xtype       : 'pagingtoolbar',
				dock        : 'bottom',
				displayInfo : true,
				store       : this.getStore()
			}
		];
	},
});