Ext.define('Cashier.library.template.combobox.Vendoraccnocombobox', {
    extend: 'Cashier.library.component.Combobox',
    alias: 'widget.vendoraccnocombobox',
    //store: 'Masterdata.store.Project', //masuk dalam store
    store: 'Vendorbank2', //masuk dalam store
    fieldLabel: 'Vendor Acc. No.',
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    displayField: 'bank_account_no', //mengambil data dari store
    //displayField: 'project_name', //mengambil data dari store
    valueField: 'vendor_bankacc_id', //mengambil data dari store   
    matchFieldWidth: false,
    editable: false,
    typeAhead: true,
    width: '300px',
    displayTpl: Ext.create('Ext.XTemplate',
        '<tpl for=".">',
            '{bank_account_no} - {bank_account_name}',
        '</tpl>'
    ),
    tpl: Ext.create('Ext.XTemplate',
          '<table class="x-grid-table" width="800px" >',
            '<tr class="x-grid-row">',
                '<th width="200px"><div class="x-column-header x-column-header-inner">Bank Name</div></th>',
                '<th width="200px"><div class="x-column-header x-column-header-inner">Bank Account Name</div></th>',
                '<th width="200px"><div class="x-column-header x-column-header-inner">Bank Account No.</div></th>',
                '<th width="200px"><div class="x-column-header x-column-header-inner">Bank Currency</div></th>',
            '</tr>',
            '<tpl for=".">',
                '<tr class="x-boundlist-item">',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{bank_name}</div></td>',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{bank_account_name}</div></td>',
                    '<td><div class="x-grid-cell x-grid-cell-inner">{bank_account_no}</div></td>',             
                    '<td><div class="x-grid-cell x-grid-cell-inner">{currency_name}</div></td>',             
                '</tr>',
            '</tpl>',
         '</table>'
    ),
     
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


