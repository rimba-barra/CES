Ext.define('Cashier.library.template.combobox.Rangeapprovecombobox', {
    extend: 'Cashier.library.component.Combobox',
    alias: 'widget.rangeapprovecombobox',
    store: 'Rangeapprove', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Range Approval',
    displayField: 'range', //mengambil data dari store
    valueField: 'rangeapprove_id', //mengambil data dari store  
    matchFieldWidth: false,
    typeAhead: true,
    tpl: Ext.create('Ext.XTemplate',
          '<table class="x-grid-table" width="500px" >',
            '<tr class="x-grid-row">',
                '<th width="250px"><div class="x-column-header x-column-header-inner">RANGE</div></th>',                
                '<th width="250px"><div class="x-column-header x-column-header-inner">FROM</div></th>',                
                '<th width="250px"><div class="x-column-header x-column-header-inner">TO</div></th>',                
            /*    '<th width="120px"><div class="x-column-header x-column-header-inner">MD1</div></th>',                
                '<th width="120px"><div class="x-column-header x-column-header-inner">MD2</div></th>',                
                '<th width="120px"><div class="x-column-header x-column-header-inner">DIR1</div></th>',                
                '<th width="120px"><div class="x-column-header x-column-header-inner">DIR2</div></th>',*/                
            '</tr>',
            '<tpl for=".">',
                '<tr class="x-boundlist-item">',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{range}</div></td>',                                 
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{format_fromamount}</div></td>',                                 
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{format_untilamount}</div></td>',                                 
                  /*  '<td ><div class="x-grid-cell x-grid-cell-inner">{md1}</div></td>',                                 
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{md2}</div></td>',                                 
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{dir1}</div></td>',                                 
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{dir2}</div></td>',  */                               
                '</tr>',
            '</tpl>',
         '</table>'
    ),
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


