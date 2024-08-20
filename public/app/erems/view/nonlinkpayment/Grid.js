Ext.define('Erems.view.nonlinkpayment.Grid', {
	extend: 'Erems.library.template.view.GridDS2',
	alias: 'widget.nonlinkpaymentgrid',
	storeConfig: {
		id: 'NonlinkPaymentGridStore',
		idProperty: 'payment_id',
		extraParams: {}
	},
	//store:'Nonlinkpayment',
	bindPrefixName: 'Nonlinkpayment',
	newButtonLabel: 'New Payment',
	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			contextMenu: me.generateContextMenu(),
			dockedItems: me.generateDockedItems(),
			viewConfig: {

			},
			selModel: Ext.create('Ext.selection.CheckboxModel', {

			}),
			columns: [
				{
					xtype: 'rownumberer'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_name',
					width: 240,
					align: 'left',
					dataIndex: 'customer_name',
					text: 'Nama'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_address',
					width: 100,
					dataIndex: 'customer_address',
					hideable: false,
					text: 'Alamat'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_payment_no',
					width: 120,
					dataIndex: 'payment_no',
					hideable: false,
					text: 'No. Kwitansi'
				},
				{
					xtype: 'datecolumn',
					format: 'd-m-Y',
					itemId: 'colms_payment_date',
					width: 100,

					dataIndex: 'payment_date',
					hideable: false,
					text: 'Tgl. Bayar'
				},
				{
					xtype: 'datecolumn',
					format: 'd-m-Y',
					itemId: 'colms_cair_date',
					width: 100,
					dataIndex: 'cair_date',
					hideable: false,
					text: 'Tgl. Cair'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_rp',
					width: 40,
					dataIndex: 'code',
					hideable: false,
					text: 'Rp'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_total_payment',
					width: 100,
					align: 'right',
					dataIndex: 'total_payment',
					hideable: false,
					text: 'Total Pembayaran'
				},
				
				//add by anas 16122020
				{
					xtype: 'gridcolumn',
					itemId: 'colms_added_by',
					width: 100,
					dataIndex: 'Addby',
					hideable: false,
					text: 'Added By'
				},				
				{
					xtype: 'gridcolumn',
					itemId: 'colms_added_date',
					width: 100,
					dataIndex: 'Addon',
					hideable: false,
					text: 'Added Date'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_edited_by',
					width: 100,
					dataIndex: 'Modiby',
					hideable: false,
					text: 'Last Edited By'
				},				
				{
					xtype: 'gridcolumn',
					itemId: 'colms_edited_date',
					width: 100,
					dataIndex: 'Modion',
					hideable: false,
					text: 'Last Edited Date'
				},

				me.generateActionColumn()
			]
		});

		me.callParent(arguments);
	},
	generateDockedItems: function () {
		var me = this;

		var dockedItems = [
			{
				xtype: 'toolbar',
				dock: 'top',
				height: 28,
				items: [
					{
						xtype: 'button',
						action: 'create',
						hidden: true,
						itemId: 'btnNew',
						margin: '0 5 0 0',
						iconCls: 'icon-new',
						bindAction: me.bindPrefixName + 'Create',
						text: me.newButtonLabel
					},
					{
						xtype: 'button',
						action: 'update',
						disabled: true,
						hidden: true,
						itemId: 'btnEdit',
						margin: '0 5 0 0',
						iconCls: 'icon-edit',
						text: 'Edit',
						bindAction: me.bindPrefixName + 'Update'
					},
					{
						xtype: 'button',
						action: 'destroy',
						disabled: true,
						hidden: true,
						itemId: 'btnDelete',
						bindAction: me.bindPrefixName + 'Delete',
						iconCls: 'icon-delete',
						text: 'Delete Selected'
					},
					{
						xtype: 'button',
						action: 'view',
						itemId: 'btnView',
						margin: '0 5 0 0',
						//padding:5,
						iconCls: 'icon-search',
						text: 'View',
						disabled: true
					},

					/*
					 {
					 xtype: 'button',
					 action: 'print',
					 
					 itemId: 'btnPrint',
					 margin: '0 5 0 0',
					 
					 iconCls: 'icon-print',
					 text: 'Print'
					 },
					 */
					{
						xtype: 'button',
						action: 'printx',

						margin: '0 5 0 0',

						iconCls: 'icon-pdf',
						text: 'PDF'
					},
					{
						xtype: 'button',
						action: 'printvoucher',

						margin: '0 5 0 0',

						iconCls: 'icon-pdf',
						text: 'Print Voucher PDF'
					},
					{
						xtype: 'button',
						action: 'printdos',
						itemId:'btnPrint',
						margin: '0 5 0 0',

						iconCls: 'icon-new',
						text: 'Print DOS'
					}
					//Rizal 6 Mei 2019

					,
					{
						xtype: 'button',
						action: 'printbuktipenerimaan',
						hidden: false,
						itemId: 'btnPrintPenerimaan',
						margin: '0 5 0 0',

						iconCls: 'icon-print',
						text: 'Bukti Penerimaan'
					},
					//Add by RH 30/10/2019
					{
						xtype: 'button',
						action: 'printtemplate',

						margin: '0 5 0 0',

						iconCls: 'icon-print',
						text: 'Print With Template'
					},
				]
			},
			{
				xtype: 'pagingtoolbar',
				dock: 'bottom',
				width: 360,
				displayInfo: true,
				store: this.getStore()
			}
		];
		return dockedItems;
	}
});