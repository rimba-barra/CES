Ext.define('Erems.library.template.component.Distchannelcombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.distchannelcombobox',
    store: 'Masterdistchannel',
    fieldLabel: 'Distribution Channel',
    displayField: 'distributionchannel',
    valueField: 'komisi_distributionchannel_id',
    //addBlankValue:true,
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})