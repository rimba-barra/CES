Ext.define('Hrd.view.absentrecord.Formoptionstukeroff', {
    alias: 'widget.absentrecordformoptionstukeroff',
    extend: 'Hrd.library.box.view.FormData',
    frame: true,
    autoScroll: true,
    requires: ['Hrd.view.absentrecord.Gridbrowsetukeroff'],
    uniquename: "_absentrecordformoptionstukeroff",
    deletedData: {},
    initComponent: function () {
        var me = this;
        var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {},
            items: [
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
                            xtype: 'textfield',
                            anchor: '100%',
                            itemId: 'transaksi_id_client',
                            id: 'transaksi_id_client',
                            name: 'transaksi_id_client',
                            fieldLabel: 'Transaksi id client',
                            emptyText: 'Manual Input',
                            width: 200,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: true,
                            readOnly: false,
                            allowBlank: true,
                            enableKeyEvents: true,
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
                            xtype: 'combobox',
                            name: 'employee_id',
                            fieldLabel: 'Karyawan',
                            width: 300,
                            displayField: 'employee_name',
                            valueField: 'employee_id',
                            action: 'resetdetail',
                            readOnly: false,
                            emptyText: 'Select Data',
                            allowBlank: true,
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
                            allowBlank: true,
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
                    // Fieldset in Column 2
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
                            text: 'Dari Pengajuan',
                            margin: '0 0 0 0',
                            width: 80,
                        },
                        {
                            xtype: 'splitter',
                            width: '28'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: '',
                            itemId: 'daritanggal_pengajuan' + me.uniquename,
                            id: 'daritanggal_pengajuan' + me.uniquename,
                            name: 'daritanggal_pengajuan',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            emptyText: 'From Date',
                            width: 150,
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'label',
                            forId: 'labelto',
                            text: 's/d',
                            margin: '0 0 0 0',
                            width: 30,
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: '',
                            itemId: 'sampaitanggal_pengajuan' + me.uniquename,
                            id: 'sampaitanggal_pengajuan' + me.uniquename,
                            name: 'sampaitanggal_pengajuan',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            emptyText: 'Until Date',
                            width: 150,
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                    ]
                },
                {
                    // Fieldset in Column 2
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
                            text: 'Untuk Pengajuan',
                            margin: '0 0 0 0',
                            width: 80,
                        },
                        {
                            xtype: 'splitter',
                            width: '28'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: '',
                            itemId: 'daritanggal_perubahan' + me.uniquename,
                            id: 'daritanggal_perubahan' + me.uniquename,
                            name: 'daritanggal_perubahan',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            emptyText: 'From Date',
                            width: 150,
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'label',
                            forId: 'labelto',
                            text: 's/d',
                            margin: '0 0 0 0',
                            width: 30,
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: '',
                            itemId: 'sampaitanggal_perubahan' + me.uniquename,
                            id: 'sampaitanggal_perubahan' + me.uniquename,
                            name: 'sampaitanggal_perubahan',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            emptyText: 'Until Date',
                            width: 150,
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                    ]
                },
                {
                    // Fieldset in Column 1
                    xtype: 'fieldset',
                    title: 'Status',
                    collapsible: false,
                    defaults: {anchor: '100%'},
                    layout: 'hbox',
                    padding: '5 5 5 5', //(top, right, bottom, left).
                    items: [
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            itemId: 'fd_is_approve' + me.uniquename,
                            name: 'is_approve',
                            boxLabel: 'Status Approve',
                            padding: '0 0 0 0',
                            margin: '0 0 10 0',
                            boxLabelCls: 'x-form-cb-label small',
                            inputValue: '1',
                            uncheckedValue: '0',
                            checked: true
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            itemId: 'fd_is_canceled' + me.uniquename,
                            name: 'is_canceled',
                            boxLabel: 'Status Cancel',
                            padding: '0 0 0 0',
                            margin: '0 0 10 0',
                            boxLabelCls: 'x-form-cb-label small',
                            inputValue: '1',
                            uncheckedValue: '0',
                            checked: false
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            itemId: 'fd_is_fullday' + me.uniquename,
                            name: 'is_fullday',
                            boxLabel: 'Status Fullday',
                            padding: '0 0 0 0',
                            margin: '0 0 10 0',
                            boxLabelCls: 'x-form-cb-label small',
                            inputValue: '1',
                            uncheckedValue: '0',
                            checked: true
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            itemId: 'fd_is_process' + me.uniquename,
                            name: 'is_process',
                            boxLabel: 'Status HRD Process',
                            padding: '0 0 0 0',
                            margin: '0 0 10 0',
                            boxLabelCls: 'x-form-cb-label small',
                            inputValue: '1',
                            uncheckedValue: '0',
                            checked: false
                        }
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
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'button',
                            action: 'getdata',
                            itemId: 'btngetData',
                            padding: 4,
                            width: 75,
                            iconCls: '',
                            text: 'Search'
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
                    xtype: 'label',
                    forId: 'lblntracuti',
                    text: 'Check for Process',
                },
                {
                    xtype: 'absentrecordgridbrowsetukeroff',
                    height: 250,
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
                        action: 'process',
                        itemId: 'btnProcess',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Process'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Cancel',
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