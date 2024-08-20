Ext.define('Cashier.view.deptprefix.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.deptprefixformsearch',
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
                    itemId: 'fs_deptprefixcode',
                    name: 'deptprefixcode',
                    fieldLabel: 'Code',
                    allowBlank: true,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                },
                {
                    xtype: 'textfield',
                    itemId: 'fs_deptprefixname',
                    name: 'deptprefixname',
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
                    itemId: 'fs_contactperson',
                    name: 'contactperson',
                    fieldLabel: 'Contact Person',
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
