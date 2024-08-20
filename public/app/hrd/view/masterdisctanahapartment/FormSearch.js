Ext.define('Hrd.view.masterdisctanahapartment.FormSearch', {
    extend: 'Hrd.library.template.view.FormSearch',
    alias: 'widget.masterdisctanahapartmentformsearch',
    uniquename: '_masterdisctanahapartmentformsearch',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'mode_read',
                    value: 'default'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_group_code',
                    name: 'group_code',
                    fieldLabel: 'Group (Golongan)',
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
