Ext.define('Cashier.view.coauseraccess.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.coauseraccessformsearch',
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
                    itemId: 'fs_coauseraccess',
                    name: 'coauseraccess',
                    fieldLabel: 'Jenis usaha',
                    allowBlank: true,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 20,
                },               
                {
                    xtype: 'textfield',
                    itemId: 'fs_description',
                    name: 'description',
                    fieldLabel: 'Description',
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
