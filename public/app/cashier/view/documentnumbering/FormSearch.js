Ext.define('Cashier.view.documentnumbering.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.documentnumberingformsearch',
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
                    itemId: 'fsms_subdsk',
                    name: 'module_name',
                    fieldLabel: 'Module Name',
                    enforceMaxLength: true,
                    maxLength: 50,
                    enableKeyEvents: true
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsms_description',
                    name: 'format',
                    fieldLabel: 'Numbering Format',
                    enforceMaxLength: true,
                    maxLength: 50,
                    enableKeyEvents: true
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
