Ext.define('Erems.view.kartupiutang.Grid',{
	extend      : 'Erems.library.template.view.GridDS2',
	alias       : 'widget.kartupiutanggrid',
	storeConfig : {
		id          : 'KartuPiutangGridStore',
		idProperty  : 'purchaseletter_id',
		extraParams : {}
	},
	bindPrefixName : 'Kartupiutang',
	newButtonLabel : 'New Expense_no',
	initComponent  : function() {
		var me = this;

		Ext.applyIf(me, {
			contextMenu : me.generateContextMenu(),
			dockedItems : me.generateDockedItems(),
			viewConfig  : {},
			selModel    : { 
				selType       : 'checkboxmodel',
				mode          : 'SINGLE',
  				allowDeselect : true           
			},
			defaults : {
				xtype  :'gridcolumn',
				width  : 100,
				hidden :false
			},
			columns : [
				{
					xtype: 'rownumberer'
				},
				{
					dataIndex : 'purchaseletter_no',
					text      : 'Purchase Letter No',
					width     : 150
				},
				{
					xtype     : 'datecolumn',
					format    : 'd-m-Y',
					dataIndex : 'purchase_date',
					text      : 'Purchase Date',
					align     : 'center',
					width     : 80
				},
				{
					dataIndex : 'cluster_cluster',
					text      : 'Cluster'
				},
				{
					dataIndex : 'block_block',
					text      : 'Block Name'
				},
				{
					dataIndex : 'unit_unit_number',
					text      : 'Unit No.'
				},
				{
					dataIndex : 'type_name',
					text      : 'Type'
				},
				{
					dataIndex : 'productcategory_productcategory',
					text      : 'Category'
				},
				{
					dataIndex : 'customer_name',
					text      : 'Customer Name'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_pricetype',
					width     : 100,
					dataIndex : 'pricetype_pricetype',
					hideable  : false,
					text      : 'Price Type'
				},
				//// addby Erwin.st 29102021
				{
					xtype     : 'datecolumn',
					format    : 'd-m-Y',
					dataIndex : 'akad_realisasiondate',
					text      : 'Tanggal Akad',
					align     : 'center',
					width     : 80,
				},
				{
					xtype     : 'datecolumn',
					format    : 'd-m-Y',
					dataIndex : 'tgl_cair_pertama',
					text      : 'Tgl. Cair Pertama',
					align     : 'center',
					width     : 80,
				},
				{
					xtype     : 'numbercolumn',
					dataIndex : 'payment_total_payment',
					text      : 'Total Payment'
				},
				{
					dataIndex : 'salesman_employee_name',
					text      : 'Salesman'
				},
				{
					dataIndex : 'purpose',
					text      : 'Purpose'
				},
				{
					dataIndex : 'side',
					text      : 'Side'
				},
				{
					dataIndex : 'unit_status',
					text      : 'Unit Status'
				},
				{
					xtype     : 'gridcolumn',
					width     : 100,
					dataIndex : 'unit_virtualaccount_bca',
					hideable  : false,
					text      : 'VA BCA'
				},
				{
					xtype     : 'gridcolumn',
					width     : 100,
					dataIndex : 'unit_virtualaccount_mandiri',
					hideable  : false,
					text      : 'VA Mandiri'
				},
				{
					xtype     : 'gridcolumn',
					width     : 100,
					dataIndex : 'sp_ke',
					hideable  : false,
					text      : 'SP Ke'
				},
				{
					xtype     : 'datecolumn',
					format    : 'd-m-Y',
					dataIndex : 'sp_date',
					text      : 'Expired Date',
					align     : 'center',
					width     : 80,
				},
				{
					dataIndex : 'is_cancel',
					text      : 'Status Cancel'
				},
				
			me.generateActionColumn()
			]
		});

		me.callParent(arguments);
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
					text       : 'Kartu Piutang',
					iconCls    : 'icon-form',
					bindAction : me.bindPrefixName + 'View',
					altText    : 'Kartu Piutang',
					className  :'view',
					tooltip    : 'Kartu Piutang'
				}
			]
		};
		return ac;
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
						itemId     : 'btnView',
						margin     : '0 5 0 0',
						iconCls    : 'icon-form',
						bindAction : me.bindPrefixName + 'View',
						text       : 'View',
						disabled   : true
					},
					{
						xtype      : 'button',
						action     : 'excel',
//						hidden     : true,
						itemId     : 'btnExcel',
						margin     : '0 5 0 0',
						icon	   : document.URL + 'app/main/images/icons/excel.png',
//						bindAction : me.bindPrefixName + 'View',
						text       : 'View Excel',
						disabled   : true
					},
					{
						xtype      : 'button',
						action     : 'print',
						hidden     : true,
						itemId     : 'btnPrint',
						margin     : '0 5 0 0',
						bindAction : me.bindPrefixName + 'Print',
						iconCls    : 'icon-print',
						text       : 'Print / Save (for Internal)',
						disabled   : true
					},
					// edited by Rizal 13-02-2019 
					{
						xtype    : 'button',
						action   : 'printcustomer',
						itemId   : 'btnPrintCustomer',
						margin   : '0 5 0 0',
						iconCls  : 'icon-print',
						text     : 'Print / Save (for Customer)',
						disabled : true
					},
					// added by rico 19072022 
					{
						xtype    : 'button',
						action   : 'printv2',
						itemId   : 'btnPrintV2',
						margin   : '0 5 0 0',
						iconCls  : 'icon-print',
						text     : 'Print / Save (V2)',
						disabled : true
					}
					//
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