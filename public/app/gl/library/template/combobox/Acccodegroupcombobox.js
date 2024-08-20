Ext.define('Gl.library.template.combobox.Acccodegroupcombobox', {
    extend: 'Ext.form.field.ComboBox',   
    alias: 'widget.acccodegroupcombobox',
    store: 'Acccodegroupcombo', //masuk dalam store    
    fieldLabel: 'Acccodegroup',
    queryMode: 'local',
    displayField: 'desc', //mengambil data dari store
    valueField: 'id', //mengambil data dari store
    renderTo:Ext.getBody()
    
    
})


