Ext.define('Erems.view.projectfacilities.Grid', {
    alias:'widget.projectfacilitiesgrid',
    extend: 'Erems.library.box.view.Grid',
   
    storeConfig:{
        id:'ProjectfacilitiesGridStore',
        idProperty:'projectfacilities_id',
        extraParams:{}
    },
    
    bindPrefixName:'Projectfacilities',
    newButtonLabel:'New Project Facilities',
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
                    itemId: 'colpf_id',
                    width: 60,
                    align: 'right',
                    dataIndex: 'projectfacilities_id',
                    text: 'ID'
                },
				{
                    xtype: 'gridcolumn',
                    itemId: 'colpf_code',
                    width: 200,
                    dataIndex: 'code',
                    hideable: false,
                    text: 'Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colpf_projectfacilities',
                    width: 200,
                    dataIndex: 'projectfacilities',
                    hideable: false,
                    text: 'Facilities'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colpf_description',
                    width: 200,
                    dataIndex: 'description',
                    hideable: false,
                    text: 'Description'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colpf_facilitiestype',
                    width: 200,
                    dataIndex: 'facilitiestype_facilitiestype',
                    hideable: false,
                    text: 'Facilities Type'
                },
                
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }

});

