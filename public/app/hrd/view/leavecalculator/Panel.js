Ext.define('Hrd.view.leavecalculator.Panel', {
    extend: 'Hrd.library.box.view.Panel',
    alias: 'widget.leavecalculatorpanel',
    requires: ['Hrd.template.ComboBoxFields'],
    itemId: 'LeaveCalculatorPanel',
    layout: 'fit',
    autoScroll: true,
    height: '250px',
    initComponent: function() {
        var me = this;
        
        var cbf = new Hrd.template.ComboBoxFields();

        var calcugroup = Ext.create('Ext.data.Store', {
            fields: ['code', 'name'],
            data : [
                {"code":"1", "name":"1"},
                {"code":"2", "name":"2"},
                {"code":"3", "name":"3"},
                {"code":"4", "name":"4"},
                {"code":"5", "name":"5"},
                {"code":"6", "name":"6"}
            ]
        });
        
        var policy = 'Tabel jumlah cuti tahunan untuk Karyawan Tetap (PKWTT)<table border = 1 style="padding: 15px;">' + 
                '<tr><td>&nbsp; Golongan &nbsp; </td><td> &nbsp;  < 10 tahun &nbsp; </td><td> &nbsp;  10-19 tahun &nbsp; </td><td> &nbsp;  >= 20 tahun &nbsp; </td></tr>' +
                '<tr><td>&nbsp; 1-3 &nbsp; </td><td> &nbsp;  14 hari  &nbsp; </td><td> &nbsp;  15 hari  &nbsp; </td><td> &nbsp;  16 hari &nbsp; </td></tr>' +
                '<tr><td>&nbsp; 4 &nbsp; </td><td> &nbsp;  14 hari  &nbsp; </td><td> &nbsp;  16 hari  &nbsp; </td><td> &nbsp;  16 hari &nbsp; </td></tr>' +
                '<tr><td>&nbsp; 5 &nbsp; </td><td> &nbsp;  14 hari  &nbsp; </td><td> &nbsp;  16 hari  &nbsp; </td><td> &nbsp;  18 hari &nbsp; </td></tr>' +
                '<tr><td>&nbsp; 6 &nbsp; </td><td> &nbsp;  14 hari  &nbsp; </td><td> &nbsp;  16 hari  &nbsp; </td><td> &nbsp;  20 hari &nbsp; </td></tr>' +
                '</table> <br><br>' + 
                'Karyawan Kontrak (PKWT) mendapatkan cuti 12 hari tahunan setelah 1 tahun bekerja <br><br>' + 
                'Pembulatan Perhitungan <br> 0 - 0.24 = 0 <br> 0.25 - 0.74 = 0.5 <br> 0.75 - 1 = 1';
        
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    layout: 'hbox',
                    bodyPadding: 10,
                    itemId: 'leaveCalculatorFormID',
                    width: '100%',
                    autoScroll: true,
                    height: '300px',
                    defaults: {
                        xtype: 'combobox',
                        margin: '10px 0'
                    },
                    items: [
                        {
                            xtype: 'hiddenfield',
                            name: 'project_project_id'
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'project_name'
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'pt_pt_id'
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'pt_name'
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Calculator',
                            labelWidth: 100,
                            margin: '0 20px 0 0',
                            layout: 'vbox',
                            width: 550,
                            items: [
                            {
                                xtype: 'combobox',
                                name: 'employee_id',
                                fieldLabel: 'Employee',
                                queryMode: 'local',
                                width:500,
                                displayField: 'employee_name',
                                valueField: 'employee_id'
                            },
                            {
                                xtype: 'datefield',
                                fieldLabel: 'Hire Date',
                                name:'hire_date',
                                format: 'd/m/Y',
                                submitFormat: 'Y-m-d', 
                                allowBlank:false
                            },  
                            {
                                xtype: 'radiogroup',
                                fieldLabel: 'Status',
                                // Arrange radio buttons into two columns, distributed vertically
                                itemId: 'employeestatusID',
                                width: '100%',
                                layout: 'hbox',
                                defaults: {
                                    margin: '0 7 0 0'
                                },
                                items: [
                                    {boxLabel: 'Permanent', name: 'employeestatus', inputValue: "1", checked: true},
                                    {boxLabel: 'Contract', name: 'employeestatus', inputValue: "2"},
                                    ,
                                ]
                            },
                            {
                                xtype: 'combobox',
                                name: 'group_code',
                                store: calcugroup,
                                displayField: 'name',
                                valueField: 'code',
                                fieldLabel: 'Group (Golongan)', 
                                allowBlank:false
                            },
                            {
                                xtype: 'datefield',
                                fieldLabel: 'Resign Date',
                                name:'resign_date',
                                format: 'd/m/Y',
                                value:new Date(),
                                submitFormat: 'Y-m-d', 
                                allowBlank:false
                            }, 
                            {
                                xtype : 'textfield',
                                name : 'rest',
                                fieldLabel : 'Sisa Cuti Saat Ini',
                                size : 30, 
                                value : 0, 
                                allowBlank:false
                            },
                            {
                                xtype: 'button',
                                action: 'view',
                                padding: 5,
                                itemId: 'btnSearch',
                                text: 'Calculate',
                                height:50,
                                width:100
                            }, 
                            {
                                xtype : 'textfield',
                                name : 'total',
                                fieldLabel : '<b>Total Cuti*</b>',
                                size : 30,
                                readOnly:true
                            },
                            {
                                xtype : 'displayfield',
                                name : 'ket',
                                fieldLabel : '',
                                value : '*perhitungan berlaku mulai 2022'
                            },
                            //added by anas 24102023
                            {
                                xtype : 'displayfield',
                                name : 'tabledetail',
                                fieldLabel : '',
                                value : ''
                            }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Policy',
                            flex: 1,
                            layout: 'vbox',
                            margin: '0 20px 0 0',
                            items: [
                                {
                                    xtype : 'displayfield',
                                    name : 'policy',
                                    fieldLabel : '',
                                    value : policy
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }


});