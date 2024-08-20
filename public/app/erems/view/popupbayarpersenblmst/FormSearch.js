Ext.define('Erems.view.popupbayarpersenblmst.FormSearch', {
    extend: 'Erems.library.template.view.FormSearch',
    alias: 'widget.popupbayarpersenblmstformsearch',
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
                    fieldLabel:'Sudah Bayar (%)',
                    name:'persen_bayar',
                    value:'20.0',
                    enableKeyEvents: true
            }],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
