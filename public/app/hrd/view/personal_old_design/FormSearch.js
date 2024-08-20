Ext.define('Hrd.view.personal.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.personalformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    name:'employee_name',
                    fieldLabel:'Name'
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});