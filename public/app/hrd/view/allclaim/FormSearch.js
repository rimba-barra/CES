Ext.define('Hrd.view.allclaim.FormSearch', {
    extend:'Hrd.library.template.view.FormSearch',  
    alias: 'widget.allclaimformsearch',
    itemId: 'allclaimformsearch', 
    initComponent: function(){
            var me = this;

            var genderStore = Ext.create('Ext.data.Store', {
                fields: ['ID', 'name'],
                data: [{
                    "ID": "M",
                    "name": "Male"
                }, {
                    "ID": "F",
                    "name": "Female"
                }]
            });

            var empStatusStore = Ext.create('Ext.data.Store', {
                fields: ['ID', 'name'],
                data: [{
                    "ID": "1",
                    "name": "Permanent"
                }, {
                    "ID": "2",
                    "name": "Contract"
                }, {
                    "ID": "7",
                    "name": "Consultant"
                }]
            });

            var empActiveStore = Ext.create('Ext.data.Store', {
                fields: ['ID', 'name'],
                data: [{
                    "ID": "1",
                    "name": "Active"
                }, {
                    "ID": "0",
                    "name": "Nonactive"
                }]
            });

            Ext.applyIf(me, {
            items: [
                {
                    xtype: 'combobox',
                    fieldLabel: 'Subholding',                    
                    itemId: 'fd_subholding',
                    name: 'subholding_id',
                    displayField: 'name',
                    valueField: 'subholding_id',        
                    multiSelect: true,
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Project',                    
                    itemId: 'fd_project',
                    name: 'project_id',
                    displayField: 'name',
                    valueField: 'code',        
                    multiSelect: true,
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'PT',
                    itemId: 'fd_pt',
                    name: 'pt_id',
                    displayField: 'name',
                    valueField: 'code',
                    multiSelect: true,
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Employee Name',
                    itemId: 'employee_name',
                    name: 'employee_name'
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Jenis Pengobatan',
                    itemId: 'jenispengobatan_id',
                    name: 'jenispengobatan_id',
                    displayField: 'code',
                    valueField: 'jenispengobatan_id',
                    multiSelect: true,
                }, 
                {
                    xtype: 'combobox',
                    fieldLabel: 'Year',
                    itemId: 'year',
                    name: 'year',
                    displayField: 'year',
                    valueField: 'year',
                    value: '2022' 
                }, 
                // {
                //     xtype: 'combobox',
                //     fieldLabel: 'Golongan',
                //     itemId: 'fd_golongan_id',
                //     name: 'group_id',
                //     displayField: 'group',
                //     valueField: 'group_id',
                // },                
                // {
                //     xtype: 'combobox',
                //     fieldLabel: 'PTKP',
                //     itemId: 'fd_ptkp_id',
                //     name: 'ptkp_id',
                //     displayField: 'ptkp',
                //     valueField: 'ptkp_id',
                // },  
                // {
                //     xtype: 'combobox',
                //     fieldLabel: 'Department',
                //     name: 'department_id',
                //     displayField: 'description',
                //     valueField: 'department_id',
                // },
            ]
            });
            me.callParent(arguments);
    }
});