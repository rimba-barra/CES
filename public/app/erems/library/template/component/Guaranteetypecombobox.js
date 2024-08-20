Ext.define('Erems.library.template.component.Guaranteetypecombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.guaranteetypecombobox',
    store: 'Masterguaranteetype',
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