Ext.define('Erems.view.mastercontractor.Grid',{
    extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'MasterContractorGridStore',
        idProperty: 'contractor_id',
        extraParams: {}
    },
    alias:'widget.mastercontractorgrid',
    bindPrefixName:'Mastercontractor',
    newButtonLabel:'New Contractor',
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
                    itemId: 'colms_code',
                    width: 100,
                    dataIndex: 'code',
                    hideable: false,
                    text: 'Code'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_name',
                    width: 150,
                    align: 'right',
                    dataIndex: 'contractorname',
                    text: 'Contractor name'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_address',
                    width: 150,
                    align: 'right',
                    dataIndex: 'address',
                    text: 'Address'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_country',
                    width: 150,
                    align: 'right',
                    dataIndex: 'country_country_name',
                    text: 'Country'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_city',
                    width: 150,
                    align: 'right',
                    dataIndex: 'city_city_name',
                    text: 'City'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_pic',
                    width: 150,
                    align: 'right',
                    dataIndex: 'PIC',
                    text: 'Contact person'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_telp',
                    width: 150,
                    align: 'right',
                    dataIndex: 'telp',
                    text: 'Telp'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_fax',
                    width: 150,
                    align: 'right',
                    dataIndex: 'fax',
                    text: 'Fax'
                },{
                    xtype: 'gridcolumn',
                    itemId: 'colms_email',
                    width: 150,
                    align: 'right',
                    dataIndex: 'email',
                    text: 'email'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_npwp',
                    width: 150,
                    hidden: true,
                    align: 'right',
                    dataIndex: 'npwp',
                    text: 'NPWP'
                },
               
                
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});