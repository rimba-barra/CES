Ext.define('Hrd.template.combobox.Projectptcombobox', {
    extend: 'Hrd.template.component.Combobox',
    alias: 'widget.projectptcombobox',
    store: 'Projectpt', //masuk dalam store
    fieldLabel: 'Projectpt',
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    displayField: 'project_name', //mengambil data dari store
    valueField: 'projectpt_id', //mengambil data dari store   
    matchFieldWidth: false,
    typeAhead: true,
    tpl: Ext.create('Ext.XTemplate',
          '<table class="x-grid-table" width="500px" >',
            '<tr class="x-grid-row">',
                '<th width="150px"><div class="x-column-header x-column-header-inner">Project</div></th>',
                '<th width="250px"><div class="x-column-header x-column-header-inner">Pt</div></th>',
            '</tr>',
            '<tpl for=".">',
                '<tr class="x-boundlist-item">',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{project_name}</div></td>',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{pt_name}</div></td>',
                '</tr>',
            '</tpl>',
         '</table>'
     ),    
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


