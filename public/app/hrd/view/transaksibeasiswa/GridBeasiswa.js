Ext.define('Hrd.view.transaksibeasiswa.GridBeasiswa', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.transaksibeasiswabeasiswagrid',
    itemId:'TransaksibeasiswaBeasiswaGridID',
    storeConfig: {
        id: 'TransaksibeasiswaBeasiswaGridStore',
        idProperty: 'dinasdetail_id',
        extraParams:{
            mode_read: 'module',
            module:1,
            employee_id:0
        }
    },
    id: 'TBBGID',
    columnLines: false,
    bindPrefixName: 'Transaksibeasiswa',
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
               
               
                   dataIndex: 'child_name',
                   text: 'Nama Anak',
            
                },
                {
               
                 
                   dataIndex: 'jenjang',
                   text: 'Pendidikan',
            
                },
                {
               
               
                   dataIndex: 'kelas',
                   text: 'Kelas',
            
                },
                {
               
               
                   dataIndex: 'semester',
                   text: 'Semester',
            
                },
                {
               
               
                   dataIndex: 'rangking',
                   text: 'Rangking',
            
                },
                {
               
                   xtype:'datecolumn',
                   dataIndex: 'date',
                   text: 'Tanggal',
            
                },
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