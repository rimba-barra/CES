Ext.define('Erems.library.template.component.Garansicombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.garansicombobox',
    store: 'Mastergaransi',
    fieldLabel: 'Garansi',
    displayField: 'guaranteetype',
    valueField: 'guaranteetype_id',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})