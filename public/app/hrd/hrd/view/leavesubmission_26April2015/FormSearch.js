Ext.define('Hrd.view.leavesubmission.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.leavesubmissionformsearch',
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