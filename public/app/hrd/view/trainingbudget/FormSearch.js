Ext.define('Hrd.view.trainingbudget.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.trainingbudgetformsearch',
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
                    fieldLabel: 'Banding',
                    name: 'banding_id',
                    displayField: 'banding',
                    valueField: 'banding_id',
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Department',
                    name: 'department_id',
                    displayField: 'department',
                    valueField: 'department_id',
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});