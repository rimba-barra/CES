Ext.define('Hrd.view.transaksipinjaman.GridAngsuran', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.transaksipinjamanangsurangrid',
    itemId:'TransaksipinjamanAngsuranGridID',
    storeConfig: {
        id: 'TransaksipinjamanAngsuranGridStore',
        idProperty: 'angsuran_id',
        extraParams:{
            mode_read: 'angsuran',
            pinjaman_id:0
        }
    },
    id: 'TPAGID',
    columnLines: false,
    bindPrefixName: 'Transaksipinjaman',
    newButtonLabel: 'New',
    initComponent: function() {
        var me = this;
        
        
       

        
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {},
            defaults: {
                xtype: 'gridcolumn',
                align: 'center'
                

            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                
                {
               
                   xtype:'datecolumn',
                   format:'d/m/Y',
                   dataIndex: 'date',
                   text: 'Tanggal',
            
                },
                {
               
                 
                   dataIndex: 'ke',
                   text: 'Ke',
            
                },
                {
               
                   xtype:'numbercolumn',
                   dataIndex: 'nilai',
                   text: 'Nilai Angsuran',
            
                },
                {
                    xtype: 'booleancolumn',
                    width: 75,
                    align: 'center',
                    falseText: ' ',
                    trueText: '&#10003;',
                    dataIndex: 'lunas',
                    text: 'Lunas',
                }
              //  me.generateActionColumn()
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
            hidden: true,
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'right',
            hideable: false,
            items: [
                {
                    text: 'Edit',
                    iconCls: 'icon-edit',
                    bindAction: me.bindPrefixName + 'Update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                },
                {
                    text: 'Delete',
                    iconCls: 'icon-delete',
                    bindAction: me.bindPrefixName + 'Delete',
                    altText: 'Delete',
                    tooltip: 'Delete'
                }
            
            ]
        };
        return ac;
    }
});