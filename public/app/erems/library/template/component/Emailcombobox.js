Ext.define('Erems.library.template.component.Emailcombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.emailcombobox',
    store: 'Email',
    fieldLabel: 'Email',
    displayField: 'user_email',
    valueField: 'user_id',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})