Ext.define('Hrd.view.lookup.employee.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.lookupemployeeformsearch',
    requires:['Hrd.template.combobox.Department'],
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                  fieldLabel:'Name',
                  name:'employee_name'  
                },
                {
                  fieldLabel:'NIK',
                  name:'employee_nik'  
                    
                },
                {
                    name:'department_department_id',
                    xtype:'cbdepartment',
                    preLoad:true
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});