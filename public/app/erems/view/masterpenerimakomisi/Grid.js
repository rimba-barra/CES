Ext.define('Erems.view.masterpenerimakomisi.Grid', {
	extend: 'Erems.library.template.view.Grid',
	alias: 'widget.masterpenerimakomisigrid',
	store: 'Masterpenerimakomisi',
	bindPrefixName: 'Masterpenerimakomisi',
	// itemId:'',
	newButtonLabel: 'New Master Penerima Komisi',
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
					itemId: 'colms_penerima_komisi',
					width: 100,
					dataIndex: 'penerima_komisi',
					hideable: false,
//					align: 'right',
					text: 'Penerima Komisi'
				},
				me.generateActionColumn()
			]
		});

		me.callParent(arguments);
	}
});


