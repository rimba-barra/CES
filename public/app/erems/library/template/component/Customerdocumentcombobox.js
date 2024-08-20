Ext.define('Erems.library.template.component.Customerdocumentcombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.customerdocumentcombobox',
    store: 'Mastercustomerdocument',
    fieldLabel: 'Customer Document',
    displayField: 'documenttype_documenttype',
    valueField: 'customerdocument_id',
    matchFieldWidth: false,
	
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})