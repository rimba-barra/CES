Ext.define('Erems.view.changeprice.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    alias:'widget.changepriceformsearch',
    requires: ['Erems.template.ComboBoxFields'],
    initComponent: function() {
        var me = this;
        
        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {
                xtype: 'combobox',
                
                labelAlign: 'top',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '90%',
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
                    xtype:'textfield',
                    name:'unit_number',
                    fieldLabel:'Unit Number',
                    enableKeyEvents: true
                },
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
                    name:'purchaseletter_no',
                    fieldLabel:'Purchaseletter Number',
                    enableKeyEvents: true
                },
               
                {
                    xtype           : 'xnamefieldEST',
                    name            : 'customer_name',
                    fieldLabel      : 'Customer Name',
                    enableKeyEvents : true
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});