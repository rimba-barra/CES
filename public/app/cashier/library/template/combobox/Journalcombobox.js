Ext.define('Cashier.library.template.combobox.Journalcombobox', {
    extend: 'Cashier.library.component.Combobox',
    alias: 'widget.journalcombobox',
    //store: 'Masterdata.store.Project', //masuk dalam store
    store: 'Journalcombo', //masuk dalam store
    fieldLabel: 'Voucher No',
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    displayField: 'voucher_no', //mengambil data dari store
    //displayField: 'project_name', //mengambil data dari store
    valueField: 'voucher_no', //mengambil data dari store   
    matchFieldWidth: false,
    typeAhead: true,
    tpl: Ext.create('Ext.XTemplate',
          '<table class="x-grid-table" width="500px" >',
            '<tr class="x-grid-row">',
                '<th width="150px"><div class="x-column-header x-column-header-inner">Voucher No</div></th>',
                '<th width="270px"><div class="x-column-header x-column-header-inner">Description</div></th>',
                '<th width="100px"><div class="x-column-header x-column-header-inner">Debet Total</div></th>',
            '</tr>',
            '<tpl for=".">',
                '<tr class="x-boundlist-item">',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{voucher_no}</div></td>',
                    '<td><div class="x-grid-cell x-grid-cell-inner">{description}</div></td>',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{debit_total_f}</div></td>',
                '</tr>',
            '</tpl>',
         '</table>'
    ),
     
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


