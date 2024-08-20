Ext.define('Erems.view.masterbank.FormSearch', {
    extend: 'Main.library.FormSearch',
	
	alias: 'widget.MasterbankFormSearch',
	itemId: 'MasterbankFormSearch',
	
	initComponent: function(){
		var me = this;
        Ext.applyIf(me, {
			items: [
				{
					xtype           : 'xnamefieldEST',
					fieldLabel      : 'Bank Name',
					itemId          : 'bank_name',
					name            : 'bank_name',
					enableKeyEvents : true
                },							
                {
					xtype           : 'xnamefieldEST',
					fieldLabel      : 'PT Bank Name',
					itemId          : 'bank_company_name',
					name            : 'bank_company_name',
					enableKeyEvents : true
                },
			]
		});
		me.callParent(arguments);
	}
});