Ext.define('Cashier.view.mastermultiproject.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.mastermultiprojectformsearch',
    initComponent: function () {
        var me = this;


        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'pt_id',
                },
                {
                    xtype: 'textfield',
                    name: 'user_user_fullname',
                    fieldLabel: 'Name',
                    maxLength: 90
                },
                {
                    xtype: 'textfield',
                    name: 'user_user_email',
                    fieldLabel: 'Email',
                    enforceMaxLength: true,
                    maxLength: 50
                },
                {
                    xtype: 'textfield',
                    name: 'project_name',
                    fieldLabel: 'Project Name',
                    enforceMaxLength: true,
                    maxLength: 1000
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
