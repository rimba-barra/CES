Ext.define('Erems.view.popupchgpricesatubulan.FormSearch', {
    extend: 'Erems.library.template.view.FormSearch',
    requires: [
        'Erems.library.template.component.Clustercombobox',
        'Erems.library.template.component.Blockcombobox',
        'Erems.template.ComboBoxFields'
    ],
    alias: 'widget.popupchgpricesatubulanformsearch',
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
                anchor: '90%',
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
                    xtype: 'clustercombobox',
                    itemId: 'fs_cluster_id',
                    name: 'cluster_id',
                    anchor:'-15',
                    forceSelection:true,
                    listeners:{
                        beforequery: function(record){
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }

                },
                {
                    xtype: 'blockcombobox',
                    itemId: 'fs_block_id',
                    name: 'block_id',
                    anchor:'-15',
                    forceSelection:true,
                    listeners:{
                        beforequery: function(record){
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
                },
                {
                    xtype:'textfield',
                    name:'purchaseletter_no',
                    fieldLabel:'Purchaseletter Number',
                    enableKeyEvents: true
                },
                {
                    xtype:'textfield',
                    name:'unit_number',
                    fieldLabel:'Unit Number',
                    enableKeyEvents: true
                },
                {
                    xtype           :'xnamefieldEST',
                    name            :'customer_name',
                    fieldLabel      :'Customer Name',
                    enableKeyEvents : true
                },
                {
                    xtype:'textfield',
                    name:'x_hari',
                    value:30,
                    fieldLabel:'Jumlah hari ke belakang',
                    enableKeyEvents: true
                },
                //
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
