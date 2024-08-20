Ext.define('Hrd.view.monitoringmatrix.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.monitoringmatrixformsearch',
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
                    name: 'accesslevel',
                    fieldLabel: 'Access Level Name',
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