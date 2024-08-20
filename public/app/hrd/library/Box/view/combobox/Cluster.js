Ext.define('Erems.library.template.view.combobox.Cluster', {
    extend: 'Erems.library.component.ComboboxDS',
    alias: 'widget.cbcluster',
    mode_read: 'cluster',
    storeUrl: 'cluster',
    storeIdProperty: 'cluster_id',
    storeID: 'cbClusterStore',
    displayField: 'cluster',
    valueField: 'cluster_id',
    fieldLabel:"Cluster"
});


