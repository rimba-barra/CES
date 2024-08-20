Ext.define('Hrd.view.transferdata.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.transferdataformsearch',
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