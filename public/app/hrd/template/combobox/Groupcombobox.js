Ext.define('Hrd.template.combobox.Groupcombobox', {
    extend: 'Hrd.template.component.Combobox',
    alias: 'widget.groupcombobox',
    store: 'Group', //masuk dalam store
    fieldLabel: 'Group',
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    displayField: 'group', //mengambil data dari store
    valueField: 'group_id', //mengambil data dari store   
    matchFieldWidth: false,
    typeAhead: true,
    tpl: Ext.create('Ext.XTemplate',
          '<table class="x-grid-table" width="500px" >',
            '<tr class="x-grid-row">',
                '<th width="50px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                '<th width="200px"><div class="x-column-header x-column-header-inner">Name</div></th>',
            '</tr>',
            '<tpl for=".">',
                '<tr class="x-boundlist-item">',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
                    '<td><div class="x-grid-cell x-grid-cell-inner">{group}</div></td>',
                '</tr>',
            '</tpl>',
         '</table>'
     ),    
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


