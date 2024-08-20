Ext.define('Erems.library.template.view.combobox.DistributionChannel', {
    extend: 'Erems.library.component.ComboboxDS2',
    alias: 'widget.cbdistributionchannel',
    mode_read: 'komisi_distributionchannel',
    storeIdProperty: 'komisi_distributionchannel_id',
    storeID: 'cbdistributionchannelStore',
    displayField: 'distributionchannel',
    valueField: 'komisi_distributionchannel_id',
    fieldLabel:"Distribution Channel"
});