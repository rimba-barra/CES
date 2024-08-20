Ext.define('Erems.view.complaint.DetailGridDokumen', {
	extend         : 'Ext.grid.Panel',
	alias          : 'widget.complaintdetailgriddokumen',
	store          : 'Complaintdokumen',
	bindPrefixName : 'Complaintdokumen',
	newButtonLabel : 'Add New Dokumen',
	height         : 150,
	initComponent  : function() {
		var me = this;

		Ext.applyIf(me, {
			dockedItems : me.generateDockedItems(),
			viewConfig  : {},
			selModel    : Ext.create('Ext.selection.CheckboxModel', {}),
			columns     : [
				{
					xtype : 'rownumberer'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_dokumen_filename',
					width     : 300,
					dataIndex : 'doc_filename',
					hideable  : false,
					text      : 'Dokumen Name'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_jenis_file',
					width     : 150,
					dataIndex : 'jenis_file',
					hideable  : false,
					text      : 'Jenis File'
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
						xtype   : 'button',
						action  : 'create',
						itemId  : 'btnNew',
						margin  : '0 5 0 0',
						iconCls : 'icon-new',
						text    : me.newButtonLabel
					},
					{
						xtype    : 'button',
						action   : 'delete',
						disabled : true,
						itemId   : 'btnDelete',
						margin   : '0 5 0 0',
						iconCls  : 'icon-delete',
						text     : 'Delete',
					},
					{
						xtype   : 'button',
						action  : 'pemerikasaanBangunan',
						hidden  : true,
						itemId  : 'btnpemerikasaanBangunan',
						margin  : '0 5 0 0',
						iconCls : 'icon-print',
						text    : 'Pemerikasaan Bangunan',
					},
					{
						xtype   : 'button',
						action  : 'sertifikatST',
						hidden  : true,
						itemId  : 'btnsertifikatST',
						margin  : '0 5 0 0',
						iconCls : 'icon-print',
						text    : 'Sertifikat Layak ST',
					},
					{
						xtype   : 'button',
						action  : 'ceklistBangunan',
						hidden  : true,
						itemId  : 'btnceklistBangunan',
						margin  : '0 5 0 0',
						iconCls : 'icon-print',
						text    : 'Form Ceklist Bangunan',
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
			itemId    : 'actioncolumn',
			width     : 50,
			resizable : false,
			align     : 'center',
			hideable  : false,
			items     : [
				{
					tooltip : 'Download',
					icon    : document.URL+'app/main/images/icons/download.png',
					handler : function( view, rowIndex, colIndex, item, e, record, row ) {
						this.fireEvent( 'downloadaction', arguments );
					}
				}
			]
		};
		return ac;
	}

});
