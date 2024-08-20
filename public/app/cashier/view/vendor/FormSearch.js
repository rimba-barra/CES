Ext.define('Cashier.view.vendor.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.vendorformsearch',
    requires: [
        'Cashier.library.template.component.Ptbyusercombobox',
    ],
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
                    xtype: 'ptbyusercombobox',
                    itemId: 'fs_pt_id',
                    name: 'projectpt_id',
                    anchor:'-15'

                },
                {
                    xtype: 'textfield',
                    itemId: 'fs_vendorcode',
                    name: 'vendorcode',
                    fieldLabel: 'Code',
                    allowBlank: true,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                },
                {
                    xtype: 'textfield',
                    itemId: 'fs_vendorname',
                    name: 'vendorname',
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
