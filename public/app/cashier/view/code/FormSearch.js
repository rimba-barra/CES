Ext.define('Cashier.view.code.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.codeformsearch',
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
                    allowBlank: false,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 20,
                },
                {
                    xtype: 'textfield',
                    itemId: 'fs_objectname',
                    name: 'objectname',
                    fieldLabel: 'Object Name',
                    allowBlank: false,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 50,
                },
                {
                    xtype: 'textfield',
                    itemId: 'fs_description',
                    name: 'description',
                    fieldLabel: 'Description',
                    enableKeyEvents: true,
                    allowBlank: false,
                    enforceMaxLength: true,
                },
                {
                    xtype: 'textfield',
                    itemId: 'fs_rptfile',
                    name: 'rptfile',
                    fieldLabel: 'Report file',
                    allowBlank: false,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 50,
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
