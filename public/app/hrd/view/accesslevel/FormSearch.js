Ext.define('Hrd.view.accesslevel.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.accesslevelformsearch',
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
                    name: 'accesslevel',
                    fieldLabel: 'Access Level',
                    readOnly: false,
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});