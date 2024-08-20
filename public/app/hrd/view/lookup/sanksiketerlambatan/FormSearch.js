Ext.define('Hrd.view.lookup.sanksiketerlambatan.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.lookupsanksiketerlambatanformsearch',
    requires:[
              //  'Hrd.template.combobox.Department'
    
            ],
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
					xtype       : 'combobox',
					name        : 'department_id',
					fieldLabel  : 'Department',
					displayField: 'department',
					valueField  : 'department_id',
					queryMode	: 'local'
            	},
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});