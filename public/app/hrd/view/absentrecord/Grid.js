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
                /*
                {
                    xtype: 'rownumberer'
                },*/
                {
                    dataIndex: 'day',
                    text: '',
                    sortable: false,
                    width: 40
                },
                {
                    dataIndex: 'day',
                    text: 'Date',
                    locked: true,
                    sortable: false,
                    width: 40,
                    listeners:{
                        click:function(el,a,index){
                            gbAbsentRecord.columnSheetdayclick(index);
                        }
                    },
                },
                {
                    dataIndex: 'day_name',
                    locked: true,
                    sortable: false,
                    width: 75,
                    text: 'Day',
                },
                {
                    dataIndex: 'shifttype_code',
                    text: 'Shift',
                    locked: true,
                    sortable: false,
                    width: 50,
                    listeners:{
                        click:function(el,a,index){
                            gbAbsentRecord.columnSheetclick(index);
                        }
                    },
                },
                {
                    dataIndex: 'attendance_total',
                    align: 'center',
                    width:40,
                    locked: true,
                    sortable: false,
                    renderer: function(value, metadata, record) {
                        if (value < 1) {
                            return 0;
                        }
                        return value;
                    },
                    text: 'Attn.'
                },
                
                // add by wulan 20200623
                {
                    dataIndex: 'transport_total',
                    align: 'center',
                    width:40,
                    locked: true,
                    sortable: false,
                    renderer: function(value, metadata, record) {
                        if (value < 1) {
                            return 0;
                        }
                        return value;
                    },
                    text: 'Transport'
                },
                
                {
                    xtype: 'datecolumn',
                    dataIndex: 'in_7_14',
                    format: 'H:i:s',
                    width: 60,
                    text: 'In 07-14',
                    listeners:{
                        click:function(el,a,index){
                            gbAbsentRecord.timeClick(index, 'in_7_14');
                        }
                    },
                    renderer: me.validateTime
                },
                {
                    xtype: 'datecolumn',
                    format: 'H:i:s',
                    width: 60,
                    dataIndex: 'out_7_14',
                    text: 'Out 07-14',
                    listeners:{
                        click:function(el,a,index){
                            gbAbsentRecord.timeClick(index, 'out_7_14');
                        }
                    },
                    renderer: me.validateTime
                },
                {
                    xtype: 'datecolumn',
                     format: 'H:i:s',
                    width: 60,
                    dataIndex: 'in_15_21',
                    text: 'In 15 - 21',
                    listeners:{
                        click:function(el,a,index){
                            gbAbsentRecord.timeClick(index, 'in_15_21');
                        }
                    },
                    renderer: me.validateTime
                },
                {
                    xtype: 'datecolumn',
                     format: 'H:i:s',
                    width: 60,
                    dataIndex: 'out_15_21',
                    text: 'Out 15 - 21',
                    listeners:{
                        click:function(el,a,index){
                            gbAbsentRecord.timeClick(index, 'out_15_21');
                        }
                    },
                    renderer: me.validateTime
                },
                {
                    xtype: 'datecolumn',
                     format: 'H:i:s',
                    width: 60,
                    dataIndex: 'in_22_6',
                    text: 'In 22 - 06',
                    listeners:{
                        click:function(el,a,index){
                            gbAbsentRecord.timeClick(index, 'in_22_6');
                        }
                    },
                    renderer: me.validateTime
                },
                {
                    xtype: 'datecolumn',
                    format: 'H:i:s',
                    width: 60,
                    dataIndex: 'out_22_6',
                    text: 'Out 22 - 06',
                    listeners:{
                        click:function(el,a,index){
                            gbAbsentRecord.timeClick(index, 'out_22_6');
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
                    dataIndex: 'total_hours',
                    text: 'Attn. Hours',
                    xtype: 'datecolumn',
                    format: 'H:i:s',
                    width: 70,
                },
                {
                    dataIndex: 'late',
                    text: 'Late',
                    xtype: 'datecolumn',
                     format: 'H:i:s',
                    width: 60
                },
                {
                    dataIndex: 'pulang_cepat',
                    text: 'Pulang Cepat',
                    xtype: 'datecolumn',
                    format: 'H:i:s',
                    width: 75,
                },
                {
                    dataIndex: 'time_lost',
                    text: 'Lost Time',
                    xtype: 'datecolumn',
                     format: 'H:i:s',
                    width: 60,
                },
                {
                    dataIndex: 'spl',
                    text: 'Status Lembur',
                    width: 150,
                    listeners:{
                        click:function(el,a,index){
                            gbAbsentRecord.statuslemburClick(index);
                        }
                    },
                    renderer: function(value, metadata, record) {                        
                        return parseInt(value) > 1 ? '<i title="click to view detail">' + parseInt(value) + ' Transaksi </i>' : value;
                        
                    },
                },
                {
                    dataIndex: 'overtime',
                    text: 'Nilai Lembur'
                },
                // {
                //     dataIndex: 'total_hours',
                //     text: 'Attn. Hours',
                //     xtype: 'datecolumn',
                //     format: 'H:i:s',
                //     width: 70,
                // },
                // {
                //     dataIndex: 'time_lost',
                //     text: 'Lost Time',
                //     xtype: 'datecolumn',
                //      format: 'H:i:s',
                //     width: 60,
                // },
                {
                    dataIndex: 'parametertlk_name',
                    text: 'Tlk/Pdlk/Pdln',
                    listeners: {
                        click: function (el, a, index) {
                            gbAbsentRecord.tlkClick(index);
                        }
                    }
                },
                {
                    dataIndex: 'description',
                    text: 'Description'
                },
                {
                    dataIndex: 'exec_time_in_start',
                    width: 150,
                    text: 'In SPL Sebelum Jam Masuk',
                    listeners:{
                        click:function(el,a,index){
                            gbAbsentRecord.statuslemburClick(index);
                        }
                    },
                    renderer: function(value, metadata, record) {
                        if(value == '00:00:00'){
                            return ''; 
                        } else {
                            return parseInt(value) > 1 && value.length == 1 ? '<i title="click to view detail">' + parseInt(value) + ' Transaksi </i>' : value;
                        }
                    },
                },
                {
                    dataIndex: 'exec_time_in_end',
                    width: 150,
                    text: 'Out SPL Sebelum Jam Masuk',
                    listeners:{
                        click:function(el,a,index){
                            gbAbsentRecord.statuslemburClick(index);
                        }
                    },
                    renderer: function(value, metadata, record) {
                        if(value == '00:00:00'){
                            return ''; 
                        } else {                        
                            return parseInt(value) > 1 && value.length == 1 ? '<i title="click to view detail">' + parseInt(value) + ' Transaksi </i>' : value;       
                        }
                    }
                },
                {
                    dataIndex: 'exec_time_out_start',
                    width: 150,
                    text: 'In SPL Sesudah Jam Pulang',
                    listeners:{
                        click:function(el,a,index){
                            gbAbsentRecord.statuslemburClick(index);
                        }
                    },
                    renderer: function(value, metadata, record) {
                        if(value == '00:00:00'){
                            return ''; 
                        } else {
                            return parseInt(value) > 1 && value.length == 1 ? '<i title="click to view detail">' + parseInt(value) + ' Transaksi </i>' : value;
                        }
                    }
                },
                {
                    dataIndex: 'exec_time_out_end',
                    width: 150,
                    text: 'Out SPL Sesudah Jam Pulang',
                    listeners:{
                        click:function(el,a,index){
                            gbAbsentRecord.statuslemburClick(index);
                        }
                    },
                    renderer: function(value, metadata, record) {
                        if(value == '00:00:00'){
                            return ''; 
                        } else {
                            return parseInt(value) > 1 && value.length == 1 ? '<i title="click to view detail">' + parseInt(value) + ' Transaksi </i>' : value;  
                        }
                    }
                },
                /*
                {
                    xtype: 'datecolumn',
                    dataIndex: 'exec_time_in_start',
                    format: 'H:i:s',
                    width: 150,
                    text: 'In SPL Sebelum Jam Masuk',
                    renderer: me.validateTime
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'exec_time_in_end',
                    format: 'H:i:s',
                    width: 150,
                    text: 'Out SPL Sebelum Jam Masuk',
                    renderer: me.validateTime
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'exec_time_out_start',
                    format: 'H:i:s',
                    width: 150,
                    text: 'In SPL Sesudah Jam Pulang',
                    renderer: me.validateTime
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'exec_time_out_end',
                    format: 'H:i:s',
                    width: 150,
                    text: 'Out SPL Sesudah Jam Pulang',
                    renderer: me.validateTime
                },
                */
              //  me.generateActionColumn()
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
        var s = v.getSeconds();
        s = isNaN(h)?0:s;
        
        
        if (h > 0 || m  > 0){
            if (h < 10) {
                h = '0' + h;
            }
            if (m < 10) {
                m = '0' + m;
            }
            if (s < 10) {
                s = '0' + s;
            }
            
            return h + ':' + m+':'+s;
            
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
                   /* {
                        xtype: 'button',
                        action: 'delete',
                        iconCls: 'icon-delete',
                        tooltip: 'Delete',
                        text: 'Delete'
                    }, */
                    {
                        xtype: 'button',
                        action: 'generate',
                        iconCls: 'icon-plus',
                        tooltip: 'Generate Next-Periode',
                        text: 'Generate Next-Periode'
                    },
		    {
                        xtype: 'button',
                        action: 'generateworkgroup',
                        iconCls: 'icon-plus',
                        tooltip: 'Generate Periode and Shift From Work Group Employee',
                        text: 'Generate From Shift Pattern',
                        hidden:true
                    },	

                  /*  {
                        xtype: 'button',
                        action: 'refresh',
                        iconCls: 'icon-new',
                        tooltip: 'Refresh',
                        text: 'Refresh'
                    },
                    */
                    {
                        xtype: 'button',
                        action: 'setupshift',
                        iconCls: 'icon-form-edit',
                        tooltip: 'Setup Shift',
                        text: 'Setup Shift'
                    },
                    {
                        xtype: 'button',
                        action: 'transfer',
                        iconCls: 'icon-copy',
                        tooltip: 'Process Absent Transfer',
                        text: 'Transfer'
                    },
		    {
                        xtype: 'button',
                        action: 'processabsent',
                        iconCls: 'icon-new',
                        tooltip: 'Process Absent',
                        text: 'Absent'
                    },

		     /* start added by ahmad riadi 06-04-2017 */
                    {
                        xtype: 'button',
                        action: 'transferbyintranet',
                        itemId: 'btnTransferintranet',
                        iconCls: 'icon-new',
                        tooltip: 'Transfer by Intranet',
                        text: 'Transfer by Intranet'
                    },
                    /* end  by ahmad riadi 06-04-2017 */	

		     /* start added by ahmad riadi 09-03-2018 */
                    {
                        xtype: 'button',
                        action: 'transferbyapi',
                        itemId: 'transferbyapi',
                        iconCls: 'icon-new',
                        tooltip: 'Transfer by API',
                        text: 'Transfer by API'
                    },
                    /* end  by ahmad riadi 09-03-2018 */
                    
		    {
                        xtype: 'button',
                        action: 'viewlog',
                        iconCls: 'icon-new',
                        tooltip: 'View Log',
                        text: 'View Log'
                    },
                    
                    // wulan edit 2020 03 19
		    {
                        xtype: 'button',
                        action: 'inoutwfh',
                        iconCls: 'icon-new',
                        tooltip: 'Generate In/Out Work From Home',
                        text: 'Generate In/out WFH',
                        hidden:true
                    },
                    
                    {
                        xtype: 'button',
                        action: 'invalidabsent',
                        iconCls: 'icon-unapprove',
                        tooltip: 'Invalid Absent',
                        text: 'Invalid Absent',
                        hidden:true
                    },
                    {
                        xtype: 'button',
                        action: 'cutibersama',
                        iconCls: 'icon-gear',
                        tooltip: 'Cuti Bersama',
                        text: 'Cuti Bersama'
                    },
                    // added by Michael 2021.06.30 
                    {
                        xtype: 'button',
                        action: 'cutitambahan',
                        iconCls: 'icon-gear',
                        tooltip: 'Extra Leave',
                        text: 'Extra Leave'
                    },
                    // end added by Michael 2021.06.30
                    // added by Michael 2021.07.16 
                    {
                        xtype: 'button',
                        action: 'sanksiketerlambatan',
                        iconCls: 'icon-gear',
                        tooltip: 'Sanksi Keterlambatan',
                        text: 'Sanksi Keterlambatan'
                    },
                    // end added by Michael 2021.07.16 
                    // added by Michael 2021.12.15 
                    {
                        xtype: 'button',
                        action: 'reminderabsensi',
                        iconCls: 'icon-gear',
                        tooltip: 'Reminder Absensi',
                        text: 'Reminder Absensi'
                    },
                    // end added by Michael 2021.12.15 
                 /*   {
                        xtype: 'button',
                        action: 'insert',
                        iconCls: 'icon-new',
                        tooltip: 'Insert Date',
                        text: 'Insert'
                    },*/
                    {
                        xtype: 'button',
                        action: 'processlate',
                        iconCls: 'icon-new',
                        tooltip: 'Shortage of Working Hours',
                        text: 'Proses Terlambat',
                        hidden:true
                    },
                 /*   {
                        xtype: 'button',
                        action: 'processday',
                        iconCls: 'icon-new',
                        tooltip: 'Process Day',
                        text: 'Day'
                    }, */
                    {
                        xtype: 'button',
                        action: 'manualnoted',
                        iconCls: 'icon-new',
                        tooltip: 'Manual Noted',
                        text: 'Manual Noted',
                        hidden:true
                    },
                  /*  {
                        xtype: 'button',
                        action: 'processovertime',
                        iconCls: 'icon-new',
                        tooltip: 'Process Overtime',
                        text: 'Overtime'
                    },*/
                    /*{
                        xtype: 'button',
                        action: 'processhadir',
                        iconCls: 'icon-new',
                        tooltip: 'Process Hadir',
                        text: 'Hadir'
                    },*/
                   /* {
                        xtype: 'button',
                        action: 'processovetimespc',
                        iconCls: 'icon-new',
                        tooltip: 'Process Special Overtime',
                        text: 'Ot Special'
                    }, */
                    {
                        xtype: 'button',
                        action: 'processjklt',
                        iconCls: 'icon-new',
                        tooltip: 'Process Absent Hour and Lost Time',
                        text: 'Absent & Lost Time',
                        hidden:true
                    },
                  /*  {
                        xtype: 'button',
                        action: 'processovetimespc',
                        iconCls: 'icon-new',
                        tooltip: 'Take text data',
                        text: 'Text Data'
                    }, */
                    {
                        xtype: 'button',
                        action: 'editdate',
                        iconCls: 'icon-new',
                        tooltip: 'Edit Date',
                        text: 'Edit date',
                        hidden:true
                    },
                    {
                        xtype: 'button',
                        action: 'importexcel',
                        iconCls: 'icon-new',
                        tooltip: 'Import Excel',
                        text: 'Excel',
                        hidden:true
                    },
                   /* {
                        xtype: 'button',
                        action: 'updatetran',
                        iconCls: 'icon-new',
                        tooltip: 'Update Absent Transaction',
                        text: 'Update Transaction'
                    }, */
                    {
                        xtype: 'button',
                        action: 'repairdate',
                        iconCls: 'icon-new',
                        tooltip: 'Repair Date',
                        text: 'Repair Date',
                        hidden:true
                    },
                    {
                        xtype: 'button',
                        action: 'updatetran',
                        iconCls: 'icon-new',
                        tooltip: 'Update Absent Transaction',
                        text: 'Update Transaction',
                        hidden:true
                    },
                    
                  /*  {
                        xtype: 'button',
                        action: 'massalleave',
                        iconCls: 'icon-new',
                        tooltip: 'Massal Leave',
                        text: 'Massal Leave'
                    }, */
                    {
                        xtype: 'button',
                        action: 'open',
                        iconCls: 'icon-new',
                        tooltip: 'Open Absent Transaction',
                        text: 'Open',
                        hidden:true
                    },
                  /*  {
                        xtype: 'button',
                        action: 'updatetran2',
                        iconCls: 'icon-new',
                        tooltip: 'Update Absent Transaction',
                        text: 'Update Transaction'
                    }, */
                    {
                        xtype: 'button',
                        action: 'deletetran',
                        iconCls: 'icon-new',
                        tooltip: 'Delete Absent Transaction',
                        text: 'Delete Transc',
                        hidden:true
                    },
                  /*  {
                        xtype: 'button',
                        action: 'transfermysqlaccess',
                        iconCls: 'icon-new',
                        tooltip: 'Transfer Mysql to Access',
                        text: 'Mysql > Access'
                    }, */
                  /*  {
                        xtype: 'button',
                        action: 'trasnferinternet',
                        iconCls: 'icon-new',
                        tooltip: 'Transfer from Internet',
                        text: 'Internet'
                    }, */
                    {
                        xtype: 'button',
                        action: 'fixdate',
                        iconCls: 'icon-new',
                        tooltip: 'Fix Date',
                        text: 'Fix Date',
                        hidden:true
                    },
                    
                    {
                        xtype: 'button',
                        action: 'create_hidden',
                        hidden: true,
                        itemId: 'btnNew_hidden',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Create_hidden',
                        text: me.newButtonLabel,
                        hidden:true
                    },
		
					
					
                 /*   {
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
                    } */


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