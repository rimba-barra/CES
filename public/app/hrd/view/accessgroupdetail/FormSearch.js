Ext.define('Hrd.view.accessgroupdetail.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.accessgroupdetailformsearch',
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
                    name: 'accessgroup',
                    fieldLabel: 'Access Group Name',
                    readOnly: false,
                },
                {
                    xtype: 'textfield',
                    name: 'employee_name',
                    fieldLabel: 'Employee Name',
                    readOnly: false,
					hidden:true
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});