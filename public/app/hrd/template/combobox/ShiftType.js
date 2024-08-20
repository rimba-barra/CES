Ext.define('Hrd.template.combobox.ShiftType', {
    extend: 'Hrd.library.box.view.components.Combobox',
    alias: 'widget.cbshifttype',
    mode_read: 'master_shifttype',
    storeUrl: 'shifttype',
    storeIdProperty: 'shifttype_id',
    storeID: 'cbShiftTypeStore',
    displayField: 'code',
    valueField: 'shifttype_id',
    fieldLabel:"Shift Type",
    storeConfig:{
        id:'cbShiftTypeStore',
        idProperty:'shifttype_id'
    },
    bindPrefixName:"shifttype",
    tpl: Ext.create('Ext.XTemplate',
          '<table class="x-grid-table">',
            '<tr class="x-grid-row">',
                '<th width="50px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                '<th width="200px"><div class="x-column-header x-column-header-inner">Shift Type Name</div></th>',
            '</tr>',
            '<tpl for=".">',
                '<tr class="x-boundlist-item">',
                    '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
                    '<td><div class="x-grid-cell x-grid-cell-inner">{shifttype}</div></td>',
                '</tr>',
            '</tpl>',
         '</table>'
     ), 
});


