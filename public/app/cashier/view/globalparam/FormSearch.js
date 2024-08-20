Ext.define('Cashier.view.globalparam.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.globalparamformsearch',
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
                    itemId: 'fs_name',
                    name: 'name',
                    fieldLabel: 'Name',
                    allowBlank: true,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 20,
                },               
                {
                    xtype: 'textfield',
                    itemId: 'fs_value',
                    name: 'value',
                    fieldLabel: 'Value',
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
