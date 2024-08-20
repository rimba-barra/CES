Ext.define('Cashier.library.template.combobox.Levelcombobox', {
    extend: 'Cashier.library.component.Combobox', 
    alias: 'widget.levelcombobox',
    store: [1,2,3,4,5], //masuk dalam store
    fieldLabel: 'Template for Level',
    displayField: 'level', //mengambil data dari store
    valueField: 'level', //mengambil data dari store  
    initComponent: function() {
        var me = this;       
        me.callParent(arguments);
       
    }
})


