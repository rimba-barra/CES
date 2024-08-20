Ext.define('Hrd.view.personal.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.personalformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    name: 'employee_name',
                    fieldLabel: 'Name'
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: 'Active Status',
                    //labelWidth: 1,
                    width: '100%',
                    layout: 'hbox',
                    defaults: {
                        margin: '0 7 0 0'
                    },
                    flex: 3,
                    items: [
                        {boxLabel: 'Active', name: 'employee_active', inputValue: "1", checked: true},
                        {boxLabel: 'Non Active', name: 'employee_active', inputValue: "0"},
                    ]
                },
                {
                    xtype: 'combobox',
                    name: 'department_department_id',
                    fieldLabel: 'Department',
                    displayField: 'department',
                    valueField: 'department_id'
                }
                
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});