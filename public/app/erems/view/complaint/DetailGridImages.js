Ext.define('Erems.view.complaint.DetailGridImages', {
	extend         : 'Ext.grid.Panel',
	alias          : 'widget.complaintdetailgridimages',
	store          : 'Complaintimages',
	bindPrefixName : 'Complaintimages',
	newButtonLabel : 'Add New Images',
	height         : 150,
	initComponent  : function() {
		var me = this;

		Ext.applyIf(me, {
			dockedItems : me.generateDockedItems(),
			viewConfig  : {},
			columns     : [
				{
					xtype : 'rownumberer'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_image_filename',
					width     : 300,
					dataIndex : 'image_filename',
					hideable  : false,
					text      : 'Images File'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_description',
					width     : 200,
					dataIndex : 'description',
					hideable  : false,
					text      : 'Description'
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
						itemId     : 'btnNew',
						margin     : '0 5 0 0',
						iconCls    : 'icon-new',
						bindAction : me.bindPrefixName+'Create',
						text       : me.newButtonLabel
					},
					{
						xtype      : 'button',
						action     : 'view',
						disabled   : true,
						hidden     : true,
						itemId     : 'btnViewImages',
						margin     : '0 5 0 0',
						iconCls    : 'icon-copy',
						text       : 'View Images',
						bindAction : 'ComplaintdetailCreateimages'
					}
				]
			}
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
					tooltip    : 'Update.'
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