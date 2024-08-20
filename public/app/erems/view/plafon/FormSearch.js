Ext.define('Erems.view.plafon.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    alias:'widget.plafonformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
