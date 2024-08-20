Ext.define('Erems.view.purchaseletter.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    alias:'widget.purchaseletterformsearch',
    requires: [],
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            items: [{
                    fieldLabel:'Purchaseletter Number',
                    name:'purchaseletter_no'
            },{
                    fieldLabel:'Customer Name',
                    name:'customer_name'
            },{
                    fieldLabel:'Unit Number',
                    name:'unit_unit_number'
            },{
                    fieldLabel:'VA BCA',
                    name:'unit_virtualaccount_bca'
            },{
                    fieldLabel:'VA Mandiri',
                    name:'unit_virtualaccount_mandiri'
            }],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});