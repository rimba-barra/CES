Ext.define('Erems.view.ktpiutangfin.FormSearch', {
    extend: 'Erems.library.template.view.FormSearch',
    alias: 'widget.ktpiutangfinformsearch',
    initComponent: function () {
        var me = this;

        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            items: [{
                    fieldLabel:'Purchaseletter Number',
                    name:'purchaseletter_no'
            },{
                    xtype      : 'xnamefieldEST',
                    fieldLabel : 'Customer Name',
                    name       :'customer_name'
            },{
                    fieldLabel:'Unit Number',
                    name:'unit_unit_number'
            },{
                    fieldLabel:'Jumlah Hari Ke belakang',
                    name:'x_hari',
                    value:'30'
            }],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
