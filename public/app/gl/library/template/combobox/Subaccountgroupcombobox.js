Ext.define('Gl.library.template.combobox.Subaccountgroupcombobox', {
    extend: 'Gl.library.component.Combobox', 
    alias: 'widget.subaccountgroupcombobox',
    store: 'Subaccountgroup', //masuk dalam store
    fieldLabel: 'Subaccountgroup',
    displayField: 'kelsub', //mengambil data dari store
    valueField: 'kelsub_id', //mengambil data dari store
    queryMode: 'local',
    matchFieldWidth: false,
    tpl: Ext.create('Ext.XTemplate',
            '<table class="x-grid-table" width="700" >',
            '<tr class="x-grid-row">',
            '<th width="80"><div class="x-column-header x-column-header-inner">Sub Group</div></th>',
            '<th width="250"><div class="x-column-header x-column-header-inner">Description</div></th>',
            '</tr>',
            '<tpl for=".">',
            '<tr class="x-boundlist-item">',
            '<td ><div class="x-grid-cell x-grid-cell-inner">{kelsub}</div></td>',
            '<td ><div class="x-grid-cell x-grid-cell-inner">{description}</div></td>',
            '</tr>',
            '</tpl>',
            '</table>'
            ),

    initComponent: function() {
        var me = this;    
        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
});



