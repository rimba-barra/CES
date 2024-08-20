Ext.define('Erems.library.template.component.Blockcombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.blockcombobox',
    store: 'Masterblock',
    fieldLabel: 'Block name',
    displayField: 'block',
    valueField: 'block_id',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})