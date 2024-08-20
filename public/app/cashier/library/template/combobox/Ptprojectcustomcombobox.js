Ext.define('Cashier.library.template.combobox.Ptprojectcustomcombobox', {
    extend: 'Cashier.library.component.Combobox',
    alias: 'widget.ptprojectcustomcombobox',
    //store: 'Masterdata.store.Pt', //masuk dalam store
    store: 'Ptcustomcombo', //masuk dalam store
    fieldLabel: 'Pt',
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    displayField: 'ptname', //mengambil data dari store
    //displayField: 'project_name', //mengambil data dari store
    valueField: 'pt_id', //mengambil data dari store   
    matchFieldWidth: false,
    typeAhead: true,
    tpl: Ext.create('Ext.XTemplate',
          '<table class="x-grid-table" width="500px" >',
            '<tr class="x-grid-row">',
                '<th width="50px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                '<th width="200px"><div class="x-column-header x-column-header-inner">Pt</div></th>',
                '<th style="display:none" width="200px"><div class="x-column-header x-column-header-inner">Project ID</div></th>',
                '<th width="200px"><div class="x-column-header x-column-header-inner">Project</div></th>',
            '</tr>',
            '<tpl for=".">',
                '<tr class="x-boundlist-item">',
                    '<td><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
                    '<td><div class="x-grid-cell x-grid-cell-inner">{ptname}</div></td>',
                    '<td style="display:none"><div class="x-grid-cell x-grid-cell-inner">{project_id}</div></td>',
                    '<td><div class="x-grid-cell x-grid-cell-inner">{projectname}</div></td>',
                '</tr>',
            '</tpl>',
         '</table>'
     ),    
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


