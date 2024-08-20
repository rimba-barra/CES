Ext.define('Erems.view.masterdistchannel.Grid', {
	extend: 'Erems.library.template.view.Grid',
	alias: 'widget.masterdistchannelgrid',
	store: 'Masterdistchannel',
	bindPrefixName: 'Masterdistchannel',
	// itemId:'',
	newButtonLabel: 'New Master Distribution Channel',
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
					itemId: 'colms_code',
					width: 100,
					dataIndex: 'code',
					hideable: false,
					text: 'Code'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_distributionchannel',
					width: 100,
					dataIndex: 'distributionchannel',
					hideable: false,
//					align: 'right',
					text: 'Distribution Channel'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_description',
					width: 100,
					dataIndex: 'description',
					hideable: false,
//					align: 'right',
					text: 'Description'
				},
				me.generateActionColumn()
			]
		});

		me.callParent(arguments);
	}
});


