Ext.define('Master.library.template.combobox.Databasecombobox', {
    extend: 'Master.library.component.Combobox',
    alias: 'widget.databasecombobox',
    //store: 'Masterdata.store.Project', //masuk dalam store
    store: 'Database', //masuk dalam store
    fieldLabel: 'Database',
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    displayField: 'name', //mengambil data dari store
    //displayField: 'coa_name', //mengambil data dari store
    valueField: 'name', //mengambil data dari store   
    matchFieldWidth: false,
    tpl: Ext.create('Ext.XTemplate',
          '<table class="x-grid-table" width="500px" >',
            '<tr class="x-grid-row">',
                '<th width="100px"><div class="x-column-header x-column-header-inner">Database</div></th>',               
            '</tr>',
            '<tpl for=".">',
                '<tr class="x-boundlist-item">',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{name}</div></td>',                    
                '</tr>',
            '</tpl>',
         '</table>'
     ),    
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


