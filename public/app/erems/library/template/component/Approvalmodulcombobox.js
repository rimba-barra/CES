Ext.define('Erems.library.template.component.Approvalmodulcombobox', {
    extend       : 'Erems.library.component.Combobox',
    alias        : 'widget.approvalmodulcombobox',
    fieldLabel   : 'Modul',
    displayField : 'name',
    valueField   : 'value',
    store        : new Ext.data.ArrayStore({
        fields : ['value','name'],
        data   : [[1,'Price List']]
    }),
    queryMode      : 'local',
    lastQuery      : '',
    forceSelection : true,
    renderTo       : Ext.getBody(),
    listeners      : {
        beforequery : function(record){
            record.query = new RegExp(record.query, 'i');
            record.forceAll = true;
        },
    },
    initComponent: function() {
        var me = this;
        me.callParent(arguments);
    }
})