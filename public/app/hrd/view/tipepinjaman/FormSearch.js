Ext.define('Hrd.view.tipepinjaman.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.tipepinjamanformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    name:'tipepinjaman',
                    fieldLabel:'Description'
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});