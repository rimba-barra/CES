Ext.define('Hrd.view.trainingbudgetadjustment.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.trainingbudgetadjustmentformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    xtype: 'combobox',
                    fieldLabel: 'Periode',
                    name: 'periode',
                    store: 'Trainingperiode',
                    displayField: 'periode',
                    valueField: 'periode',
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Budget Program',
                    name: 'trainingcaption_id',
                    displayField: 'caption',
                    valueField: 'trainingcaption_id',
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Employee',
                    name: 'employee_id',
                    displayField: 'employee_name',
                    valueField: 'employee_id',
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});