Ext.define('Gl.library.template.combobox.Monthcombobox', {
    extend: 'Gl.library.component.Combobox', 
    alias: 'widget.monthcombobox',
    store: 'Monthdata', //masuk dalam store
    fieldLabel: 'Periode',
    displayField: 'month', //mengambil data dari store
    valueField: 'id', //mengambil data dari store  
    initComponent: function() {
        var me = this;       
        me.callParent(arguments);
       
    }
})


