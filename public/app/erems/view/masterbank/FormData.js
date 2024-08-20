Ext.define('Erems.view.masterbank.FormData', {
	extend: 'Main.library.FormData',
	
	alias: 'widget.MasterbankFormData',
	itemId: 'MasterbankFormData',
	
	width: 500,
		
	initComponent: function() {
		var me = this;
        Ext.applyIf(me, {
			items: [
				{
                    xtype: 'hiddenfield',
                    itemId: 'bank_id',
                    name: 'bank_id'
				},
				{
					xtype      : 'xnamefieldEST',
					fieldLabel : 'Bank Name',
					itemId     : 'bank_name',
					name       : 'bank_name',
					allowBlank : false                   
                },
				{
					xtype      : 'xnamefieldEST',
					fieldLabel : 'PT Bank Name',
					itemId     : 'bank_company_name',
					name       : 'bank_company_name',
					allowBlank : false                   
                },
				{
                    xtype: 'textfield',
					fieldLabel: 'Description',
                    itemId: 'description',
                    name: 'description'          
                },
			]
		});
		me.callParent(arguments);
	}
});