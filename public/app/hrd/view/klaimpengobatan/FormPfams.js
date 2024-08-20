Ext.define('Hrd.view.klaimpengobatan.FormPfams', {
    alias: 'widget.klaimpengobatanformpfams',
    extend: 'Hrd.library.box.view.FormData',
    frame: true,
    autoScroll: true,
    requires: ['Hrd.view.klaimpengobatan.GridPfams'],
    uniquename: "_klaimpengobatanformpfams",
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
                                    text: 'Tanggal Klaim',
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
                                    itemId: 'fromdateklaim' + me.uniquename,
                                    id: 'fromdateklaim' + me.uniquename,
                                    name: 'fromdateklaim',
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    emptyText: 'From Date',
                                    width: 100,
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
                                    itemId: 'untildateklaim' + me.uniquename,
                                    id: 'untildateklaim' + me.uniquename,
                                    name: 'untildateklaim',
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    emptyText: 'Until Date',
                                    width: 100,
                                    readOnly: false,
                                    allowBlank: false,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null
                                },
                            ]
                        },
                        {
                            xtype: 'splitter',
                            width: '50'
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
                                    text: 'Tanggal Kwitansi',
                                    margin: '0 0 0 0',
                                    width: 100,
                                },
                                {
                                    xtype: 'splitter',
                                    width: '28'
                                },
                                    {
                                    xtype: 'datefield',
                                    fieldLabel: '',
                                    itemId: 'fromdatekwitansi' + me.uniquename,
                                    id: 'fromdatekwitansi' + me.uniquename,
                                    name: 'fromdatekwitansi',
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    emptyText: 'From Date',
                                    width: 100,
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
                                    itemId: 'untildatekwitansi' + me.uniquename,
                                    id: 'untildatekwitansi' + me.uniquename,
                                    name: 'untildatekwitansi',
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d',
                                    emptyText: 'Until Date',
                                    width: 100,
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
                            xtype: 'checkedcombobox',
                            fieldLabel: 'Process to FAMS',
                            itemId: 'fams_process',
                            id: 'fams_process',
                            name: 'fams_process',
                            emptyText: 'Select Data',
                            width: 200,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                        },
                    ]
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Status',
                    itemId: 'fams_status',
                    id: 'fams_status',
                    name: 'fams_status',
                    width: 200,
                    store : new Ext.data.SimpleStore({
                    // data : [['PAID', 'PAID'], ['PROCESS', 'PROCESS'], ['OPEN', 'OPEN'], ['DELETED', 'DELETED']],
                    //     fields : ['value', 'text']
                    // }),
                    data : [['PAID', 'PAID'], ['PROCESS', 'PROCESS'], ['OPEN', 'OPEN']],
                        fields : ['value', 'text']
                    }),
                    valueField : 'value',
                    displayField : 'text',
                    emptyText: 'Select Data',
                    allowBlank: true,
                    value:'OPEN',
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
                    xtype: 'klaimpengobatangridpfams',
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
                        iconCls: 'icon-cancel',
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