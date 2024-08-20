Ext.define('Hrd.view.department.FormData', {
    alias: 'widget.departmentformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: [],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'department_id'
                },
                {
                    fieldLabel: 'Department Name',
                    name: 'department'
                },
                {
                    fieldLabel: 'Code',
                    name: 'code'
                },
                {
                    fieldLabel: 'Description',
                    name: 'description'
                },
                /*{
                 fieldLabel:'Manager',
                 name:'manager'
                 },*/
                {
                    xtype: 'combobox',
                    fieldLabel: 'Manager',
                    name: 'manager_id',
                    width:400,
                    displayField: 'employee_name',
                    valueField: 'employee_id',
                }

            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});