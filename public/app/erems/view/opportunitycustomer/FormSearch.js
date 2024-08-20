Ext.define('Erems.view.opportunitycustomer.FormSearch', {
    extend: 'Erems.library.template.view.FormSearch',
    alias: 'widget.opportunitycustomerformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype           : 'xnamefieldEST',
                    itemId          : 'fsms_name',
                    name            : 'name',
                    fieldLabel      : 'Customer Name',
                    enableKeyEvents : true
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
