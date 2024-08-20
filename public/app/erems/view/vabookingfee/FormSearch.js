Ext.define('Erems.view.vabookingfee.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    alias:'widget.vabookingfeeformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'No. VA BCA',
                    itemId: 'nomor_va',
                    name: 'nomor_va',
                    maskRe:/[^']/
                },      
                {
                    xtype: 'textfield',
                    fieldLabel: 'No. VA Mandiri',
                    itemId: 'nomor_vamandiri',
                    name: 'nomor_vamandiri',
                    maskRe:/[^']/
                },                          
                {
                    xtype      : 'xnamefieldEST',
                    fieldLabel : 'Customer Name',
                    itemId     : 'customer_name',
                    name       : 'customer_name',
                },                      
                {
                    xtype: 'textfield',
                    fieldLabel: 'Receipt No.',
                    itemId: 'receipt_no',
                    name: 'receipt_no',
                    maskRe:/[^']/
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
