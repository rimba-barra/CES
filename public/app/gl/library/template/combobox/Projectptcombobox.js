Ext.define('Gl.library.template.combobox.Projectptcombobox', {
    extend: 'Gl.library.component.Combobox', 
    alias: 'widget.projectptcombobox',
    store: 'Projectpt', //masuk dalam store
   // store: 'Masterdata.store.ProjectProjectpt', //masuk dalam store
    fieldLabel: 'Project PT',
    //displayField: 'Projectpt_name', //mengambil data dari store
    displayField: 'pt_name', //mengambil data dari store
    valueField: 'pt_id', //mengambil data dari store
    initComponent: function() {
        var me = this;       
        me.callParent(arguments);
       
    }
})


