Ext.define('Erems.view.masterbankkpr.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    alias:'widget.masterbankkprformsearch',
	initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'bankcombobox',
                    itemId: 'fs_bank_id',
                    name: 'bank_id',
                    anchor:'-15'

                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
