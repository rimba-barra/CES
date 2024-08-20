Ext.define('Erems.library.template.component.Girikcombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.girikcombobox',
    requires: 'Erems.model.Mastergirik',
    store: 'Mastergirik',
    fieldLabel: 'Girik',
    displayField: 'code',
    valueField: 'girik_id',
    matchFieldWidth: false,
	
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})