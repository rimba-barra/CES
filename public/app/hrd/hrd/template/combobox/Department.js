Ext.define('Hrd.template.combobox.Department', {
    extend: 'Hrd.library.box.view.components.Combobox',
    alias: 'widget.cbdepartment',
    mode_read: 'master_department',
    storeUrl: 'department',
    storeIdProperty: 'department_id',
    storeID: 'cbDepartmentStore',
    displayField: 'department',
    valueField: 'department_id',
    fieldLabel:"Department",
    preLoad:false,
    storeConfig:{
        id:'cbDepartmentStore',
        idProperty:'department_id'
    },
    bindPrefixName:"department"
});


