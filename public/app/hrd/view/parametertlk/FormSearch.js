Ext.define('Hrd.view.parametertlk.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.parametertlkformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    name:'code',
                    fieldLabel:'Code'
                },
                {
                    name:'name',
                    fieldLabel:'Project Name'
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});