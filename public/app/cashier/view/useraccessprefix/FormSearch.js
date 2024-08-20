Ext.define('Cashier.view.useraccessprefix.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.useraccessprefixformsearch',
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
                    xtype: 'hiddenfield',
                    name: 'project_id',
                },
                 {
                    xtype: 'hiddenfield',
                    name: 'pt_id',
                },
                 {
                        xtype: 'ptusercomboboxpersh',
                        itemId: 'fs_pt_id_44',
                        id: 'projectpt_id_45',
                        name: 'projectpt_id',
                        fieldLabel: 'PT / Company',
                        emptyText: 'Select PT / Company',
                        enforceMaxLength: true,
                        enableKeyEvents: true,
                        rowdata: null
                },
                {
                    xtype: 'textfield',
                    itemId: 'fs_user_fullname',
                    name: 'user_fullname',
                    fieldLabel: 'User Fullname',
                    allowBlank: true,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 20,
                },
                {
                    xtype: 'textfield',
                    itemId: 'fs_prefixcode',
                    name: 'prefixcode',
                    fieldLabel: 'Prefix code',
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
