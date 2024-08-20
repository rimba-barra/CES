Ext.define('Hrd.view.popuphcms.FormSearch', {
    extend: 'Hrd.library.template.view.FormSearch',
    alias: 'widget.popuphcmsformsearch',
    uniquename: '_popuphcmsformsearch',
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
                    name: 'employee_name',
                    value: ''
                },
               
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
