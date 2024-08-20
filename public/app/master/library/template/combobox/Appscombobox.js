Ext.define('Master.library.template.combobox.Appscombobox', {
    extend: 'Master.library.component.Combobox',
    alias: 'widget.appscombobox',
    //store: 'Masterdata.store.Project', //masuk dalam store
    store: 'Apps', //masuk dalam store
    fieldLabel: 'Application',
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    displayField: 'apps_name', //mengambil data dari store
    //displayField: 'coa_name', //mengambil data dari store
    valueField: 'apps_basename', //mengambil data dari store   
    matchFieldWidth: false,
    typeAhead: true,
    tpl: Ext.create('Ext.XTemplate',
          '<table class="x-grid-table" width="500px" >',
            '<tr class="x-grid-row">',
                '<th width="100px"><div class="x-column-header x-column-header-inner">Application</div></th>',               
                '<th width="100px"><div class="x-column-header x-column-header-inner">Base</div></th>',               
            '</tr>',
            '<tpl for=".">',
                '<tr class="x-boundlist-item">',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{apps_name}</div></td>',                    
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{apps_basename}</div></td>',                    
                '</tr>',
            '</tpl>',
         '</table>'
     ),    
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


