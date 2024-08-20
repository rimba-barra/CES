Ext.define('Hrd.view.lookup.personal.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.lookuppersonalformsearch',
    requires:[
                'Hrd.template.combobox.Department'
    
            ],
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    name:'subholding_id',
                    xtype:'subholdingcombobox',
                    preLoad:true
                },
                {
                    name:'project_id',
                    xtype:'projectcombobox',
                    preLoad:true
                },
                {
                    name:'pt_id',
                    xtype:'ptcombobox',
                    preLoad:true
                },
                {
                    name:'department_department_id',
                    xtype:'cbdepartment',
                    preLoad:true
                },
                {
                  fieldLabel:'Name',
                  name:'personal_name'  
                },
                {
                  fieldLabel:'NIK',
                  name:'personal_nik'  
                    
                },
                
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});