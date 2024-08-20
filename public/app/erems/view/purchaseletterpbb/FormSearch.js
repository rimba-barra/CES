Ext.define('Erems.view.purchaseletterpbb.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    alias:'widget.purchaseletterpbbformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
				{
					xtype: 'textfield',
					fieldLabel: 'Unit Number',
					itemId: 'unit_number',
					name: 'unit_number',
					anchor:'-15'
				},
				{
                    xtype      : 'xnamefieldEST',
                    itemId     : 'customer_name',
                    name       : 'customer_name',
                    fieldLabel : 'Customer name',
                    anchor     :'-15'
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});