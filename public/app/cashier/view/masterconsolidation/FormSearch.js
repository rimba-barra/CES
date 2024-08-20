Ext.define('Cashier.view.masterconsolidation.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.masterconsolidationformsearch',
    initComponent: function () {
        var me = this;


        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'pt_id',
                },
                {
                    xtype: 'textfield',
                    name: 'group_consolidation',
                    fieldLabel: 'Group Consolidation',
                    maxLength: 90
                },
                {
                    xtype: 'textfield',
                    name: 'category',
                    fieldLabel: 'Category',
                    enforceMaxLength: true,
                    maxLength: 50
                },
               
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
