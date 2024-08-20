Ext.define('Erems.library.template.component.Formulacombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.formulacombobox',
    store: 'Masterformula',
    fieldLabel: 'Billing rules',
    displayField: 'description',
    valueField: 'billingrules_id',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})