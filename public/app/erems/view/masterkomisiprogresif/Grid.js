Ext.define('Erems.view.masterkomisiprogresif.Grid', {
	extend: 'Erems.library.template.view.Grid',
	alias: 'widget.masterkomisiprogresifgrid',
	store: 'Masterkomisiprogresif',
	bindPrefixName: 'Masterkomisiprogresif',
	// itemId:'',
	newButtonLabel: 'New Master Komisi Progresif',
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
					width: 50,
					dataIndex: 'code',
					hideable: false,
					text: 'Code'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_tahun',
					width: 100,
					dataIndex: 'tahun',
					hideable: false,
					text: 'Tahun'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_persentase',
					width: 100,
					dataIndex: 'persentase',
					hideable: false,
					text: 'Persentase'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_target_1',
					width: 100,
					dataIndex: 'target_1',
					hideable: false,
					align: 'right',
					text: 'Januari'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_target_2',
					width: 100,
					dataIndex: 'target_2',
					hideable: false,
					align: 'right',
					text: 'Februari'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_target_3',
					width: 100,
					dataIndex: 'target_3',
					hideable: false,
					align: 'right',
					text: 'Maret'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_target_4',
					width: 100,
					dataIndex: 'target_4',
					hideable: false,
					align: 'right',
					text: 'April'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_target_5',
					width: 100,
					dataIndex: 'target_5',
					hideable: false,
					align: 'right',
					text: 'Mei'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_target_6',
					width: 100,
					dataIndex: 'target_6',
					hideable: false,
					align: 'right',
					text: 'Juni'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_target_7',
					width: 100,
					dataIndex: 'target_7',
					hideable: false,
					align: 'right',
					text: 'Juli'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_target_8',
					width: 100,
					dataIndex: 'target_8',
					hideable: false,
					align: 'right',
					text: 'Agustus'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_target_9',
					width: 100,
					dataIndex: 'target_9',
					hideable: false,
					align: 'right',
					text: 'September'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_target_10',
					width: 100,
					dataIndex: 'target_10',
					hideable: false,
					align: 'right',
					text: 'Oktober'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_target_11',
					width: 100,
					dataIndex: 'target_11',
					hideable: false,
					align: 'right',
					text: 'November'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_target_12',
					width: 100,
					dataIndex: 'target_12',
					hideable: false,
					align: 'right',
					text: 'Desember'
				},
				me.generateActionColumn()
			]
		});

		me.callParent(arguments);
	}
});


