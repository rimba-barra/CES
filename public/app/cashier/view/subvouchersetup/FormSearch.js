Ext.define('Cashier.view.subvouchersetup.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.subvouchersetupformsearch',
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
                    itemId: 'fs_subvoucher_code',
                    name: 'subvoucher_code',
                    fieldLabel: 'Code',
                    allowBlank: true,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                },
                {
                    xtype: 'textfield',
                    itemId: 'fs_subvoucher_name',
                    name: 'subvoucher_name',
                    fieldLabel: 'Name',
                    allowBlank: true,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                },
                {
                    xtype: 'textfield',
                    itemId: 'fs_subvoucher_desc',
                    name: 'subvoucher_desc',
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
