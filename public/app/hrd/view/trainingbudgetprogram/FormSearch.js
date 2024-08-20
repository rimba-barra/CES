Ext.define('Hrd.view.trainingbudgetprogram.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.trainingbudgetprogramformsearch',
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
                    fieldLabel: 'Caption',
                    name: 'trainingcaption_id',
                    displayField: 'caption',
                    valueField: 'trainingcaption_id',
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});