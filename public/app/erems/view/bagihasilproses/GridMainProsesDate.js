Ext.define('Erems.view.bagihasilproses.GridMainProsesDate', {
	extend: 'Erems.library.template.view.Grid',

	alias: 'widget.bagihasilprosesdategrid',
	store: 'Bagihasilprosesdate',
	bindPrefixName: 'Bagihasilproses',

	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			contextMenu: {},
			dockedItems: me.generateDockedItems(),
			viewConfig: {
			},
			/* selModel: Ext.create('Ext.selection.CheckboxModel', {
			 }), */
			selModel: new Ext.selection.RowModel({
				mode: "SINGLE"
			}),
			defaults: {
				xtype: 'gridcolumn',
				width: 100,
				hidden: false
			},
			columns: [
				{
					xtype: 'rownumberer'
				},
				{
					dataIndex: 'pt_name',
					width: 150,
					sortable: false,
					text: 'PT Name'
				},
				{
					dataIndex: 'doc_no',
					width: 100,
					sortable: false,
					text: 'Document No.'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_proses_date',
					width: 80,
					dataIndex: 'proses_date',
					hideable: false,
					sortable: false,
					text: 'Proses Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_total',
					width: 150,
					dataIndex: 'total',
					align: 'right',
					hideable: false,
					sortable: false,
					text: 'Total (LRP Payment)'
				}
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
						action: 'print_lrp_stimulsoft',
						disabled: true,
						itemId: 'btnPrintLRPMRT',
						margin: '0 5 0 0',
						iconCls: 'icon-print',
						text: 'Print'
					},
					{
						xtype: 'button',
						action: 'print_lrp_excel',
						disabled: true,
						itemId: 'btnPrintLRPXLS',
						margin: '0 5 0 0',
						iconCls: 'icon-print',
						text: 'Export Excel'
					},
					{
						xtype: 'button',
						action: 'print_lrp_pdf',
						disabled: true,
						itemId: 'btnPrintLRPPDF',
						margin: '0 5 0 0',
						iconCls: 'icon-print',
						text: 'Export PDF'
					},
					{
						text: 'Delete',
						iconCls: 'icon-delete',
						action: 'destroy',
						bindAction: me.bindPrefixName + 'Delete',
						disabled: true,
						itemId: 'btnDestroy',
						altText: 'Delete',
						tooltip: 'Delete',
						hidden: true
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