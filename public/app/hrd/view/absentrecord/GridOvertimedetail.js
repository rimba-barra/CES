Ext.define('Hrd.view.absentrecord.GridOvertimedetail', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.absentrecordovertimegrid',
    itemId:'AbsentrecordovertimegridID',   
    storeConfig: {
        id: 'AbsentrecordovertimegridIDStore',
        idProperty: 'employee_id',
        extraParams:{
            mode_read: 'overtime',
            employee_id:0
        }
    },
    columnLines: false,
    bindPrefixName: 'Absentrecord',
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
            /*selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),*/
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                
                   dataIndex: 'status',
                   text: 'Status Lembur',
                   width:150,
                   renderer: function(value, metadata, record) {
                        value = parseInt(value);
                        if (value == 1) {
                            return 'Sebelum Jam Masuk';
                        } else if (value == 2) {
                            return 'Sesudah Jam Pulang';
                        } else if (value == 3) {
                            return 'Keduanya';
                        } 
                        // else if (value == 4) {
                        //     return 'Hari Libur';
                        // } 
                        // else if (value == 5) {
                        //     return 'Hari Libur Pendek';
                        // } 
                        else if (value == 4) {
                            return 'Hari Libur (5 HK)';
                        } 
                        else if (value == 5) {
                            return 'Hari Libur (6 HK)';
                        } 
                        else if (value == 6) {
                            return 'Hari Pendek (6 HK)';
                        } 
                        else{
                            return '';
                        }
                        
                    },
                },
                {
                   dataIndex: 'nilai_lembur',
                   text: 'Nilai Lembur',
                   width:80
                },
                {
                    dataIndex: 'exec_time_in_start',
                    width: 140,
                    text: 'In Sebelum Jam Masuk',
                    renderer: function(value, metadata, record) {
                        return value == '00:00:00' ? '' : value;
                        
                    },
                },
                {
                    dataIndex: 'exec_time_in_end',
                    width: 140,
                    text: 'Out Sebelum Jam Masuk',
                    renderer: function(value, metadata, record) {
                        return value == '00:00:00' ? '' : value;
                        
                    },
                },
                {
                    dataIndex: 'exec_time_out_start',
                    width: 140,
                    text: 'In Sesudah Jam Pulang',
                    renderer: function(value, metadata, record) {
                        return value == '00:00:00' ? '' : value;
                        
                    },
                },
                {
                    dataIndex: 'exec_time_out_end',
                    width: 140,
                    text: 'Out Sesudah Jam Pulang',
                    renderer: function(value, metadata, record) {
                        return value == '00:00:00' ? '' : value;
                        
                    },
                },
                {
                   dataIndex: 'reason',
                   text: 'Alasan Lembur',
                   width:300
                },
                me.generateActionColumn()
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
            
            ]
        };
        return ac;
    }
});