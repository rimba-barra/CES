Ext.define('Hrd.view.mhasilkerja.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.mhasilkerjaformsearch',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    name: 'hasilkerja_item',
                    fieldLabel: 'Penilaian'
                }

            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});