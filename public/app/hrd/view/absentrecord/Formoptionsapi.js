Ext.define('Hrd.view.absentrecord.Formoptionsapi', {
    alias: 'widget.absentrecordformoptionsapi',
    extend: 'Hrd.library.box.view.FormData',
    frame: true,
    autoScroll: true,
    requires: ['Hrd.view.absentrecord.Gridbrowseapi'],
    uniquename: "_absentrecordformoptionsapi",
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
                            itemId: 'transaction_id',
                            id: 'transaction_id',
                            name: 'transaction_id',
                            fieldLabel: 'Transaction ID',
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
                                    text: 'Transaction Date',
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
                            xtype: 'fortransactioncombobox',
                            fieldLabel: 'For Transaction',
                            itemId: 'for_transaction',
                            id: 'for_transaction',
                            name: 'for_transaction',
                            emptyText: 'Select Data',
                            width: 300,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                        },
                        {
                            xtype: 'splitter',
                            width: '30'
                        },
                        {
                             xtype: 'checkedcombobox',
                             fieldLabel: 'HRD Checked',
                             itemId: 'hrd_checked',
                             id: 'hrd_checked',
                             name: 'hrd_checked',
                             emptyText: 'Select Data',
                             width: 200,
                             allowBlank: true,
                             enforceMaxLength: true,
                             enableKeyEvents: true,
                         }
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
                            itemId: 'fd_is_process' + me.uniquename,
                            name: 'is_process',
                            boxLabel: 'Status HRD Process',
                            padding: '0 0 0 0',
                            margin: '0 0 10 0',
                            boxLabelCls: 'x-form-cb-label small',
                            inputValue: '1',
                            uncheckedValue: '0',
                            checked: false
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
                    xtype: 'absentrecordgridbrowseapi',
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