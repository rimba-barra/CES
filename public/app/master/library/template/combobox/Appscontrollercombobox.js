Ext.define('Master.library.template.combobox.Appscontrollercombobox', {
    extend: 'Master.library.component.Combobox',
    alias: 'widget.appscontrollercombobox',
    //store: 'Masterdata.store.Project', //masuk dalam store
    store: 'Appscontroller', //masuk dalam store
    fieldLabel: 'Controller',
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    displayField: 'controller_name', //mengambil data dari store
    //displayField: 'coa_name', //mengambil data dari store
    valueField: 'controller_name', //mengambil data dari store   
    matchFieldWidth: false,
    tpl: Ext.create('Ext.XTemplate',
          '<table class="x-grid-table" width="800px" >',
            '<tr class="x-grid-row">',
                '<th width="100px"><div class="x-column-header x-column-header-inner">Controller</div></th>',               
                '<th width="600px"><div class="x-column-header x-column-header-inner">Desc</div></th>',               
            '</tr>',
            '<tpl for=".">',
                '<tr class="x-boundlist-item">',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{controller_name}</div></td>',                    
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{controllerdesc}</div></td>',                    
                '</tr>',
            '</tpl>',
         '</table>'
     ),    
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


