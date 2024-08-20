Ext.define('Erems.library.template.component.Spktypecombobox', {
    extend: 'Erems.library.component.ComboboxDS',
    alias: 'widget.spktypecombobox',
    fieldLabel: 'SPK Type',
    displayField: 'spktype',
    valueField: 'spktype_id',
    mode_read:'spktype',
    storeUrl:'spk',
    storeIdProperty:'spktype_id',
    storeID:'SpktypeStore',
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
    }
});