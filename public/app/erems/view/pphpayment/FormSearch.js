Ext.define('Erems.view.pphpayment.FormSearch', {
    extend: 'Main.library.FormSearch',
	
	alias: 'widget.PphpaymentFormSearch',
	itemId: 'PphpaymentFormSearch',
	
	initComponent: function(){
		var me = this;
        Ext.applyIf(me, {
			items: [
				{
                    xtype: 'textfield',
					fieldLabel: 'Unit Number',
                    itemId: 'unit_number',
                    name: 'unit_number',
                    enableKeyEvents: true
                },							
                {
                    xtype: 'textfield',
					fieldLabel: 'Purchaseletter No',
                    itemId: 'purchaseletter_no',
                    name: 'purchaseletter_no',
                    enableKeyEvents: true
                },
				{
                    xtype           : 'xnamefieldEST',
                    fieldLabel      : 'Customer Name',
                    itemId          : 'customer_name',
                    name            : 'customer_name',
                    enableKeyEvents : true
                },
			]
		});
		me.callParent(arguments);
	}
});