Ext.define('Cashier.library.template.combobox.Coadeptvouchercombobox', {
    extend: 'Cashier.library.component.Combobox',
    alias: 'widget.coadeptvouchercombobox',
    //store: 'Masterdata.store.Project', //masuk dalam store
    store: 'Coadeptcombo', //masuk dalam store
    fieldLabel: 'Coa',
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    displayField: 'coa', //mengambil data dari store
    //displayField: 'coa_name', //mengambil data dari store
    valueField: 'coa_id', //mengambil data dari store   
    matchFieldWidth: false,
    tpl: Ext.create('Ext.XTemplate',
          '<table class="x-grid-table" width="500px" >',
            '<tr class="x-grid-row">',               
                '<th width="100px"><div class="x-column-header x-column-header-inner">Coa</div></th>',
                '<th width="200px"><div class="x-column-header x-column-header-inner">Name</div></th>',
                '<th width="200px"><div class="x-column-header x-column-header-inner">Kelsub</div></th>',
                '<th width="200px"><div class="x-column-header x-column-header-inner">Kelsub Desc</div></th>',
            '</tr>',
            '<tpl for=".">',
                '<tr class="x-boundlist-item">',                    
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{coa}</div></td>',
                    '<td><div class="x-grid-cell x-grid-cell-inner">{coaname}</div></td>',
                    '<td><div class="x-grid-cell x-grid-cell-inner">{kelsub}</div></td>',
                    '<td><div class="x-grid-cell x-grid-cell-inner">{kelsubdesc}</div></td>',
                '</tr>',
            '</tpl>',
         '</table>'
     ),    
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


