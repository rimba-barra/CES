Ext.define('Erems.view.verificationapproval.browse.Grid', {
	extend         : 'Erems.library.template.view.Grid',
	alias          : 'widget.verificationapprovalbrowsegrid',
	store          : 'Purchaseletterverificationapproval',
	bindPrefixName : 'Purchaseletter',
	newButtonLabel : 'New Purchaseletter',
	initComponent  : function () {
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
					itemId    : 'colms_kawasan',
					width     : 150,
					dataIndex : 'cluster',
					text      : 'Cluster'
				}, 
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_block',
					width     : 80,
					dataIndex : 'block',
					hideable  : false,
					text      : 'Block'
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
					itemId    : 'colms_type',
					width     : 70,
					dataIndex : 'type_name',
					hideable  : false,
					text      : 'Type'
				}, 
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_tanggal_pesanan',
					width     : 130,
					dataIndex : 'purchase_date',
					hideable  : false,
					text      : 'Purchase Letter Date',
					renderer  : Ext.util.Format.dateRenderer('d-m-Y')
				}, 
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_nomor_pesanan',
					width     : 120,
					dataIndex : 'purchaseletter_no',
					hideable  : false,
					text      : 'Purchase Letter No.'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_customer_name',
					width     : 100,
					dataIndex : 'customer_name',
					hideable  : false,
					text      : 'Customer Name'
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
					xtype     : 'gridcolumn',
					itemId    : 'colms_sales_name',
					width     : 100,
					dataIndex : 'salesman_name',
					hideable  : false,
					text      : 'Sales Name'
				},
			]
		});

		me.callParent(arguments);
	},
	generateDockedItems: function () {
		var me = this;

		var dockedItems = [
			{
				xtype : 'toolbar',
				dock  : 'bottom',
				items : [
					{
						xtype   : 'button',
						action  : 'select',
						hidden  : false,
						itemId  : 'btnNews',
						margin  : '0 5 0 0',
						padding : 5,
						iconCls : 'icon-new',
						text    : 'Select Unit'
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
	}
});