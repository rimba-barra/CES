Ext.define('Hrd.view.trainingschedule.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.trainingscheduleformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    xtype: 'combobox',
                    fieldLabel: 'Training',
                    name: 'trainingname_id',
                    displayField: 'trainingname',
                    valueField: 'trainingname_id'
                },{
                    xtype: 'combobox',
                    fieldLabel: 'Periode',
                    name: 'periode',
                    store: 'Trainingperiode',
                    displayField: 'periode',
                    valueField: 'periode',
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});