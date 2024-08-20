Ext.define('Master.library.template.combobox.Tablecombobox', {
    extend: 'Master.library.component.Combobox',
    alias: 'widget.tablecombobox',
    //store: 'Masterdata.store.Project', //masuk dalam store
    store: 'Table', //masuk dalam store
    fieldLabel: 'Table',
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    displayField: 'TABLE_NAME', //mengambil data dari store
    //displayField: 'coa_name', //mengambil data dari store
    valueField: 'TABLE_NAME', //mengambil data dari store   
    matchFieldWidth: false,
    typeAhead: true,
    tpl: Ext.create('Ext.XTemplate',
          '<table class="x-grid-table" width="500px" >',
            '<tr class="x-grid-row">',
                '<th width="100px"><div class="x-column-header x-column-header-inner">Table</div></th>',               
            '</tr>',
            '<tpl for=".">',
                '<tr class="x-boundlist-item">',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{TABLE_NAME}</div></td>',                    
                '</tr>',
            '</tpl>',
         '</table>'
     ),    
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


