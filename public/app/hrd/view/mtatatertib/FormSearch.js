Ext.define('Hrd.view.mtatatertib.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.mtatatertibformsearch',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    name: 'disiplin_item',
                    fieldLabel: 'Displin Item'
                }

            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});