Ext.define('Erems.view.masterdocumentunit.GridDocument',{
	extend      : 'Erems.library.template.view.GridDS2',
	alias       : 'widget.masterdocumentunitgriddocument',
	storeConfig : {
		id          : 'MasterUnitGridDocumentStore',
		idProperty  : 'unitdocument_id',
		extraParams : { mode_read : 'documents' }
	},
	bindPrefixName : 'masterdocumentunit',
	height         : 200,
	newButtonLabel : 'New Document',
	initComponent  : function() {
		var me = this;

		Ext.applyIf(me, {
			contextMenu : me.generateContextMenu(),
			dockedItems : me.generateDockedItems(),
			viewConfig  : {},
			selModel    : Ext.create('Ext.selection.CheckboxModel', {}),
			columns     : [
				{
					xtype: 'rownumberer'
				},
				{
					xtype     : 'gridcolumn',                   
					width     : 100,
					dataIndex : 'filename',
					text      : 'Filename'
				},
				{
					xtype     : 'gridcolumn',
					width     : 80,
					dataIndex : 'documenttype_documenttype',
					text      : 'Type'
				},
				{
					xtype     : 'gridcolumn',
					width     : 100,
					dataIndex : 'customer_name',
					text      : 'Customer'
				},
				{
					xtype     : 'gridcolumn',
					width     : 110,
					dataIndex : 'purchaseletter_no',
					text      : 'Nomor Pesanan'
				},
				{
					xtype     : 'gridcolumn',
					width     : 90,
					dataIndex : 'Addby',
					text      : 'User Upload'
				},
				{
					xtype     : 'gridcolumn',
					width     : 70,
					dataIndex : 'Addon',
					text      : 'Tgl. Upload'
				},
				{
					xtype     : 'gridcolumn',
					width     : 200,
					dataIndex : 'description',
					text      : 'Description'
				},
								
				me.generateActionColumn()
			],
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
						margin     : '0 5 0 0',
						iconCls    : 'icon-new',
						bindAction : me.bindPrefixName + 'Create',
						text       : me.newButtonLabel
					},
					{
						xtype      : 'button',
						action     : 'update',
						margin     : '0 5 0 0',
						iconCls    : 'icon-edit',
						text       : 'Edit',
						bindAction : me.bindPrefixName + 'Update'
					},
					{
						xtype      : 'button',
						action     : 'destroy',
						bindAction : me.bindPrefixName + 'Delete',
						iconCls    : 'icon-delete',
						text       : 'Delete'
					},
					{
						xtype: 'tbspacer',
						flex: 1
					},
					{
						xtype           : 'textfield',
						fieldStyle      : 'padding:0 5px 0 3px;',
						name            : 'search',
						text            : 'Search',
						emptyText       : 'Search',
						enableKeyEvents : true
					},
					{
						xtype   : 'button',
						action  : 'searchdocument',
						iconCls : 'icon-search',
					}
				]
			},
			{
				xtype       : 'pagingtoolbar',
				dock        : 'bottom',
				width       : 360,
				displayInfo : true,
				store       : this.getStore()
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


