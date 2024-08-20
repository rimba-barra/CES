Ext.define('Erems.view.complaint.DetailGridSurat', {
    extend         : 'Ext.grid.Panel',
    alias          : 'widget.complaintdetailgridsurat',
    store          : 'Complaintsurat',
    bindPrefixName : 'Complaintsurat',
    newButtonLabel : 'Add New Letter / Telp',
    height         : 150,
    initComponent  : function () {
        var me = this;

        Ext.applyIf(me, {
            dockedItems : me.generateDockedItems(),
            viewConfig  : {},
            selModel    : Ext.create('Ext.selection.CheckboxModel', {}),
            columns: [
                {
                    xtype : 'rownumberer'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_jenis_surat',
                    width     : 80,
                    dataIndex : 'jenis_surat',
                    hideable  : false,
                    text      : 'Jenis Surat'
                },
				{
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_undangan',
                    width     : 60,
                    align     : 'left',
                    dataIndex : 'undangan',
                    hideable  : false,
                    text      : 'Undangan'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_surat_no',
                    width     : 150,
                    dataIndex : 'surat_no',
                    hideable  : false,
                    text      : 'Nomor Surat'
                },
                {
                    xtype     : 'booleancolumn',
                    itemId    : 'colms_is_hadir',
                    header    : 'Hadir',
                    dataIndex : 'is_hadir',
                    width     : 40,
                    align     : 'center',
                    renderer  : function(val, meta, record, rowIndex, colIndex, store){
                        if(record.get("is_hadir")){
                            var a = '<input type="checkbox" name="is_hadir" data=' + record.get("is_hadir") + ' value="1" checked />';
                        }
                        else{
                            var a = '<input type="checkbox" name="is_hadir" data=' + record.get("is_hadir") + ' value="0"/>';
                        }
                        return a;
                    }
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_send_date',
                    width     : 100,
                    dataIndex : 'send_date',
                    hideable  : false,
                    text      : 'Tanggal Kirim',
                    renderer  : Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_undangan_date',
                    width     : 110,
                    dataIndex : 'undangan_date',
                    hideable  : false,
                    text      : 'Tanggal Undangan',
                    renderer  : Ext.util.Format.dateRenderer('d-m-Y')
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function () {

        var me = this;

        var dockedItems = [
            {
                xtype  : 'toolbar',
                dock   : 'top',
                height : 28,
                items  : [
                    {
                        xtype      : 'button',
                        action     : 'create',
                        hidden     : true,
                        itemId     : 'btnNew',
                        margin     : '0 5 0 0',
                        iconCls    : 'icon-new',
                        bindAction : me.bindPrefixName + 'Create',
                        text       : me.newButtonLabel
                    },
					{
                        xtype    : 'button',
                        action   : 'print_undangan',
                        disabled : true,
                        itemId   : 'btnPrint',
                        margin   : '0 5 0 0',
                        iconCls  : 'icon-print',
                        text     : 'Print Undangan'
                    },
                ]
            }
        ];
        return dockedItems;
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype     : 'actioncolumn',
            hidden    : true,
            itemId    : 'actioncolumn',
            width     : 50,
            resizable : false,
            align     : 'right',
            hideable  : false,
            items     : [
                {
                    text       : 'Edit',
                    iconCls    : 'icon-edit',
                    bindAction : me.bindPrefixName + 'Update',
                    altText    : 'Edit',
                    tooltip    : 'Update.'
                },
                {
                    text       : 'Delete',
                    iconCls    : 'icon-delete',
                    bindAction : me.bindPrefixName + 'Delete',
                    altText    : 'Delete',
                    tooltip    : 'Delete'
                }
            ]
        };
        return ac;
    }

});