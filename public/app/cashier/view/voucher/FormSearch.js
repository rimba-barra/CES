Ext.define('Cashier.view.voucher.FormSearch', {
    extend       : 'Cashier.library.template.view.FormSearch',
    alias        : 'widget.voucherformsearch',
    id           : 'voucherformsearchID',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items   : [
  //                {
  //                    xtype: 'hiddenfield',
  //                    name: 'status',
  //                    value: 'all'
  //                },
  //                {
  //                    xtype: 'hiddenfield',
  //                    name: 'project_id'
  //                },
                {
                    xtype           : 'combobox',
                    name            : 'project_id',
                    fieldLabel      : 'Project',
                    displayField    : 'project_name',
                    valueField      : 'project_project_id',
                    width           : '300',
                    queryMode       : 'local',
                    allowBlank      : false,
                    msgTarget       : "side",
                    enforceMaxLength: true,
                    blankText       : 'This should not be blank!',
                      //readOnly: true,
                      //fieldStyle: 'background-color:#eee;background-image: none;'
                },
                {
                    xtype           : 'combobox',
                    name            : 'pt_id',
                    fieldLabel      : 'Company',
                    displayField    : 'name',
                    valueField      : 'pt_id',
                    width           : 250,
                    allowBlank      : false,
                    readOnly        : false,
                    enforceMaxLength: true,
                    queryMode       : 'local',
                    matchFieldWidth : false,
                    tpl             : Ext.create('Ext.XTemplate',
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
                    absoluteReadOnly: true,
                    enableKeyEvents : true,
                    rowdata         : null,
                    forceSelection  : false,
                    typeAhead       : false,
                    listeners       : {
                        keyup: function (field) {
                            var searchString = field.getValue();
                            if (searchString) {
                                this.store.filterBy(function (record, id) {
                                    if (record.get('name').toString().toLowerCase().indexOf(searchString) > -1) {
                                        return true;
                                        this.store.clearFilter(true);
                                    } else if (record.get('code').toString().toLowerCase().indexOf(searchString) > -1) {
                                        return true;
                                        this.store.clearFilter(true);
                                    } else {
                                        return false;
                                        this.store.clearFilter(true);
                                    }
                                });
                            }
                        },
                        buffer: 300,
                    },
                },
                {
                    xtype : 'label',
                    itemId: 'fsms_namseddsa',
                    text  : 'Search by date',
                    width : 50,
                },
                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    bodyBorder: false,
                    defaults  : {
                        layout: 'fit'
                    },
                    width: 100,
                    items: [
                        {
                            xtype         : 'combobox',
                            name          : 'datatypedate',
                            queryMode     : 'local',
                            valueField    : 'status',
                            allowBlank    : false,
                            forceSelection: true,
                            flex          : 1,
                            value         : '0',
                            emptyText     : 'ALL',
                            displayField  : 'description',
                            store         : new Ext.data.JsonStore({
                                fields: ['status', 'description'],
                                data  : [
                                    {status: '0', description: 'ALL'},
                                    {status: '1', description: 'Trans. Date'},
                                    {status: '2', description: 'Duedate'},
                                      // {status: '3', description: 'Voucher Date'},
                                    {status: '3', description: 'Issued Date'},
                                    {status: '4', description: 'Kwitansi Date'},
                                    {status: '5', description: 'Voucher Date'},
                                              //  {status: '6', description: 'Posting Date'},
                                    {status: '7', description: 'Realization Date'},
                                ]
                            }),
                        },
                    ]
                },
                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    bodyBorder: false,
                    defaults  : {
                        layout: 'fit'
                    },
                    width: 100,
                    items: [
                        {
                            xtype       : 'datefield',
                            itemId      : 'fsms_idvoucherdatestart',
                            name        : 'datestart',
                            format      : 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            flex        : 1,
                            emptyText   : 'From',
                            disabled    : true,
                        },
                        {
                            xtype: 'splitter',
                            width: '5'
                        },
                        {
                            xtype       : 'datefield',
                            itemId      : 'fsms_idvoucherdateend',
                            name        : 'dateend',
                            format      : 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            flex        : 1,
                            emptyText   : 'To',
                            disabled    : true,
                        },
                    ]
                },
                {
                    xtype         : 'combobox',
                    name          : 'dataflow',
                    fieldLabel    : 'Voucher Type',
                    queryMode     : 'local',
                    valueField    : 'status',
                    allowBlank    : true,
                    forceSelection: true,
                    displayField  : 'description',
                    store         : new Ext.data.JsonStore({
                        fields: ['status', 'description'],
                        data  : [
                            {status: '', description: 'ALL'},
                            {status: 'I', description: 'CASH IN'},
                            {status: 'O', description: 'CASH OUT'},
                        ]
                    }),
                },
                {
                    xtype         : 'combobox',
                    name          : 'status',
                    fieldLabel    : 'Voucher Status',
                    queryMode     : 'local',
                    valueField    : 'status',
                    allowBlank    : true,
                    forceSelection: true,
                    displayField  : 'description',
                    store         : new Ext.data.JsonStore({
                        fields: ['status', 'description'],
                        data  : [
                            {status: 'all', description: 'ALL'},
                            {status: 'draft', description: 'DRAFT'},
                            {status: 'is_paid', description: 'PAID'},
                            {status: 'is_realized', description: 'REALIZED'},
                            {status: 'is_posting', description: 'POSTED'},
                        ]
                    }),
                },
                {
                    xtype : 'label',
                    itemId: 'fsms_namsed',
                    text  : 'Search By ',
                    width : 50,
                },
                {
                    xtype     : 'fieldcontainer',
                    layout    : 'hbox',
                    bodyBorder: false,
                    defaults  : {
                        layout: 'fit'
                    },
                    width: 100,
                    items: [
                        {
                            xtype         : 'combobox',
                            name          : 'datatype',
                            queryMode     : 'local',
                            valueField    : 'status',
                            allowBlank    : false,
                            forceSelection: true,
                            width         : 90,
                            value         : '0',
                            emptyText     : 'ALL',
                            displayField  : 'description',
                            store         : new Ext.data.JsonStore({
                                fields: ['status', 'description'],
                                data  : [
                                    {status: '0', description: 'ALL'},
                                    {status: '1', description: 'Voucher ID'},
                                    {status: '2', description: 'Voucher No.'},
                                    {status: '3', description: 'Customer/Supplier (Business Partner)'},
                                      // {status: '4', description: 'Supplier'},
                                    {status: '5', description: 'Notes'},
                                    {status: '6', description: 'Receipt No.'},
                                    {status: '7', description: 'Amount.'},
                                    {status: '8', description: 'Cheque/Giro No.'},
                                    {status: '9', description: 'COA.'},
                                    {status: '10', description: 'Voucher Dept No.'},
                                    {status: '11', description: 'Reference No.'},
                                    {status: '12', description: 'VA No.'},
                                    {status: '13', description: 'Sub Account.'},
                                    {status: '14', description: 'No. SPK'},
                                    {status: '15', description: 'Description Detail'},
                                    {status: '16', description: 'Bank or Provider'},
                                ]
                            }),
                        },
                        {
                            xtype: 'splitter',
                            width: '15'
                        },
                        {
                            xtype           : 'textfield',
                            name            : 'voucherdept_no',
                            id              : 'voucherdept_no',
                            enforceMaxLength: true,
                            maskRe          : /[^\`\"\']/,
                            maxLength       : 50,
                            hidden          : true,
                              //disabled:true,
                            flex     : 1,
                            emptyText: 'Voucher Dept No'
                        },
                        {
                            xtype           : 'textfield',
                            name            : 'coasearch',
                            id              : 'coaSearch',
                            enforceMaxLength: true,
                            maskRe          : /[^\`\"\']/,
                            maxLength       : 50,
                            hidden          : true,
                              //disabled:true,
                            flex     : 1,
                            emptyText: 'Search Here'
                        },
                        {
                            xtype           : 'textfield',
                            name            : 'voucherID',
                            id              : 'voucherId',
                            enforceMaxLength: true,
                            maskRe          : /[^\`\"\']/,
                            maxLength       : 50,
                            hidden          : true,
                              //disabled:true,
                            flex     : 1,
                            emptyText: 'Voucher ID'
                        },
                        {
                            xtype           : 'textfield',
                            name            : 'voucher_no',
                            enforceMaxLength: true,
                            maskRe          : /[^\`\"\']/,
                            maxLength       : 50,
                            flex            : 1,
                            hidden          : true,
                            id              : 'voucherIdgridsearch',
                            itemId          : 'voucherIdgridsearch',
                            emptyText       : 'Voucher No.'
                        },
                        {
                            xtype           : 'textfield',
                            name            : 'customer_name',
                            enforceMaxLength: true,
                            maskRe          : /[^\`\"\']/,
                            maxLength       : 50,
                            flex            : 1,
                            hidden          : true,
                              // disabled:true,
                            emptyText: 'Customer/Supplier Name'
                        },
                        {
                            xtype           : 'textfield',
                            name            : 'vendor',
                            enforceMaxLength: true,
                            maskRe          : /[^\`\"\']/,
                            maxLength       : 50,
                            flex            : 1,
                            hidden          : true,
                              //  disabled:true,
                            emptyText: 'Vendor Name'
                        },
                        {
                            xtype           : 'textfield',
                            name            : 'description',
                            enforceMaxLength: true,
                            maskRe          : /[^\`\"\']/,
                            maxLength       : 50,
                            flex            : 1,
                            hidden          : true,
                              //  disabled:true,
                            emptyText: 'Description'
                        },
                        {
                            xtype           : 'textfield',
                            name            : 'receipt_no',
                            enforceMaxLength: true,
                            maskRe          : /[^\`\"\']/,
                            maxLength       : 50,
                            flex            : 1,
                            hidden          : true,
                              //  disabled:true,
                            emptyText: 'Receipt No'
                        },
                        {
                            xtype           : 'textfield',
                            name            : 'amount',
                            enforceMaxLength: true,
                            maskRe          : /[^\`\"\']/,
                            maxLength       : 50,
                            flex            : 1,
                            hidden          : true,
                              //  disabled:true,
                            emptyText: 'Amount'
                        },
                        {
                            xtype           : 'textfield',
                            name            : 'chequegiro_no',
                            enforceMaxLength: true,
                            maskRe          : /[^\`\"\']/,
                            maxLength       : 50,
                            flex            : 1,
                            hidden          : true,
                              //  disabled:true,
                            emptyText: 'Cheque/Giro No.'
                        },
                        {
                            xtype           : 'textfield',
                            name            : 'reference_no',
                            enforceMaxLength: true,
                            maskRe          : /[^\`\"\']/,
                            maxLength       : 50,
                            flex            : 1,
                            hidden          : true,
                              //  disabled:true,
                            emptyText: 'Reference No.'
                        },
                        {
                            xtype           : 'textfield',
                            name            : 'virtualaccount_no',
                            enforceMaxLength: true,
                            maskRe          : /[^\`\"\']/,
                            maxLength       : 50,
                            flex            : 1,
                            hidden          : true,
                              //  disabled:true,
                            emptyText: 'VA No.'
                        },
                        {
                            xtype           : 'textfield',
                            name            : 'subsearch',
                            enforceMaxLength: true,
                            maskRe          : /[^\`\"\']/,
                            maxLength       : 50,
                            flex            : 1,
                            hidden          : true,
                              //  disabled:true,
                            emptyText: 'Sub Code.'
                        },
                        {
                            xtype           : 'textfield',
                            name            : 'spk',
                            enforceMaxLength: true,
                            maskRe          : /[^\`\"\']/,
                            maxLength       : 50,
                            flex            : 1,
                            hidden          : true,
                              //  disabled:true,
                            emptyText: 'No. SPK'
                        },
                        {
                            xtype           : 'textfield',
                            name            : 'bank_name_search',
                            enforceMaxLength: true,
                            maskRe          : /[^\`\"\']/,
                            maxLength       : 200,
                            flex            : 1,
                            hidden          : true,
                              //  disabled:true,
                            emptyText: 'Bank or Provider'
                        },
                    ]
                },
                 {
                    xtype           : 'combobox',
                    name            : 'department_id',
                    fieldLabel      : 'Department',
                    displayField    : 'name',
                    valueField      : 'department_id',
                    width           : 250,
                    allowBlank      : true,
                    readOnly        : false,
                    enforceMaxLength: true,
                    queryMode       : 'local',
                    matchFieldWidth : true,
                    tpl             : Ext.create('Ext.XTemplate',
                            '<table class="x-grid-table" width="280px">',
                            '<tr class="x-grid-row">',
                            '<th width="40px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                            '<th width="200px"><div class="x-column-header x-column-header-inner">Department</div></th>',
                            
                            '</tr>',
                            '<tpl for=".">',
                            '<tr class="x-boundlist-item">',
                            '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
                            '<td ><div class="x-grid-cell x-grid-cell-inner">{name}</div></td>',
                          
                            '</tr>',
                            '</tpl>',
                            '</table>'
                            ),
                    absoluteReadOnly: true,
                    enableKeyEvents : true,
                    rowdata         : null,
                    forceSelection  : false,
                    typeAhead       : false,
                    listeners       : {
                        keyup: function (field) {
                            var searchString = field.getValue();
                            if (searchString) {
                                this.store.filterBy(function (record, id) {
                                    if (record.get('name').toString().toLowerCase().indexOf(searchString) > -1) {
                                        return true;
                                        this.store.clearFilter(true);
                                    } else if (record.get('code').toString().toLowerCase().indexOf(searchString) > -1) {
                                        return true;
                                        this.store.clearFilter(true);
                                    } else {
                                        return false;
                                        this.store.clearFilter(true);
                                    }
                                });
                            }
                        },
                        buffer: 300,
                    },
                },
                {
                    xtype       : 'combobox',
                    name        : 'payment_paymentmethod_id',
                    fieldLabel  : 'Payment Type',
                    width       : '300',
                    valueField  : 'paymentmethod_id',
                    allowBlank  : true,
                    displayField: 'paymentmethod',
                },
  //                {
  //                    xtype: 'combobox',
  //                    name: 'project_id',
  //                    fieldLabel: 'Project',
  //                    displayField: 'project_name',
  //                    valueField: 'project_project_id',
  //                    queryMode: 'local',
  //                    forceSelection: true,
  //                    allowBlank: true,
  //                    rowdata: null,
  //                    hidden: true
  //                },
  //                {
  //                    xtype: 'combobox',
  //                    name: 'status',
  //                    queryMode: 'local',
  //                    fieldLabel: 'Status Voucher',
  //                    valueField: 'status',
  //                    //allowBlank: false,
  //                    forceSelection: true,
  //                    flex: 1,
  //                    hidden: true,
  //                    displayField: 'description',
  //                    store: new Ext.data.JsonStore({
  //                        fields: ['status', 'description'],
  //                        data: [
  //                            {status: 'Unprocessed', description: 'Unprocessed'},
  //                            {status: 'Realized', description: 'Realized'},
  //                            {status: 'Posted', description: 'Posted'},
  //                            {status: 'Unrealized', description: 'Unrealized'},
  //                            {status: 'Unposting', description: 'Unposting'},
  //                        ]
  //                    }),
  //                },
  //                {
  //                    xtype: 'textfield',
  //                    itemId: 'fsms_name',
  //                    name: 'name',
  //                    fieldLabel: 'Customer Name',
  //                    enforceMaxLength: true,
  //                    maskRe: /[^\`\"\']/,
  //                    maxLength: 50
  //                },
  //                {
  //                    xtype: 'textfield',
  //                    itemId: 'fsms_description',
  //                    name: 'description',
  //                    fieldLabel: 'Description',
  //                    enforceMaxLength: true,
  //                    maskRe: /[^\`\"\']/,
  //                    maxLength: 50
  //                },
                    {
                        xtype       : 'combobox',
                        name        : 'addby',
                        fieldLabel  : 'Voucher Maker',
                        width       : '300',
                        valueField  : 'addby',
                        allowBlank  : true,
                        displayField: 'user_email',
                    },
                    {
                        xtype         : 'checkboxfield',
                        name          : 'is_print_qr',
                        boxLabel      : 'Flag Print All/Customer',
                        boxLabelCls   : 'x-form-cb-label small',
                        inputValue    : '1',
                        uncheckedValue: '0'
                    }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
