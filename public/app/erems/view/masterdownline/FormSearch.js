Ext.define('Erems.view.masterdownline.FormSearch', {
	extend: 'Erems.library.template.view.FormSearch',
	alias: 'widget.masterdownlineformsearch',
	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			items: [
				{
					xtype: 'textfield',
					fieldLabel: 'Code',
					itemId: 'fsms_code',
					name: 'code',
				},
				{
					xtype      : 'xnamefieldEST',
					fieldLabel : 'Name',
					itemId     : 'fsms_name',
					name       : 'name',
				},
			]
		});
		me.callParent(arguments);
	}
});
