Ext.define('Hrd.view.polashift.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.polashiftformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    name:'polashift',
                    fieldLabel:'Description'
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});