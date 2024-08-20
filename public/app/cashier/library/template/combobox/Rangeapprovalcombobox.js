Ext.define('Cashier.library.template.combobox.Rangeapprovalcombobox', {
    extend: 'Cashier.library.component.Combobox',
    alias: 'widget.rangeapprovalcombobox',
    store: 'Rangeapproval', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Range Approval',
    displayField: 'description', //mengambil data dari store
    valueField: 'range_id', //mengambil data dari store  
    matchFieldWidth: false,
    typeAhead: true,
    tpl: Ext.create('Ext.XTemplate',
          '<table class="x-grid-table" width="500px" >',
            '<tr class="x-grid-row">',
                '<th width="100px"><div class="x-column-header x-column-header-inner">Description</div></th>',                
            '</tr>',
            '<tpl for=".">',
                '<tr class="x-boundlist-item">',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{description}</div></td>',                                 
                '</tr>',
            '</tpl>',
         '</table>'
    ),
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


