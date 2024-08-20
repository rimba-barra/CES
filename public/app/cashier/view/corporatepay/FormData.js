Ext.define('Cashier.view.corporatepay.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.corporatepayformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    closable: false,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    deletedRows: [],
    deletedOtherPaymentRows: [],
    deletedArPaymentRows: [],
    deletedsubRows: [],
    deletedLocalstoreSubRows: [],
    editedRow: -1,
    deletedRowsWithoutID: 0,
    id: 'formdatacorporatepayID',
    itemId:'formdatacorporatepayID',
    rowData: null,
    width: 1000,
    height: 650,
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
                {
                    xtype: 'hiddenfield',
                    name: 'corporatepay_id'
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 250,
                    items: [
                        {
                            xtype: 'combobox',
                            name: 'project_project_id',
                            fieldLabel: 'Project',
                            displayField: 'project_name',
                            valueField: 'project_project_id',
                            width: '150',
                            queryMode: 'local',
                            allowBlank: false,
                            msgTarget: "side",
                            enforceMaxLength: true,
                            blankText: 'This should not be blank!',
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
                    width: 250,
                    items: [
                        {
                            xtype: 'combobox',
                            name: 'pt_pt_id',
                            fieldLabel: 'Company',
                            displayField: 'name',
                            valueField: 'pt_id',
                            width: '300',
                            forceSelection: true,
                            allowBlank: false,
                            enforceMaxLength: true,
                                    //readOnly: true,
                                    //fieldStyle: 'background-color:#eee;background-image: none;'
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
                    width: 250,
                    items: [
                        {
                            xtype: 'datefield',
                            fieldLabel: 'File Date',
                            itemId: 'fd_file_date',
                            id: 'filedate',
                            name: 'filedate',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 300,
                            emptyText: 'Auto Value',
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            readOnly: true,
                            fieldStyle: 'margin-right:50px;background-color:#eee;background-image: none;'

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
                            xtype: 'textfield',
                            name: 'filename',
                            fieldLabel: 'File Name',
                            width: '300',
                            readOnly: true,
                            allowBlank: true,
                            msgTarget: "side",
                            emptyText: 'Auto Named',
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
                            fieldLabel: 'Tanggal Transfer',
                            name: 'transferdate',
                            id: 'fd_transferdate',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 250,
                            emptyText: 'Manual Input',
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            hidden: false,
                            hideTrigger: false,
                            onDownArrow: Ext.emptyFn,
                            listeners: {
                                render: function () {
                                    var picker = this.getPicker();
                                    picker.on("select", function () {
                                        this.hide();
                                    });
                                    //  this.triggerCell.hide();
                                    this.inputCell.on("click", function () {
                                        if (picker.hidden)
                                            picker.show();
                                        else
                                            picker.hide();
                                    });
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
                    width: 250,
                    items: [
                        
                        {
                            xtype: 'combobox',
                            name: 'debitsource_id',
                            fieldLabel: 'Rekening Sumber Debet',
                            displayField: 'debitsource',
                            valueField: 'debitsource_id',
                            width: '300',
                            allowBlank: false,
                            forceSelection: true,
                            msgTarget: "side",
                            blankText: 'This should not be blank!',
                            queryMode: 'local',
                            tpl: Ext.create('Ext.XTemplate',
                                    '<table class="x-grid-table" width="300px" >',
                                    '<tr class="x-grid-row">',
                                    '<th width="150px"><div class="x-column-header x-column-header-inner">Debitsource</div></th>',
                                    '<th width="150px"><div class="x-column-header x-column-header-inner">Bank Name</div></th>',
                                    '<th width="150px"><div class="x-column-header x-column-header-inner">Account No</div></th>',
                                    '</tr>',
                                    '<tpl for=".">',
                                    '<tr class="x-boundlist-item">',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{debitsource}</div></td>',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{bankname}</div></td>',
                                    '<td ><div class="x-grid-cell x-grid-cell-inner">{acc_no}</div></td>',
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
                    bodyBorder: false,
                    defaults: {
                        layout: 'hbox'
                    },
                    items: [
                        {
                            xtype: 'tabpanel',
                            itemId: 'panelDetailVoucher',
                            name: 'panel',
                            activeTab: 0,
                            region: 'center',
                            layout: 'hbox',
                            flex: 1,
                            id: 'TabVoucherId',
                            items: [
                                {
                                    xtype: 'listvouchergrid',
                                    closable: false,
                                    name: 'listvouchergrid',
                                    title: 'List Voucher ',
                                    flex: 1,
                                    itemId: 'tabDetailVoucher',
                                },
                            ]
                        },
                    ]
                },
                
            ],
        });

        me.callParent(arguments);
    },
    generateDockedItem: function () {
        var me = this;
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
                        itemId: 'btnSavenew',
                        padding: 5,
                        width: 75, iconCls: 'icon-save',
                        text: 'Save',
                    },
                    {
                        xtype: 'splitter',
                        width: '5'
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

