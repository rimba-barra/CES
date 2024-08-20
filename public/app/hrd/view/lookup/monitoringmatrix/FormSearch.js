Ext.define('Hrd.view.lookup.monitoringmatrix.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.lookupmonitoringmatrixformsearch',
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
					name        : 'banding_id',
					fieldLabel  : 'Banding',
					displayField: 'banding',
					valueField  : 'banding_id',
					queryMode	: 'local'
            	},
				{
					xtype       : 'combobox',
					name        : 'project_id',
					fieldLabel  : 'Project',
					displayField: 'name',
					valueField  : 'project_id',
					queryMode	: 'local'
            	},
				{
					xtype       : 'combobox',
					name        : 'pt_id',
					fieldLabel  : 'PT',
					displayField: 'name',
					valueField  : 'pt_id',
					queryMode	: 'local'
            	}
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});