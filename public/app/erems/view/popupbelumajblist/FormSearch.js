Ext.define('Erems.view.popupbelumajblist.FormSearch', {
    extend: 'Erems.library.template.view.FormSearch',
    alias: 'widget.popupbelumajblistformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'textfield',
                    itemId: 'fs_unit_number',
                    name: 'unit_number',
                    fieldLabel: 'Unit Number'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fs_purchaseletter_no',
                    name: 'purchaseletter_no',
                    fieldLabel: 'Purchaseletter No'
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
