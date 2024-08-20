Ext.define('Hrd.view.absentrecord.Formoptionscuti', {
    alias: 'widget.absentrecordformoptionscuti',
    extend: 'Hrd.library.box.view.FormData',
    frame: true,
    autoScroll: true,
    requires: ['Hrd.view.absentrecord.Gridbrowseintranetcuti'],
    uniquename: "_absentrecordformoptionscuti",
    deletedData: {},
    initComponent: function () {
        var me = this;
        var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {},
            items: [
                {
                    xtype: 'fieldcontainer',
                    layout: 'vbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
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
                                    itemId: 'cuti_id',
                                    id: 'cuti_id',
                                    name: 'cuti_id',
                                    fieldLabel: 'Cuti ID',
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
                                            text: 'Approve Date',
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
                                            itemId: 'fd_approvefrom' + me.uniquename,
                                            id: 'approvefrom' + me.uniquename,
                                            name: 'approvefrom',
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
                                            itemId: 'fd_approveuntil' + me.uniquename,
                                            id: 'approveuntil' + me.uniquename,
                                            name: 'approveuntil',
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
                                    name: 'absenttype_id',
                                    fieldLabel: 'Tipe Cuti',
                                    width: 300,
                                    displayField: 'absenttype',
                                    valueField: 'absenttype_id',
                                    action: 'resetdetail',
                                    emptyText: 'Select Data',
                                    readOnly: false,
                                    allowBlank: false,
                                    matchFieldWidth: false,
                                    typeAhead: true,
                                    queryMode: 'local',
                                    tpl: Ext.create('Ext.XTemplate',
                                            '<table class="x-grid-table" width="500px" >',
                                            '<tr class="x-grid-row">',
                                            '<th width="100px"><div class="x-column-header x-column-header-inner">Tipe</div></th>',
                                            '</tr>',
                                            '<tpl for=".">',
                                            '<tr class="x-boundlist-item">',
                                            '<td ><div class="x-grid-cell x-grid-cell-inner">{absenttype}</div></td>',
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
                                    xtype: 'textfield',
                                    name: 'comment',
                                    fieldLabel: 'Comment',
                                    readOnly: false,
                                    width: 300
                                },
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
                                    xtype: 'splitter',
                                    width: '130'
                                },
                                {
                                     xtype: 'combobox',
                                     fieldLabel: 'Status Approval',
                                     itemId: 'status',
                                     id: 'status',
                                     name: 'status',
                                     emptyText: 'Select Data',
                                     width: 200,
                                     allowBlank: true,
                                     enforceMaxLength: true,
                                     enableKeyEvents: true,
                                     value:'APPROVE',
                                     store:['APPROVE','SUBMIT','REJECT'],
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
                    forId: 'lblntracuti',
                    text: 'Check for Process',
                },
                {
                    xtype: 'absentrecordgridbrowseintranetcuti',
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