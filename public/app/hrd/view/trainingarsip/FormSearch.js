Ext.define('Hrd.view.trainingarsip.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.trainingarsipformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    xtype: 'combobox',
                    fieldLabel: 'Training Name',
                    name: 'trainingname_id',
                    displayField: 'trainingname',
                    valueField: 'trainingname_id',
                },
                {
                    name:'batch',
                    fieldLabel:'Batch'
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Periode',
                    name: 'periode',
                    store: 'Trainingperiode',
                    displayField: 'periode',
                    valueField: 'periode',
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});