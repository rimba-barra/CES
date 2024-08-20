Ext.define('Hrd.view.masterdisckaryawangp.FormSearch', {
    extend: 'Hrd.library.template.view.FormSearch',
    alias: 'widget.masterdisckaryawangpformsearch',
    uniquename: '_masterdisckaryawangpformsearch',
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
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
