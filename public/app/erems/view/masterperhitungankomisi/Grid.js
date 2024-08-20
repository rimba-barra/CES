Ext.define('Erems.view.masterperhitungankomisi.Grid', {
	extend: 'Erems.library.template.view.Grid',
	alias: 'widget.masterperhitungankomisigrid',
	store: 'Masterperhitungankomisi',
	bindPrefixName: 'Masterperhitungankomisi',
	// itemId:'',
	newButtonLabel: 'New Master Perhitungan Komisi',
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
					header: 'Komisi_distributionchannel_ID',
					dataIndex: 'komisi_distributionchannel_id',
					hidden: true
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_judul_perhitungan',
					width: '30%',
					dataIndex: 'judul',
					hideable: false,
					text: 'Judul'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_description',
					width: '100%',
					dataIndex: 'description',
					hideable: false,
					text: 'Description'
				},
				me.generateActionColumn()
			]
		});

		me.callParent(arguments);
	}
});


