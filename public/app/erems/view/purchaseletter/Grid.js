Ext.define('Erems.view.purchaseletter.Grid',{
    alias          : 'widget.purchaselettergrid',
    bindPrefixName : 'Purchaseletter',
    newButtonLabel : 'New Purchaseletter',
    extend         : 'Erems.library.template.view.GridDS2',
    storeConfig    : {
        id          : 'PurchasletterGridStore',
        idProperty  : 'purchaseletter_id',
        extraParams : {}
    },
    initComponent : function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu : me.generateContextMenu(),
            dockedItems : me.generateDockedItems(),
            viewConfig  : {},
            selModel    : Ext.create('Ext.selection.CheckboxModel', {}),
            plugins     : [
                Ext.create('Ext.grid.plugin.CellEditing', {
                    ptype        : 'cellediting',
                    clicksToEdit : 1
                })
            ],
            columns : [
                {
                    xtype : 'rownumberer',
                    width :30
                },
                //edited by Rizal 1 Maret 2019
                {
                    xtype     : 'gridcolumn',
                    header    : 'Purchaseletter ID',
                    dataIndex : 'purchaseletter_id',
                    hidden    : true
                },
                {
                    xtype     : 'booleancolumn',
                    header    : 'Auto SMS',
                    dataIndex : 'is_auto_sms',
                    hidden    : true,
                    width     : 60,
                    renderer  : me.inlineEditSMS
                },
                {
                    xtype     : 'booleancolumn',
                    header    : 'Not Allowed SP',
                    dataIndex : 'is_not_allowed_sp',
                    hidden    : true,
                    width     : 80,
                    renderer  : me.inlineEditSP
                },
                //endedited
                {
                    xtype     : 'gridcolumn',
                    width     : 100,
                    align     : 'right',
                    dataIndex : 'cluster_cluster',
                    text      : 'Kawasan'
                },
                {
                    xtype     : 'gridcolumn',
                    width     : 70,
                    dataIndex : 'unit_unit_number',
                    hideable  : false,
                    text      : 'Unit Number'
                },
                {
                    xtype     : 'booleancolumn',
                    header    : 'Insentif Pajak',
                    dataIndex : 'is_nonppn',
                    itemId    : 'is_nonppn',
                    hidden    : true,
                    width     : 80,
                    renderer  : me.inlineEditPAJAK
                },
                {
                    xtype     : 'booleancolumn',
                    header    : 'Vida',
                    dataIndex : 'is_vida',
                    itemId    : 'is_vida',
                    hidden    : true,
                    width     : 40,
                    renderer  : me.inlineEditVIDA
                },
                {
                    xtype     : 'booleancolumn',
                    header    : 'Fest 40',
                    dataIndex : 'is_ciputrafest40',
                    itemId    : 'is_ciputrafest40',
                    hidden    : true,
                    width     : 50,
                    renderer  : me.inlineEditFEST40
                },
                // added by rico 28112022
                {
                    xtype     : 'booleancolumn',
                    header    : 'Blokir',
                    dataIndex : 'is_blokir',
                    itemId    : 'is_blokir',
                    hidden    : true,
                    width     : 50,
                    renderer  : me.inlineEditBlokir
                },
                // added by rico 19012023
                {
                    xtype     : 'booleancolumn',
                    header    : 'Disc Karyawan',
                    dataIndex : 'is_disc_karyawan',
                    itemId    : 'is_disc_karyawan',
                    hidden    : true,
                    width     : 50,
                    renderer  : me.inlineEditDiscKaryawan
                },
                {
                    xtype     : 'gridcolumn',
                    width     : 70,
                    dataIndex : 'type_name',
                    hideable  : false,
                    text      : 'Type'
                },
                {
                    xtype     : 'datecolumn',
                    width     : 100,
                    dataIndex : 'purchase_date',
                    format    :'d-m-Y',
                    hideable  : false,
                    text      : 'Tanggal Pesanan'
                },
                {
                    xtype     : 'gridcolumn',
                    width     : 120,
                    dataIndex : 'purchaseletter_no',
                    hideable  : false,
                    text      : 'Nomor Pesanan'
                },
                {
                    xtype     : 'numbercolumn',
                    width     : 100,
                    dataIndex : 'harga_total_jual',
                    hideable  : false,
                    align     :'right',
                    text      : 'Harga Jual'
                },
                {
                    xtype     : 'gridcolumn',
                    width     : 100,
                    dataIndex : 'customer_name',
                    hideable  : false,
                    text      : 'Customer Name'
                },
                {
                    xtype     : 'gridcolumn',
                    width     : 100,
                    dataIndex : 'pengalihanhak_name',
                    hideable  : false,
                    text      : 'Last Owner'
                },
                {
                    xtype     : 'gridcolumn',
                    width     : 100,
                    dataIndex : 'more_customers',
                    text      : 'More Customer',
                    itemId    : 'td_more_customer',
                    hidden    : true,
                },
                {
                    xtype     : 'numbercolumn',
                    width     : 100,
                    dataIndex : 'total_payment',
                    hideable  : false,
                    align     :'right',
                    text      : 'Total Payment'
                },
                {
                    xtype     : 'numbercolumn',
                    width     : 50,
                    dataIndex : 'persen_payment',
                    hideable  : false,
                    align     :'right',
                    text      : '% Pay'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_sales_name',
                    width     : 100,
                    dataIndex : 'salesman_employee_name',
                    hideable  : false,
                    text      : 'Sales Name'
                },
                {
                    xtype     : 'gridcolumn',
                    width     : 70,
                    dataIndex : 'price_source_name',
                    text      : 'Price Source',
                    itemId    : 'colms_price_source_name',
                    hidden    : true,
                },
                {
                    xtype     : 'gridcolumn',
                    width     : 70,
                    dataIndex : 'pricetype_pricetype',
                    hideable  : false,
                    text      : 'Price Type'
                },
                {
                    xtype     : 'datecolumn',
                    itemId    : 'colms_akad_realisasiondate',
                    width     : 100,
                    format    : 'd-m-Y',
                    dataIndex : 'akad_realisasiondate',
                    hideable  : false,
                    text      : 'Tgl. Akad'
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_member_name',
                    width     : 100,
                    dataIndex : 'clubcitra_member',
                    hideable  : false,
                    text      : 'Member Name'
                },
                {
                    xtype     : 'gridcolumn',
                    width     : 100,
                    dataIndex : 'unit_virtualaccount_bca',
                    hideable  : false,
                    text      : 'VA BCA'
                },
                {
                    xtype     : 'gridcolumn',
                    width     : 100,
                    dataIndex : 'unit_virtualaccount_mandiri',
                    hideable  : false,
                    text      : 'VA Mandiri'
                },
                {
                    dataIndex : 'api_aci',
                    text      : 'ACI',
                    xtype     : 'booleancolumn',
                    width     :50,
                    align     : 'center',
                    falseText : ' ',
                    trueText  : '&#10003;'
                },
                {
                    xtype     : 'datecolumn',
                    width     : 100,
                    dataIndex : 'Addon',
                    format    :'d-m-Y',
                    hideable  : false,
                    text      : 'Tanggal Input'
                },
                // add by hadi 22082019
                {
                    xtype     : 'gridcolumn',
                    header    : 'Is Draft',
                    dataIndex : 'is_draft',
                    hidden    : true
                },
                {
                    xtype     : 'numbercolumn',
                    dataIndex : 'nilai_survey',
                    itemId    : 'nilai_survey',
                    hidden    : true,
                    width     : 70,
                    text      : 'Nilai Survey'
                },
                {
                    xtype     : 'numbercolumn',
                    dataIndex : 'nilai_survey_nps',
                    itemId    : 'nilai_survey_nps',
                    hidden    : true,
                    width     : 60,
                    text      : 'Nilai NPS'
                },
                
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
    //edited by Rizal 1 Maret 2019
    ,inlineEditSMS: function (val, meta, record, rowIndex, colIndex, store) {
        name = 'is_auto_sms';
        return this.comboBoxFieldGen(name, record, true);  
    },
    inlineEditSP: function (val, meta, record, rowIndex, colIndex, store) {
        name = 'is_not_allowed_sp';
        return this.comboBoxFieldGen(name, record, true);  
    },
    inlineEditPAJAK: function (val, meta, record, rowIndex, colIndex, store) {
        name = 'is_nonppn';
        return this.comboBoxFieldGen(name, record, true);  
    },
    inlineEditVIDA: function (val, meta, record, rowIndex, colIndex, store) {
        name = 'is_vida';
        return this.comboBoxFieldGen(name, record, true);  
    },
    inlineEditFEST40: function (val, meta, record, rowIndex, colIndex, store) {
        name = 'is_ciputrafest40';
        return this.comboBoxFieldGen(name, record, true);  
    },
    inlineEditMoreCustomer: function (val, meta, record, rowIndex, colIndex, store) {
        name = 'more_customers';
        return this.comboBoxFieldGen(name, record, true);  
    },
    // added by rico 28112022
    inlineEditBlokir: function (val, meta, record, rowIndex, colIndex, store) {
        name = 'is_blokir';
        return this.comboBoxFieldGen(name, record, true);  
    },
    // added by rico 19012023
    inlineEditDiscKaryawan: function (val, meta, record, rowIndex, colIndex, store) {
        name = 'is_disc_karyawan';
        return this.comboBoxFieldGen(name, record, true);  
    },
    comboBoxFieldGen: function(name, record, enable){
        if (record.get(name)) {
            if(enable){
                var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' checked />';
            }else{
                var a = '&#10003;';
            }
        }else {
            if(enable){
                var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' />';
            }else{
                var a = '';
            }
        }
        return a;  
    }
    //endedited
    //edited by hadi 21082019
    ,generateDockedItems: function() {
        var me = this;

        var dockedItems = [
            {
                xtype  : 'toolbar',
                dock   : 'top',
                height : 28,
                items  : [
                    {
                        xtype      : 'button',
                        action     : 'create',
                        itemId     : 'btnNew',
                        margin     : '0 5 0 0',
                        iconCls    : 'icon-new',
                        bindAction : me.bindPrefixName + 'Create',
                        text       : me.newButtonLabel,
                        disabled   : true
                    },
                    {
                        xtype      : 'button',
                        action     : 'update',
                        itemId     : 'btnEdit',
                        margin     : '0 5 0 0',
                        iconCls    : 'icon-edit',
                        bindAction : me.bindPrefixName + 'Update',
                        text       : 'Edit',
                        disabled   : true
                    },
                    {
                        xtype    : 'button',
                        action   : 'editdraft',
                        itemId   : 'btnEditdraft',
                        margin   : '0 5 0 0',
                        iconCls  : 'icon-edit',
                        text     : 'Edit Draft',
                        disabled : true,
                        hidden   : true
                    },
                    {
                        xtype      : 'button',
                        action     : 'destroy',
                        itemId     : 'btnDelete',
                        margin     : '0 5 0 0',
                        iconCls    : 'icon-delete',
                        bindAction : me.bindPrefixName + 'Delete',
                        text       : 'Delete Selected',
                        disabled   : true
                    },
                    {
                        xtype    : 'button',
                        action   : 'deletedraft',
                        itemId   : 'btnDeletedraft',
                        margin   : '0 5 0 0',
                        iconCls  : 'icon-delete',
                        text     : 'Delete Draft',
                        disabled : true,
                        hidden   :true
                    },
                    {
                        //addby anas 05012021
                        xtype    : 'button',
                        action   : 'add_survey',
                        disabled : true,
                        itemId   : 'btnSurvey',
                        margin   : '0 5 0 0',
                        text     : 'Isi Hasil Survey'
                    },

                    ////// add by Erwin 04/06/2021
                    {
                        xtype    : 'button',
                        action   : 'tahan_batal',
                        disabled : true,
                        hidden   : true,
                        itemId   : 'tahan_batal',
                        margin   : '0 5 0 0',
                        text     : 'Tahan Batal'
                    },

                    ////// add by Erwin 04/11/2021
                    {
                        xtype    : 'button',
                        action   : 'printout',
                        disabled : true,
                        itemId   : 'printout',
                        margin   : '0 5 0 0',
                        text     : 'Printout',
                        iconCls  : 'icon-print',
                    },
                    
                    // added by rico 17012022
                    {
                        xtype    : 'button',
                        action   : 'send_survey',
                        disabled : true,
                        itemId   : 'survey',
                        margin   : '0 5 0 0',
                        text     : 'Send Survey',
                        iconCls  : 'icon-mail',
                    },
                    {
                        xtype   : 'button',
                        action  : 'rescheduleMainGrid',
                        disabled : true,
                        itemId   : 'rescheduleMainGrid',
                        margin  : '0 5 0 0',
                        iconCls : 'icon-new',
//                        hidden  : true,
                        text    : 'Reschedule'
                    },
                    {
                        xtype   : 'button',
                        action  : 'hargaNettoKomisiGrid',
                        disabled : true,
                        itemId   : 'hargaNettoKomisiGrid',
                        margin  : '0 5 0 0',
                        iconCls : 'icon-new',
                        text    : 'Harga Netto Komisi'
                    },
                    {
                        xtype   : 'button',
                        action  : 'printsch',
                        disabled : true,
                        itemId   : 'btnPrintPaySch',
                        margin  : '0 5 0 0',
                        iconCls : 'icon-print',
                        text    : 'Payment Scheme'
                    },

                    ////// add by Erwin 12/12/2022
                    {
                        xtype    : 'button',
                        action   : 'printoutdraftspt',
                        disabled : true,
                        hidden   : true,
                        itemId   : 'printoutdraftspt',
                        margin   : '0 5 0 0',
                        text     : 'Print Pra SPT',
                        iconCls  : 'icon-print',
                    },

                    ////// add by Erwin 12/12/2022
                    {
                        xtype    : 'button',
                        action   : 'btnRegenerateva',
                        disabled : true,
                        itemId   : 'btnRegenerateva',
                        margin   : '0 5 0 0',
                        text     : 'ReGenerate Nomor VA',
                        iconCls  : 'icon-print',
                    },
                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }
        ];
        return dockedItems;
    },
    generateActionColumn: function() {
        var me = this;
        var ac = {
            xtype     : 'actioncolumn',
            itemId    : 'actioncolumn',
            width     : 50,
            resizable : false,
            align     : 'right',
            hideable  : false,
            items     : [
                // {
                //     text: 'Edit',
                //     iconCls: 'icon-edit',
                //     bindAction: me.bindPrefixName + 'Update',
                //     altText: 'Edit',
                //     tooltip: 'Edit',
                //     hidden:true
                // },
                // {
                //     text: 'Delete',
                //     iconCls: 'icon-delete',
                //     bindAction: me.bindPrefixName + 'Delete',
                //     altText: 'Delete',
                //     tooltip: 'Delete',
                //     hidden:true
                // }
            ]
        };
        return ac;
    }
    //edited by hadi 21082019
});