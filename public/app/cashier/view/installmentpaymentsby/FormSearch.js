Ext.define('Cashier.view.installmentpaymentsby.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.installmentpaymentsbyformsearch',
    initComponent: function () {
        var me = this;

        var cbf = new Cashier.template.ComboBoxFields();

        Ext.applyIf(me, {
           
            items: [
                {
                    xtype:'combobox',
                    labelWidth: 75,
                    width: '100%',
                    name: 'cluster_id',
                    displayField: 'cluster',
                    valueField: 'cluster_id',
                    fieldLabel: 'Cluster'
                },
                {
                    xtype:'combobox',
                    labelWidth: 75,
                    width: '100%',
                    name: 'block_id',
                    displayField: 'code',
                    valueField: 'block_id',
                    fieldLabel: 'Block'
                },
                {
                    xtype: 'textfield',
                    name: 'unit_number',
                    fieldLabel: 'Unit Number'
                },
                {
                    xtype: 'textfield',
                    name: 'customer_name',
                    fieldLabel: 'Customer Name'
                },
                {
                    xtype:'combobox',
                    labelWidth: 75,
                    width: '100%',
                    name: 'paymentmethod_id',
                    displayField: 'paymentmethod',
                    valueField: 'paymentmethod_id',
                    fieldLabel: 'Payment Method'
                },
                {
                    xtype: 'textfield',
                    name: 'receipt_no',
                    fieldLabel: 'Receipt Number'
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});