Ext.define('Hrd.view.usermonitoringlevel.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.usermonitoringlevelformsearch',
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