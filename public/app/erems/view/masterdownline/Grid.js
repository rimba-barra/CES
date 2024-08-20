Ext.define('Erems.view.masterdownline.Grid', {
	extend: 'Erems.library.template.view.Grid',
	alias: 'widget.masterdownlinegrid',
	store: 'Masterdownline',
	bindPrefixName: 'Masterdownline',
	// itemId:'',
	newButtonLabel: 'New Master Downline',
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
				{xtype: 'rownumberer'},
				{
					xtype: 'gridcolumn',
					text: 'ID',
					dataIndex: 'downline_id',
					hidden: true,
					hideable: false,
					width: 40,
					align: 'right'
				},
				{
					xtype: 'gridcolumn',
					text: 'Code',
					dataIndex: 'code',
					hideable: false,
					width: 75
				},
				{
					xtype: 'gridcolumn',
					text: 'Name',
					dataIndex: 'name',
					hideable: false,
					width: 300
				},
				{
					xtype: 'gridcolumn',
					text: 'Address',
					dataIndex: 'address',
					hideable: false,
					width: 300
				},
				{
					xtype: 'booleancolumn',
					width: 60,
					resizable: false,
					dataIndex: 'is_broker',
					text: 'Broker',
					align: 'center',
					falseText: ' ',
					trueText: '&#10003;'
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
						action: 'print',
						hidden: true,
						itemId: 'btnPrint',
						margin: '0 5 0 0',
						bindAction: me.bindPrefixName + 'Print',
						iconCls: 'icon-print',
						text: 'Print / Save'
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
});


