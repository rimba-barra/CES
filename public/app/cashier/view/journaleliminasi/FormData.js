Ext.define('Cashier.view.journaleliminasi.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.journaleliminasiformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    closable: false,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    deletedRows: [],
    deletedsubRows: [],
    deletedLocalstoreSubRows: [],
    editedRow: -1,
    id: 'formdatajournalID',
    deletedRowsWithoutID: 0,
    rowData: null,
    listeners: {
        beforeclose: function(win) {
            Ext.Msg.show({
                title: 'Close window?',
                message: 'Are you sure you want to close the window?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function(btn) {
                    if (btn === 'yes') {
                        win.doClose();
                    }
                }
            });
            return false;
        }
    },
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'left',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
//                {
//                    xtype: 'hiddenfield',
//                    name: 'project_project_id'
//                },
//                {
//                    xtype: 'hiddenfield',
//                    name: 'pt_pt_id'
//                },
                {
                    xtype: 'hiddenfield',
                    name: 'unit_unit_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'purchaseletter_purchaseletter_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'purchaseletter_customer_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'payment_payment_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'voucher_voucher_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'kasbank_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'cheque_cheque_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'payment_denda'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'is_directsave'
                },
                {
                    xtype: 'splitter',
                    width: '650'
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 400,

                    items: [
                        {
                           xtype:'combobox',
                           name:'journal_type',
                           fieldLabel: 'Journal Type',
                           valueField: 'journal_type',
                           queryMode:'local',
                           width:300,
                           dvalue: 'ELIMINASI',
                           store:['ELIMINASI','ELIMINASI-CF','MINORITY'],
                           autoSelect:true,
                            forceSelection: true,
                            allowBlank: false,
                               listeners: {
                                afterrender: function() {
                                   this.setValue(this.dvalue);    
                                }
                            }
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 400,

                    items: [
                        {
                                xtype: 'combobox',
                                name: 'multiproject_consolidation_id',
                                fieldLabel: 'Group',
                                displayField: 'group_consolidation',
                                valueField: 'consolidation_id',
                                id: 'fs_consolidation_id',
                                itemId: 'fs_consolidation_id',
                                forceSelection: true,
                                allowBlank: true,
                                readOnly: false,
                                enforceMaxLength: true,
                                queryMode: 'local',
                                rowdata: null,
                                matchFieldWidth: false,
                                width: 300
                        },
                        {
                            xtype: 'splitter',
                            id:'splitter1',
                            width: '20'
                        },
                        {
                                xtype: 'combobox',
                                name: 'pt_pt_id',
                                fieldLabel: 'Coa Reff',
                                displayField: 'name',
                                valueField: 'pt_id',
                                id: 'ptjournal',
                                itemId: 'ptjournal',
                                forceSelection: true,
                                allowBlank: false,
                                readOnly: false,
                                enforceMaxLength: true,
                                queryMode: 'local',
                                rowdata: null,
                                matchFieldWidth: false,
                                width: 400,
                                tpl: Ext.create('Ext.XTemplate',
                                        '<table class="x-grid-table" width="500px">',
                                        '<tr class="x-grid-row">',
                                        '<th width="40px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                                        '<th width="200px"><div class="x-column-header x-column-header-inner">Company</div></th>',
                                        '<th width="200px"><div class="x-column-header x-column-header-inner">Project</div></th>',
                                        '</tr>',
                                        '<tpl for=".">',
                                        '<tr class="x-boundlist-item">',
                                        '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
                                        '<td ><div class="x-grid-cell x-grid-cell-inner">{name}</div></td>',
                                        '<td ><div class="x-grid-cell x-grid-cell-inner">{project_name}</div></td>',
                                        '</tr>',
                                        '</tpl>',
                                        '</table>'
                                        ),
                            },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'combobox',
                            name: 'project_project_id',
                            fieldLabel: 'Project',
                            displayField: 'project_name',
                            valueField: 'project_project_id',
                            width: '300',
                            queryMode: 'local',
                            allowBlank: false,
                            hidden: true
                            //readOnly: true,
                            //fieldStyle: 'background-color:#eee;background-image: none;'
                        },
                    ]
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Payment Date',
                    name: 'payment_date',
                    format: 'd-m-Y',
                    submitFormat: 'Y-m-d',
                    width: 250,
                    emptyText: 'Manual Input',
                    allowBlank: true,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null,
                    hidden: true
                },
                 {
                    xtype: 'xmoneyfield',
                    name: 'sum_tagihan',
                    width: 112,
                    hidden: true,
                    emptyText: 'SUM PAY',
                    hideTrigger: true,
                    keyNavEnabled: false,
                    mouseWheelEnabled: false,
                    readOnly: true,
                    allowBlank: true,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 50, flex: 3, id:'sum_tagihan',
                    fieldLabel: 'Total Tagihan',
                    fieldStyle: 'margin-left:-30px'
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 300,
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'journalID',
                            fieldLabel: 'Journal El. ID',
                            enforceMaxLength: true,
                            maskRe: /[^\`\"\']/,
                            anchor: '-5',
                            width: '300',
                            readOnly: true,
                            allowBlank: false,
                            fieldStyle: 'background-color:#eee;background-image: none;'

                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Journal Date',
                            name: 'journal_date',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 300,
                            emptyText: 'Manual Input',
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 300,
                    items: [
                        {
                            xtype: 'combobox',
                            name: 'department_department_id',
                            fieldLabel: 'Department',
                            displayField: 'name',
                            valueField: 'department_id',
                            hidden: true,
                            width: '300',
                            allowBlank: false,
                            queryMode: 'local',
                            tpl: Ext.create('Ext.XTemplate',
                                    '<table class="x-grid-table" width="300px" >',
                                    '<tr class="x-grid-row">',
                                    '<th width="15px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                                    '<th width="80px"><div class="x-column-header x-column-header-inner">Department</div></th>',
                                    '</tr>',
                                    '<tpl for=".">',
                                    '<tr class="x-boundlist-item">',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{name}</div></td>',
                                    '</tr>',
                                    '</tpl>',
                                    '</table>'
                                    ),
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 300,
                    items: [
                        {
                            xtype: 'prefixcombobox',
                            fieldLabel: 'Prefix',
                            emptyText: 'Please Select',
                            name: 'prefix_prefix_id',
                            width: '300',
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'textfield',
                            name: 'journal_no',
                            fieldLabel: 'Journal No',
                            enforceMaxLength: true,
                            maskRe: /[^\`\"\']/,
                            anchor: '-5',
                            width: '300',
                            readOnly: false,
                            allowBlank: false
                        },

                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'checkboxfield',
                            name : 'is_memorialcashflow',
                            inputValue: '1',
                            align:'left',
                            labelWidth:120,
                            uncheckedValue: '0',
                            fieldLabel: 'Memorial Cashflow',
                            checked: false
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 300,
                    items: [
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Date',
                            itemId: 'fd_accept_date',
                            id: 'accept_date_1111',
                            name: 'kasbank_date',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 300,
                            emptyText: 'Auto Value',
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            readOnly: true,
                            hidden: true,
                            fieldStyle: 'margin-right:50px;background-color:#eee;background-image: none;'
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'textfield',
                            name: 'refferal_id',
                            fieldLabel: 'Reff',
                            enforceMaxLength: true,
                            maskRe: /[^\`\"\']/,
                            anchor: '-5',
                            width: '300',
                            readOnly: false,
                            allowBlank: true
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 300,
                    items: [
                        {
                            xtype: 'xmoneyfield',
                            name: 'amount',
                            fieldLabel: 'Total',
                            readOnly: true,
                            anchor: '-5',
                            width: '250',
                            allowBlank: true,
                            hidden: true,
                            fieldStyle: 'background-color:#eee;background-image: none;'

                        },
                    ]
                },
                {
                    xtype: 'textareafield',
                    fieldLabel: 'Notes (Catatan)',
                    anchor: '-5',
                    name: 'description',
                    flex: 1,
                    height: 50
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'hbox'
                    },
                    items: [
                        {
                            xtype: 'tabpanel',
                            itemId: 'panelDetailCoa',
                            name: 'panel',
                            activeTab: 0,
                            region: 'center',
                            layout: 'hbox',
                            flex: 1,
                            id:'TabVoucherId',
                            items: [
                                {
                                    xtype: 'detailjournaleliminasigrid',
                                    closable: false,
                                    name: 'detailjournalgrid',
                                    title: 'Detail Journal ',
                                    flex: 1
                                },
                                {
                                    xtype: 'journaleliminasiardetailgrid',
                                    closable: false,
                                    name: 'journalardetail',
                                    title: ' Account Receivable ',
                                    itemId: 'tabAr',
                                    flex: 1
                                }
                            ]
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 300,
                    items: [
                        {
                            xtype: 'splitter',
                            flex: 2
                        },
                        {
                            xtype: 'xmoneyfield',
                            name: 'sum_total_detail',
                            width: 50,
                            hidden: false,
                            emptyText: 'DEBET ',
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            readOnly: true,
                            allowBlank: true,
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maxLength: 50, flex: 1, id:'sum_total_detail',
                            fieldLabel: 'Total Debet',
                            fieldStyle: 'margin-left:-30px'
                        },
                        {
                            xtype: 'xmoneyfield',
                            name: 'sum_totalc_detail',
                            width: 50,
                            hidden: false,
                            emptyText: 'CREDIT ',
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            readOnly: true,
                            allowBlank: true,
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maxLength: 50, flex: 1, id:'sum_totalc_detail',
                            fieldLabel: 'Total Kredit',
                            fieldStyle: 'margin-left:-30px'
                        },
                    ]
                },
            ],
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
                        action: 'savenew',
                        itemId: 'btnSaveNew',
                        padding: 5,
                        width: 105,
                        iconCls: 'icon-save', text: 'Save & New'
                    },
                    {
                        xtype: 'button',
                        action: 'saveprint',
                        itemId: 'btnSavePrint',
                        padding: 5,
                        width: 105,
                        iconCls: 'icon-print',
                        text: 'Save & Print'
                    },
                    {
                        xtype: 'button',
                        action: 'save',
                        itemId: 'btnSave',
                        padding: 5,
                        width: 75, iconCls: 'icon-save',
                        text: 'Save'
                    },
                    {
                        xtype: 'button',
                        action: 'directsave',
                        itemId: 'btnDirectSave',
                        padding: 5,
                        width: 75, iconCls: 'icon-save',
                        text: 'SAVE'
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

