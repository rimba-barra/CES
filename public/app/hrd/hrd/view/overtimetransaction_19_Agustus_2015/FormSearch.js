Ext.define('Hrd.view.overtimetransaction.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.overtimetransactionformsearch',
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