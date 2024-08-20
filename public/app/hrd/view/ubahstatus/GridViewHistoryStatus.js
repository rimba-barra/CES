Ext.define('Hrd.view.ubahstatus.Gridviewhistorystatus', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.ubahstatusgridviewhistorystatus',
    storeConfig: {
        id: 'ubahstatusGridviewhistorystatus',
        idProperty: 'log_statuschange_id',
        extraParams: {}
    },
    bindPrefixName: 'Ubahstatus',
    // newButtonLabel: 'Add',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            defaults: {
                xtype: 'gridcolumn'
            },
            viewConfig: {},
            columns: [
                 {
                    xtype: 'rownumberer',
                    text: 'No',
                    width: 30,
                    align: 'right',
                },
                {
                    // xtype: 'datefield',
                    // format: 'd-m-Y',
                    dataIndex: 'hire_date',
                    text: 'Hire Date',
                    width: 100,
                    name: 'hire_date',
                    align: 'left',
                    sortable: true
                },
                {
                    dataIndex: 'employeestatus',
                    text: 'Employee Status',
                    width: 100,
                    name: 'employeestatus',
                    align: 'left',
                    sortable: true,
                    renderer : function(value, metaData, record, rowIndex, colIndex, store) {
                        if(value)
                        {
                            value = value.charAt(0).toUpperCase() + value.slice(1);
                        }
                        return value;
                    }
                },
                {
                    dataIndex: 'employeestatus_detail',
                    text: 'Employee Status Detail',
                    width: 300,
                    name: 'employeestatus_detail',
                    align: 'left',
                    sortable: true
                },
                {
                    dataIndex: 'approved',
                    text: 'Approved',
                    width: 80,
                    name: 'approved',
                    align: 'center',
                    sortable: true,
                    renderer: function(value){
                        if(parseInt(value) == 1){
                            return '&#10003;';
                        } else {
                            return ''
                        }
                    }
                },
                {
                    dataIndex: 'sk_number',
                    text: 'SK Number',
                    width: 100,
                    name: 'sk_number',
                    align: 'left',
                    sortable: true
                },
                {
                    // xtype: 'datefield',
                    // format: 'd-m-Y',
                    dataIndex: 'effective_date',
                    text: 'Effective Date',
                    width: 100,
                    name: 'effective_date',
                    align: 'left',
                    sortable: true
                },
                {
                    dataIndex: 'notes',
                    text: 'Notes',
                    width: 150,
                    name: 'notes',
                    align: 'left',
                    sortable: true
                },                
                {
                    dataIndex: 'is_kompensasi',
                    text: 'Kompensasi',
                    width: 80,
                    name: 'is_kompensasi',
                    align: 'center',
                    sortable: true,
                    renderer: function(value){
                        if(parseInt(value) == 1){
                            return '&#10003;';
                        } else {
                            return ''
                        }
                    }
                },
                {
                    // xtype: 'datefield',
                    // format: 'd-m-Y',
                    dataIndex: 'masa_kerja_start_date',
                    text: 'Masa Kerja',
                    width: 100,
                    name: 'masa_kerja_start_date',
                    align: 'left',
                    sortable: true
                },
                {
                    // xtype: 'datefield',
                    // format: 'd-m-Y',
                    dataIndex: 'usia_kerja_start_date',
                    text: 'Usia Kerja',
                    width: 100,
                    name: 'usia_kerja_start_date',
                    align: 'left',
                    sortable: true
                },                
                {
                    dataIndex: 'is_applied',
                    text: 'Applied',
                    width: 80,
                    name: 'is_applied',
                    align: 'center',
                    sortable: true,
                    renderer: function(value){
                        if(parseInt(value) == 1){
                            return '&#10003;';
                        } else {
                            return ''
                        }
                    }
                },
                {
                    dataIndex: 'is_revised',
                    text: 'Revised',
                    width: 80,
                    name: 'is_revised',
                    align: 'center',
                    sortable: true,
                    renderer: function(value){
                        if(parseInt(value) == 1){
                            return '&#10003;';
                        } else {
                            return ''
                        }
                    }
                },  
                {
                    dataIndex: 'addon',
                    text: 'Modify Date',
                    width: 150,
                    name: 'addon',
                    align: 'left',
                    sortable: true
                },    
                {
                    dataIndex: 'addby',
                    text: 'Modify By',
                    width: 100,
                    name: 'addby',
                    align: 'left',
                    sortable: true
                },              
            ]
        });

        me.callParent(arguments);
    },
    
});