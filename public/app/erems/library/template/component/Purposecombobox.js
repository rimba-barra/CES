Ext.define('Erems.library.template.component.Purposecombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.purposecombobox',
    store: 'Masterpurpose',
    fieldLabel: 'Purpose use',
    displayField: 'purpose',
    valueField: 'purpose_id',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})