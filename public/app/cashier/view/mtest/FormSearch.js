Ext.define('Cashier.view.mtest.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.mtestformsearch',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },
                       
               
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
