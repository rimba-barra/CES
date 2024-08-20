Ext.define('Erems.view.masterim.Grid', {
	extend: 'Erems.library.template.view.Grid',
	alias: 'widget.masterimgrid',
	store: 'Masterim',
	bindPrefixName: 'Masterim',
	// itemId:'',
	newButtonLabel: 'Add New',
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
					header: 'internalmemo_id',
					dataIndex: 'internalmemo_id',
					hidden: true
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_nomor_im',
					width: 150,
					dataIndex: 'nomor_im',
					hideable: false,
					text: 'Nomor IM'
				},
                {
                    xtype     : 'datecolumn',
					itemId 	  : 'colms_tanggal_im',
                    width     : 100,
                    dataIndex : 'tanggal_im',
                    format    :'d-m-Y',
                    hideable  : false,
                    text      : 'Tgl. IM'
                },
                {
                    xtype     : 'datecolumn',
					itemId 	  : 'colms_periode_start',
                    width     : 100,
                    dataIndex : 'periode_start',
                    format    :'d-m-Y',
                    hideable  : false,
                    text      : 'Periode Start'
                },
                {
                    xtype     : 'datecolumn',
					itemId 	  : 'colms_periode_end',
                    width     : 100,
                    dataIndex : 'periode_end',
                    format    :'d-m-Y',
                    hideable  : false,
                    text      : 'Periode End'
                },
				{
					xtype: 'gridcolumn',
					itemId: 'colms_description',
					width: 250,
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


