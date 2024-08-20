Ext.define('Hrd.view.jenisdokumen.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.jenisdokumenformsearch',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    name: 'index_no',
                    fieldLabel: 'Index No'
                },
                {
                    name: 'code',
                    fieldLabel: 'Kode'
                },
                {
                    name: 'description',
                    fieldLabel: 'Keterangan'
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});