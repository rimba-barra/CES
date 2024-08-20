Ext.define('Cashier.view.msignature.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.msignatureformsearch',
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
                {
                    xtype: 'textfield',
                    itemId: 'fs_signature_name',
                    name: 'signature_name',
                    fieldLabel: 'Signature Name',
                    allowBlank: true,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 100,
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
