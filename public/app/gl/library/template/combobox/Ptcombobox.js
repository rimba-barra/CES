Ext.define('Gl.library.template.combobox.Ptcombobox', {
    extend: 'Gl.library.component.Combobox', 
    alias: 'widget.ptcombobox',
    store: 'Pt', //masuk dalam store
   // store: 'Masterdata.store.Projectpt', //masuk dalam store
    fieldLabel: 'PT',
    //displayField: 'pt_name', //mengambil data dari store
    displayField: 'name', //mengambil data dari store
    valueField: 'pt_id', //mengambil data dari store
    initComponent: function() {
        var me = this;       
        me.callParent(arguments);
       
    }
})


