Ext.define('Hrd.view.absentrecord.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.absentrecordgrid',
    storeConfig: {
        id: 'AbsentrecordGridStore',
        idProperty: 'absentdetail_id',
        extraParams: {}
    },
    columnLines: false,
    bindPrefixName: 'Absentrecord',
    newButtonLabel: 'New Absent',
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {
                stripeRows: false,
                getRowClass: function(record) {
                    return record.get('day_name') == "sunday" || record.get('day_name') == "saturday" ? 'weekend-row' : '';
                }
            },
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
                    dataIndex: 'day',
                    text: 'Date',
                    locked: true,
                    sortable: false,
                    width: 40
                },
                {
                    dataIndex: 'day_name',
                    locked: true,
                    sortable: false,
                    text: 'Day'
                },
                {
                    dataIndex: 'shifttype_code',
                    text: 'Shift',
                    locked: true,
                    sortable: false,
                    width: 40
                },
                {
                    dataIndex: 'attendance_total',
                    align: 'center',
                    locked: true,
                    sortable: false,
                    renderer: function(value, metadata, record) {
                        if (value < 1) {
                            return 0;
                        }
                        return value;
                    },
                    text: 'Total Attendance'
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'in_7_14',
                    format: 'H:i',
                    width: 70,
                    text: 'In 07-14',
                    listeners:{
                        click:function(el,a,index){
                            gbAbsentRecord.timeClick(index);
                        }
                    },
                    renderer: me.validateTime
                },
                {
                    xtype: 'datecolumn',
                    format: 'H:i',
                    width: 70,
                    dataIndex: 'out_7_14',
                    text: 'Out 07-14',
                    listeners:{
                        click:function(el,a,index){
                            gbAbsentRecord.timeClick(index);
                        }
                    },
                    renderer: me.validateTime
                },
                {
                    xtype: 'datecolumn',
                    format: 'H:i',
                    width: 70,
                    dataIndex: 'in_15_21',
                    text: 'In 15 - 21',
                    listeners:{
                        click:function(el,a,index){
                            gbAbsentRecord.timeClick(index);
                        }
                    },
                    renderer: me.validateTime
                },
                {
                    xtype: 'datecolumn',
                    format: 'H:i',
                    width: 70,
                    dataIndex: 'out_15_21',
                    text: 'Out 15 - 21',
                    listeners:{
                        click:function(el,a,index){
                            gbAbsentRecord.timeClick(index);
                        }
                    },
                    renderer: me.validateTime
                },
                {
                    xtype: 'datecolumn',
                    format: 'H:i',
                    width: 70,
                    dataIndex: 'in_22_6',
                    text: 'In 22 - 06',
                    listeners:{
                        click:function(el,a,index){
                            gbAbsentRecord.timeClick(index);
                        }
                    },
                    renderer: me.validateTime
                },
                {
                    xtype: 'datecolumn',
                    format: 'H:i',
                    width: 70,
                    dataIndex: 'out_22_6',
                    text: 'Out 22 - 06',
                    listeners:{
                        click:function(el,a,index){
                            gbAbsentRecord.timeClick(index);
                        }
                    },
                    renderer: me.validateTime
                },
                {
                    dataIndex: 'absenttype_code',
                    text: 'Reason',
                    listeners:{
                        click:function(el,a,index){
                            gbAbsentRecord.reasonClick(index);
                        }
                    }
                },
                {
                    dataIndex: 'late',
                    text: 'Late',
                    xtype: 'datecolumn',
                    format: 'H:i',
                    width: 70
                },
                {
                    dataIndex: 'code',
                    text: 'SPL'
                },
                {
                    dataIndex: 'overtime',
                    text: 'Overtime'
                },
                {
                    dataIndex: 'total_hours',
                    text: 'Attendance Hours',
                    xtype: 'datecolumn',
                    format: 'H:i',
                },
                {
                    dataIndex: 'time_lost',
                    text: 'Lost Time',
                    xtype: 'datecolumn',
                    format: 'H:i',
                },
                {
                    dataIndex: 'parametertlk_code',
                    text: 'TLK',
                    listeners:{
                        click:function(el,a,index){
                            gbAbsentRecord.tlkClick(index);
                        }
                    }
                },
                {
                    dataIndex: 'description',
                    text: 'Description'
                },
                me.generateActionColumn()
            ]
        });
        me.callParent(arguments);
    },
    validateTime: function(value) {
        var v = new Date(value);
        var h = v.getHours();
        h = isNaN(h)?0:h;
            var m = v.getMinutes();
        m = isNaN(h)?0:m;
        if (h > 0 || m  > 0){
            if (h < 10) {
                h = '0' + h;
            }
            if (m < 10) {
                m = '0' + m;
            }

            return h + ':' + m;
            
        } else {
            
            return '';
            
        }
    },
    generateDockedItems: function() {
        var me = this;
        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 'auto',
                overflowX: 'auto',
                items: [
                    {
                        xtype: 'button',
                        action: 'delete',
                        iconCls: 'icon-delete',
                        tooltip: 'Delete',
                        text: 'Delete'
                    },
                    {
                        xtype: 'button',
                        action: 'generate',
                        iconCls: 'icon-new',
                        tooltip: 'Generate Next-Periode',
                        text: 'Generate Next-Periode'
                    },
                    {
                        xtype: 'button',
                        action: 'refresh',
                        iconCls: 'icon-new',
                        tooltip: 'Refresh',
                        text: 'Refresh'
                    },
                    {
                        xtype: 'button',
                        action: 'setupshift',
                        iconCls: 'icon-new',
                        tooltip: 'Setup Shift',
                        text: 'Setup Shift'
                    },
                    {
                        xtype: 'button',
                        action: 'processabsent',
                        iconCls: 'icon-new',
                        tooltip: 'Process Absent',
                        text: 'Absent'
                    },
                    {
                        xtype: 'button',
                        action: 'insert',
                        iconCls: 'icon-new',
                        tooltip: 'Insert Date',
                        text: 'Insert'
                    },
                    {
                        xtype: 'button',
                        action: 'processlate',
                        iconCls: 'icon-new',
                        tooltip: 'Shortage of Working Hours',
                        text: 'Shortage of Working Hours'
                    },
                    {
                        xtype: 'button',
                        action: 'processday',
                        iconCls: 'icon-new',
                        tooltip: 'Process Day',
                        text: 'Day'
                    },
                    {
                        xtype: 'button',
                        action: 'manualnoted',
                        iconCls: 'icon-new',
                        tooltip: 'Manual Noted',
                        text: 'Manual Noted'
                    },
                    {
                        xtype: 'button',
                        action: 'processovertime',
                        iconCls: 'icon-new',
                        tooltip: 'Process Overtime',
                        text: 'Overtime'
                    },
                    {
                        xtype: 'button',
                        action: 'processhadir',
                        iconCls: 'icon-new',
                        tooltip: 'Process Hadir',
                        text: 'Hadir'
                    },
                    {
                        xtype: 'button',
                        action: 'processovetimespc',
                        iconCls: 'icon-new',
                        tooltip: 'Process Special Overtime',
                        text: 'Ot Special'
                    },
                    {
                        xtype: 'button',
                        action: 'processjklt',
                        iconCls: 'icon-new',
                        tooltip: 'Process Absent Hour and Lost Time',
                        text: 'Absent & Lost Time'
                    },
                    {
                        xtype: 'button',
                        action: 'processovetimespc',
                        iconCls: 'icon-new',
                        tooltip: 'Take text data',
                        text: 'Text Data'
                    },
                    {
                        xtype: 'button',
                        action: 'editdate',
                        iconCls: 'icon-new',
                        tooltip: 'Edit Date',
                        text: 'Edit date'
                    },
                    {
                        xtype: 'button',
                        action: 'importexcel',
                        iconCls: 'icon-new',
                        tooltip: 'Import Excel',
                        text: 'Excel'
                    },
                    {
                        xtype: 'button',
                        action: 'updatetran',
                        iconCls: 'icon-new',
                        tooltip: 'Update Absent Transaction',
                        text: 'Update Transaction'
                    },
                    {
                        xtype: 'button',
                        action: 'repairdate',
                        iconCls: 'icon-new',
                        tooltip: 'Repair Date',
                        text: 'Repair Date'
                    },
                    {
                        xtype: 'button',
                        action: 'updatetran',
                        iconCls: 'icon-new',
                        tooltip: 'Update Absent Transaction',
                        text: 'Update Transaction'
                    },
                    {
                        xtype: 'button',
                        action: 'transfer',
                        iconCls: 'icon-new',
                        tooltip: 'Process Absent Transfer',
                        text: 'Transfer'
                    },
                    {
                        xtype: 'button',
                        action: 'massalleave',
                        iconCls: 'icon-new',
                        tooltip: 'Massal Leave',
                        text: 'Massal Leave'
                    },
                    {
                        xtype: 'button',
                        action: 'open',
                        iconCls: 'icon-new',
                        tooltip: 'Open Absent Transaction',
                        text: 'Open'
                    },
                    {
                        xtype: 'button',
                        action: 'updatetran2',
                        iconCls: 'icon-new',
                        tooltip: 'Update Absent Transaction',
                        text: 'Update Transaction'
                    },
                    {
                        xtype: 'button',
                        action: 'deletetran',
                        iconCls: 'icon-new',
                        tooltip: 'Delete Absent Transaction',
                        text: 'Delete Transc'
                    },
                    {
                        xtype: 'button',
                        action: 'transfermysqlaccess',
                        iconCls: 'icon-new',
                        tooltip: 'Transfer Mysql to Access',
                        text: 'Mysql > Access'
                    },
                    {
                        xtype: 'button',
                        action: 'trasnferinternet',
                        iconCls: 'icon-new',
                        tooltip: 'Transfer from Internet',
                        text: 'Internet'
                    },
                    {
                        xtype: 'button',
                        action: 'fixdate',
                        iconCls: 'icon-new',
                        tooltip: 'Fix Date',
                        text: 'Fix Date'
                    },
                    {
                        xtype: 'button',
                        action: 'create',
                        hidden: true,
                        itemId: 'btnNew',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Create',
                        text: me.newButtonLabel
                    },
                    {
                        xtype: 'button',
                        action: 'update',
                        disabled: true,
                        hidden: true,
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit',
                        bindAction: me.bindPrefixName + 'Update'
                    },
                    
                    {
                        xtype: 'button',
                        action: 'print',
                        hidden: true,
                        itemId: 'btnPrint',
                        margin: '0 5 0 0',
                        bindAction: me.bindPrefixName + 'Print',
                        iconCls: 'icon-print',
                        text: 'Print / Save'
                    }


                ]
            }
            /*,
             {
             xtype: 'pagingtoolbar',
             dock: 'bottom',
             width: 360,
             displayInfo: true,
             store: this.getStore()
             }*/
        ];
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
                }
            ]
        };
        return ac;
    }
});