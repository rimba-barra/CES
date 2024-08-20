Ext.define('Hrd.view.trainingoutstanding.FormData', {
    alias: 'widget.trainingoutstandingformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.view.trainingoutstanding.GridTrans', 'Hrd.library.template.view.MoneyField'],
    frame: true,
    autoScroll: true,
    editedRow:-1,
    deletedData:{},
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults:{
                xtype:'textfield'
            },
            items: [
               {
                    xtype:'hiddenfield',
                    name:'employee_id'
                },
                {
                    xtype: 'textfield',
                    name:'employee_name',
                    width: 400,
                    fieldLabel:'Employee Name',
                    readonly: true
                },
                {
                    xtype: 'trainingoutstandingtransgrid',
                    height: 180,
                    flex: 2,
                    style: 'padding: 10 0 10 0'
                },
                
                {
                    xtype: 'combobox',
                    fieldLabel: 'Periode',
                    name: 'periode',
                    store: 'Trainingperiode',
                    width:300,
                    displayField: 'periode',
                    valueField: 'periode',
                },
                {
                    xtype: 'xmoneyfield',
                    name:'total_cost',
                    width:300,
                    fieldLabel:'Total Cost',
                    readOnly: true
                },

            ],
            dockedItems: {
                        xtype: 'toolbar',
                        dock: 'bottom',
                        ui: 'footer',
                        layout: {
                            padding: 6,
                            type: 'hbox'
                        },
                        items: [


                        ]
                    }
        });

        me.callParent(arguments);
    }
});