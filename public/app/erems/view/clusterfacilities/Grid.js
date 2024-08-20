Ext.define('Erems.view.clusterfacilities.Grid',{
 
    alias:'widget.clusterfacilitiesgrid',
    extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'MasterClusterFacilitiesStore',
        idProperty: 'clusterfacilities_id',
        extraParams: {}
    },
    newButtonLabel:'New Cluster Facilities',
    bindPrefixName:'Clusterfacilities',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {

            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {

            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colcf_id',
                    width: 60,
                    align: 'right',
                    dataIndex: 'clusterfacilities_id',
                    text: 'ID'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colcf_cluseter',
                    width: 200,
                    dataIndex: 'cluster_cluster',
                    hideable: false,
                    text: 'Cluster'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colcf_code',
                    width: 200,
                    dataIndex: 'code',
                    hideable: false,
                    text: 'Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colcf_cluster',
                    width: 200,
                    dataIndex: 'clusterfacilities',
                    hideable: false,
                    text: 'Facilities'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colcf_description',
                    width: 200,
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Description'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colcf_facilitiestype',
                    width: 200,
                    dataIndex: 'facilitiestype_facilitiestype',
                    hideable: false,
                    text: 'Facilities type'
                },
                
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});


