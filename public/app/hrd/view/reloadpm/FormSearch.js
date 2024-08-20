Ext.define('Hrd.view.reloadpm.FormSearch', {
    extend          : 'Hrd.library.box.view.FormSearch',
    alias           : 'widget.reloadpmformsearch',
    requires        : [],
    initComponent   : function() {
        var me = this;

        Ext.applyIf(me, {
            defaults    : {
                xtype       : 'textfield'
            },
            items       : [{
                name        : 'employee_nik',
                fieldLabel  : 'NIK'
             }, {
                 name        : 'employee_name',
                 fieldLabel  : 'Employee Name'
            }, {
                xtype       : 'combobox',
                name        : 'department_id',
                fieldLabel  : 'Department',
                displayField: 'department',
                valueField  : 'department_id',
				queryMode	: 'local'
            },{
                xtype       : 'combobox',
                name        : 'project_id',
                fieldLabel  : 'Project Name',
                displayField: 'name',
                valueField  : 'project_id',
				queryMode	: 'local'
            },{
                xtype       : 'combobox',
                name        : 'pt_id',
                fieldLabel  : 'PT Name',
                displayField: 'name',
                valueField  : 'pt_id',
				queryMode	: 'local'
            }, {
					xtype: 'radiogroup',
					columns: 1,
					fieldLabel: 'Status',
					//layout: 'hbox',
					items: [
						{
							xtype: 'radiofield',
							boxLabel: 'TRUE',
							name: 'is_dinilai',
							inputValue: '1',
							itemId: '1'
						},
						{
							xtype: 'radiofield',
							boxLabel: 'FALSE',
							name: 'is_dinilai',
							inputValue: '0', 
							itemId: '0'
						},
						{
							xtype: 'radiofield',
							boxLabel: 'ALL',
							name: 'is_dinilai',
							inputValue: '2', 
							itemId: '2',
							checked: true
						}
					]
				}],

            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});