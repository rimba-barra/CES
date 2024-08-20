Ext.define('Hrd.view.variabelgaji.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.variabelgajiformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    name:'variabelgaji',
                    fieldLabel:'Description'
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});