Ext.define('Hrd.view.transaksimod.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.transaksimodformsearch',
    requires: [],
    collapsed: false,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});