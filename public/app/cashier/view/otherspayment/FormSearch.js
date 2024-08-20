Ext.define('Cashier.view.otherspayment.FormSearch',{
    extend:'Cashier.library.template.view.FormSearch',
    alias:'widget.otherspaymentformsearch',
    requires: ['Cashier.template.ComboBoxFields'],
    initComponent: function() {
        var me = this;
        
        var cbf = new Cashier.template.ComboBoxFields();

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
                    name: 'cluster_id',
                    displayField: cbf.cluster.d,
                    valueField: cbf.cluster.v,
                    fieldLabel:'Cluster'
                },
                {
                    name: 'block_id',
                    displayField: cbf.block.d,
                    valueField: cbf.block.v,
                    fieldLabel:'Block'
                },
                {
                    xtype:'textfield',
                    name:'unit_number',
                    fieldLabel:'Unit Number'
                },
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