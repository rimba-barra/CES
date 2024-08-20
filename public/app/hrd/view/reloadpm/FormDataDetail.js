Ext.define('Hrd.view.reloadpm.FormDataDetail', {
    alias           : 'widget.reloadpmformdatadetail',
    extend          : 'Hrd.library.box.view.FormData',
    requires        : [],
    frame           : true,
    autoScroll      : true,
    editedRow       : -1,
    deletedData     : {},
    formWidth: 850,
	initComponent   :  function() {
        var me  = this;
        //var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults    : {labelWidth	: 120},
            items       : [{
                xtype       : 'hiddenfield',
                name        : 'reloadpm_id',
            }, {
                xtype       : 'hiddenfield',
                name        : 'employee_id',
            }, {
                xtype       : 'combobox',
                name        : 'project_id',
                fieldLabel  : 'Project Name',
                displayField: 'name',
                valueField  : 'project_id',
                width       : 400,
				allowBlank	: false,
				queryMode	: 'local'
            }, {
                xtype       : 'combobox',
                name        : 'pt_id',
                fieldLabel  : 'Company Name',
                displayField: 'name',
                valueField  : 'pt_id',
                width       : 400,
				allowBlank	: false,
				queryMode	: 'local'
            }, {
                xtype       : 'combobox',
                name        : 'department_id',
                fieldLabel  : 'Department',
                displayField: 'department',
                valueField  : 'department_id',
				width		: 400,
				allowBlank	: false,
				queryMode	: 'local',
				editable	: false
            },
			{
                xtype       : 'combobox',
                name        : 'penilai_id',
                fieldLabel  : 'Penilai',
                displayField: 'employee_name',
                valueField  : 'employee_id',
				width		: 400,
				readOnly	: false,
				allowBlank	: false,
				matchFieldWidth: false,
				selectOnFocus :true,
				queryMode: 'local',
				tpl: Ext.create('Ext.XTemplate',
				'<table class="x-grid-table" width="500px" >',
				  '<tr class="x-grid-row">',
					  '<th width="250px"><div class="x-column-header x-column-header-inner">Name</div></th>',
					  '<th width="250px"><div class="x-column-header x-column-header-inner">Position</div></th>',
				  '</tr>',
				  '<tpl for=".">',
					  '<tr class="x-boundlist-item">',
						  '<td ><div class="x-grid-cell x-grid-cell-inner">{employee_name}</div></td>',
						  '<td><div class="x-grid-cell x-grid-cell-inner">{position}</div></td>',                              
					  '</tr>',
				  '</tpl>',
			   '</table>'
				)
			},					
			{
                xtype       : 'combobox',
                name        : 'approvallevel_id',
                fieldLabel  : 'Level',
                displayField: 'approvallevel',
                valueField  : 'approvallevel_id',
				width		: 400,
				allowBlank	: false
            }, {
                xtype       : 'combobox',
                name        : 'docdept_id',
                fieldLabel  : 'Document Approval',
                displayField: 'department',
                valueField  : 'department_id',
				width		: 400,
				allowBlank	: false,
				queryMode	: 'local',
				editable	: false
            }, {
				padding: '10px 0 0 160px',
				xtype: 'checkboxfield',
				boxLabel: 'Performance Plan Approval',
				name: 'is_plan_approval',
				inputValue: '1',
				uncheckedValue: '0'
			},
			{
				padding: '10px 0 0 160px',
				xtype: 'checkboxfield',
				boxLabel: 'Mid Year Review',
				name: 'is_midyear_evaluation',
				inputValue: '1',
				uncheckedValue: '0'
			},
			{
				padding: '10px 0 0 160px',
				xtype: 'checkboxfield',
				boxLabel: 'Performance Evaluation',
				name: 'is_endyear_evaluation',
				inputValue: '1',
				uncheckedValue: '0'
			}],

            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});