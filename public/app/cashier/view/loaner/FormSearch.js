Ext.define('Cashier.view.loaner.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.loanerformsearch',
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
                    itemId: 'fs_code',
                    name: 'code',
                    fieldLabel: 'Code',
                    allowBlank: true,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                },
                {
                    xtype: 'textfield',
                    itemId: 'fs_loaner',
                    name: 'loaner',
                    fieldLabel: 'Name',
                    allowBlank: true,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                },
                {
                    xtype: 'textfield',
                    itemId: 'fs_address',
                    name: 'address',
                    fieldLabel: 'Address',
                    allowBlank: true,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                },
                {
                    xtype: 'textfield',
                    itemId: 'fs_description',
                    name: 'description',
                    fieldLabel: 'Description',
                    allowBlank: true,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
