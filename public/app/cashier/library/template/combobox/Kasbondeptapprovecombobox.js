Ext.define('Cashier.library.template.combobox.Kasbondeptapprovecombobox', {
    extend: 'Cashier.library.component.Combobox',
    alias: 'widget.kasbondeptapprovecombobox',
    //store: 'Masterdata.store.Project', //masuk dalam store
    store: 'Kasbondeptcombo', //masuk dalam store
    fieldLabel: 'Kasbon department',
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    displayField: 'voucher_no', //mengambil data dari store
    //displayField: 'project_name', //mengambil data dari store
    valueField: 'kasbondept_id', //mengambil data dari store   
    matchFieldWidth: false,
    typeAhead: true,
    tpl: Ext.create('Ext.XTemplate',
          '<table class="x-grid-table" width="500px" >',
            '<tr class="x-grid-row">',
                '<th width="100px"><div class="x-column-header x-column-header-inner">ID</div></th>',
                '<th width="100px"><div class="x-column-header x-column-header-inner">Voucher No</div></th>',
                '<th width="100px"><div class="x-column-header x-column-header-inner">Department</div></th>',
                '<th width="100px"><div class="x-column-header x-column-header-inner">Amount</div></th>',
                '<th width="100px"><div class="x-column-header x-column-header-inner">Amount Cashback</div></th>',
                '<th width="200px"><div class="x-column-header x-column-header-inner">Description</div></th>',
           
            '</tr>',
            '<tpl for=".">',
                '<tr class="x-boundlist-item">',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{kasbondept_id}</div></td>',
                    '<td><div class="x-grid-cell x-grid-cell-inner">{voucher_no}</div></td>',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{department}</div></td>',                   
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{amount}</div></td>',                   
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{amount_kembali}</div></td>',                   
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{description}</div></td>',                   
                '</tr>',
            '</tpl>',
         '</table>'
    ),
     
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


