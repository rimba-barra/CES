Ext.define('Erems.view.profitsharingproses.GridMainProsesDate', {
	extend: 'Erems.library.template.view.Grid',

	alias: 'widget.profitsharingprosesdategrid',
	store: 'Profitsharingprosesdate',
	bindPrefixName: 'Profitsharingproses',

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
					dataIndex: 'doc_no',
					width: 100,
					sortable: false,
					text: 'Document No.'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_proses_date',
					width: 80,
					dataIndex: 'process_date',
					hideable: false,
					sortable: false,
					text: 'Proses Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_total_rs',
					width: 150,
					dataIndex: 'total_rs',
					align: 'right',
					sortable: false,
					hideable: false,
					text: 'Total'
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
						action: 'print',
						disabled: true,
						itemId: 'btnPrint',
						margin: '0 5 0 0',
						iconCls: 'icon-print',
						text: 'Print'
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