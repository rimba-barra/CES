Ext.define('Hrd.view.plafonpengobatan.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.plafonpengobatanformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    name:'jenispengobatan',
                    fieldLabel:'Description'
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});