Ext.define('Erems.view.masterprofitsharing.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    alias:'widget.masterprofitsharingformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'textfield',
					fieldLabel: 'Code',
                    itemId: 'code',
                    name: 'code'
                },							
                {
                    xtype: 'textfield',
					fieldLabel: 'Name',
                    itemId: 'keterangan',
                    name: 'keterangan'
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
