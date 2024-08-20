Ext.define('Hrd.view.groupemployee.FormSearch', {
    extend: 'Hrd.library.template.view.FormSearch',
    alias: 'widget.groupemployeeformsearch',
    uniquename: '_groupemployeeformsearch',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'mode_read',
                    value: 'default'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsc_employee_name',
                    name: 'employee_name',
                    fieldLabel: 'Employee Name',
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
