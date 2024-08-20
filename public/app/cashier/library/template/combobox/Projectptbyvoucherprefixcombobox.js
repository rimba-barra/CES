Ext.define('Cashier.library.template.combobox.Projectptbyvoucherprefixcombobox', {
    extend: 'Cashier.library.component.Combobox',    
    alias: 'widget.projectptbyvoucherprefixcombobox',
    store: 'Projectptbyvoucherprefix', //masuk dalam store
    dynamicdata:1, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Project PT',
    displayField: 'ptname', //mengambil data dari store
    valueField: 'pt_id', //mengambil data dari store
    matchFieldWidth: false,
    typeAhead: true,
    tpl: Ext.create('Ext.XTemplate',
          '<table class="x-grid-table" width="500px" >',
            '<tr class="x-grid-row">',
                '<th width="50px"><div class="x-column-header x-column-header-inner">PROJECT CODE</div></th>',
                '<th width="50px"><div class="x-column-header x-column-header-inner">PROJECT NAME</div></th>',
                '<th width="50px"><div class="x-column-header x-column-header-inner">PT CODE</div></th>',
                '<th width="50px"><div class="x-column-header x-column-header-inner">PT NAME</div></th>',
            '</tr>',
            '<tpl for=".">',
                '<tr class="x-boundlist-item">',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{projectcode}</div></td>',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{projectname}</div></td>',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{ptcode}</div></td>',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{ptname}</div></td>',
                '</tr>',
            '</tpl>',
         '</table>'
     ), 
    initComponent: function() {
        var me = this;       
        me.callParent(arguments);
       
    }
})


