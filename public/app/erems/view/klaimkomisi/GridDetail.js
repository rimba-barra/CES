Ext.define('Erems.view.klaimkomisi.GridDetail', {
	extend: 'Erems.library.template.view.GridDS2',
	alias: 'widget.klaimkomisigriddetail',
	storeConfig: {
		id: 'KlaimkomisiGridDetailStore',
		idProperty: 'klaimkomisidetail_id',
		extraParams: {
			klaimkomisi_id: 0,
			mode_read: 'detail'
		}
	},
	bindPrefixName: 'Klaimkomisi',
	newButtonLabel: 'New Klaim Komisi Detail',
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
					dataIndex: 'cluster_code',
					hideable: false,
					text: 'Kawasan'
				},
				{
					xtype: 'gridcolumn',
					width: 70,
					dataIndex: 'unit_unit_number',
					hideable: false,
					text: 'Unit Number'
				},
				{
					xtype: 'gridcolumn',
					width: 200,
					dataIndex: 'purchaseletter_purchaseletter_no',
					hideable: false,
					text: 'Purchaseletter No.'
				},
				{
					xtype: 'datecolumn',
					format: 'd-m-Y',
					width: 100,
					dataIndex: 'purchaseletter_purchase_date',
					hideable: false,
					text: 'Purchaseletter Date'
				},
				{
					xtype: 'gridcolumn',
					width: 200,
					dataIndex: 'customer_name',
					hideable: false,
					text: 'Customer Name'
				},
				{
					xtype: 'numbercolumn',
					width: 100,
					dataIndex: 'price_harga_neto',
					hideable: false,
					text: 'Harga Netto'
				},

				{
					xtype: 'numbercolumn',
					width: 200,
					align: 'right',
					dataIndex: 'nilai_komisi',
					hideable: false,
					text: 'Nilai Komisi'
				},
				{
					xtype: 'numbercolumn',
					width: 200,
					align: 'right',
					dataIndex: 'ppn',
					hideable: false,
					text: 'PPN'
				},
				{
					xtype: 'numbercolumn',
					width: 200,
					align: 'right',
					dataIndex: 'pph',
					hideable: false,
					text: 'PPH Perorangan'
				},
				{
					xtype: 'numbercolumn',
					width: 200,
					align: 'right',
					dataIndex: 'pphpt',
					hideable: false,
					text: 'PPH PT'
				},
				{
					xtype: 'numbercolumn',
					width: 200,
					align: 'right',
					dataIndex: 'komisitran_komisitran_id',
					hidden: true,
					text: 'KOMISI TRAN ID'
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
						margin: '0 5 0 0',
						disabled : true,
						itemId: 'addBtn',
						iconCls: 'icon-new',
						text: 'Add Purchaseletter'
					},
					{
						xtype: 'button',
						action: 'delete',
						margin: '0 5 0 0',

						iconCls: 'icon-delete',
						text: 'Delete Selected'
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
