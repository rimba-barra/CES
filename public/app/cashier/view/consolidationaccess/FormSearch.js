Ext.define('Cashier.view.consolidationaccess.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.consolidationaccessformsearch',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'search'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fs_user_email',
                    name: 'user_email',
                    fieldLabel: 'User Email',
                    allowBlank: true,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 100,
                },               
                {
                    xtype: 'consolidationv2combobox',
                    fieldLabel: 'Group Consolidation',
                    itemId: 'fs_consolidation_id' + me.uniquename,
                    id: 'consolidation_id' + me.uniquename,
                    name: 'consolidation_id',
                    emptyText: 'Select group consolidation',
                    allowBlank: true,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 100,
                },
                
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
