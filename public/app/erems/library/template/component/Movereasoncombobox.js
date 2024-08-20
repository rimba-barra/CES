Ext.define('Erems.library.template.component.Movereasoncombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.movereasoncombobox',
    store: 'Mastermovereason',
    fieldLabel: 'Alasan Pindah Kavling',
    displayField: 'movereason',
    valueField: 'movereason_id',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})