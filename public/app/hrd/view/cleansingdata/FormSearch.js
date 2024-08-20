Ext.define('Hrd.view.cleansingdata.FormSearch', {
    extend: 'Hrd.library.template.view.FormSearch',
    alias: 'widget.cleansingdataformsearch',
    uniquename: '_cleansingdataformsearch',
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
