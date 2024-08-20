Ext.define('Hrd.view.accessgroup.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.accessgroupformsearch',
    requires: [],
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'textfield',
                    name: 'accessgroup',
                    fieldLabel: 'Access Group',
                    readOnly: false,
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});