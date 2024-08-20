Ext.define('Erems.library.template.component.Approvalstatuscombobox', {
    extend       : 'Erems.library.component.Combobox',
    alias        : 'widget.approvalstatuscombobox',
    fieldLabel   : 'Status',
    displayField : 'name',
    valueField   : 'value',
    store        : new Ext.data.ArrayStore({
        fields : ['value','name'],
        data   : [['ALL', 'Semua'], ['OPEN', 'Menunggu Persetujuan'], ['APPROVE', 'Disetujui'], ['REJECT', 'Ditolak']]
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
        render : function(el, a, b, c){
            el.labelEl.update(el.fieldLabel);
        }                
    },
    initComponent: function() {
        var me = this;
        me.callParent(arguments);
    }
})