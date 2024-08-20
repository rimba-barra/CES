Ext.define('Erems.view.pemutihan.FormSearch', {
    extend: 'Erems.library.template.view.FormSearch',
    alias: 'widget.pemutihanformsearch',
    initComponent: function () {
        var me = this;

        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            items: [{
                    fieldLabel:'Unit Number',
                    name:'unit_unit_number'
            },{
                    fieldLabel:'Purchaseletter Number',
                    name:'purchaseletter_no'
            },{
                    xtype      : 'xnamefieldEST',
                    fieldLabel : 'Customer Name',
                    name       : 'customer_name'
            }],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
