Ext.define('Erems.view.formorderijb.FormSearch', {
    extend: 'Erems.library.template.view.FormSearch',
    alias: 'widget.formorderijbformsearch',
    initComponent: function () {
        var me = this;

        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
           
            items: [
                
                {
                    xtype: 'textfield',
                    name: 'unit_number',
                    fieldLabel: 'Unit Number'
                },
                {
                    xtype      : 'xnamefieldEST',
                    name       : 'customer_name',
                    fieldLabel : 'Customer Name'
                },
               
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});