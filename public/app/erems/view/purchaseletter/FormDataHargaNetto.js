Ext.define('Erems.view.purchaseletter.FormDataHargaNetto', {
	extend   : 'Erems.library.template.view.FormData',
	alias       : 'widget.purchaseletterformdataharganetto',
	frame       : true,
	autoScroll  : true,
	anchorSize  : 100,
	height      : 250,
	width       : 350,
	bodyBorder  : true,
	bodyPadding : 10,
	editedRow   : -1,
	bodyStyle   : 'padding:5px 5px 0',
	defaults    : {
		border : false,
		xtype  : 'panel',
		flex   : 1,
		layout : ''
	},
	initComponent : function () {
		var me = this;

		Ext.applyIf(me, {
			items: [
				{
					xtype  : 'hiddenfield',
					itemId : 'purchaseletter_id',
					name   : 'purchaseletter_id'
				}, 
				{
					xtype       : 'panel', 
					bodyPadding : 10,
					items       : [
						{
							padding   : '10px 0 0 0',
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							items     : [
								{
									xtype      : 'xmoneyfieldEST',
									fieldLabel : 'Harga Netto',
									name       : 'harga_netto',
									flex       : 1,
									readOnly   : true,
									fieldStyle : 'background:none;background-color:#F2F2F2 !important; text-align:right'
								}
							]
						}
					]
				},
				{
					xtype       : 'panel', 
					bodyPadding : 10,
					items       : [
						{
							padding   : '10px 0 0 0',
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							items     : [
								{
									xtype           : 'xmoneyfieldEST',
									fieldLabel      : 'Harga Netto Komisi',
									name            : 'harga_netto_komisi',
									itemId          : 'harga_netto_komisi',
									flex            : 1,
									value           : 0.00,
									allowBlank      : false,
									enableKeyEvents : true,
									maskRe          : /[0-9]/
								}
							]
						}
					]
				}
			],
			dockedItems: me.generateDockedItem()
		});

		me.callParent(arguments);
	},
	generateDockedItem: function () {
		var x = [
			{
				xtype  : 'toolbar',
				dock   : 'bottom',
				ui     : 'footer',
				layout : {
					padding : 6,
					type    : 'hbox'
				},
				items : [
					{
						xtype    : 'button',
						action   : 'save',
						itemId   : 'saveHargaNetto',
						padding  : 5,
						width    : 75,
						iconCls  : 'icon-save',
						text     : 'Save'
					},
					{
						xtype   : 'button',
						action  : 'cancel',
						itemId  : 'btnCancel',
						padding : 5,
						width   : 75,
						iconCls : 'icon-cancel',
						text    : 'Cancel',
						handler : function () {
							this.up('window').close();
						}
					}
				]
			}
		];
		return x;
	}
});