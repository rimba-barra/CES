Ext.define('Erems.library.template.component.Typecombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.typecombobox',
    store: 'Mastertype',
    fieldLabel: 'Type',
    displayField: 'name',
    valueField: 'type_id',
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})