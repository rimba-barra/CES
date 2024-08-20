Ext.define('Erems.library.template.component.Mediapromotioncombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.mediapromotioncombobox',
    store: 'Masterpromotionmedia',
    fieldLabel: 'Media Promotion',
    displayField: 'mediapromotion',
    valueField: 'mediapromotion_id',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})