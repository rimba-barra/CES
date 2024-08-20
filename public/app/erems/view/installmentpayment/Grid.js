Ext.define('Erems.view.installmentpayment.Grid', {
	extend: 'Erems.library.template.view.GridDS2',
	alias: 'widget.installmentpaymentgrid',
	storeConfig: {
		id: 'PaymentGridStore',
		idProperty: 'payment_id',
		extraParams: {}
	},
	// store:'Installmentpayment',
	bindPrefixName: 'Installmentpayment',
	newButtonLabel: 'New Payment',
	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			contextMenu: me.generateContextMenu(),
			dockedItems: me.generateDockedItems(),
			viewConfig: {

			},
			selModel: Ext.create('Ext.selection.CheckboxModel', {
				// mode: 'SINGLE'

			}),
			columns: [
				{
					xtype: 'rownumberer'
				},
                {
                    xtype     : 'booleancolumn',
                    header    : 'Revenue Sharing',
                    dataIndex : 'is_revenuesharing',
                    itemId    : 'is_revenuesharing',
                    hidden    : true,
                    width     : 80,
                    renderer  : me.inlineEditRevenue
                },
				{
					xtype: 'gridcolumn',
					itemId: 'colms_code',
					width: 60,
					align: 'right',
					dataIndex: 'cluster_code',
					text: 'Code'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_cluster',
					width: 100,
					dataIndex: 'cluster_cluster',
					hideable: false,
					text: 'Cluster'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_block',
					width: 80,
					dataIndex: 'block_block',
					hideable: false,
					text: 'Block'
				},
				{
					xtype: 'gridcolumn',
					width: 80,
					dataIndex: 'unit_unit_number',
					hideable: false,
					text: 'Unit Number'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_payment_no',
					width: 130,
					dataIndex: 'payment_no',
					hideable: false,
					text: 'Payment No'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_receipt_no',
					width: 100,
					dataIndex: 'receipt_no',
					hideable: false,
					text: 'Receipt No'
				},
				{
					xtype: 'datecolumn',
					format: 'd-m-Y',
					itemId: 'colms_payment_date',
					width: 80,
					dataIndex: 'payment_date',
					hideable: false,
					text: 'Payment Date'
				},
				{
					xtype: 'datecolumn',
					format: 'd-m-Y',
					width: 80,
					dataIndex: 'duedate',
					hideable: false,
					text: 'Due Date'
				},
				{
					xtype: 'datecolumn',
					format: 'd-m-Y',
					width: 80,
					dataIndex: 'cair_date',
					hideable: false,
					text: 'Cair Date'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'notes',
					width: 100,
					dataIndex: 'note',
					hideable: false,
					text: 'Notes'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_payment_method',
					width: 100,
					dataIndex: 'paymentmethod_paymentmethod',
					hideable: false,
					text: 'Payment Method'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_payment_value',
					width: 100,
					dataIndex: 'payment',
					hideable: false,
					text: 'Payment Value',
					align: 'right'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_customer_name',
					width: 100,
					dataIndex: 'customer_name',
					hideable: false,
					text: 'Customer Name'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_denda',
					width: 100,
					dataIndex: 'denda',
					hideable: false,
					text: 'Denda',
					align: 'right'
				},
				{
					xtype: 'gridcolumn',

					width: 100,
					dataIndex: 'unit_virtualaccount_bca',
					hideable: false,
					text: 'VA BCA'
				},
				{
					xtype: 'gridcolumn',

					width: 100,
					dataIndex: 'unit_virtualaccount_mandiri',
					hideable: false,
					text: 'VA Mandiri'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_valid_date',
					width: 100,
					dataIndex: 'code',
					hideable: false,
					text: 'Valid Date'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_giro_state',
					width: 100,
					dataIndex: 'code',
					hideable: false,
					text: 'Giro State'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_is_lunas',
					width: 100,
					dataIndex: 'purchaseletter_is_lunas',
					hideable: false,
					hidden: true,
					text: 'Lunas'
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
					{
						xtype: 'button',
						action: 'print',
						hidden: true,
						disabled: true,
						itemId: 'btnPrint',
						margin: '0 5 0 0',

						iconCls: 'icon-print',
						text: 'Print'
					},
					{
						xtype: 'button',
						action: 'printx',
						disabled: true,
						margin: '0 5 0 0',

						iconCls: 'icon-pdf',
						text: 'Print PDF'
					},
					{
						xtype: 'button',
						action: 'printvoucher',
						disabled: true,
						margin: '0 5 0 0',

						iconCls: 'icon-pdf',
						text: 'Print Voucher PDF'
					},
					{
						xtype: 'button',
						action: 'fontselect',
						disabled: true,
						margin: '0 5 0 0',

						iconCls: 'icon-pdf',
						text: 'Print Select Font'
					},
					{
						xtype: 'button',
						action: 'printdos',
						disabled: true,
						margin: '0 5 0 0',

						iconCls: 'icon-new',
						text: 'Print DOS'
					},
					//Rizal 22 April 2019
					{
						xtype: 'button',
						action: 'printbuktipenerimaan',
						hidden: false,
						itemId: 'btnPrintPenerimaan',
						margin: '0 5 0 0',
						disabled: true,
						iconCls: 'icon-print',
						text: 'Bukti Penerimaan'
					},
					//Add by RH 30/10/2019
					{
						xtype: 'button',
						action: 'printtemplate',
						disabled: true,
						margin: '0 5 0 0',

						iconCls: 'icon-print',
						text: 'Print With Template'
					},
					{
						xtype: 'button',
						action: 'tpleditor',
						hidden: true,
						margin: '0 5 0 0',
						iconCls: 'icon-new',
						text: 'Kwitansi Editor',
						disabled: true,
					},

					{
						xtype: 'button',
						action: 'printmodel2',
						disabled: true,
						margin: '0 5 0 0',

						iconCls: 'icon-print',
						text: 'Print Model 2'
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
	},

	generateActionColumn: function () {
		var me = this;
		var ac = {
			xtype: 'actioncolumn',
			hidden: true,
			itemId: 'actioncolumn',
			width: 50,
			resizable: false,
			align: 'right',
			hideable: false,
			renderer: function (value, metadata, record) {
				if (record.get('purchaseletter_is_lunas') == 1) {
					this.items[1].disabled = true;
				} else {
					this.items[1].disabled = false;
				}
			},
			items: [
				{
					text: 'Edit',
					iconCls: 'icon-edit',
					bindAction: me.bindPrefixName + 'Update',
					altText: 'Edit',
					tooltip: 'Edit'
				},
				{
					text: 'Delete',
					iconCls: 'icon-delete',
					bindAction: me.bindPrefixName + 'Delete',
					altText: 'Delete',
					tooltip: 'Delete'
				}
			]
		};
		return ac;
	},
	// added by rico 16022023
    inlineEditRevenue: function (val, meta, record, rowIndex, colIndex, store) {
        name = 'is_revenuesharing';
        return this.comboBoxFieldGen(name, record, true);  
    },
	// added by rico 16022023
    comboBoxFieldGen: function (name, record, enable){
        if (record.get(name)) {
            if(enable){
                var a = '<input type="checkbox" name="'+name+'" data=' + record.get("payment_id") + ' checked />';
            }else{
                var a = '&#10003;';
            }
        }else {
            if(enable){
                var a = '<input type="checkbox" name="'+name+'" data=' + record.get("payment_id") + ' />';
            }else{
                var a = '';
            }
        }
        return a;  
    }

});