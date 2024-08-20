Ext.define('Hrd.view.mutasi.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.mutasiformsearch',
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