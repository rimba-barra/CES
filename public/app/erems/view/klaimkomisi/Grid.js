Ext.define('Erems.view.klaimkomisi.Grid', {
	extend: 'Erems.library.template.view.GridDS2',
	alias: 'widget.klaimkomisigrid',
	storeConfig: {
		id: 'KlaimkomisiGridStore',
		idProperty: 'komisi_id',
		extraParams: {}
	},
	bindPrefixName: 'Klaimkomisi',
	newButtonLabel: 'New Klaim Komisi',
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
					width: 100,
					dataIndex: 'nomor_pengajuan',
					hideable: false,
					text: 'Nomor Pengajuan'
				},
				{
					xtype: 'gridcolumn',
					width: 120,
					dataIndex: 'nomor_invoice_agent',
					hideable: false,
					text: 'Nomor Invoice Agent'
				},
				{
					xtype: 'gridcolumn',
					width: 150,
					dataIndex: 'citraclub_clubname',
					hideable: false,
					text: 'Nama Agent'
				},
				{
					xtype: 'datecolumn',
					format: 'd-m-Y',
					width: 110,
					dataIndex: 'tgl_pengajuan',
					hideable: false,
					text: 'Tanggal Pengajuan'
				},
//                {
//                    xtype: 'gridcolumn',  
//                    width: 80,
//                    dataIndex: 'type_komisi',
//                    hideable: false,
//                    text: 'Type Komisi'
//                },
				{
					xtype: 'numbercolumn',
					width: 150,
					dataIndex: 'total_bayar',
					hideable: false,
					align: 'right',
					text: 'Nilai Pengajuan'
				},

				{
					xtype: 'booleancolumn',
					width: 70,
					resizable: false,
					dataIndex: 'tgl_cair',
					text: 'Status Cair',
					align: 'center',
					falseText: ' ',
					trueText: '&#10003;'
				},
				{
					xtype: 'datecolumn',
					format: 'd-m-Y',
					width: 100,
					dataIndex: 'tgl_cair',
					hideable: false,
					text: 'Tanggal Cair'
				},
						// me.generateActionColumn()
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
						//  id:'paymentEremsSBYID',
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
						// id:'paymentEremsSBYUpdateID',
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
						action: 'print',
						margin: '0 5 0 0',
						disabled: true,
						itemId: 'btnPrint',
						iconCls: 'icon-print',
						text: 'Print',
//						bindAction: me.bindPrefixName + 'Print'
					}

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
				},
			]
		};
		return ac;
	},
});
