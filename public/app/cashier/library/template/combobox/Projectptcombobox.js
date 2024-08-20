Ext.define('Cashier.library.template.combobox.Projectptcombobox', {
    extend: 'Cashier.library.component.Combobox',    
    alias: 'widget.projectptcombobox',
    store: 'Projectpt', //masuk dalam store
    dynamicdata:1, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Project PT',
    displayField: 'ptname', //mengambil data dari store
    valueField: 'pt_id', //mengambil data dari store
    matchFieldWidth: false,
    typeAhead: true,
    tpl: Ext.create('Ext.XTemplate',
          '<table class="x-grid-table" width="500px" >',
            '<tr class="x-grid-row">',
                '<th width="50px"><div class="x-column-header x-column-header-inner">PROJECT PT</div></th>',
            '</tr>',
            '<tpl for=".">',
                '<tr class="x-boundlist-item">',
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


