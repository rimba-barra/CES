Ext.define('Erems.view.masterlrpsharingparameter.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    alias:'widget.masterlrpsharingparameterformsearch',
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
