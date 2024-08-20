Ext.define('Gl.library.template.combobox.Projectcombobox', {
    extend: 'Gl.library.component.Combobox', 
    alias: 'widget.projectcombobox',
    //store: 'Masterdata.store.Project', //masuk dalam store
    store: 'Project', //masuk dalam store
    fieldLabel: 'Project',
    displayField: 'name', //mengambil data dari store
    //displayField: 'project_name', //mengambil data dari store
    valueField: 'project_id', //mengambil data dari store
    initComponent: function() {
        var me = this;       
        me.callParent(arguments);
       
    }
})


