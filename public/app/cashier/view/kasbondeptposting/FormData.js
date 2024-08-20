Ext.define('Cashier.view.kasbondeptposting.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.kasbondeptpostingformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 470,
    bodyBorder: true,
    bodyPadding: 10,
    uniquename: "_fdkasbondeptposting",
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    id: 'hideparam' + me.uniquename,
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    id: 'project_id' + me.uniquename,
                    name: 'project_id',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'kasbondept_id' + me.uniquename,
                    name: 'kasbondept_id',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'kasbon_id' + me.uniquename,
                    name: 'kasbon_id',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'voucher_id' + me.uniquename,
                    name: 'voucher_id',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'kasbank_id' + me.uniquename,
                    name: 'kasbank_id',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'approvename' + me.uniquename,
                    name: 'approvename',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'status' + me.uniquename,
                    name: 'status',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'projectname' + me.uniquename,
                    name: 'projectname',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'ptname',
                    name: 'ptname',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'prefixdept' + me.uniquename,
                    name: 'prefixdept',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'fixed_coa' + me.uniquename,
                    name: 'fixed_coa',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'coa_id' + me.uniquename,
                    name: 'coa_id',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'prefix_id' + me.uniquename,
                    name: 'prefix_id',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'adads' + me.uniquename,
                    name: 'cheque_id',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'other_made_by' + me.uniquename,
                    name: 'other_made_by',
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
                            xtype: 'ptusercombobox',
                            fieldLabel: 'Pt/Company',
                            itemId: 'fd_pt_id' + me.uniquename,
                            id: 'pt_id',
                            name: 'pt_id',
                            width: 350,
                            emptyText: 'Pt / Company',
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '80'
                        },
                        {
                            xtype: 'label',
                            forId: 'lblstatus' + me.uniquename,
                            text: 'Status',
                            width: 100,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'label',
                            forId: 'lblstatus',
                            text: '',
                            style: {
                                color: '#ff0000'
                            },
                            itemId: 'fd_lblstatus' + me.uniquename,
                            id: 'lblstatus__b123',
                            name: 'lblstatus',
                            width: 100,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
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
                            xtype: 'departmentcombobox',
                            fieldLabel: 'Department',
                            itemId: 'fd_department_id' + me.uniquename,
                            id: 'department_id' + me.uniquename,
                            name: 'department_id',
                            width: 350,
                            emptyText: 'Department',
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '80'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'CA Date',
                            itemId: 'fd_voucher_date' + me.uniquename,
                            id: 'voucher_date' + me.uniquename,
                            name: 'voucher_date',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 250,
                            emptyText: 'Manual Input',
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
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
                            xtype: 'employeehrdcombobox',
                            fieldLabel: 'User for cashbon',
                            itemId: 'fd_made_by' + me.uniquename,
                            id: 'made_by' + me.uniquename,
                            name: 'made_by',
                            width: 350,
                            emptyText: 'Select user for cashbon',
                            matchFieldWidth: false,
                            readOnly: true,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '80'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'CA No.',
                            itemId: 'fd_voucher_no' + me.uniquename,
                            id: 'voucher_no' + me.uniquename,
                            name: 'voucher_no',
                            emptyText: 'Auto Value',
                            width: 250,
                            readOnly: true,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
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
                            xtype: 'employeehrdcombobox',
                            fieldLabel: 'Approve By',
                            itemId: 'fd_approveby_id' + me.uniquename,
                            id: 'approveby_id' + me.uniquename,
                            name: 'approveby_id',
                            width: 350,
                            emptyText: 'Approve By',
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '80'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Cashback Date',
                            itemId: 'fd_cashbackon' + me.uniquename,
                            id: 'cashbackon' + me.uniquename,
                            name: 'cashbackon',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 250,
                            emptyText: 'Manual Input',
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            hidden:true,
                        },
                    {
                            xtype: 'datefield',
                            fieldLabel: 'Uncashback Date',
                            itemId: 'fd_uncashbackon' + me.uniquename,
                            id: 'uncashbackon' + me.uniquename,
                            name: 'uncashbackon',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 250,
                            emptyText: 'Manual Input',
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            hidden: true,
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
                            xtype: 'xmoneyfield',
                            minValue: 0,
                            itemId: 'fs_amount' + me.uniquename,
                            name: 'amount',
                            id: 'amount' + me.uniquename,
                            fieldLabel: 'Amount',
                            emptyText: 'Manual Input',
                            width: 350,
                            // Remove spinner buttons, and arrow key and mouse wheel listeners
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            readOnly: true,
                            allowBlank: false,
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maxLength: 30,
                            fieldStyle: 'background-color:#eee;background-image: none;'
                        },
                        {
                            xtype: 'splitter',
                            width: '80'
                        },
                        {
                            xtype: 'xmoneyfield',
                            fieldLabel: 'Cashback',
                            itemId: 'fd_' + me.uniquename,
                            id: 'amount_kembali' + me.uniquename,
                            name: 'amount_kembali',
                            emptyText: 'Auto Value',
                            width: 250,
                            readOnly: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
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
                            xtype: 'textareafield',
                            itemId: 'fdms_description' + me.uniquename,
                            id: 'description' + me.uniquename,
                            name: 'description',
                            fieldLabel: 'Description',
                            allowBlank: false,
                            enforceMaxLength: true,
                            grow: true,
                            width: 750,
                        },
                    ]
                },
                {
                    // Fieldset in Column 1
                    xtype: 'fieldset',
                    title: 'FOR CASHIER',
                    collapsible: false,
                    defaults: {anchor: '93%'},
                    layout: 'vbox',
                    padding: '10 0 0 10', //(top, right, bottom, left).
                    items: [
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'statusnewcombobox',
                            fieldLabel: 'Payment Type',
                            itemId: 'fd_kasbank' + me.uniquename,
                            id: 'kasbank',
                            name: 'kasbank',
                            width: 250,
                            emptyText: 'Payment Type',
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
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [
                                
                                {
                                    xtype: 'voucherprefixcomboboxNew',
                                    fieldLabel: 'Prefix',
                                    itemId: 'fd_voucherprefix_id' + me.uniquename,
                                    id: 'voucherprefix_id' + me.uniquename,
                                    name: 'voucherprefix_id',
                                    emptyText: '',
                                    width: 250,
                                    readOnly: false,
                                    allowBlank: true,
                                    enforceMaxLength: true,
                                    enableKeyEvents: true,
                                    rowdata: null,
                                    hidden:false,
                                    tpl: Ext.create('Ext.XTemplate',
                                            '<table class="x-grid-table" width="500px" >',
                                            '<tr class="x-grid-row">',
                                            '<th width="100px"><div class="x-column-header x-column-header-inner">Prefix</div></th>',
                                            '<th width="100px"><div class="x-column-header x-column-header-inner">Coa</div></th>',
                                            '<th width="100px"><div class="x-column-header x-column-header-inner">Description</div></th>',
                                            '</tr>',
                                            '<tpl for=".">',
                                            '<tr class="x-boundlist-item">',
                                            '<td ><div class="x-grid-cell x-grid-cell-inner">{prefix}</div></td>',
                                            '<td ><div class="x-grid-cell x-grid-cell-inner">{coa}</div></td>',
                                            '<td ><div class="x-grid-cell x-grid-cell-inner">{coaname}</div></td>',
                                            '</tr>',
                                            '</tpl>',
                                            '</table>'
                                            ),
                                },
                                {
                                    xtype: 'splitter',
                                    width: '10'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: '',
                                    itemId: 'fd_coa' + me.uniquename,
                                    id: 'coa' + me.uniquename,
                                    name: 'coa',
                                    emptyText: 'Auto Value',
                                    width: 134,
                                    readOnly: true,
                                    allowBlank: true,
                                    hidden:true,
                                },
                            ]
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Cashier Voucher Date',
                            itemId: 'fd_cashier_voucher_date' + me.uniquename,
                            id: 'cashier_voucher_date' + me.uniquename,
                            name: 'cashier_voucher_date',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 250,
                            emptyText: 'Manual Input',
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Claim Date',
                            itemId: 'fd_claim_date' + me.uniquename,
                            id: 'claim_date' + me.uniquename,
                            name: 'claim_date',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 250,
                            emptyText: 'Manual Input',
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                         {
                            xtype: 'datefield',
                            fieldLabel: 'Project Claim Date',
                            itemId: 'fd_project_claim_date' + me.uniquename,
                            id: 'project_claim_date' + me.uniquename,
                            name: 'project_claim_date',
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
                            xtype: 'datefield',
                            fieldLabel: 'Project Close Date',
                            itemId: 'fd_project_close_date' + me.uniquename,
                            id: 'project_close_date' + me.uniquename,
                            name: 'project_close_date',
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
                            xtype: 'datefield',
                            fieldLabel: 'Cheque Giro Date',
                            itemId: 'fd_chequegiro_date' + me.uniquename,
                            id: 'chequegiro_date' + me.uniquename,
                            name: 'chequegiro_date',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 250,
                            emptyText: 'Manual Input',
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },

                         {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            bodyBorder: false,
                            defaults: {
                                layout: 'fit'
                            },
                            items: [

                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'Cheque Giro No.',
                                        itemId: 'fd_chequegiro_no' + me.uniquename,
                                        id: 'chequegiro_no' + me.uniquename,
                                        name: 'chequegiro_no',
                                        emptyText: 'Manual Value',
                                        width: 250,
                                        readOnly: false,
                                        allowBlank: true,
                                        enforceMaxLength: true,
                                        enableKeyEvents: true,
                                        rowdata: null,
                                    },
                                    {
                                        xtype: 'button',
                                        itemId: 'btnbrowseCheque',
                                        action: 'browseCheque',
                                        name: 'chequegiro_browse',
                                        padding: 5,
                                        width: 30,
                                        height: 25,
                                        iconCls: 'icon-search',
                                        text: '',
                                        hidden: false
                                    }
                                
                            ]
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Handover Cheque /Giro',
                            itemId: 'fd_chequegiro_handover_date' + me.uniquename,
                            id: 'chequegiro_handover_date' + me.uniquename,
                            name: 'chequegiro_handover_date',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 250,
                            emptyText: 'Manual Input',
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Cash Advance No.',
                            itemId: 'fd_kasbon_voucher_no' + me.uniquename,
                            id: 'kasbon_voucher_no' + me.uniquename,
                            name: 'kasbon_voucher_no',
                            emptyText: 'Auto Value',
                            width: 250,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Voucher Dept No.',
                            itemId: 'fd_voucher_dept_no' + me.uniquename,
                            id: 'voucher_dept_no' + me.uniquename,
                            name: 'voucher_dept_no',
                            emptyText: 'Auto Value',
                            width: 250,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Cashier Voucher No.',
                            itemId: 'fd_cashier_voucher_no' + me.uniquename,
                            id: 'cashier_voucher_no' + me.uniquename,
                            name: 'cashier_voucher_no',
                            emptyText: 'Auto Value',
                            width: 250,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
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
                    items: [
                        {
                            xtype: 'tabpanel',
                            itemId: 'kasbondeptpostingtab',
                            name: 'kasbondeptpostingtab',
                            width: 750,
                            height: 200,
                            activeTab: 0,
                            defaults: {layout: 'fit'},
                            items: [
                                {
                                    title: 'DETAIL COA',
                                    xtype: 'kasbondeptpostinggriddetail',
                                    name: 'gridtabkasbondeptpostingdetail',
                                    id: 'gridtabkasbondeptpostingdetail',
                                    readOnly: false,
                                },
                                {
                                    title: 'DETAIL SUB COA',
                                    xtype: 'kasbondeptpostinggridsubdetail',
                                    name: 'gridtabkasbondeptpostingsubdetail',
                                    id: 'gridtabkasbondeptpostingsubdetail',
                                    readOnly: false,
                                },
                                 {
                                    title: 'ATTACHMENTS',
                                    xtype: 'kasbondeptpostinggridattachmentdetail',
                                    name: 'gridtabattachmentdetail',
                                    id: 'gridtabattachmentdetail',
                                    readOnly: false,
                                    //hidden: false,
                                    //width: 750,
                                    //height: 300,
                                }
                            ],
                        }
                    ]
                },
            ],
            dockedItems: me.generateDockedItem()
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
                padding: '0 0 0 0',
                layout: {
                    padding: 6,
                    type: 'hbox',
                },
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
                                        xtype: 'splitter',
                                        width: '20'
                                    },
                                    {
                                        xtype: 'xmoneyfield',
                                        anchor: '100%',
                                        itemId: 'fd_totaldetail',
                                        id: 'totaldetail' + me.uniquename,
                                        name: 'totaldetail',
                                        fieldLabel: 'Total Detail',
                                        emptyText: 'Auto Value',
                                        width: 240,
                                        value: 0,
                                        hideTrigger: true,
                                        keyNavEnabled: false,
                                        mouseWheelEnabled: false,
                                        enforceMaxLength: true,
                                        readOnly: true,
                                        allowBlank: false,
                                        enableKeyEvents: true,
                                        rowdata: null
                                    },
                                    {
                                        xtype: 'splitter',
                                        width: '20'
                                    },
                                    {
                                        xtype: 'xmoneyfield',
                                        anchor: '100%',
                                        itemId: 'fd_balance',
                                        id: 'balance' + me.uniquename,
                                        name: 'balance',
                                        fieldLabel: 'Balance',
                                        emptyText: 'Auto Value',
                                        value: 0,
                                        width: 240,
                                        hideTrigger: true,
                                        keyNavEnabled: false,
                                        mouseWheelEnabled: false,
                                        enforceMaxLength: true,
                                        readOnly: true,
                                        enableKeyEvents: true,
                                        rowdata: null},
                                ]
                            },
                            {xtype: 'tbspacer', height: 5},
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
                                        action: 'save',
                                        itemId: 'btnSave',
                                        padding: 5,
                                        width: 75,
                                        iconCls: 'icon-approve',
                                        text: 'Payment'
                                    },
                                    {
                                        xtype: 'button',
                                        action: 'savedraft',
                                        itemId: 'btnSaveDraft',
                                        padding: 5,
                                        width: 110,
                                        iconCls: 'icon-save',
                                        text: 'Save as Draft'
                                    },
//                                    {
//                                        xtype: 'button',
//                                        action: 'apply',
//                                        itemId: 'btnApply',
//                                        padding: 5,
//                                        width: 75,
//                                        iconCls: '',
//                                        text: 'Apply'
//                                    },
//                                    {
//                                        xtype: 'button',
//                                        action: 'unapply',
//                                        itemId: 'btnUnapply',
//                                        padding: 5,
//                                        width: 75,
//                                        iconCls: '',
//                                        text: 'UnApply'
//                                    },
//                                    {
//                                        xtype: 'button',
//                                        action: 'void',
//                                        itemId: 'btnVoid',
//                                        padding: 5,
//                                        width: 75,
//                                        iconCls: '',
//                                        text: 'Void'
//                                    },
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
                                    },
                                ]
                            },
                        ]
                    },
                ]
            }
        ];
        return x;
    }
});

