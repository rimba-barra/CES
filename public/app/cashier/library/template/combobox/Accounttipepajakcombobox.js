Ext.define('Cashier.library.template.combobox.Accounttipepajakcombobox', {
    extend: 'Cashier.library.component.Combobox',
    alias: 'widget.accounttipepajakcombobox',
    //store: 'Masterdata.store.Project', //masuk dalam store
    store: 'Accounttipepajakcombo', //masuk dalam store
    fieldLabel: 'Account',
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    displayField: 'tipepajakdetail', //mengambil data dari store
    //displayField: 'coa_name', //mengambil data dari store
    valueField: 'coa_id', //mengambil data dari store   
    matchFieldWidth: false,
    tpl: Ext.create('Ext.XTemplate',
          '<table class="x-grid-table" width="300px" >',
            '<tr class="x-grid-row">',
                '<th width="100px"><div class="x-column-header x-column-header-inner">Tipe Pajak</div></th>',               
                '<th width="100px"><div class="x-column-header x-column-header-inner">COA</div></th>',               
                '<th width="100px"><div class="x-column-header x-column-header-inner">Sub COA</div></th>',               
                '<th width="100px"><div class="x-column-header x-column-header-inner">Persentase</div></th>',               
            '</tr>',
            '<tpl for=".">',
                '<tr class="x-boundlist-item">',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{tipepajakdetail}</div></td>',                    
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{coa}</div></td>',                    
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{kelsub}</div></td>',                    
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{persentase}%</div></td>',                    
                '</tr>',
            '</tpl>',
         '</table>'
    ),   
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
    }
})


