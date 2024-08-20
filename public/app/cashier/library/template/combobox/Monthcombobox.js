Ext.define('Cashier.library.template.combobox.Monthcombobox', {
    extend: 'Cashier.library.component.Combobox', 
    alias: 'widget.monthcombobox',
    store: [
             [1, "January"],
             [2, "February"],
             [3, "March"],
             [4, "April"],
             [5, "May"],
             [6, "June"],
             [7, "July"],
             [8, "August"],
             [9, "September"],
             [10, "October"],
             [11, "November"],
             [12, "December"]
        ],
    fieldLabel: 'Periode',
    displayField: 'month', //mengambil data dari store
    valueField: 'id', //mengambil data dari store  
    initComponent: function() {
        var me = this;       
        me.callParent(arguments);
       
    }
})


