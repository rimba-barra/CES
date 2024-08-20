Ext.define('Hrd.view.disckaryawansisa.FormSearch', {
    extend:'Hrd.library.template.view.FormSearch',	
    alias: 'widget.disckaryawansisaformsearch',
    itemId: 'disckaryawansisaformsearch',	
    initComponent: function(){
            var me = this;
            Ext.applyIf(me, {
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Employee Name',
                    itemId: 'employee_name',
                    name: 'employee_name'
                },
                {
                    xtype: 'projectcombobox',
                    fieldLabel: 'Project',
                    name: 'project_id',
                    itemId: 'project_id',
                    width: 280
                },
                {
                    xtype: 'ptcombobox',
                    fieldLabel: 'PT',
                    name: 'pt_id',
                    itemId: 'pt_id',
                    width: 280
                },
            ]
            });
            me.callParent(arguments);
    }
});