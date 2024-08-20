Ext.define('Master.library.template.combobox.Voucherkasbankcombobox', {
    extend: 'Master.library.component.Combobox',
    alias: 'widget.voucherkasbankcombobox',
    //store: 'Masterdata.store.Project', //masuk dalam store
    store: 'Voucherkasbank', //masuk dalam store
    fieldLabel: 'Voucher No.',
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    displayField: 'voucher_no', //mengambil data dari store
    valueField: 'voucher_no', //mengambil data dari store   
    matchFieldWidth: false,
    typeAhead: true,
    tpl: Ext.create('Ext.XTemplate',
          '<table class="x-grid-table" width="500px" >',
            '<tr class="x-grid-row">',                
                '<th width="50px"><div class="x-column-header x-column-header-inner">Voucher No.</div></th>',
                '<th width="40px"><div class="x-column-header x-column-header-inner">Accept Date</div></th>',
                '<th width="30px"><div class="x-column-header x-column-header-inner">Kas / Bank</div></th>',
                '<th width="100px"><div class="x-column-header x-column-header-inner">Description</div></th>',
            '</tr>',
            '<tpl for=".">',
                '<tr class="x-boundlist-item">',                    
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{voucher_no}</div></td>',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{accept_date:date("d-m-Y")}</div></td>',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{kasbank}</div></td>',
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


