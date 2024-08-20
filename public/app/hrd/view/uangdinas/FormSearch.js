Ext.define('Hrd.view.uangdinas.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.uangdinasformsearch',
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