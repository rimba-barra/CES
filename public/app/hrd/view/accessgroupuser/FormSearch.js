Ext.define('Hrd.view.accessgroupuser.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.accessgroupuserformsearch',
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
                    name: 'employee_name',
                    fieldLabel: 'Employee Name',
                    readOnly: false,
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});