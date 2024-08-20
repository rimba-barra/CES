Ext.define('Hrd.view.transaksibeasiswa.GridEmployee', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.transaksibeasiswagridemployee',
    storeConfig:{
        id:'TransaksibeasiswaGridEmployeeStore',
        idProperty:'employee_id',
        extraParams:{
            mode_read:'employee'
        }
    },
    bindPrefixName: 'Transaksibeasiswa',
    newButtonLabel: 'New Employee',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            defaults:{
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
                   dataIndex: 'employee_nik',
                   text: 'NIK'
                },
                {
                   dataIndex: 'employee_name',
                   text: 'Nama Orang Tua / Karyawan',
                   width:200
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        border:1,
                        action: 'select',
                        margin: '0 5 0 0',
                        text: 'Select Employee'
                    }
                ]
            }
           
        ];
        return dockedItems;
    },
    generateActionColumn: function() {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'right',
            hideable: false,
            items: [
                {
                    text: 'Select',
                    altText: 'Edit',
                    action:'selects',
                    tooltip: 'Edit'
                }
            ]
        };
        return ac;
    }
});