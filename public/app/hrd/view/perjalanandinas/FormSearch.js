Ext.define('Hrd.view.perjalanandinas.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.perjalanandinasformsearch',
    requires: [],
    collapsed: false,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [],
            dockedItems:[]
        });

        me.callParent(arguments);
    }
});