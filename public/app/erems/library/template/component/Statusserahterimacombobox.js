Ext.define('Erems.library.template.component.Statusserahterimacombobox', {
    extend     : 'Erems.library.component.Combobox',
    alias      : 'widget.statusserahterimacombobox',
    fieldLabel : 'Status Serah Terima',
    store      : new Ext.data.ArrayStore({
        fields : [
            'status_st',
            'status_st_text'
        ],
        data: [[1, 'Sudah Serah Terima'], [2,'Belum Serah Terima']]
    }),
    displayField : 'status_st_text',
    valueField   : 'status_st',
    
    initComponent : function() {
        var me = this;

        me.callParent(arguments);
    }
})