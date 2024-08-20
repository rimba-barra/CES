Ext.define('Erems.library.template.component.Changeownershipreasoncombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.changeownershipreasoncombobox',
    store: 'Masterchangeownershipreason',
    fieldLabel: 'Reason Change',
    displayField: 'changeownershipreason',
    valueField: 'changeownershipreason_id',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})