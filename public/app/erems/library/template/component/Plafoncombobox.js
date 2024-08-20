Ext.define('Erems.library.template.component.Plafoncombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.plafoncombobox',
    store: 'Masterplafon',
    fieldLabel: 'Plafon',
    displayField: 'plafon',
    valueField: 'plafon_id',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})