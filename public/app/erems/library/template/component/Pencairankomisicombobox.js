Ext.define('Erems.library.template.component.Pencairankomisicombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.pencairankomisicombobox',
    store: 'Masterpencairankomisi',
    fieldLabel: 'Pencairan Komisi',
    displayField: 'code_judul_komisi',
    valueField: 'komisi_pencairan_id',
    //addBlankValue:true,
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})