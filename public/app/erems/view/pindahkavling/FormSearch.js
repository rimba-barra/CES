Ext.define('Erems.view.pindahkavling.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    alias:'widget.pindahkavlingformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                 {
                    xtype: 'textfield',
                    name: 'unit_number',
                    fieldLabel: 'Unit Number',
                    enforceMaxLength: true,
                   
                },
                {
                    xtype: 'textfield',
                    name: 'purchaseletter_no',
                    fieldLabel: 'Purchaseletter No',
                    enforceMaxLength: true,
                },
               
                {
                    xtype      : 'xnamefieldEST',
                    name       : 'customer_name',
                    fieldLabel : 'Customer Name',
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});