Ext.define('Hrd.view.shifttype.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.shifttypeformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    name:'shifttype',
                    fieldLabel:'Shift Type Name'
                },
                {
                    name:'code',
                    fieldLabel:'Code'
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});