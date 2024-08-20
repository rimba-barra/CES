Ext.define('Gl.controller.Subaccounttransaction', {
    extend: 'Gl.library.template.controller.Controllergl',
    alias: 'controller.Subaccounttransaction',
    requires: [
        'Gl.library.template.combobox.Coacomboboxgrid',
        'Gl.library.template.combobox.Subaccountgroupcomboboxgrid',
        'Gl.library.template.combobox.SubaccountcodeComboboxgrid',
    ],
    views: [
        'subaccounttransaction.Panel',
        'subaccounttransaction.FormData'
    ],
    stores: [
        'Subaccounttransaction',
        'Coacombo',
        'Subaccountgroup',
        'Subaccountcode',
    ],
    models: [
        'Subaccounttransaction',
        'Coa',
        'Subaccountgroup',
        'Subaccountcode',
    ],
    refs: [
        {
            ref: 'formdata',
            selector: 'subaccounttransactionformdata'
        },
        {
            ref: 'paneldata',
            selector: 'subaccounttransactionpanel'
        },
        {
            ref: 'gridkel',
            selector: 'subaccountgroupcomboboxgrid'
        }
    ],
    controllerName: 'subaccounttransaction',
    fieldName: '',
    bindPrefixName: 'Subaccounttransaction',
    urlprocess: 'gl/subaccounttransaction/read',
    kelsub_id: null,
    paramcoa: null, fromcoa_id: 0, fromcoa: null, untilcoa_id: 0, untilcoa: null,
    reportby: null, voucherby: null, subby: null, detailby: null, fromkelsub: null, untilkelsub: null,
    fromdate: null, untildate: null, fromsubcode: null, untilsubcode: null,
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    paramsStr: null, win: null, params: null, dateNow: new Date(), html: null, winId: 'myReportWindow', checksub: null, report: null,
    statusprocess: null, project_name: null, pt_name: null, userid: null, userprint: null, urlrequest: null, senddata: null, info: null, form: null,
    storekelsub: null, kelsubid_from: null, kelsubid_to: null,
    cluster: null,
    init: function (application) {
        var me = this;
        this.control({
            'subaccounttransactionpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(400);
                    //   Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(450);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(600);
                    me.panelAfterRender();
                }
            },
            'subaccounttransactionformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRenderCustome();
                }
            },
            'subaccounttransactionformdata [name=sub_coa_from_id]': {
                change: function (me, newValue, oldValue, eOpts) {
                    if (oldValue !== 'undefined') {
                        me.fromcoa_id = oldValue;
                    }
                },
                select: function () {
                    me.checkPositionCOA('from');

                },
                blur: function () {
                    me.customeFilter();
                }
            },
            'subaccounttransactionformdata [name=sub_coa_until_id]': {
                change: function (cb, newValue, oldValue, options) {
                    if (oldValue !== 'undefined') {
                        me.untilcoa_id = oldValue;
                    }

                },
                select: function (cb, newValue, oldValue, options) {
                    this.checkPositionCOA('until');
                },
                blur: function () {
                    me.customeFilter();
                }
            },
            'subaccounttransactionformdata button[action=submit]': {
                click: function () {
                    me.Processdata();

                }
            },
            'subaccounttransactionformdata [name=subfromdate]': {
                blur: function () {
                    me.setKelsub();
                }
            },
            'subaccounttransactionformdata [name=subuntildate]': {
                blur: function () {
                    me.setKelsub();
                }
            },
            'subaccounttransactionformdata [name=sub_kelsub_id]': {
                select: function () {
                    me.filterSub();
                }
            },
            'subaccounttransactionformdata [name=subdata]': {
                change: function () {
                    me.conditionSub();
                }
            },
        });
    },
    conditionSub: function () {
        var me, subby;
        me = this;

        subby = me.getFormdata().down("[name=subdata]").getValue();
        if (subby == true) {
            Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(330);
            me.getFormdata().down("[name=subgl]").setVisible(true);
            me.getFormdata().down("[name=sub1]").setVisible(false);
            me.getFormdata().down("[name=sub2]").setVisible(false);
            me.getFormdata().down("[name=sub3]").setVisible(false);
            me.getFormdata().down("[name=sub4]").setVisible(false);

            me.setValueCombobox(me, 'fromsub1',null,null);
            me.setValueCombobox(me, 'untilsub1',null,null);
            me.setValueCombobox(me, 'fromsub2',null,null);
            me.setValueCombobox(me, 'untilsub2',null,null);
            me.setValueCombobox(me, 'fromsub3',null,null);
            me.setValueCombobox(me, 'untilsub3',null,null);
            me.setValueCombobox(me, 'fromsub4',null,null);
            me.setValueCombobox(me, 'untilsub4',null,null);
            
        } else {
            Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(400);
            me.getFormdata().down("[name=subgl]").setVisible(false);
            me.getFormdata().down("[name=sub1]").setVisible(true);
            me.getFormdata().down("[name=sub2]").setVisible(true);
            me.getFormdata().down("[name=sub3]").setVisible(true);
            me.getFormdata().down("[name=sub4]").setVisible(true);
            
            me.fromsubcode = me.getValue(me, "sub_fromsubgl_id", "value");
            me.untilsubcode = me.getValue(me, "sub_fromsubgl_id", "value");
        }

    },
    setKelsub: function () {
        var me, storekelsub, indexsub;
        me = this;
        storekelsub = me.getStore('Subaccountgroup');
        indexsub = storekelsub.getCount() - 1;
        if (indexsub < 0) {
            indexsub = 0;
        }
        me.fromkelsub = storekelsub.getAt(0)['data'].kelsub;
        me.untilkelsub = storekelsub.getAt(indexsub)['data'].kelsub;

    },
    Processdata: function () {
        var me, form, reportby, voucherby, subby, detailby,
                indexsub, storekelsub, fromkelsub, untilkelsub = '';
        me = this;

        form = me.getFormdata();
        me.reportby = form.down("[name=sat_reportby]").getValue();
        me.voucherby = form.down("[name=voucherdata]").getValue();
        me.subby = form.down("[name=subdata]").getValue();
        me.detailby = (form.down("[name=detaildatasub]").getValue() == false) ? true : false;

        storekelsub = me.getStore('Subaccountgroup');
        indexsub = storekelsub.getCount() - 1;
        me.fromkelsub = storekelsub.getAt(0)['data'].kelsub;
        me.untilkelsub = storekelsub.getAt(indexsub)['data'].kelsub;
        me.fromdate = me.getValue(me, "subfromdate", "raw");
        me.untildate = me.getValue(me, "subuntildate", "raw");
        me.fromcoa = me.getValue(me, "sub_coa_from_id", "raw");
        me.untilcoa = me.getValue(me, "sub_coa_until_id", "raw");
        me.fromsubcode = ''; //me.getValue(me, "sub_fromsubgl_id", "value");
        me.untilsubcode = ''; //me.getValue(me, "sub_untilsubgl_id", "value");


        me.senddata = {
            hideparam: 'processreport',
            reportby: me.reportby,
            voucherby: me.voucherby,
            subby: me.subby,
            detailby: me.detailby,
            fromdate: me.fromdate,
            untildate: me.untildate,
            fromcoa: me.fromcoa,
            untilcoa: me.untilcoa,
            fromkelsub: me.fromkelsub,
            untilkelsub: me.untilkelsub,
            fromsubcode: me.fromsubcode,
            untilsubcode: me.untilsubcode,
            fromsub1: null,
            untilsub1: null,
            fromsub2: null,
            untilsub2: null,
            fromsub3: null,
            untilsub3: null,
            fromsub4: null,
            untilsub4: null,
        }

        Ext.getBody().mask("Please wait...");
        me.urlrequest = 'gl/subaccounttransaction/create';
        me.AjaxRequest();



    },
    showReport: function () {
        var me;
        me = this;
        me.form = me.getFormdata().getForm();

        me.instantWindow('Panel', 800, 'Result ', 'state-report', me.winId, 'masterreport');
        me.paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        me.win = desktop.getWindow(me.winId);
        if (me.win) {
            resetTimer();
            me.value = me.form.getValues();
            //start default param
            me.value["project_name"] = me.project_name;
            me.value["pt_name"] = me.pt_name;
            me.value["userprint"] = me.userprint;
            me.value["userid"] = me.userid;
            me.value["tgl_sekarang"] = me.dateNow.getDate() + "-" + (me.dateNow.getMonth() + 1) + "-" + me.dateNow.getFullYear();
            me.value["time_sekarang"] = me.dateNow.getHours() + ":" + me.dateNow.getMinutes() + ":" + me.dateNow.getSeconds();
            me.value["project_id"] = apps.project;
            me.value["pt_id"] = apps.pt;
            //end default param



            me.value["reportby"] = (me.reportby == true) ? "Account Code" : "Sub Account Code";
            me.value["voucherdata"] = (me.voucherby == true) ? 'All' : 'Cash Flow';
            me.value["subdata"] = (me.subby == true) ? 'Complete' : 'By Sub';
            me.value["detaildatasub"] = (me.detailby == true) ? 'Yes' : 'No';
            me.value["fromdate"] = me.fromdate;
            me.value["untildate"] = me.untildate;
            me.value["fromcoa"] = me.fromcoa;
            me.value["untilcoa"] = me.untilcoa;
            me.value["fromkelsub"] = me.fromkelsub.trim();
            me.value["untilkelsub"] = me.untilkelsub.trim();
            me.value["fromaccountcode"] = me.fromsubcode.trim();
            me.value["untilaccountcode"] = me.untilsubcode.trim();
            me.value["printdate"] = me.Curdate();
            me.value["cluster"] = me.cluster;

            if (me.value.reportby == 'Account Code' && me.value.detaildatasub == 'Yes') {
                me.report = 'Subaccounttransactionwithdetailbyac';
            } else if (me.value.reportby == 'Account Code' && me.value.detaildatasub == 'No') {
                me.report = 'Subaccounttransactionnodetailbyac';
            } else if (me.value.reportby == 'Sub Account Code' && me.value.detaildatasub == 'Yes') {
                me.report = 'Subaccounttransactionwithdetailbysub';
            } else if (me.value.reportby == 'Sub Account Code' && me.value.detaildatasub == 'No') {
                me.report = 'Subaccounttransactionnodetailbysub';
            }

            me.html = me.generateFakeForm(me.value, me.report);
            me.win.down("#MyReportPanel").body.setHTML(me.html);
            $("#fakeReportFormID").submit();


        }


    },
    getCOAbyID: function (coa_id) {
        var me = '';
        me = this;
        me.senddata = {
            hideparam: 'getcoabyid',
            coa_id: coa_id,
        }
        me.urlrequest = 'gl/subaccounttransaction/create';
        me.AjaxRequest();
    },
    checkPositionCOA: function (flag) {
        var me = '';
        me = this;
        me.senddata = {
            hideparam: 'checklevelcoa',
            flagchange: flag,
            fromcoa: me.getValue(me, "sub_coa_from_id", "raw"),
            untilcoa: me.getValue(me, "sub_coa_until_id", "raw")
        }
        me.urlrequest = 'gl/subaccounttransaction/create';
        me.AjaxRequest();
    },
    customeFilter: function () {
        var me, storekelsub, storesubcode, fromcoaid, untilcoaid;
        me = this;

        fromcoaid = me.getValue(me, "sub_coa_from_id", "raw");
        untilcoaid = me.getValue(me, "sub_coa_until_id", "raw");

        Ext.Ajax.request({
            url: 'gl/subaccounttransaction/create',
            method: 'POST',
            params: {
                data: Ext.encode({
                    hideparam: 'customefilter',
                    fromcoa: fromcoaid,
                    untilcoa: untilcoaid,
                })
            },
            success: function (response) {
                var fromkelsub, untilkelsub, kelsubid_in;
                var info = Ext.JSON.decode(response.responseText);
                kelsubid_in = info.data.kelsub_id;

                storekelsub = me.getStore('Subaccountgroup');
                storekelsub.clearFilter(true);
                storekelsub.reload({
                    params: {
                        "hideparam": 'kelsubid_in',
                        "kelsubid_in": kelsubid_in,
                        "start": 0,
                        "limit": 1000000,
                    },
                    callback: function (recordskelsub, operationkelsub, successkelsub) {
                        var indexsub = storekelsub.getCount() - 1;
                        me.fromkelsub = recordskelsub[0]['data'].kelsub;
                        me.untilkelsub = recordskelsub[indexsub]['data'].kelsub;

                        if (recordskelsub[0]) {
                            var datastore = recordskelsub[0]['data'];
                            me.setValue(me, 'sub_kelsub_id', datastore.kelsub_id);
                            me.kelsubid_from = datastore.kelsub_id;

                            storesubcode = me.getStore('Subaccountcode');
                            storesubcode.reload({
                                params: {
                                    "hideparam": 'kelsubid_in',
                                    "kelsubid_in": datastore.kelsub_id,
                                    "start": 0,
                                    "limit": 1000000,
                                },
                                callback: function (recordscode, operationcode, successcode) {
                                    storesubcode.sort('code', 'ASC');
                                    if (successcode) {
                                        if (recordscode[0]) {
                                            var firstdatacode = recordscode[0]['data'];
                                            me.setValue(me, 'sub_fromsubgl_id', firstdatacode.subgl_id);
                                            me.setValue(me, 'sub_untilsubgl_id', firstdatacode.subgl_id);
                                        }
                                    }

                                }
                            });
                        }
                    }
                });

                me.storekelsub = storekelsub;
            },
            failure: function (response) {
                me.getFormdata().up('window').close();
            }
        });

    },
    filterSub: function () {
        var me, storesubcode;
        me = this;
        storesubcode = me.getStore('Subaccountcode');
        storesubcode.reload({
            params: {
                "hideparam": 'filtersub',
                "fromkelsub": me.getValue(me, "sub_kelsub_id", "raw"),
                "untilkelsub": me.untilkelsub,
                "fromcoa": me.getValue(me, "sub_coa_from_id", "raw"),
                "untilcoa": me.getValue(me, "sub_coa_until_id", "raw"),
                "start": 0,
                "limit": 1000000,
            },
            callback: function (recordscode, operationcode, successcode) {
                storesubcode.sort('code', 'ASC');
                if (successcode) {
                    if (recordscode[0]) {
                        var firstdatacode = recordscode[0]['data'];
                        me.setValue(me, 'sub_fromsubgl_id', firstdatacode.subgl_id);
                        me.setValue(me, 'sub_untilsubgl_id', firstdatacode.subgl_id);
                    }
                }
            }
        });
    },
    defaultRange: function () {
        var me = '';
        me = this;
        me.senddata = {
            hideparam: 'defaultrange'
        }
        me.urlrequest = 'gl/subaccounttransaction/create';
        me.AjaxRequest();
    },
    AjaxRequest: function () {
        var me;
        me = this;
        Ext.Ajax.request({
            url: me.urlrequest,
            method: 'POST',
            params: {
                data: Ext.encode(me.senddata)
            },
            success: function (response) {
                me.info = Ext.JSON.decode(response.responseText);
                me.setSuccessEvent();
            },
            failure: function (response) {
                me.getFormdata().up('window').close();
            }
        });
    },
    setSuccessEvent: function () {
        var me = this;
        if (me.info.parameter == 'default') {
            if (me.info.counter < 1) {
                Ext.getBody().unmask();
                me.buildWarningAlert(me.info.message);
            } else {
                Ext.getBody().unmask();
                Ext.Msg.show({
                    title: 'Success',
                    msg: 'Process  data successfully.',
                    icon: Ext.Msg.INFO,
                    buttons: Ext.Msg.OK,
                    fn: function () {
                        me.formDataClose();
                    }
                });
            }
        } else if (me.info.parameter == 'defaultrange') {
            var form = me.getFormdata();
            Ext.getBody().unmask();
            me.setValue(me, 'subfromdate', me.info.data.onedate);
            me.setValue(me, 'subuntildate', me.info.data.onedate);
            me.yeardata = me.info.data.yeardb;
            form.down("[name=subfromdate]").setMinValue(me.yeardata + '-01-01');
            form.down("[name=subfromdate]").setMaxValue(me.info.data.enddecember);
            form.down("[name=subuntildate]").setMinValue(me.yeardata + '-01-01');
            form.down("[name=subuntildate]").setMaxValue(me.info.data.enddecember);
        } else if (me.info.parameter == 'default') {
            Ext.getBody().unmask();
        } else if (me.info.parameter == 'getcoabyid') {
            me.setValue(me, "paramcoa", me.info.data[1][0].coa);

        } else if (me.info.parameter == 'checklevelcoa') {
            var counter = me.info.data.counter;
            var flagchange = me.info.data.flagchange;

            if (counter < 0 && flagchange == 'from') {
                // console.log('normal'+' '+flagchange);
            } else if (counter == 0 && flagchange == 'from') {
                // console.log('same'+' '+flagchange);
            } else if (counter > 0 && flagchange == 'from') {
                me.setValue(me, 'sub_coa_until_id', me.getValue(me, "sub_coa_from_id", "value"));
                // console.log('not valid'+' '+flagchange);
            }


            if (counter < 0 && flagchange == 'until') {
                // console.log('normal'+' '+flagchange);
            } else if (counter == 0 && flagchange == 'until') {
                // console.log('same'+' '+flagchange);
            } else if (counter > 0 && flagchange == 'until') {
                if (me.untilcoa_id != '0') {
                    me.setValue(me, 'sub_coa_until_id', me.untilcoa_id);
                }
//                /console.log('not valid'+' '+flagchange);
            }

        } else if (me.info.parameter == 'processreport') {
            Ext.getBody().unmask();
            me.statusprocess = me.info.success;
            if (me.statusprocess == true) {
                me.cluster = me.info.data.cluster;
                me.showReport();
            }
        }
    },
    panelAfterRender: function () {
        var me = this;
        Ext.Ajax.request({
            url: me.urlprocess,
            success: function (response) {
                var info = Ext.JSON.decode(response.responseText);
                me.project_name = info.project_name;
                me.pt_name = info.pt_name;
                me.userprint = info.userprint;
                me.userid = info.userid;
            },
        });
    },
    formDataAfterRenderCustome: function () {
        var me, storecoa, storekelsub, storesubcode = '';
        me = this;


        me.defaultRange();
        storecoa = me.getStore('Coacombo');
        storecoa.load({
            params: {
                "hideparam": 'reportsubaccount',
                "start": 0,
                "limit": 1000000,
            },
            callback: function (records, operation, success) {
                storecoa.sort('coa', 'ASC');
                if (success) {
                    if (records[0]) {
                        var firstdata = records[0]['data'];
                        me.setValue(me, 'sub_coa_from_id', firstdata.coa_id);
                        me.setValue(me, 'sub_coa_until_id', firstdata.coa_id);
                        me.setValue(me, 'sub_kelsub_id', firstdata.kelsub_id);

                        storekelsub = me.getStore('Subaccountgroup');
                        storekelsub.load({
                            params: {
                                "hideparam": 'default',
                                "start": 0,
                                "limit": 1000000,
                            },
                            callback: function (recordskelsub, operationkelsub, successkelsub) {
                                storekelsub.filterBy(function (rec, id) {
                                    return rec.data.kelsub_id >= firstdata.kelsub_id && rec.data.kelsub_id <= firstdata.kelsub_id;

                                });
                                me.fromkelsub = firstdata.kelsub;
                                me.untilkelsub = firstdata.kelsub;
                            }
                        });

                        storesubcode = me.getStore('Subaccountcode');
                        storesubcode.load({
                            params: {
                                "hideparam": 'livesearch',
                                "kelsub_id": firstdata.kelsub_id,
                                "start": 0,
                                "limit": 1000000,
                            },
                            callback: function (recordscode, operationcode, successcode) {
                                if (successcode) {
                                    if (recordscode[0]) {
                                        var firstdatacode = recordscode[0]['data'];
                                        me.setValue(me, 'sub_fromsubgl_id', firstdatacode.subgl_id);
                                        me.setValue(me, 'sub_untilsubgl_id', firstdatacode.subgl_id);
                                    }
                                }

                            }
                        });
                    }
                }
            }
        });

    },
});