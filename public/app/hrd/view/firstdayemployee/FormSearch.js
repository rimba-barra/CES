Ext.define('Hrd.view.firstdayemployee.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.firstdayemployeeformsearch',
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