Ext.define('Erems.library.template.component.Landrepaymentcombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.landrepaymentcombobox',
    store: 'Masterlandrepayment',
    fieldLabel: 'Landrepayment',
    displayField: 'keterangan',
    valueField: 'landrepayment_id',
    matchFieldWidth: false,
	
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})