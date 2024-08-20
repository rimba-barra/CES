Ext.define('Hrd.view.sanction.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.sanctionformsearch',
    requires: [],
    collapsed: false,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [{
                    name:'employee_employee_nik',
                    fieldLabel:'NIK'
            },{
                name:'employee_employee_name',
                fieldLabel:'Employee Name'
            }],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});