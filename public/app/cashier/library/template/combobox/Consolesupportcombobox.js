Ext.define('Cashier.library.template.combobox.Consolesupportcombobox', {
    extend: 'Cashier.library.component.Combobox', 
    alias: 'widget.consolesupportcombobox',
    store: 'Consolesupportcombobox', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Group Console',
    displayField: 'group_consolidation', //mengambil data dari store
    valueField: 'consolidation_access_id', //mengambil data dari store  
     matchFieldWidth: false,
    tpl: Ext.create('Ext.XTemplate',
          '<table class="x-grid-table" width="500px" >',
            '<tr class="x-grid-row">',
                '<th width="80px"><div class="x-column-header x-column-header-inner">Group Consolidation</div></th>',
                '<th width="150px"><div class="x-column-header x-column-header-inner">Coa Reference</div></th>',
                '<th width="150px" style="display:none;"><div class="x-column-header x-column-header-inner">pt_idref</div></th>',
             
            '</tr>',
            '<tpl for=".">',
                '<tr class="x-boundlist-item">',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{group_consolidation}</div></td>',
                    '<td><div class="x-grid-cell x-grid-cell-inner">{coa_reference}</div></td>',
                     '<td style="display:none;"><div class="x-grid-cell x-grid-cell-inner">{pt_idref}</div></td>',

                   
                '</tr>',
            '</tpl>',
         '</table>'
     ),    
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


