Ext.define('Gl.view.bungaloan.FormSearch', {
    extend: 'Gl.library.template.view.FormSearch',
    alias: 'widget.bungaloanformsearch',
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
                    itemId: 'fsms_bulan',
                    name: 'bulan',
                    fieldLabel: 'Bulan',
                    enforceMaxLength: true,
                    maxLength: 2,
                    enableKeyEvents: true
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsms_bunga',
                    name: 'bunga',
                    fieldLabel: 'Bunga',
                    enforceMaxLength: true,
                    maxLength: 5,
                    enableKeyEvents: true
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
