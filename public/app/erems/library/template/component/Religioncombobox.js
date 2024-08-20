Ext.define('Erems.library.template.component.Religioncombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.religioncombobox',
    store: 'Masterdata.store.Religion',
    fieldLabel: 'Religion',
    displayField: 'religion',
    valueField: 'religion_id',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})