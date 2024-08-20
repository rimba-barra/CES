Ext.define('Erems.view.masterpencairankomisi.Grid', {
	extend: 'Erems.library.template.view.Grid',
	alias: 'widget.masterpencairankomisigrid',
	store: 'Masterpencairankomisi',
	bindPrefixName: 'Masterpencairankomisi',
	// itemId:'',
	newButtonLabel: 'New Master Pencairan Komisi',
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
					itemId: 'colms_code',
					width: 100,
					dataIndex: 'code',
					hideable: false,
					text: 'Code'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_distributionchannel',
					width: 150,
					dataIndex: 'distributionchannel',
					hideable: false,
					text: 'Distribution Channel'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_judul_komisi',
					width: 130,
					dataIndex: 'judul_komisi',
					hideable: false,
					text: 'Judul Komisi'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_jumlah_komisi',
					width: 'auto',
					dataIndex: 'jumlah_komisi',
					hideable: false,
					text: 'Jumlah komisi yg dibagi'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_jumlah_persen',
//					width: 100,
					dataIndex: 'jumlah_persen',
					hideable: false,
					align: 'right',
					text: 'Total Persentase',
					renderer:  Ext.util.Format.numberRenderer('0,000.0000'),
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_jumlah_nominal',
//					width: 100,
					dataIndex: 'jumlah_nominal',
					hideable: false,
					align: 'right',
					text: 'Total Nominal'
				},
				me.generateActionColumn()
			]
		});

		me.callParent(arguments);
	}
});


