Ext.define('Gl.library.template.combobox.Vouchernocomboboxchange', {
    extend: 'Gl.library.component.Combobox', 
    alias: 'widget.vouchernocomboboxchange',
    store: 'ChangeJournal', //masuk dalam store
   // store: 'Masterdata.store.Projectpt', //masuk dalam store
    fieldLabel: 'Voucher no',
    //displayField: 'pt_name', //mengambil data dari store
    displayField: 'no_generate', //mengambil data dari store
    valueField: 'journal_id', //mengambil data dari store
    initComponent: function() {
        var me = this;       
        me.callParent(arguments);
       
    }
})


