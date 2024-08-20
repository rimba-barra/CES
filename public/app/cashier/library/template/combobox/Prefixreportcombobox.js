Ext.define('Cashier.library.template.combobox.Prefixreportcombobox', {
    extend: 'Cashier.library.component.Combobox',
    alias: 'widget.prefixreportcombobox',
    //store: 'Masterdata.store.Project', //masuk dalam store
    store: 'Voucherprefixsetupcombo', //masuk dalam store
    fieldLabel: 'Prefix',
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    displayField: 'prefix', //mengambil data dari store
    //displayField: 'project_name', //mengambil data dari store
    valueField: 'prefix_id', //mengambil data dari store   
    matchFieldWidth: false,
    typeAhead: true,
    tpl: Ext.create('Ext.XTemplate',
          '<table class="x-grid-table" width="500px" >',
            '<tr class="x-grid-row">',                
                '<th width="100px"><div class="x-column-header x-column-header-inner">Prefix</div></th>',
                '<th width="200px"><div class="x-column-header x-column-header-inner">Description</div></th>',
            '</tr>',
            '<tpl for=".">',
                '<tr class="x-boundlist-item">',                  
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{prefix}</div></td>',
                    '<td><div class="x-grid-cell x-grid-cell-inner">{prefixdesc}</div></td>',
                '</tr>',
            '</tpl>',
         '</table>'
    ),     
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


