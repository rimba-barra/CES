Ext.define('Hrd.view.listperformancemanagement.FormSearch', {
    extend:'Hrd.library.template.view.FormSearch',  
    alias: 'widget.listperformancemanagementformsearch',
    itemId: 'listperformancemanagementformsearch', 
    initComponent: function(){
            var me = this;

            var periodeStore = Ext.create('Ext.data.Store', {
                fields: ['value', 'name'],
                data: me.setPeriodeStore()
            });

            Ext.applyIf(me, {
            items: [
                {
                    xtype        : 'combobox',
                    fieldLabel   : 'Subholding',                    
                    itemId       : 'fd_subholding',
                    name         : 'subholding_id',
                    displayField : 'subholding_name',
                    valueField   : 'subholding_id',    
                    emptyText    : 'Select Subholding',    
                    multiSelect  : true,
                },
                {
                    xtype        : 'combobox',
                    fieldLabel   : 'Project',                    
                    itemId       : 'fd_project',
                    name         : 'project_id',
                    displayField : 'name',
                    valueField   : 'project_id',        
                    emptyText    : 'Select Project',
                    multiSelect  : true,
                },
                {
                    xtype        : 'combobox',
                    fieldLabel   : 'PT',
                    itemId       : 'fd_pt',
                    name         : 'pt_id',
                    displayField : 'name',
                    valueField   : 'pt_id',
                    emptyText    : 'Select PT',
                    multiSelect  : true,
                },
                {
                    xtype        : 'combobox',
                    fieldLabel   : 'Periode',
                    name         : 'periode',
                    queryMode    : 'local',
                    displayField : 'name',
                    valueField   : 'value',
                    emptyText    : 'Select Periode',
                    store        : periodeStore,
                },
                {
                    xtype           : 'combobox',
                    name            : 'department_id',
                    fieldLabel      : 'Department',
                    width           : 300,
                    displayField    : 'department',
                    valueField      : 'department_id',
                    action          : 'resetdetail',
                    allowBlank      : false,
                    emptyText       : 'Select Department',
                    matchFieldWidth : false,
                    typeAhead       : true,
                    multiSelect     : true,
                    queryMode       : 'local',
                    tpl             : 
                    Ext.create('Ext.XTemplate',
                        '<table class="x-grid-table" width="500px" >',
                            '<tr class="x-grid-row">',
                                '<th width="100px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                                '<th width="200px"><div class="x-column-header x-column-header-inner">Name</div></th>',
                            '</tr>',
                            '<tpl for=".">',
                                '<tr class="x-boundlist-item">',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
                                    '<td><div class="x-grid-cell x-grid-cell-inner">{department}</div></td>',
                                '</tr>',
                            '</tpl>',
                        '</table>'
                    ),
                },
                {
                    xtype       : 'textfield',
                    fieldLabel  : 'Employee Name',
                    itemId      : 'employee_name',
                    name        : 'employee_name',
                    emptyText   : 'Employee Name',
                },
                {
                    xtype           : 'combobox',
                    name            : 'pmdocument_id',
                    fieldLabel      : 'Package Document',
                    width           : 450,
                    displayField    : 'code',
                    valueField      : 'pmdocument_id',
                    action          : 'resetdetail',
                    readOnly        : false,
                    allowBlank      : false,
                    matchFieldWidth : false,
                    multiSelect     : true,
                    emptyText       : 'Select Package Document',
                    tpl             : 
                    Ext.create('Ext.XTemplate',
                        '<table class="x-grid-table" width="500px" >',
                          '<tr class="x-grid-row">',
                              '<th width="100px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                              '<th width="200px"><div class="x-column-header x-column-header-inner">Name</div></th>',
                          '</tr>',
                          '<tpl for=".">',
                              '<tr class="x-boundlist-item">',
                                  '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
                                  '<td><div class="x-grid-cell x-grid-cell-inner">{package_name}</div></td>',
                                  
                              '</tr>',
                          '</tpl>',
                       '</table>'
                    ),
                },
                {
                    xtype        : 'combobox',
                    fieldLabel   : 'Status Document',
                    itemId       : 'fd_status_document',
                    name         : 'status_document',
                    displayField : 'status',
                    valueField   : 'status_id',
                    emptyText    : 'Select Status',
                    multiSelect  : true,
                },
                {
                    xtype        : 'combobox',
                    fieldLabel   : 'Document Name',
                    itemId       : 'fd_jenis_document',
                    name         : 'jenis_document',
                    displayField : 'description',
                    valueField   : 'jenisdocument_id',
                    emptyText    : 'Select jenis',
                    multiSelect  : true,
                },
                {
                    xtype        : 'combobox',
                    fieldLabel   : 'Status per Document',
                    itemId       : 'fd_status_per_document',
                    name         : 'status_per_document',
                    displayField : 'status',
                    valueField   : 'status_id',
                    emptyText    : 'Select Status',
                    multiSelect  : true,
                },
            ]
            });
            me.callParent(arguments);
    },
    setPeriodeStore: function(){
        var me      = this;
        var store   = [];
        var p       = new Date();
        var f       = new Date();
        p.setFullYear(p.getFullYear() - 7);
        f.setFullYear(f.getFullYear() + 1);

        for(var i=p.getFullYear();i<=f.getFullYear();i++){
            var obj = {};

            obj['value'] = i;
            obj['name'] = i;

            store.push(obj);
        }

        return store;
    }
});