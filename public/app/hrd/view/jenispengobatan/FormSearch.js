Ext.define('Hrd.view.jenispengobatan.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.jenispengobatanformsearch',
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