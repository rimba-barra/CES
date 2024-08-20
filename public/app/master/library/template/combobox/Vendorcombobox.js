Ext.define('Master.library.template.combobox.Vendorcombobox', {
    extend: 'Master.library.component.Combobox',
    alias: 'widget.vendorcombobox',
    //store: 'Masterdata.store.Project', //masuk dalam store
    store: 'Vendorcombo', //masuk dalam store
    fieldLabel: 'Vendor',
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    displayField: 'vendorname', //mengambil data dari store
    //displayField: 'project_name', //mengambil data dari store
    valueField: 'vendor_id', //mengambil data dari store   
    matchFieldWidth: false,
    typeAhead: true,
    tpl: Ext.create('Ext.XTemplate',
          '<table class="x-grid-table" width="500px" >',
            '<tr class="x-grid-row">',
                '<th width="100px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                '<th width="200px"><div class="x-column-header x-column-header-inner">Name</div></th>',
                '<th width="100px"><div class="x-column-header x-column-header-inner">Address</div></th>',
           
            '</tr>',
            '<tpl for=".">',
                '<tr class="x-boundlist-item">',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{vendorcode}</div></td>',
                    '<td><div class="x-grid-cell x-grid-cell-inner">{vendorname}</div></td>',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{address}</div></td>',                   
                '</tr>',
            '</tpl>',
         '</table>'
    ),
     
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


