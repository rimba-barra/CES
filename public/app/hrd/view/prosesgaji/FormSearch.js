Ext.define('Hrd.view.prosesgaji.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.prosesgajiformsearch',
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