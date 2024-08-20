Ext.define('Erems.view.profitsharingpilih.GridDetail', {
//    extend: 'Ext.grid.Panel',	
	extend: 'Erems.library.template.view.Grid',
	alias: 'widget.profitsharingpilihgriddetail',
	itemId: 'profitsharingpilihgriddetail',
	store: 'Profitsharingpilihdetail',
	height: 150,
	initComponent: function () {
		var me = this;
		Ext.applyIf(me, {
			enableColumnHide: false,
			enableColumnMove: false,
			sortableColumns: false,
			viewConfig: {markDirty: false},
			columnLines: true,
			// selModel: Ext.create('Ext.selection.CheckboxModel', {}),
			columns: [
//				{xtype: 'rownumberer'},
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_tanah_permeter_awal',
                    width: 100,
                    dataIndex: 'tanah_permeter_awal',
                    hideable: false,
                    align: 'right',
                    text: 'Tanah/Meter Awal'
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_nilai_lahan_gross',
                    width: 100,
                    dataIndex: 'nilai_lahan_gross',
                    hideable: false,
                    align: 'right',
                    text: 'Nilai Lahan Gross'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_efisiensi_lahan',
                    width: 100,
                    dataIndex: 'efisiensi_lahan',
                    hideable: false,
                    align: 'right',
                    text: 'Efisiensi Lahan'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_komisi_marketing',
                    width: 100,
                    dataIndex: 'komisi_marketing',
                    hideable: false,
                    align: 'right',
                    text: 'Komisi Marketing'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_management_fee',
                    width: 100,
                    dataIndex: 'management_fee',
                    hideable: false,
                    align: 'right',
                    text: 'Management Fee'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colms_royalty',
                    width: 100,
                    dataIndex: 'royalty',
                    hideable: false,
					align: 'right',
                    text: 'Royalty'
                },
			]
		});
		me.callParent(arguments);
	}
});