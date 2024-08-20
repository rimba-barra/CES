Ext.define('Cashier.controller.Reportbankpaymentvoucher', {
    extend: 'Cashier.library.template.controller.Controller2',
    alias: 'controller.Reportbankpaymentvoucher',
    requires: ['Cashier.library.XyReportB',
                 'Cashier.library.BrowseCashier'
              ],
    refs: [
        {
            ref: 'panel',
            selector: 'reportbankpaymentvoucherpanel'
        },
        {
            ref: 'grid',
            selector: 'reportbankpaymentvouchergrid'
        },
        {
            ref: 'formdata',
            selector: 'reportbankpaymentvoucherformdata'
        },
        {
            ref: 'formsearch',
            selector: 'reportbankpaymentvoucherformsearch'
        },
         {
            ref: 'selecteddatagrid',
            selector: 'reportbankpaymentvoucherselecteddatagrid'
        },
    ],
    controllerName: 'reportbankpaymentvoucher',
    fieldName: 'coa',
    year: null,
    ptId: 0,
    xyReport: null,
    reportFileName: null,
    pt_name: null,
    bank_name: null,
    coa_name:null,
    idprint: null,
    state:null,
    groupby:0,
    allpaymenttype: 0,
    template: null,
     localStore: {
        selectedData: null
    },
    bindPrefixName: 'Reportbankpaymentvoucher',
    formxWinId: 'win-teportbankpaymentvoucherid',
    constructor: function (configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Cashier.library.box.Config({
            _controllerName: me.controllerName
        });
    },
    init: function () {
        var me = this;
        var events = new Cashier.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools = new Cashier.library.box.tools.Tools({config: me.myConfig});
        this.control({
            'reportbankpaymentvoucherpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    var f = me.getFormdata();
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(375);
                    me.panelAfterRender(panel);
                    panel.up("panel").setWidth(300);
                    // panel.up("window").setHeight(228);
                    // panel.up("panel").setHeight(200);
                },
            },
            'reportbankpaymentvoucherformdata [action=select]': {
                click: this.ProcessData
            },
            'reportbankpaymentvoucherformdata [name=generate_all]': {
                change: function (e) {
                    var f = me.getFormdata();
                    if (e.value == false) {
                       me.state = 'partial';
                    }else{
                        me.state = 'full';
                        me.idprint = '';
                    }
                }
            },
            'reportbankpaymentvoucherformdata [name=projectpt_id]': {
                change: function (e) {
                    var f = me.getFormdata();
                    if (e.valueModels !== null) {
                        var data_pt_id = e.valueModels[0].data.pt_id;
                        var data_project_id = e.valueModels[0].data.project_project_id;
                        f.down("[name=pt_pt_id]").setValue(parseInt(data_pt_id));
                        f.down("[name=project_id]").setValue(parseInt(data_project_id));    
                        e.value = data_pt_id;
                        me.project_id = data_project_id;
                    }

                    if (e.value) {
                        // me.setprojectpt(e.name, e.ownerCt, 'project_id');
                        f.down('[name=voucherprefix_voucherprefix_id]').setValue('');
                        f.down('[name=voucherprefix_voucherprefix_id]').setReadOnly(false);
                        //me.pt_name = me.tools.comboHelper(f.down("[name=projectpt_id]")).getField('pt_id', 'name');
						me.pt_name = f.down("[name=projectpt_id]").getRawValue();
                        me.getCustomRequestComboboxModule('global', 'getprefix', e.value, me.project_id, '', 'voucherprefix_voucherprefix_id', 'voucherprefix', ['prefix',
                        'coa'], f, '');
                        //Rizal 9 Mei 2019
                        f.down('[name=rangeapprove_rangeapprove_id]').setValue('');
                        f.down('[name=rangeapprove_rangeapprove_id]').setReadOnly(false);
                        me.getCustomRequestComboboxModule('global', 'rangeapprove', e.value, me.project_id, '', 'rangeapprove_rangeapprove_id', 'rangeapprovecreator', '', f, '');
                        //
                    } else {
                        f.down('[name=voucherprefix_voucherprefix_id]').setValue('');
                        f.down('[name=voucherprefix_voucherprefix_id]').setReadOnly(false);
                    }
                }
            },
            'reportbankpaymentvoucherformdata [name=voucherprefix_voucherprefix_id]': {
                change: function (e) {
                    var f = me.getFormdata();
                    if (e.value) {
                        me.bank_name = me.tools.comboHelper(f.down("[name=voucherprefix_voucherprefix_id]")).getField('prefix_prefix_id', 'description');
                        me.coa_name = me.tools.comboHelper(f.down("[name=voucherprefix_voucherprefix_id]")).getField('prefix_prefix_id', 'coa_coa');
                    }
                }
            },
              'reportbankpaymentvoucherselecteddatagrid button[action=select]': {
                click: function (v) {
                    var me = this;
                    me.idprint = '';
                    me.ReportSelect(v);
                }
            },
        });
    },
    formDataAfterRender: function (el) { //fdar
        var state = el.up('window').state;
        var wid = el.up('window').id;
        var me = this;
        var f = me.getFormdata();

        me.fdar().init();
        me.detailFdar();

    },
    detailFdar: function () {
        var me = this;
        var p = me.getPanel();
        var f = me.getFormdata();

        p.setLoading("Please wait");
        me.tools.ajax({
            params: {module: me.controllerName},
            form: p,
            success: function (data, model) {

                try {
                    me.tools.weseav2(data.pt, f.down("[name=projectpt_id]")).comboBox('', function () {
                        // var combostore = f.down('[name=projectpt_id]').getStore();
                        // var record = combostore.findRecord('projectpt_id', parseInt(apps.projectpt),0,false,true,true);
                        // if (record) {
                        //     f.down("[name=projectpt_id]").setValue(parseInt(apps.projectpt));
                        // }
                        for (var i = 0; i < data.pt.data.length; i++) {
                            if (data.pt.data[i].pt_projectpt_id == parseInt(apps.projectpt)) {
                                f.down("[name=projectpt_id]").setValue(parseInt(data.pt.data[i].pt_projectpt_id));
                            }
                        }
                    });
                }
                catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to generate init.");

                }

                p.setLoading(false);
            }
        }).read('init');
    },
     ReportSelect: function (el) {
        var me = this;
        var f = me.getFormdata();
        var grid = me.getSelecteddatagrid();
        var rec = grid.getSelectedRecord();
        var row = grid.getSelectionModel().getSelection();
        if(row.length == 0){
            me.tools.alert.warning("Please choose at least one cheque/giro no.");
        }else{
            // console.log(row);return;
            for (var i = 0; i < row.length; i++) {
            
                var id = row[i]['data']['kasbank_id'];
                if (id != 0) {
                    if ((i + 1) == row.length) {
                        me.idprint = me.idprint + id;                     
                    } else {
                        me.idprint = me.idprint + id + '~';

                    }
                }
            }
            // el.up('window').close();
            // return;
            me.mainPrint();
        }
    },
    ProcessData: function () {
        var me = this;
        var f = me.getFormdata();
        var generateall = f.down("[name=generate_all]").getValue();
        me.groupby = (f.down("[name=group_by]").getValue() == true) ? 1 : 2;
        me.allpaymenttype = (f.down('[name=all_payment_type]').getValue() == false) ? 0 : 1;
        if(generateall == true){
            me.mainPrint();
        }else{
            me.browseData();
        }
    },
    mainPrint: function () {
        var me = this;
        var f = me.getFormdata();
        var formatreport = f.down("[name=formatreport]").getValue();
        var template = null;

        if(formatreport == 'TEMPLATE-1 Default'){
             if(me.groupby == 1){
             me.reportFileName = 'Bankpaymentvoucher';
            }else{
                 me.reportFileName = 'BankpaymentvoucherV2';
            }
            me.template = 1;
        }else if(formatreport == 'TEMPLATE-2 Merge Amount'){

              if(me.groupby == 1){
             me.reportFileName = 'Bankpaymentvoucher_template2';
            }else{
                 me.reportFileName = 'Bankpaymentvoucher_template2';
            }

            me.template = 2;
        }else if(formatreport == 'TEMPLATE-3 Potrait'){
            if(me.groupby == 1){
                me.reportFileName = 'BankpaymentvoucherPotrait';
            }else{
                 me.reportFileName = 'BankpaymentvoucherV2Potrait';
            }
            me.template = 3;
        }
       
       
      
            if (f.getForm().isValid()) {
                if (!me.xyReport) {
                    me.xyReport = new Cashier.library.XyReportB();
                    me.xyReport.init(me);
                }
                var winId = me.controllerName + '_' + Ext.Date.format(new Date(), 'YmdHis');
                var title = 'Result ' + me.getFormdata().up('window').title;
                me.xyReport.processReportJsv3(winId, 800, title, me.controllerName, 1, null);
            }
       
    },
    xyReportProcessParams: function (reportData) {
        var me = this;
        var fn = me.reportFileName;
        var f = me.getFormdata();
        var pt_id = f.down("[name=pt_pt_id]").getValue();
        var project_id = f.down("[name=project_id]").getValue();
        var prefix = f.down("[name=voucherprefix_voucherprefix_id]").getValue();
      


        var df = f.down("[name=dataflow]").getValue();
        var from = moment(f.down("[name=from]").getValue()).format("YYYY-MM-DD");
        var from_f = moment(f.down("[name=from]").getValue()).format("DD-MM-YYYY");
        var to = moment(f.down("[name=to]").getValue()).format("YYYY-MM-DD");
        var to_f = moment(f.down("[name=to]").getValue()).format("DD-MM-YYYY");
        //Rizal 14 Mei 2019
        var rangeid = f.down("[name=rangeapprove_rangeapprove_id]").getValue();
        //
        

        reportData['file'] = fn;
        reportData.params["pt_id"] = pt_id;
        reportData.params["project_id"] = project_id;
        reportData.params["prefix_id"] = prefix;
        reportData.params["from"] = from;
        reportData.params["to"] = to;
        reportData.params["from_f"] = from_f;
        reportData.params["to_f"] = to_f;
        reportData.params["dataflow"] = df;
        // reportData.params["bank_name"] = me.bank_name;
        reportData.params["bank_name"] = f.down("[name=voucherprefix_voucherprefix_id]").valueModels[0].data.description;
        reportData.params["pt_name"] = f.down("[name=projectpt_id]").valueModels[0].data.name;
        // reportData.params["pt_name"] =me.pt_name;
        // reportData.params["coa_name"] = me.coa_name;
        reportData.params["coa_name"] = f.down("[name=voucherprefix_voucherprefix_id]").valueModels[0].data.coa_coa;
        reportData.params["range_id"] = rangeid;
        reportData.params["cheque_id"] = me.idprint;
        reportData.params['combine'] = 1;
        reportData.params['partialfull'] = 0;
        reportData.params['group_by'] = me.groupby;
        reportData.params['template'] = me.template;
        reportData.params['allpaymenttype'] = me.allpaymenttype;
        
        return reportData;
    },
    browseData: function (el, cb) {
        var ps;
        var me = this;
        var f = me.getFormdata();
        var pt_pt_id = f.down("[name=pt_pt_id]").getValue();
        var project_id = f.down("[name=project_id]").getValue();
        var prefix_id = f.down("[name=voucherprefix_voucherprefix_id]").getValue();
        var fromdate = Ext.Date.format(f.down("[name=from]").getValue(), 'Y-m-d');
         var todate = Ext.Date.format(f.down("[name=to]").getValue(), 'Y-m-d');
        var dataflow_id = f.down("[name=dataflow]").getValue();
        var range_id = f.down("[name=rangeapprove_rangeapprove_id]").getValue();
        var allpayment = me.allpaymenttype;

        var localstore = 'selectedData';
        if (f.getForm().isValid()) { //validation
                var browse = new Cashier.library.BrowseCashier();
                browse.init({
                    controller: me,
                    view: 'SelecteddataGrid',
                    el: el,
                    localStore: localstore,
                    bukaFormSearch: false,
                    pt: pt_pt_id,
                    project : project_id,
                    prefix : prefix_id,
                    fromdate : fromdate,
                    todate : todate,
                    dataflow : dataflow_id,
                    rangeid : range_id,
                    allpayment : allpayment
                });
                browse.showWindow(function () {
                    // Ext.getCmp('ptArId').setValue(me.pt_id);
                }, function () {
                    
                  
                });

         }
    },
     instantBrowseWindow: function (panel, width, title, state, id, bukaFormSearch, getAr) { // override from Cashier.library.template.controller.Controller2
        var me = this;
        var formtitle, formicon, formsearch;


        title = typeof title == 'undefined' ? 'My Window' : title;
        id = typeof id == 'undefined' ? 'myInstantWindow' : id;
        state = typeof state == 'undefined' ? 'create' : state;
        panel = typeof panel == 'undefined' ? 'Panel' : panel;
        width = 850;
       // width = typeof width == 'undefined' ? 600 : width;
        //bukaFormSearch = typeof bukaFormSearch == 'undefined' ? true : bukaFormSearch;
        formtitle = title;
        formicon = 'icon-form-add';
        var winId = id;

       
        var win = desktop.getWindow(winId);
        if (win) {
            win.destroy();
        }
        win = desktop.createWindow({
            id: winId,
            title: formtitle,
            iconCls: formicon,
            resizable: true,
            minimizable: true,
            maximizable: true,
            width: width,
            renderTo: Ext.getBody(),
            constrain: true,
            constrainHeader: false,
            modal: true,
            layout: 'fit',
            shadow: 'frame',
            shadowOffset: 10,
            border: false,
            items: [
                {
                    xtype: 'panel',
                    height: 400,
                    layout: {
                        type: 'border'
                    },
                    items: [
                        Ext.create('Cashier.view.' + me.controllerName + '.' + panel)
                    ]
                }
            ],
            state: state
        });


        win.show();
    },

});
