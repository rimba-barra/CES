Ext.define('Hrd.view.parameteruangsaku.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.parameteruangsakuformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    name:'parameteruangsaku',
                    fieldLabel:'Description'
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});