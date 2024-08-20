Ext.define('Hrd.view.workgroupemployee.FormSearch', {
    extend: 'Hrd.library.template.view.FormSearch',
    alias: 'widget.workgroupemployeeformsearch',
    uniquename: '_workgroupemployeeformsearch',
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
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'employee_name',
                    value: ''
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
