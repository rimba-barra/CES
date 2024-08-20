Ext.define('Cashier.library.template.combobox.Vouchernocomboboxcopy', {
    extend: 'Cashier.library.component.Combobox', 
    alias: 'widget.vouchernocomboboxcopy',
    store: 'CopydataJournal', //masuk dalam store
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


