Ext.define('Hrd.view.overtimetransaction.Formoptionsovertimeapi', {
    alias: 'widget.overtimetransactionformoptionsovertimeapi',
    extend: 'Hrd.library.box.view.FormData',
    frame: true,
    autoScroll: true,
    requires: ['Hrd.view.overtimetransaction.Gridbrowseapiovertime'],
    uniquename: "_overtimetransactionformoptionsovertimeapi",
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
                            itemId: 'lembur_id',
                            id: 'lembur_id',
                            name: 'lembur_id',
                            fieldLabel: 'Overtime ID',
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
                        {
                            xtype: 'splitter',
                            width: '130'
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
                                    text: 'Tanggal',
                                    margin: '0 0 0 0',
                                    width: 80,
                                },
                                {
                                    xtype: 'splitter',
                                    width: '28'
                                },
                                {// di ambil dari field lembur_dari
                                    xtype: 'datefield',
                                    fieldLabel: '',
                                    itemId: 'fromdate' + me.uniquename,
                                    id: 'fromdate' + me.uniquename,
                                    name: 'fromdate',
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
                                    text: 'S/d',
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
                                    itemId: 'untildate' + me.uniquename,
                                    id: 'untildate' + me.uniquename,
                                    name: 'untildate',
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
                    ]
                },
                /*
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
                            allowBlank: false,
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
                            allowBlank: false,
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
                },*/
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
                            width: '330'
                        },
                        {
                            xtype: 'textfield',
                            name: 'comment',
                            fieldLabel: 'Comment',
                            readOnly: false,
                            width: 300
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
                            xtype: 'statusovertimecombobox',
                            fieldLabel: 'Status',
                            itemId: 'status',
                            id: 'status',
                            name: 'status',
                            emptyText: 'Select Data',
                            width: 200,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            matchFieldWidth: false,
                        },
                        {
                            xtype: 'splitter',
                            width: '130'
                        },
                        {
                            xtype: 'overtimetiypeintranetcombobox',
                            fieldLabel: 'Overtime Type',
                            itemId: 'lemburtype',
                            id: 'lemburtype',
                            name: 'lemburtype',
                            emptyText: 'Select Data',
                            width: 300,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            matchFieldWidth: false,
                        },
                    ]
                },

                {
                    xtype: 'checkedcombobox',
                    fieldLabel: 'Checked',
                    itemId: 'hrd_checked',
                    id: 'hrd_checked',
                    name: 'hrd_checked',
                    emptyText: 'Select Data',
                    width: 200,
                    allowBlank: true,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
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
                    xtype: 'label',
                    forId: 'lblntraijin',
                    text: 'Check for Process',
                },
                {
                    xtype: 'overtimetransactionGridbrowseapiovertime',
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
                        action: 'process',
                        itemId: 'btnProcess',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Process'
                    },
                    {
                        xtype: 'button',
                        action: 'delete',
                        itemId: 'btnDelete',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-delete',
                        text: 'Delete'
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