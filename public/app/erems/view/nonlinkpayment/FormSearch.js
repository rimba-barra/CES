Ext.define('Erems.view.nonlinkpayment.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    alias:'widget.nonlinkpaymentformsearch',
    requires: ['Erems.template.ComboBoxFields'],
    initComponent: function() {
        var me = this;
        
        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {
                xtype: 'combobox',
                labelWidth:75,
                width:'100%',
                typeAhead: true,
                queryMode: 'local',
                lastQuery: '',
                forceSelection:true,
                listeners:{
                    beforequery: function(record){
                        record.query = new RegExp(record.query, 'i');
                        record.forceAll = true;
                    }
                }
            },
            items: [
                {
                    xtype           :'xnamefieldEST',
                    name            :'customer_name',
                    fieldLabel      :'Customer Name',
                    enableKeyEvents : true
                },
                {
                    name: 'paymentmethod_id',
                    displayField: cbf.paymentmethod.d,
                    valueField: cbf.paymentmethod.v,
                    fieldLabel:'Payment Method',
                    enableKeyEvents: true
                },
                {
                    xtype:'textfield',
                    name:'receipt_no',
                    fieldLabel:'Receipt Number',
                    enableKeyEvents: true
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});