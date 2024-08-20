Ext.define('Cashier.library.template.combobox.Kasbondepthasapplylocalcombobox', {
    extend: 'Cashier.library.component.Combobox',
    alias: 'widget.kasbondepthasapplylocalcombobox',
    //store: 'Masterdata.store.Project', //masuk dalam store
    store: 'Kasbondeptcomboapplylocal', //masuk dalam store
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
                /*'<th width="100px"><div class="x-column-header x-column-header-inner">ID</div></th>',*/
                '<th width="100px"><div class="x-column-header x-column-header-inner">Date</div></th>',
                '<th width="150px"><div class="x-column-header x-column-header-inner">CA No</div></th>',
                '<th width="100px"><div class="x-column-header x-column-header-inner">Amount</div></th>',
                '<th width="100px"><div class="x-column-header x-column-header-inner">Amount Paid</div></th>',
                '<th width="100px"><div class="x-column-header x-column-header-inner">Amount Remaining</div></th>',
                '<th width="300px"><div class="x-column-header x-column-header-inner">Description</div></th>',
                //'<th width="200px"><div class="x-column-header x-column-header-inner">Cheque Giro No.</div></th>',
                //'<th width="200px"><div class="x-column-header x-column-header-inner">Cheque Giro Date</div></th>',
           
            '</tr>',
            '<tpl for=".">',
                '<tr class="x-boundlist-item">',
                    /*'<td ><div class="x-grid-cell x-grid-cell-inner">{kasbondept_id}</div></td>',*/
                    '<td><div class="x-grid-cell x-grid-cell-inner">{voucher_date}</div></td>',
                    '<td><div class="x-grid-cell x-grid-cell-inner">{voucher_no}</div></td>',                 
                    '<td ><div class="x-grid-cell x-grid-cell-inner" style="text-align:right">{amount}</div></td>',                   
                    '<td ><div class="x-grid-cell x-grid-cell-inner" style="text-align:right">{amount_pay}</div></td>',                    
                    '<td ><div class="x-grid-cell x-grid-cell-inner" style="text-align:right">{remainingkasbon}</div></td>',                                    
                    '<td ><div class="x-grid-cell x-grid-cell-inner" style="white-space:normal !important;">{remarks}</div></td>',                   
                    //'<td ><div class="x-grid-cell x-grid-cell-inner">{chequegiro_no}</div></td>',                   
                    //'<td ><div class="x-grid-cell x-grid-cell-inner">{chequegiro_date}</div></td>',                   
                '</tr>',
            '</tpl>',
         '</table>'
    ),
     
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


