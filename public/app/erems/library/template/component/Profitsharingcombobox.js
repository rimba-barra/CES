Ext.define('Erems.library.template.component.Profitsharingcombobox', {
       // extend: 'Ext.form.field.ComboBox',
     extend: 'Erems.library.component.Combobox',
     queryMode: 'local',
     alias: 'widget.profitsharingcombobox',
       // requires:['Erems.store.Masterrangebagihasil'],
     store: 'Masterprofitsharing',
     fieldLabel: 'Profit Sharing',
     displayField: 'keterangan',
     valueField: 'profitsharing_id',
        //addBlankValue:true,
     initComponent: function(config) {
        var me = this;

        me.callParent(config);
            //this.renderer = function(value, metadata, record, row, col, store) {
             //   return record.get(this.displayField);
            //}
    }
})