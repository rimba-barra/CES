Ext.define('Cashier.library.template.combobox.Unitnumbercombobox', {
    extend: 'Cashier.library.component.Combobox', 
    alias: 'widget.unitnumbercombobox',
    store: 'Unitnumber', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Unit Number',
    displayField: 'unit_number', //mengambil data dari store
    valueField: 'unit_id', //mengambil data dari store  
    typeAhead: true,
    tpl: Ext.create('Ext.XTemplate',
          '<table class="x-grid-table" width="500px" >',
            '<tr class="x-grid-row">',
                '<th width="100px"><div class="x-column-header x-column-header-inner">Unit Number</div></th>',
                '<th width="200px"><div class="x-column-header x-column-header-inner">Cluster</div></th>',
           
            '</tr>',
            '<tpl for=".">',
                '<tr class="x-boundlist-item">',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{unit_number}</div></td>',
                    '<td><div class="x-grid-cell x-grid-cell-inner">{cluster}</div></td>',
                '</tr>',
            '</tpl>',
         '</table>'
    ),
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


