Ext.define('Hrd.view.absentrecord.FormReminderAbsensi', {
    alias: 'widget.absentrecordformreminderabsensi',
    extend: 'Hrd.library.box.view.FormData',
    frame: true,
    autoScroll: true,
    requires: ['Hrd.view.absentrecord.Gridreminderabsensi'],
    uniquename: "_absentrecordformreminderabsensi",
    deletedData: {},
    initComponent: function () {
        var me = this;
        var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {},
            items: [
                {
                    // Fieldset in Column 
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'label',
                            forId: 'labelto',
                            text: 'Date',
                            margin: '0 0 0 0',
                            width: 79,
                        },
                        {
                            xtype: 'splitter',
                            width: '28'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: '',
                            itemId: 'fd_fromdate' + me.uniquename,
                            id: 'fromdate' + me.uniquename,
                            name: 'fromdate',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            emptyText: 'From Date',
                            width: 190,
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '35'
                        },
                        {
                            xtype: 'label',
                            forId: 'labelto',
                            text: 's/d',
                            margin: '0 0 0 0',
                            width: 40,
                        },
                        {
                            xtype: 'splitter',
                            width: '65'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: '',
                            itemId: 'fd_untildate' + me.uniquename,
                            id: 'untildate' + me.uniquename,
                            name: 'untildate',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            emptyText: 'Until Date',
                            width: 190,
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        // {
                        //     xtype: 'splitter',
                        //     width: '10'
                        // },
                        // {
                        //     xtype: 'button',
                        //     action: 'getdata',
                        //     itemId: 'btngetData',
                        //     padding: 4,
                        //     width: 75,
                        //     iconCls: '',
                        //     text: 'Get Data'
                        // },
                        // {
                        //     xtype: 'splitter',
                        //     width: '10'
                        // },
                        // {
                        //     xtype: 'button',
                        //     action: 'cleardata',
                        //     itemId: 'btnCleardata',
                        //     padding: 4,
                        //     width: 75,
                        //     iconCls: '',
                        //     text: 'Clear Data'
                        // },
                        {
                            xtype: 'tbfill'
                        }
                    ]
                },
                {
                            xtype: 'splitter',
                            width: '10'
                },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    name: 'employee_id',
                                    fieldLabel: 'Employee Name',
                                    width: 300,
                                    displayField: 'employee_name',
                                    valueField: 'employee_id',
                                    action: 'resetdetail',
                                    readOnly: false,
                                    emptyText: 'Select Data',
                                    // allowBlank: false,
                                    matchFieldWidth: false,
                                    typeAhead: true,
                                    queryMode: 'local',
                                    tpl: Ext.create('Ext.XTemplate',
                                            '<table class="x-grid-table" width="500px" >',
                                            '<tr class="x-grid-row">',
                                            '<th width="100px"><div class="x-column-header x-column-header-inner">NIK</div></th>',
                                            '<th width="200px"><div class="x-column-header x-column-header-inner">NAMA</div></th>',
                                            '</tr>',
                                            '<tpl for=".">',
                                            '<tr class="x-boundlist-item">',
                                            '<td ><div class="x-grid-cell x-grid-cell-inner">{employee_nik}</div></td>',
                                            '<td><div class="x-grid-cell x-grid-cell-inner">{employee_name}</div></td>',
                                            '</tr>',
                                            '</tpl>',
                                            '</table>'
                                            ),
                                },
                                {
                                    xtype: 'splitter',
                                    width: '30'
                                },
                                {
                                    xtype: 'combobox',
                                    name: 'department_id',
                                    fieldLabel: 'Department',
                                    width: 300,
                                    displayField: 'department',
                                    valueField: 'department_id',
                                    action: 'resetdetail',
                                    readOnly: false,
                                    // allowBlank: false,
                                    emptyText: 'Select Data',
                                    matchFieldWidth: false,
                                    typeAhead: true,
                                    queryMode: 'local',
                                    tpl: Ext.create('Ext.XTemplate',
                                            '<table class="x-grid-table" width="500px" >',
                                            '<tr class="x-grid-row">',
                                            '<th width="100px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                                            '<th width="200px"><div class="x-column-header x-column-header-inner">Name</div></th>',
                                            '</tr>',
                                            '<tpl for=".">',
                                            '<tr class="x-boundlist-item">',
                                            '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
                                            '<td><div class="x-grid-cell x-grid-cell-inner">{department}</div></td>',
                                            '</tr>',
                                            '</tpl>',
                                            '</table>'
                                            ),
                                },
                            ]
                        },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [


                        {
                            xtype: 'button',
                            action: 'getdata',
                            itemId: 'btngetData',
                            padding: 4,
                            width: 75,
                            iconCls: '',
                            text: 'Get Data'
                        },
                         {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'button',
                            action: 'cleardata',
                            itemId: 'btnCleardata',
                            padding: 4,
                            width: 75,
                            iconCls: '',
                            text: 'Clear Data'
                        },
                    ]
                },
                {
                    xtype: 'absentrecordgridreminderabsensi',
                    height: 300,
                    style: 'padding: 10 0 10 0'
                }
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function () {
        var x = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                layout: {
                    padding: 6,
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'button',
                        action: 'process_sendemailciputra',
                        itemId: 'btnSendemailcip',
                        padding: 5,
                        width: 200,
                        iconCls: 'icon-save',
                        text: 'Send Reminder to Email Ciputra'
                    },
                    {
                        xtype: 'button',
                        action: 'process_sendemailgeneral',
                        itemId: 'btnSendemail',
                        padding: 5,
                        width: 150,
                        iconCls: 'icon-save',
                        text: 'Send Reminder to Email'
                    },
                    {
                        xtype:'tbfill'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Close',
                        handler: function () {
                            this.up('window').close();
                        }
                    }

                ]
            }
        ];
        return x;
    },
});