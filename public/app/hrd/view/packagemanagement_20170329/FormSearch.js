Ext.define('Hrd.view.packagemanagement.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.packagemanagementformsearch',
    requires: [],
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    name: 'code',
                    fieldLabel: 'Code'
                },
                {
                    name: 'package_name',
                    fieldLabel: 'Document'
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});