Ext.define('Cashier.view.masterdocumenttype.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.masterdocumenttypeformsearch',
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
                    itemId: 'fs_documenttype',
                    name: 'documenttype',
                    fieldLabel: 'Document Type',
                    allowBlank: true,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
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
