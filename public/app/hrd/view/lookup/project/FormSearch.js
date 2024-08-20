Ext.define('Hrd.view.lookup.project.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.lookupprojectformsearch',
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
                  name:'project_name'  
                },
                {
                  fieldLabel:'NIK',
                  name:'project_nik'  
                    
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