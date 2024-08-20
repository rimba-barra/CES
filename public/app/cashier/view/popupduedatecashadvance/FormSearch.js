Ext.define('Cashier.view.popupduedatecashadvance.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.popupduedatecashadvanceformsearch',
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
                    itemId: 'fs_voucher_no',
                    name: 'voucher_no',
                    fieldLabel: 'Voucher no',
                    enableKeyEvents: true,
                    allowBlank: true,
                    enforceMaxLength: true,
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
