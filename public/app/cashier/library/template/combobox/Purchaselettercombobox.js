Ext.define('Cashier.library.template.combobox.Purchaselettercombobox', {
    extend: 'Cashier.library.component.Combobox',
    alias: 'widget.purchaselettercombobox',
    store: 'Purchaseletter', //masuk dalam store
    dynamicdata:0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Purchase No',
    displayField: 'purchaseletter_no', //mengambil data dari store
    valueField: 'purchaseletter_id', //mengambil data dari store
    matchFieldWidth: false,
    typeAhead: true,
    tpl: Ext.create('Ext.XTemplate',
            '<table class="x-grid-table" width="700" >',
            '<tr class="x-grid-row">',
                '<th width="80"><div class="x-column-header x-column-header-inner">Kawasan</div></th>',
                '<th width="80"><div class="x-column-header x-column-header-inner">Unit No</div></th>',
                '<th width="180"><div class="x-column-header x-column-header-inner">No Pesanan</div></th>',
                '<th width="80"><div class="x-column-header x-column-header-inner">Harga Jual</div></th>',
                '<th width="120"><div class="x-column-header x-column-header-inner">Customer Name</div></th>',
            '</tr>',
            '<tpl for=".">',
            '<tr class="x-boundlist-item">',
                '<td ><div class="x-grid-cell x-grid-cell-inner">{cluster}</div></td>',
                '<td ><div class="x-grid-cell x-grid-cell-inner">{unit_no}</div></td>',
                '<td ><div class="x-grid-cell x-grid-cell-inner">{purchaseletter_no}</div></td>',
                '<td ><div class="x-grid-cell x-grid-cell-inner">{price}</div></td>',
                '<td ><div class="x-grid-cell x-grid-cell-inner">{customer_name}</div></td>',
            '</tr>',
            '</tpl>',
            '</table>'
            ),
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    },
})


