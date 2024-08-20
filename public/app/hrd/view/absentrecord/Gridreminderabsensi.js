Ext.define('Hrd.view.absentrecord.Gridreminderabsensi', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.absentrecordgridreminderabsensi',
    storeConfig: {
        id: 'absentrecordGridreminderabsensi',
        idProperty: 'fingerprintprocess_id',
        extraParams: {}
    },
    bindPrefixName: 'Absentrecord',
    newButtonLabel: 'Add',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            defaults: {
                xtype: 'gridcolumn'
            },
            viewConfig: {},
            selModel: Ext.create('Ext.selection.CheckboxModel', {}),
            columns: [
                 {
                    xtype: 'rownumberer',
                    text: 'No',
                    width: 35,
                    align: 'right',
                },
                {
                    dataIndex: 'employee_nik',
                    text: 'NIK',
                    width: 65,
                    name: 'employee_nik',
                    align: 'left',
                    sortable: true
                },
                {
                    dataIndex: 'employee_name',
                    text: 'Name',
                    align: 'left',
                    width: 100,
                    name: 'employee_name',
                    sortable: true
                },
                {
                    dataIndex: 'department_code',
                    text: 'Department',
                    align: 'left',
                    width: 80,
                    name: 'department_code',
                    sortable: true
                },
                {
                    dataIndex: 'date',
                    text: 'Date',
                    width: 90,
                    name: 'date',
                    // align: 'center',
                    sortable: true,
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    dataIndex: 'shifttype_code',
                    text: 'Shift Code',
                    width: 80,
                    name: 'shifttype_code',
                    sortable: true
                },
                {
                    dataIndex: 'shifttype_timein',
                    text: 'Shift In',
                    width: 80,
                    name: 'shifttype_timein',
                    sortable: true
                },
                {
                    dataIndex: 'shifttype_timeout',
                    text: 'Shift Out',
                    width: 80,
                    name: 'shifttype_timeout',
                    sortable: true
                },
                {
                    dataIndex: 'time_in',
                    text: 'Time In',
                    width: 80,
                    name: 'time_in',
                    sortable: true
                },
                {
                    dataIndex: 'time_out',
                    text: 'Time Out',
                    width: 80,
                    name: 'time_out',
                    sortable: true
                },
                {
                    dataIndex: 'email_ciputra',
                    text: 'Email Ciputra',
                    width: 120,
                    name: 'email_ciputra',
                    sortable: true
                },
                {
                    dataIndex: 'email',
                    text: 'Email',
                    width: 120,
                    name: 'email',
                    sortable: true
                },
                {
                    dataIndex: 'send_email',
                    text: 'Send Email',
                    width: 75,
                    name: 'send_email',
                    sortable: true,
                    align: 'center',
                    renderer: function(value){
                        if(parseInt(value) == 1){
                            return '&#10003;';
                        } else {
                            return ''
                        }
                    }
                },
                {
                    dataIndex: 'reminder_date',
                    text: 'Reminder',
                    width: 120,
                    name: 'reminder_date',
                    sortable: true,
                    renderer: Ext.util.Format.dateRenderer('d-m-Y H:i:s')
                },
            ]
        });

        me.callParent(arguments);
    },
    
});