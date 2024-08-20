Ext.define('Erems.view.writeoffdenda.DetailGrid2', {
   extend         : 'Erems.library.template.view.Grid',
   alias          : 'widget.writeoffdendadetailgrid2',
   store          : 'Writeoffdendascheduledetail',
   bindPrefixName : 'Writeoffdendascheduledetail',
   newButtonLabel : 'Add Schedule',
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
					width     : 35,
					align     : 'right',
					dataIndex : 'schedule_id',
					hideable  : false,
					text      : 'ID'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_description',
					width     : 150,
					dataIndex : 'description',
					hideable  : false,
					text      : 'Description'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_duedate',
					width     : 100,
					dataIndex : 'duedate',
					hideable  : false,
					text      : 'Due Date',
					renderer  : Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_scheduletype',
					width     : 50,
					dataIndex : 'scheduletype',
					hideable  : false,
					text      : 'Type'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_queue',
					width     : 50,
					align     : 'right',
					dataIndex : 'queue',
					hideable  : false,
					text      : 'Queue'
				},
				{
					xtype     : 'numbercolumn',
					itemId    : 'colms_denda',
					width     : 100,
					align     : 'right',
					dataIndex : 'denda',
					hideable  : false,
					text      : 'Denda'
				},
				{
					xtype     : 'numbercolumn',
					itemId    : 'colms_remaining_denda',
					width     : 100,
					align     : 'right',
					dataIndex : 'remaining_denda',
					hideable  : false,
					text      : 'Remaining Denda'
				}
			]
		});

		me.callParent(arguments);
	},
	
	generateDockedItems: function() {
		var me          = this;
		var dockedItems = [
			{
				xtype : 'toolbar',
				dock  : 'bottom',
				items : [
					{
						xtype      : 'button',
						action     : 'select',
						hidden     : false,
						disabled   : true,
						itemId     : 'btnSelectSchedule',
						margin     : '0 5 0 0',
						iconCls    : 'icon-new',
						bindAction : me.bindPrefixName+'Select',
						text       : 'Select Schedule'
					}
				]
			},
		];
		return dockedItems;
	}
	
});