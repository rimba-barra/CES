Ext.define('Cashier.library.template.combobox.Coacombobox', {
    extend: 'Cashier.library.component.Combobox',
    alias: 'widget.coacombobox',
    //store: 'Masterdata.store.Project', //masuk dalam store
    store: 'Coa', //masuk dalam store
    fieldLabel: 'Coa',
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    displayField: 'coa', //mengambil data dari store
    //displayField: 'coa_name', //mengambil data dari store
    valueField: 'coa_id', //mengambil data dari store   
    matchFieldWidth: false,
    tpl: Ext.create('Ext.XTemplate',
          '<table class="x-grid-table" width="500px" >',
            '<tr class="x-grid-row">',
                '<th width="100px"><div class="x-column-header x-column-header-inner">Project code</div></th>',
                '<th width="200px"><div class="x-column-header x-column-header-inner">Project Name</div></th>',
                '<th width="100px"><div class="x-column-header x-column-header-inner">Pt Code</div></th>',
                '<th width="200px"><div class="x-column-header x-column-header-inner">Pt Name</div></th>',
                '<th width="100px"><div class="x-column-header x-column-header-inner">Coa</div></th>',
                '<th width="200px"><div class="x-column-header x-column-header-inner">Name</div></th>',
            '</tr>',
            '<tpl for=".">',
                '<tr class="x-boundlist-item">',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{projectcode}</div></td>',
                    '<td><div class="x-grid-cell x-grid-cell-inner">{projectname}</div></td>',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{ptcode}</div></td>',
                    '<td><div class="x-grid-cell x-grid-cell-inner">{ptname}</div></td>',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{coa}</div></td>',
                    '<td><div class="x-grid-cell x-grid-cell-inner">{coaname}</div></td>',
                '</tr>',
            '</tpl>',
         '</table>'
     ),    
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


