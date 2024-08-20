Ext.define('Hrd.view.backup.packagemanagement.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.packagemanagementformsearch',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                 {
                    fieldLabel: 'Code',
                    name: 'code'
                },
                {
                    xtype: 'textareafield',    
                    fieldLabel: 'Document Name',
                    name: 'package_name',
                    enforceMaxLength: true,
                    grow: true,
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});