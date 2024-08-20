Ext.define('Hrd.view.approvalmatrix.FormDataDetail', {
    alias           : 'widget.approvalmatrixformdatadetail',
    extend          : 'Hrd.library.box.view.FormData',
    requires        : [],
    frame           : true,
    autoScroll      : true,
    editedRow       : -1,
    deletedData     : {},
	initComponent   :  function() {
        var me  = this;
        var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults    : {},
            items       : [{
                xtype       : 'hiddenfield',
                name        : 'approvalmatrix_id',
            }, {
                xtype       : 'hiddenfield',
                name        : 'employee_id',
            }, {
                xtype       : 'combobox',
                name        : 'project_id',
                fieldLabel  : 'Project Name',
                displayField: 'name',
                valueField  : 'project_id',
				labelWidth	: 150,
                width       : 400,
				allowBlank	: false,
				queryMode	: 'local'
            }, {
                xtype       : 'combobox',
                name        : 'pt_id',
                fieldLabel  : 'Company Name',
                displayField: 'name',
                valueField  : 'pt_id',
				labelWidth	: 150,
                width       : 400,
				allowBlank	: false,
				queryMode	: 'local'
            }, {
                xtype       : 'combobox',
                name        : 'department_id',
                fieldLabel  : 'Department',
                displayField: 'department',
                valueField  : 'department_id',
				labelWidth	: 150,
				width		: 400,
				allowBlank	: false,
				queryMode	: 'local'
            }, {
                xtype       : 'combobox',
                name        : 'penilai_id',
                fieldLabel  : 'Penilai',
                displayField: 'employee_name',
                valueField  : 'employee_id',
				labelWidth	: 150,
				width		: 400,
				allowBlank	: false,
				queryMode	: 'local'
            }, {
                xtype       : 'combobox',
                name        : 'approvallevel_id',
                fieldLabel  : 'Level',
                displayField: 'approvallevel',
                valueField  : 'approvallevel_id',
				labelWidth	: 150,
				width		: 400,
				allowBlank	: false
            }, {
                xtype       : 'combobox',
                name        : 'docdept_id',
                fieldLabel  : 'Document Approval',
                displayField: 'department',
                valueField  : 'department_id',
				labelWidth	: 150,
				width		: 400,
				allowBlank	: false,
				queryMode	: 'local'
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