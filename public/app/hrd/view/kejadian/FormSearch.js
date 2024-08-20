Ext.define('Hrd.view.kejadian.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.kejadianformsearch',
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