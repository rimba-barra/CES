Ext.define('Hrd.view.personalhistory.GridTandaKasih', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.personalhistorytandakasihgrid',
    storeConfig: {
        id: 'PersonalhistoryGridTandakasihStore',
        idProperty: 'tandakasih_id',
        extraParams: {
            mode_read: 'tandakasih',
            employee_id:0
        }
    },
    id: 'PrsTandakasihGridID',
    bindPrefixName: 'Personalhistory',
    newButtonLabel: 'New Employee',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            defaults: {
                xtype: 'gridcolumn',
            },
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    dataIndex: 'tipetandakasih_name',
                    text: 'Jenis',
                    width:200
                },
                {
                    xtype:'datecolumn',
                    format:'d-m-Y',
                    dataIndex: 'date',
                    text: 'Tanggal'
                },
                {
                    dataIndex: 'jumlah',
                    xtype:'numbercolumn',
                    text: 'Nilai'
                },
                
                //me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [];
        return dockedItems;
    },
    generateActionColumn: function() {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            hidden: false,
            items: [
                {
                    defaultIcon: 'icon-edit',
                    iconCls: ' ux-actioncolumn icon-edit act-update',
                    action: 'update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                },
                {
                    defaultIcon: 'icon-delete',
                    action: 'destroy',
                    iconCls: 'ux-actioncolumn icon-delete act-destroy',
                    altText: 'Delete',
                    tooltip: 'Delete'
                }
            ]
        };
        return ac;
    }
});