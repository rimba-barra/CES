Ext.define('Hrd.template.combobox.Approvaltransfercombobox', {
    extend: 'Hrd.template.component.Combobox',
    alias: 'widget.approvaltransfercombobox',
    store: 'Roleapproval', //masuk dalam store
    fieldLabel: 'Approval Employee Transfer',
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    displayField: 'employee_name', //mengambil data dari store
    valueField: 'generalparameter_id', //mengambil data dari store   
    matchFieldWidth: false,
    typeAhead: true,
    tpl: Ext.create('Ext.XTemplate',
          '<table class="x-grid-table" width="500px" >',
            '<tr class="x-grid-row">',
                '<th width="150px"><div class="x-column-header x-column-header-inner">Project</div></th>',
                '<th width="250px"><div class="x-column-header x-column-header-inner">Pt</div></th>',
                '<th width="120px"><div class="x-column-header x-column-header-inner">Status</div></th>',
                '<th width="180px"><div class="x-column-header x-column-header-inner">Employee</div></th>',
                '<th width="180px"><div class="x-column-header x-column-header-inner">Email</div></th>',
            '</tr>',
            '<tpl for=".">',
                '<tr class="x-boundlist-item">',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{projectname}</div></td>',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{ptname}</div></td>',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{name}</div></td>',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{employee_name}</div></td>',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{email_ciputra}</div></td>',
                '</tr>',
            '</tpl>',
         '</table>'
     ),    
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


