Ext.define('Erems.view.masterfakturpajakcounter.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    alias:'widget.masterfakturpajakcounterformsearch',
	requires: [],
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype  : 'xnumericfieldEST',
                    itemId : 'fs_year',
                    name   : 'year',
                    anchor :'-15',
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
