Ext.define('Erems.view.changeprice.FormDataViewDocument', {
	extend      : 'Erems.library.template.view.FormData',
	alias       : 'widget.changepriceformdataviewdocument',
	frame       : true,
	autoScroll  : true,
	anchorSize  : 100,
	height      : 600,
	width       : 800,
	bodyBorder  : true,
	bodyPadding : 10,
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
			items       : [],
			dockedItems : me.generateDockedItem()
		});

		me.callParent(arguments);
	},
	generateDockedItem: function () {
		var me = this;
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
						xtype   : 'button',
						itemId  : 'btnDelete',
						padding : 5,
						width   : 75,
						iconCls : 'icon-delete',
						text    : 'Delete',
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