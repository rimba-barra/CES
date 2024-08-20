Ext.define('Cashier.library.template.combobox.Statusnewcombobox', {
    extend: 'Cashier.library.component.Combobox',
    alias: 'widget.statusnewcombobox',
    //store: 'Masterdata.store.Project', //masuk dalam store
    store: 'Statuscombonew', //masuk dalam store
    fieldLabel: 'CASH / BANK',
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    displayField: 'description', //mengambil data dari store
    //displayField: 'project_name', //mengambil data dari store
    valueField: 'status', //mengambil data dari store   
   // matchFieldWidth: false,
    typeAhead: true,
  /*  tpl: Ext.create('Ext.XTemplate',
          '<table class="x-grid-table" width="500px" >',
            '<tr class="x-grid-row">',
                '<th width="100px"><div class="x-column-header x-column-header-inner">Project code</div></th>',
                '<th width="200px"><div class="x-column-header x-column-header-inner">Project Name</div></th>',
                '<th width="100px"><div class="x-column-header x-column-header-inner">Pt Code</div></th>',
                '<th width="200px"><div class="x-column-header x-column-header-inner">Pt Name</div></th>',
                '<th width="100px"><div class="x-column-header x-column-header-inner">Prefix</div></th>',
                '<th width="200px"><div class="x-column-header x-column-header-inner">Description</div></th>',
            '</tr>',
            '<tpl for=".">',
                '<tr class="x-boundlist-item">',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{projectcode}</div></td>',
                    '<td><div class="x-grid-cell x-grid-cell-inner">{projectname}</div></td>',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{ptcode}</div></td>',
                    '<td><div class="x-grid-cell x-grid-cell-inner">{ptname}</div></td>',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{prefix}</div></td>',
                    '<td><div class="x-grid-cell x-grid-cell-inner">{description}</div></td>',
                '</tr>',
            '</tpl>',
         '</table>'
    ),
    */
     
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


