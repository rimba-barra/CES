Ext.define('Hrd.view.komponengaji.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.komponengajiformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    name:'komponengaji',
                    fieldLabel:'Description'
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});