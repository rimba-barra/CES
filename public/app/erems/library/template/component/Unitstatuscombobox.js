Ext.define('Erems.library.template.component.Unitstatuscombobox', {
    extend        : 'Erems.library.component.Combobox',
    alias         : 'widget.unitstatuscombobox',
    fieldLabel    : 'Status',
    store         : 'Unitstatus',
    displayField  : 'status',
    valueField    : 'unitstatus_id',
    initComponent : function() {
        var me = this;
        me.callParent(arguments);
    }
})