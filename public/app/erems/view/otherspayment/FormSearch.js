Ext.define('Erems.view.otherspayment.FormSearch', {
    extend: 'Erems.library.template.view.FormSearch',
    alias: 'widget.otherspaymentformsearch',
    requires: ['Erems.template.ComboBoxFields'],
    initComponent: function () {
        var me = this;

        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {
                xtype: 'combobox',

                labelAlign: 'top',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '90%'
            },
            items: [
                {
                    xtype: 'textfield',
                    name: 'unit_number',
                    fieldLabel: 'Unit Number',
                    enableKeyEvents: true
                },
                {
                    name: 'cluster_id',
                    displayField: cbf.cluster.d,
                    valueField: cbf.cluster.v,
                    fieldLabel: 'Cluster'
                },
                {
                    name: 'block_id',
                    displayField: cbf.block.d,
                    valueField: cbf.block.v,
                    fieldLabel: 'Block'
                },

                {
                    xtype           : 'xnamefieldEST',
                    name            : 'customer_name',
                    fieldLabel      : 'Customer Name',
                    enableKeyEvents : true
                },
                {
                    name: 'paymentmethod_id',
                    displayField: cbf.paymentmethod.d,
                    valueField: cbf.paymentmethod.v,
                    fieldLabel: 'Payment Method'
                },
                {
                    xtype: 'textfield',
                    name: 'receipt_no',
                    fieldLabel: 'Receipt Number',
                    enableKeyEvents: true
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});