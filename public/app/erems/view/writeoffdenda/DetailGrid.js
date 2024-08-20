Ext.define('Erems.view.writeoffdenda.DetailGrid', {
	extend         : 'Erems.library.template.view.Grid',
	alias          : 'widget.writeoffdendadetailgrid',
	store          : 'Writeoffdendadetail',
	bindPrefixName : 'Writeoffdendadetail',
	newButtonLabel : 'Add New',
	height         : 200,
	initComponent  : function() {
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
					itemId    : 'colms_schedule_id',
					width     : 75,
					align     : 'right',
					dataIndex : 'schedule_id',
					hideable  : false,
					text      : 'Schedule ID'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_description',
					width     : 200,
					dataIndex : 'description',
					hideable  : false,
					text      : 'Schedule Description'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_scheduletype',
					width     : 75,
					dataIndex : 'scheduletype',
					hideable  : false,
					text      : 'Type'
				},
				{
					xtype     : 'numbercolumn',
					itemId    : 'colms_denda',
					width     : 150,
					align     : 'right',
					dataIndex : 'denda',
					hideable  : false,
					text      : 'Denda Amount'
				},
				{
					xtype     : 'numbercolumn',
					itemId    : 'colms_remaining_denda', //colms_remaining_balance
					width     : 150,
					align     : 'right',
					dataIndex : 'remaining_denda', //remaining_balance
					hideable  : false,
					text      : 'Remaining Denda' //Remaining Balance
				},
				{
					xtype     : 'numbercolumn',
					itemId    : 'colms_writeoff',
					width     : 150,
					align     : 'right',
					dataIndex : 'writeoff',
					hideable  : false,
					text      : 'Write Off Amount'
				},
				{
					xtype     : 'numbercolumn',
					itemId    : 'colms_after_writeoff',
					width     : 150,
					align     : 'right',
					dataIndex : 'after_writeoff',
					hideable  : false,
					text      : 'After Write Off'
				},
				me.generateActionColumn()
			]
		});

		me.callParent(arguments);
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
						disabled   : true,
						itemId     : 'btnNew',
						margin     : '0 5 0 0',
						iconCls    : 'icon-new',
						bindAction : me.bindPrefixName + 'Create',
						text       : me.newButtonLabel
					}
				]
			},
		];
		return dockedItems;
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
					text       : 'Edit',
					iconCls    : 'icon-edit',
					bindAction : me.bindPrefixName+'Update',
					altText    : 'Edit',
					tooltip    : 'Edit'
				},
				{
					text       : 'Delete',
					iconCls    : 'icon-delete',
					bindAction : me.bindPrefixName+'Delete',
					altText    : 'Delete',
					tooltip    : 'Delete'
				}
			]
		};
		return ac;
	}
});