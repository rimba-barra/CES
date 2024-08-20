Ext.define('Hrd.view.trainingoutstanding.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.trainingoutstandingformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    name:'employee_name',
                    fieldLabel:'Employee Name'
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});