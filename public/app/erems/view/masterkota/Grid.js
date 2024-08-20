Ext.define('Erems.view.mastercac.Grid',{
    extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'MasterPosisiGridStore',
        idProperty: 'cac_id',
        extraParams: {}
    },
    alias:'widget.mastercacgrid',
    
    bindPrefixName:'Mastercac',
   // itemId:'',
    newButtonLabel:'New CAC',
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
                    dataIndex: 'cac_code',
                    text: 'Code'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'cac_name',
                    text: 'Fullname'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'ktp_address',
                    text: 'KTP Address'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'home_phone',
                    text: 'Home Phone Number'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'handphone',
                    text: 'Handphone Number'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'email',
                    text: 'Email'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'npwp',
                    text: 'NPWP Number'
                },
                
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});


