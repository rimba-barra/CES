Ext.define('Erems.view.informasitagihan.Grid', {
	extend         : 'Erems.library.template.view.Grid',
	alias          : 'widget.informasitagihangrid',
	store          : 'Informasitagihan',
	bindPrefixName : 'Informasitagihan',
	newButtonLabel : 'Generate',
	initComponent  : function () {
		var me = this;

		Ext.applyIf(me, {
			dockedItems : me.generateDockedItems(),
			viewConfig  : {},
			selModel    : {},
			columns     : [
				{
					xtype     : 'gridcolumn',
					header    : 'tagihan_id',
					dataIndex : 'tagihan_id',
					hidden    : true
				},
				{
					xtype     : 'datecolumn',
					itemId    : 'colms_proses_date',
					width     : 378,
					dataIndex : 'proses_date',
					hideable  : false,
					text      : 'Tanggal',
					format    : 'd-m-Y'
				},
			],
		});

		me.callParent(arguments);
	},
	generateDockedItems: function() {
		var me = this;
		return [
			{
				layout    : 'hbox',
				dock      : 'top',
				height    : 28,
				bodyStyle : 'border:0px; background:none;',
				margin    : '0 0 5px 0',
				items     : [
					{
						xtype   : 'button',
						action  : 'generateprosesdate',
						hidden  : false,
						padding : '3px 154px 3px 154px',
						iconCls : 'icon-gear',
						text    : 'Generate'
					},
				]
			},
			{
				xtype       : 'pagingtoolbar',
				dock        : 'bottom',
				displayInfo : true,
				store       : this.getStore()
			}
		];
	},
});