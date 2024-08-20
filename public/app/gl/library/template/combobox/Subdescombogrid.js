Ext.define('Gl.library.template.combobox.Subdescombogrid', {
    extend: 'Gl.library.component.Combobox', 
    alias: 'widget.subaccountgroupcombobox',
    store: 'Subaccountgroup', //masuk dalam store
    fieldLabel: 'Subaccountgroup',
    displayField: 'kelsub', //mengambil data dari store
    valueField: 'kelsub_id', //mengambil data dari store
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})





Ext.widget('grid', {
	title: 'Rendering Combos',
	width: 650,
	height: 500,
    renderTo: 'ct',
   
    store: gridStore,
    forceFit: true,
    columns: [{
        dataIndex: 'id',
        header: 'ID'
    },{
        dataIndex: 'type_id',
        header: 'Type',
        editor: {
            xtype: 'combobox',
            displayField: 'label',
            valueField: 'id',
            queryMode: 'local',
            store: comboStore,
            allowBlank: true
        },
        renderer: function(value) {
            var rec = comboStore.getById(value);
            
            if (rec)
            {
                return rec.get('label');
            }
            
            return '&mdash;';
        }
    }]
});