Ext.define('Erems.view.popuppurchasesatubulan.FormSearch', {
    extend: 'Erems.library.template.view.FormSearch',
    alias: 'widget.popuppurchasesatubulanformsearch',
    initComponent: function () {
        var me = this;

        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            items: [{
                    fieldLabel:'Purchaseletter Number',
                    name:'purchaseletter_no',
                    enableKeyEvents: true
            },{
                    xtype           : 'xnamefieldEST',
                    fieldLabel      :'Customer Name',
                    name            :'customer_name',
                    enableKeyEvents : true
            },{
                    fieldLabel:'Unit Number',
                    name:'unit_unit_number',
                    enableKeyEvents: true
            },{
                    fieldLabel:'Jumlah Hari Ke belakang',
                    name:'x_hari',
                    value:'30',
                    enableKeyEvents: true
            }],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
