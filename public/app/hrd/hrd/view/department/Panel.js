Ext.define('Hrd.view.department.Panel',{
    extend:'Hrd.library.box.view.Panel',
    requires:['Hrd.view.department.Grid','Hrd.view.department.FormSearch'],
    alias:'widget.departmentpanel',
    itemId:'DepartmentPanel',
    gridPanelName:'departmentgrid',
    formSearchPanelName:'departmentformsearch'
});