Ext.define('Hrd.view.tandakasih.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.tandakasihformsearch',
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