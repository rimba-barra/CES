Ext.define('Hrd.view.joinkomponen.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.joinkomponenformsearch',
    requires: [],
    collapsed: false,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});