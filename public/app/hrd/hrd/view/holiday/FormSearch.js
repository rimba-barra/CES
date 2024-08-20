Ext.define('Hrd.view.holiday.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.holidayformsearch',
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