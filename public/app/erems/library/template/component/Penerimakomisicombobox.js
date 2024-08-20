Ext.define('Erems.library.template.component.Penerimakomisicombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.penerimakomisicombobox',
    store: 'Masterpenerimakomisi',
    fieldLabel: 'Penerima Komisi',
    displayField: 'penerima_komisi',
    valueField: 'komisi_penerima_id',
    //addBlankValue:true,
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})