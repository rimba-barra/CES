Ext.define('Hrd.view.trainingattendance.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.trainingattendanceformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                // {
                //     name:'caption',
                //     fieldLabel:'Caption'
                // }
                
                {
                    xtype: 'combobox',
                    fieldLabel: 'Training',
                    name: 'trainingname_id',
                    displayField: 'trainingname',
                    valueField: 'trainingname_id'
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});