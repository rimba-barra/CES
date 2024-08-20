Ext.define('Erems.library.template.view.combobox.Cluster2', {
    extend: 'Erems.library.component.ComboboxDS2',
    alias: 'widget.cbcluster2',
    mode_read: 'cluster',
    storeUrl: 'cluster',
    storeIdProperty: 'cluster_id',
    storeID: 'cbClusterStore',
    displayField: 'cluster',
    valueField: 'cluster_id',
    fieldLabel:"Cluster",
    storeConfig:{
        id:'cbClusterStore',
        idProperty:'cluster_id',
        extraParams:{
            mode_read:"cluster"
        }
    },
    bindPrefixName:"cluster"
});


