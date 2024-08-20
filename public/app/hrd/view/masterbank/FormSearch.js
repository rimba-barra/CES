Ext.define('Hrd.view.masterbank.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.masterbankformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    name:'masterbank',
                    fieldLabel:'Description'
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});