Ext.define('Gl.view.subdesccode.FormSearch', {
    extend: 'Gl.library.template.view.FormSearch',
    alias: 'widget.subdesccodeformsearch',
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
                    name: 'subdsk',
                    fieldLabel: 'Kode Sub Deskripsi',
                    enforceMaxLength: true,
                    maxLength: 50,
                    enableKeyEvents: true
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsms_description',
                    name: 'description',
                    fieldLabel: 'Description',
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
