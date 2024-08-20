Ext.define('Cashier.view.masteremployee.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.masteremployeeformsearch',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },
                 {
                    xtype: 'hidden',
                    name: 'project_id'
                },
                 {
                            xtype: 'ptusercombobox',
                            fieldLabel: 'PT / Company',
                            name: 'pt_id',
                          
                },

                {
                    xtype: 'textfield',
                    name: 'employee_name',
                    fieldLabel: 'Employee Name',
                    maxLength: 90
                },
                
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
