Ext.define('Hrd.view.group.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.groupformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    name:'group',
                    fieldLabel:'Group Name'
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