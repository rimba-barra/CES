Ext.define('Hrd.view.tunjangantetap.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.tunjangantetapformsearch',
    requires: [],
    collapsed: false,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'combobox',
                    name: 'komponengaji_komponengaji_id',
                    fieldLabel: 'Komponen Gaji',
                    displayField: 'code',
                    valueField: 'komponengaji_id',
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});