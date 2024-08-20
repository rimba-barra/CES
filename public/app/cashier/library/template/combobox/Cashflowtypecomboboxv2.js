Ext.define('Cashier.library.template.combobox.Cashflowtypecomboboxv2', { // perbedaan Cashflowtypecombobox hanya di bagian template saja
    extend: 'Cashier.library.component.Combobox',
    alias: 'widget.cashflowtypecomboboxv2',
    store: 'Cashflowtype', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Cashflow Type',
    displayField: 'cashflowtype', //mengambil data dari store
    valueField: 'cashflowtype_id', //mengambil data dari store  
    typeAhead: true,
    matchFieldWidth: false,
    tpl: Ext.create('Ext.XTemplate',
        '<table class="x-grid-table" width="500px" >',
        '<tr class="x-grid-row">',
        '<th width="200px"><div class="x-column-header x-column-header-inner">Group Type</div></th>',
        '<th width="200px"><div class="x-column-header x-column-header-inner">Cashflow ID</div></th>',
        '<th width="200px"><div class="x-column-header x-column-header-inner">Cashflow Type</div></th>',
        '<th width="200px"><div class="x-column-header x-column-header-inner">Description</div></th>',
        '</tr>',
        '<tpl for=".">',
        '<tr class="x-boundlist-item">',
        '<td><div class="x-grid-cell x-grid-cell-inner">{grouptype}</div></td>',
        '<td><div class="x-grid-cell x-grid-cell-inner">{cashflowtype_ids}</div></td>',
        '<td><div class="x-grid-cell x-grid-cell-inner">{grouptype}</div></td>',
        '<td><div class="x-grid-cell x-grid-cell-inner">{cashflowtype}</div></td>',
        '</tr>',
        '</tpl>',
        '</table>'
        ), 
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
    }
})


