Ext.define('Cashier.view.nonlinkpayment.FormSearch',{
    extend:'Cashier.library.template.view.FormSearch',
    alias:'widget.nonlinkpaymentformsearch',
    requires: ['Cashier.template.ComboBoxFields'],
    initComponent: function() {
        var me = this;
        
        var cbf = new Cashier.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {
                xtype: 'combobox',
                labelWidth:75,
                width:'100%'
            },
            items: [
               
                
                {
                    xtype:'textfield',
                    name:'customer_name',
                    fieldLabel:'Customer Name'
                },
                {
                    name: 'paymentmethod_id',
                    displayField: cbf.paymentmethod.d,
                    valueField: cbf.paymentmethod.v,
                    fieldLabel:'Payment Method'
                },
                {
                    xtype:'textfield',
                    name:'receipt_no',
                    fieldLabel:'Receipt Number'
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});