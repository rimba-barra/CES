Ext.define('Cashier.controller.Subaccounttransaction', {
    extend: 'Cashier.library.template.controller.Controllergl',
    alias: 'controller.Subaccounttransaction',
    requires: [
    'Cashier.library.template.combobox.Coacomboboxgrid',
    'Cashier.library.template.combobox.Coagrid',
    'Cashier.library.template.combobox.Subaccountgroupcomboboxgrid',
    'Cashier.library.template.combobox.SubaccountcodeComboboxgrid',
    'Cashier.library.template.combobox.Subglcombobox',
    'Cashier.library.template.combobox.Subglcomboboxb',
    'Cashier.library.template.combobox.Ptprojectcombobox',
    'Cashier.library.template.combobox.Projectcombobox',
    'Cashier.library.template.combobox.Ptcombobox',
    'Cashier.library.template.combobox.Coacombobox',
    'Cashier.library.template.combobox.Subaccountgroupcombobox',
    ],
    views: [
    'subaccounttransaction.Panel',
    'subaccounttransaction.FormData'
    ],
    stores: [
    'Subaccounttransaction',
    'Coacombo',
    'Project',
    'Ptbyuser',
    'Subaccountgroup',
    'Subaccountcode',
    'Subgl',
    'Subglb',
    'Project',
    'Pt',
    'Coa',
    'Subaccountgroupfs',
    ],
    models: [
    'Subaccounttransaction',
    'Coa',
    'Project',
    'Pt',
    'Subaccountgroup',
    'Subaccountcode',
    'Project',
    'Pt',
    'Coa'    
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
    urlprocess: 'cashier/subaccounttransaction/read',
    kelsub_id: null,
    paramcoa: null, fromcoa_id: 0, fromcoa: null, untilcoa_id: 0, untilcoa: null,
    reportby: null, voucherby: null, subby: null, detailby: null, fromkelsub: null, untilkelsub: null,
    fromdate: null, untildate: null, fromsubcode: null, untilsubcode: null,
    stimulsoft: "resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=",
    paramsStr: null, win: null, params: null, dateNow: new Date(), html: null, winId: 'myReportWindow', checksub: null, report: null,
    statusprocess: null, project_name: null, pt_name: null, userid: null, userprint: null, urlrequest: null, senddata: null, info: null, form: null,
    storekelsub: null, kelsubid_from: null, kelsubid_to: null,
    cluster: null,
    project_id: null,
    fromsubgl_id : 0,
    untilsubgl_id : 0,
    init: function (application) {
        var me = this;
        this.control({
            'subaccounttransactionpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(600);
                    Ext.get('WINDOW-mnu' + me.bindPrefixName).setWidth(600);
                    me.panelAfterRender();
                }
            },
            'subaccounttransactionformdata': {
                afterrender: function (panel) {
                    this.formDataAfterRenderCustome();
                },
                boxready: function() {
                    var me = this;

                    $("#subaccounttransactionID input[name='sub_coa_from_id']").keyup(function()
                    {
                        this.value = this.value.replace(/(\d{2})(\d{2})/,'$1'+'.'+'$2')
                    });

                    $("#subaccounttransactionID input[name='sub_coa_until_id']").keyup(function()
                    {
                        this.value = this.value.replace(/(\d{2})(\d{2})/,'$1'+'.'+'$2')
                    });
                }
            },
            'subaccounttransactionformdata [name=sub_coa_from_id]': {
                change: function (me, newValue, oldValue, eOpts) {
                    if (oldValue !== 'undefined') {
                        me.fromcoa_id = oldValue;
                        this.filterSubAccGroup();

                    }

                },
                select: function (el) {
                    me.checkPositionCOA('from'); 
                    me.getFormdata().down("[name=sub_coa_until_id]").setValue('');
                    me.getFormdata().down("[name=sub_coa_until_id]").setValue(el.value);
                },
                blur: function (el) {
                    me.filterSubAccGroup();
                    me.getFormdata().down("[name=sub_coa_until_id]").setValue('');
                    me.getFormdata().down("[name=sub_coa_until_id]").setValue(el.value);
                },
                'keyup': function () {
                    var me, value;
                    me = this;
                    value = me.getFormdata().down("[name=sub_coa_from_id]").getRawValue();
                    this.autocompletecombo(value);
                },


            },
            'subaccounttransactionformdata [name=sub_coa_until_id]': {
                change: function (cb, newValue, oldValue, options) {
                    if (oldValue !== 'undefined') {
                        me.untilcoa_id = oldValue;
                        this.filterSubAccGroup();
                    }

                },
                select: function (cb, newValue, oldValue, options) {
                    this.checkPositionCOA('until');
                },
                blur: function () {
                    me.filterSubAccGroup();
                },
                'keyup': function () {
                    var me, value;
                    me = this;
                    value = me.getFormdata().down("[name=sub_coa_until_id]").getRawValue();
                    this.autocompletecombo(value);
                },


            },
            'subaccounttransactionformdata [name=sub_fromsubgl_id]': {

            select: function (cb, newValue, oldValue, options) {
                me.fromsubgl_id = cb.value;
                console.log(me.fromsubgl_id);
             },
            //  change:function(){
            //     me.filterSub(1);
            // },
            'keyup': function () {
             me.filterSub(1);  
         }


     },
     'subaccounttransactionformdata [name=sub_untilsubgl_id]': {

            select: function (cb, newValue, oldValue, options) {
                me.untilsubgl_id = cb.value;
            },
            // change:function(){
            //     me.filterSub(2);
            // },
            'keyup': function () {
                console.log(me.getFormdata().down("[name=sub_fromsubgl_id]").getValue());
             me.filterSub(2);  
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
        change: function () {
            var subby = me.getFormdata().down("[name=subdata]").getValue();

            me.getFormdata().down("[name=sub_fromsubgl_id]").setValue();
            me.getFormdata().down("[name=sub_untilsubgl_id]").setValue();

            me.getFormdata().down("[name=fromsub1]").setValue();
            me.getFormdata().down("[name=untilsub1]").setValue();
            me.getFormdata().down("[name=fromsub2]").setValue();
            me.getFormdata().down("[name=untilsub2]").setValue();

            if (subby) {
                me.filterSub(1);
                me.filterSub(2);
            }else{
                me.filterSubbySub(1);
                me.filterSubbySub(2);
            }
        }
    },
    'subaccounttransactionformdata [name=subacccode_all]': {
        change: function () {
           var flag = 2;
           me.getclean(flag);
       }
   },
   'subaccounttransactionformdata [name=subaccgroup_all]': {
    change: function (a) {
       var flag = 1;
       me.getclean(flag);
       var subaccgroup_all = me.getFormdata().down("[name=subaccgroup_all]").getValue();
       if (subaccgroup_all) {
        me.filterSubbySub();
    }
}
},
'subaccounttransactionformdata [name=subdata]': {
    change: function () {
        me.conditionSub();

        var subby = me.getFormdata().down("[name=subdata]").getValue();
        me.getFormdata().down("[name=fromsub1]").setValue();
        me.getFormdata().down("[name=untilsub1]").setValue();
        me.getFormdata().down("[name=fromsub2]").setValue();
        me.getFormdata().down("[name=untilsub2]").setValue();
        if (subby) {
            me.filterSub(1);
            me.filterSub(2);
        }else{
            me.filterSubbySub(1);
            me.filterSubbySub(2);
        }

    }
},
'subaccounttransactionformdata [name=projectpt_id]': {
    change: function (el) {
        var me = this;
        if (el.valueModels) {
            var data = el.valueModels[0].data;

            me.getFormdata().down("[name=project_id]").setValue(data.project_id);
            me.getFormdata().down("[name=pt_id]").setValue(data.pt_id);
            
            me.setprojectpt(el.name, el.ownerCt);
            this.loadCoabypt(data.pt_id);
            this.filterSubAccGroup();
        }
    }
},
'subaccounttransactionformdata [name=project_id]': {
    change: function (el) {
                    // this.loadPtbyProject();
                }
                
            },
            'subaccounttransactionformdata [name=fromsub1]': {
                // change: function () {
                //     var subby = me.getFormdata().down("[name=subdata]").getValue();
                //     if (!subby) {
                //         // me.filterCodeSubglStart('START','code2');
                //         me.filterSubbySub(1);
                //     }
                // },
                'keyup': function () {
                    var subby = me.getFormdata().down("[name=subdata]").getValue();
                    if (!subby) {
                        var codeStore = me.getStore('storeCode2');
                        me.filterSubbySub(1);
                    }  
                }
            },
            'subaccounttransactionformdata [name=fromsub2]': {
                change: function () {
                    var combo2 = me.getFormdata().down("[name=fromsub2]").getValue();
                }
            },
            'subaccounttransactionformdata [name=untilsub1]': {
                // change: function () {
                //     var subby = me.getFormdata().down("[name=subdata]").getValue();
                //     if (!subby) {
                //         // me.filterCodeSubglStart('END','code2');
                //         var codeStore = me.getStore('storeCode2');
                //         me.filterSubbySub(2);
                //         me.filterSubbyCode1();
                //     }
                // },
                'keyup': function () {
                    var subby = me.getFormdata().down("[name=subdata]").getValue();
                    if (!subby) {
                        var codeStore = me.getStore('storeCode2');
                        me.filterSubbySub(2);
                        me.filterSubbyCode1();
                    }  
                }
            },
            'subaccounttransactionformdata [name=formatreport]': {
                select: function (el) {
                    var me = this;
                    var form = me.getFormdata();

                    if (el.value == 'TB-VS-SUBACC') {
                        form.down("[itemId=item_sac]").setVisible(false);
                        form.down("[itemId=item_rt]").setVisible(false);
                        form.down("[itemId=item_sag]").setVisible(false);
                        form.down("[itemId=item_panel_radio]").setVisible(false);
                        form.down("[itemId=item_code1]").setVisible(false);
                        form.down("[itemId=item_code2]").setVisible(false);
                        form.down("[itemId=item_code3]").setVisible(false);
                        form.down("[itemId=item_code4]").setVisible(false);
                        // form.down("[itemId=item_code]").setVisible(false);
                        
                        
                    }else{
                        form.down("[itemId=item_sac]").setVisible(true);
                        form.down("[itemId=item_rt]").setVisible(true);
                        form.down("[itemId=item_sag]").setVisible(true);
                        form.down("[itemId=item_panel_radio]").setVisible(true);
                        me.conditionSub();
                    }
                }
            },
            
        });
},
autocompletecombo: function (value) {
    var me, storecoa, value;
    me = this;
    storecoa = me.getStore('Coacombo');
    storecoa.clearFilter();
    storecoa.filter('coa', value);
},
conditionSub: function () {
    var me, subby;
    me = this;

    subby = me.getFormdata().down("[name=subdata]").getValue();
    if (subby == true) {
            // Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(600);
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
            // Ext.get('WINDOW-mnu' + me.bindPrefixName).setHeight(600);
            me.getFormdata().down("[name=subgl]").setVisible(false);
            me.getFormdata().down("[name=sub1]").setVisible(true);
            me.getFormdata().down("[name=sub2]").setVisible(true);
            me.getFormdata().down("[name=sub3]").setVisible(true);
            me.getFormdata().down("[name=sub4]").setVisible(true);
            
            me.fromsubcode = me.fromsubgl_id;
            me.untilsubcode = me.untilsubgl_id;
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
        var me, form, reportby, voucherby, subby, detailby,indexsub, storekelsub, fromkelsub, untilkelsub, kelsubid, parameter = '';
        me = this;

        form = me.getFormdata();
        me.reportby = form.down("[name=sat_reportby]").getValue();
        me.voucherby = form.down("[name=voucherdata]").getValue();
        me.subby = form.down("[name=subdata]").getValue();
        me.detailby = form.down("[name=detaildatasub]").getValue();

        storekelsub = me.getStore('Subaccountgroup');
        indexsub = storekelsub.getCount() - 1;
        me.kelsubid = form.down("[name=sub_kelsub_id]").getValue();
        me.formatreport = form.down("[name=formatreport]").getValue();
     //   me.untilkelsub = form.down("[name=sub_kelsub_id]").getValue();
     me.fromdate = me.getValue(me, "subfromdate", "raw");
     me.untildate = me.getValue(me, "subuntildate", "raw");
     me.fromcoa = me.getValue(me, "sub_coa_from_id", "raw");
     me.untilcoa = me.getValue(me, "sub_coa_until_id", "raw");
     me.fromsubcode = me.fromsubgl_id; 
     me.untilsubcode = me.untilsubgl_id; 
     me.reporttype = form.down("[name=reporttype]").getValue();

     if (!me.subby) {
        var fromsub1 = me.getFormdata().down("[name=fromsub1]").getRawValue();
        var untilsub1 = me.getFormdata().down("[name=untilsub1]").getRawValue();
        var fromsub2 = me.getFormdata().down("[name=fromsub2]").getRawValue();
        var untilsub2 = me.getFormdata().down("[name=untilsub2]").getRawValue();
        var fromsub3 = me.getFormdata().down("[name=fromsub3]").getRawValue();
        var untilsub3 = me.getFormdata().down("[name=untilsub3]").getRawValue();
        var fromsub4 = me.getFormdata().down("[name=fromsub4]").getRawValue();
        var untilsub4 = me.getFormdata().down("[name=untilsub4]").getRawValue();

        fromsub1 =  fromsub1;
        untilsub1 =  untilsub1;
        fromsub2 =  fromsub2;
        untilsub2 =  untilsub2;
        fromsub3 =  fromsub3;
        untilsub3 =  untilsub3;
        fromsub4 =  fromsub4;
        untilsub4 =  untilsub4;
    }else{
        var fromsub1 = null;
        var untilsub1 = null;
        var fromsub2 = null;
        var untilsub2 = null;
        var fromsub3 = null;
        var untilsub3 = null;
        var fromsub4 = null;
        var untilsub4 = null;
    }


        //me.getValue(me, "sub_fromsubgl_id", "value");
       // me.untilsubcode = form.down("[name=sub_untilsubgl_id]").getValue(); //me.getValue(me, "sub_untilsubgl_id", "value");
       if(me.reporttype == 'DEFAULT'){
        me.senddata = {
            hideparam: 'justreturn',
            reportby: me.reportby,
            voucherby: me.voucherby,
            subby: me.subby,
            detailby: me.detailby,
            fromdate: me.fromdate,
            untildate: me.untildate,
            fromcoa: me.fromcoa,
            untilcoa: me.untilcoa,
            kelsubid: me.kelsubid,
            fromsubcode: me.fromsubcode,
            untilsubcode: me.untilsubcode,
            formatreport: me.formatreport,
            reporttype: me.reporttype,
              //  untilsubcode: me.untilsubcode,
              fromsub1: fromsub1,
              untilsub1: untilsub1,
              fromsub2: fromsub2,
              untilsub2: untilsub2,
              fromsub3: fromsub3,
              untilsub3: untilsub3,
              fromsub4: fromsub4,
              untilsub4: untilsub4,
          }

          Ext.getBody().mask("Please wait...");
          me.urlrequest = 'cashier/subaccounttransaction/create';
          me.AjaxRequest();
      }else{
       me.showReport();
   }




},
showReport: function () {
    var me;
    me = this;
    var winId = me.controllerName + '_' + Ext.Date.format(new Date(), 'His');
    var title = 'Result ' + me.getFormdata().up('window').title;
    me.form = me.getFormdata().getForm();
    var e = me.getFormdata().down("[name=projectpt_id]");
    var x = e.getStore().findRecord("multiprojectdetail_id", me.getFormdata().down("[name=projectpt_id]").getValue(),0,false,true,true);
    
    var reporttype = me.getFormdata().down("[name=reporttype]").getValue();

    if(reporttype=='DEFAULT'){
        me.instantWindowWithMinimize('Panel', 800, title, 'state-report', winId, me.controllerName);
    }else if(reporttype=='EXCEL' || reporttype=='EXCEL 2'){

    }else{
        me.instantWindowWithMinimize('Panel', 800, title, 'state-report', winId, me.controllerName);
    }

        //me.instantWindow('Panel', 800, 'Result ', 'state-report', me.winId, 'masterreport');
        me.paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        me.win = desktop.getWindow(winId);

        if (true) {
            resetTimer();
            me.value = me.form.getValues();
            //start default param
//            me.value["project_name"] = me.project_name;
//            me.value["pt_name"] = me.pt_name;
            //Rizal 4 Juli 2019
            me.value["project_name"] = x.data['project_name'];
            me.value["pt_name"] = x.data['ptname'];
            //
            me.value["userprint"] = me.userprint;
            me.value["userid"] = me.userid;
            me.value["tgl_sekarang"] = Ext.Date.format(new Date(), 'd/m/Y');
            me.value["time_sekarang"] = Ext.Date.format(new Date(), 'H:i:s');
            //Rizal 4 Juli 2019
//            me.value["project_id"] = apps.project;
            //me.value["pt_id"] = apps.pt;
            me.value["project_id"] = x.data['project_id'];
            me.value["pt_id"] = me.getFormdata().down("[name=pt_id]").getValue();
            //
            //end default param



            me.value["reportby"] = (me.reportby == true) ? 1 : 2;
            me.value["voucherdata"] = (me.voucherby == true) ? 1 : 2;
            me.value["subdata"] = (me.subby == true) ? 1 : 2;
            me.value["detaildatasub"] = (me.detailby == true) ? 1 : 2;
            me.value["fromdate"] = me.reformatDateString(me.fromdate);
            me.value["untildate"] = me.reformatDateString(me.untildate);
            me.value["tanggal"] = me.value["fromdate"] + ' s/d ' + me.value["untildate"];
            me.value["coastart_id"] = me.fromcoa;
            me.value["coaend_id"] = me.untilcoa;
            me.value["fromkelsub"] = me.getFormdata().down("[name=sub_kelsub_id]").getRawValue();
            me.value["untilkelsub"] = me.getFormdata().down("[name=sub_kelsub_id]").getRawValue();


            var bysubselected = me.getFormdata().down("[name=subdata]").getValue();
            if (bysubselected) { 
                me.value["fromsubacccode"] = me.getFormdata().down("[name=sub_fromsubgl_id]").getRawValue();
                me.value["untilsubacccode"] = me.getFormdata().down("[name=sub_untilsubgl_id]").getRawValue();
                // me.value["fromsubacc_code"] = me.getFormdata().down("[name=sub_fromsubgl_id]").getValue();
                // me.value["untilsubacc_code"] = me.getFormdata().down("[name=sub_untilsubgl_id]").getValue();
                me.value["fromsubacc_code"] = me.fromsubgl_id;
                me.value["untilsubacc_code"] = me.untilsubgl_id;

                me.value["fromcode1"]   = null;
                me.value["fromcode2"]   = null;
                me.value["untilcode1"]  = null;
                me.value["untilcode2"]  = null;
            }else{
                // id sub ditentukan hanya dari code 2 
                me.value["fromsubacccode"] = me.getFormdata().down("[name=fromsub2]").getRawValue();
                me.value["untilsubacccode"] = me.getFormdata().down("[name=untilsub2]").getRawValue();
                me.value["fromsubacc_code"] = 0;
                me.value["untilsubacc_code"] = 0;

                me.value["fromcode1"] = me.getFormdata().down("[name=fromsub1]").getRawValue();
                me.value["fromcode2"] = me.getFormdata().down("[name=fromsub2]").getRawValue();
                me.value["untilcode1"] = me.getFormdata().down("[name=untilsub1]").getRawValue();
                me.value["untilcode2"] = me.getFormdata().down("[name=untilsub2]").getRawValue();
            }
            me.value["kelsub_id"] = me.kelsubid;
            me.value["printdate"] = me.Curdate();
            me.value["cluster"] = me.cluster;
            var dy = new Date(me.value["fromdate"]);
            me.value["tahun"] = dy.getFullYear();

            if (me.value.reportby == 'Account Code' && me.value.detaildatasub == 'Yes') {
                me.report = 'Subaccounttransactionwithdetailbyac';
            } else if (me.value.reportby == 'Account Code' && me.value.detaildatasub == 'No') {
                me.report = 'Subaccounttransactionnodetailbyac';
            } else if (me.value.reportby == 'Sub Account Code' && me.value.detaildatasub == 'Yes') {
                me.report = 'Subaccounttransactionwithdetailbysub';
            } else if (me.value.reportby == 'Sub Account Code' && me.value.detaildatasub == 'No') {
                me.report = 'Subaccounttransactionnodetailbysub';
            }

            var params = me.value;


            if(me.formatreport == 'FORMAT-1'){
                var reportFile = 'SubTransaction';
            }else if(me.formatreport == 'ACC-VS-SUBACC'){
                var reportFile = 'SubTransaction_accvssubacc';
            }else if(me.formatreport == 'TB-VS-SUBACC'){
                var reportFile = 'CheckTrialBalanceSubTransaction';
            }else if(me.formatreport == 'FORMAT-3'){
                var reportFile = 'SubTransaction_format3';
            }else{
                var reportFile = 'SubTransaction_format2';
            }

            if(reporttype == 'DEFAULT'){
                me.html = me.ReportviewerV4(params, reportFile, me.win.id, 1); //whole report
                me.win.down("#MyReportPanel_" + me.win.id).body.setHTML(me.html);
                $("#Reportform_" + me.win.id).submit();
            }else{
                me.generatereportexcel(params);
                return false;  
            }

        }


    },
    getCOAbyID: function (coa_id) {
        var me = '';
        me = this;
        me.senddata = {
            hideparam: 'getcoabyid',
            coa_id: coa_id,
        }
        me.urlrequest = 'cashier/subaccounttransaction/create';
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
        me.urlrequest = 'cashier/subaccounttransaction/create';
        me.AjaxRequest();
    },
    getclean: function(flag){
        var me = this;
        if(flag == 2){
        	me.fromsubgl_id = '';
        	me.untilsubgl_id = '';
            me.setValue(me, 'sub_fromsubgl_id','');
            me.setValue(me, 'sub_untilsubgl_id','');
        }else{
        	me.setValue(me, 'sub_kelsub_id','');
        }
    },
    filterSubAccGroup: function () {
        var me, storesubcode,ptid;
        me = this;
        ptid = me.getFormdata().down("[name=pt_id]").getValue();
        projectid = me.getFormdata().down("[name=project_id]").getValue();

        
        if(ptid != null){
            ptid = me.getFormdata().down("[name=pt_id]").getValue();
        }else{
            ptid = apps.pt;
        }

        if(projectid != null){
            projectid = me.getFormdata().down("[name=project_id]").getValue();
        }else{
            projectid = apps.project;
        }

        var coafrom = me.getValue(me, "sub_coa_from_id", "raw");
        var coauntil = me.getValue(me, "sub_coa_until_id", "raw") == "" ? coafrom : me.getValue(me, "sub_coa_until_id", "raw");

        storesubcode = me.getStore('Subaccountgroupfs');
        storesubcode.reload({
            params: {
                "hideparam": 'filtersubaccgroup',
                "fromcoa": coafrom,
                "untilcoa": coauntil,
                "start": 0,
                "pt_id": ptid,
                "project_id":projectid, 
                "limit": 10,
            },
            callback: function (recordscode, operationcode, successcode) {
                if (recordscode.length == 0) {
                    me.getFormdata().down("[name=sub_kelsub_id]").setValue("");
                    me.getFormdata().down("[name=subaccgroup_all]").setValue(true);
                } else {
                    if (successcode) {
                        if (recordscode[0]) {
                            var firstdatacode = recordscode[0]['data'];

                            me.setValue(me, 'sub_kelsub_id', firstdatacode.kelsub_id); 
                            me.getFormdata().down("[name=subaccgroup_all]").setValue(false);      
                        }
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
        me.urlrequest = 'cashier/subaccounttransaction/create';
        me.AjaxRequest();
    },
    generatereportexcel: function(params){   
       var me,report;
       me = this;  
       params['hideparam'] = 'generatereportexcel',
       me.senddata = params,
       me.urlrequest = 'cashier/subaccounttransaction/create';
       Ext.getBody().mask("Please wait...");
       me.AjaxRequest();       
   }, 
   AjaxRequest: function () {
    var me;
    me = this;

    Ext.Ajax.request({
        url: me.urlrequest,
        method: 'POST',
        timeout:100000000,  
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

        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        me.setValue(me, 'subfromdate', firstDay);
        me.setValue(me, 'subuntildate', lastDay);
        me.yeardata = me.info.data.yeardb;
            //form.down("[name=subfromdate]").setMinValue(me.yeardata + '-01-01');
            //form.down("[name=subfromdate]").setMaxValue(me.info.data.enddecember);
            //form.down("[name=subuntildate]").setMinValue(me.yeardata + '-01-01');
            //form.down("[name=subuntildate]").setMaxValue(me.info.data.enddecember);
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
} else if (me.info.parameter == 'justreturn') {
    Ext.getBody().unmask();
    me.showReport();
}else if (me.info.parameter == 'generatereportexcel') {
    Ext.getBody().unmask();
    var file_path = me.info.data.url;  
    var a = document.createElement('A');
            // var filename = file_path.lastIndexOf('/') + 1;
            // if (me.info.data.output[0] != filename) {
            //     Ext.Msg.show({
            //         title: 'ERROR',
            //         msg: "An error has occurred.",
            //         buttons: Ext.Msg.OK,
            //         icon: Ext.Msg.ERROR
            //     });
            //     return false;
            // } // cancel, nanti di research dulu karna urgent
            a.href = file_path;
            a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            Ext.getBody().unmask();
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

        var me, storecoa, storekelsub, storesubcode, storeproject, storept = '';
        me = this;

        var f = me.getFormdata();

        me.defaultRange();
        storeproject = me.getStore('Project');
        storeproject.load({
            params: {
                "hideparam": 'projectpt_v2',
                "project_id": apps.project,
                "start": 0,
                "limit": 1000000,
            }, callback: function (recordscode, operationcode, successcode) {
                
                if (successcode) {
                    var info = Ext.JSON.decode(recordscode.responseText);
                    var item = recordscode;
                    store = f.down('[name=projectpt_id]').getStore("ptstore");
                    store.removeAll();
                    store.clearFilter();
                    var currentprojectpt_id = 0;
                    var currentproject_id = apps.project;
                    var currentpt = apps.pt;
                    for (let i = 0; i < item.length; i++) {
                        if (apps.pt == item[i].raw.pt_id && apps.project == item[i].raw.project_id) {
                            currentprojectpt_id = item[i].raw.multiprojectdetail_id;
                            currentproject_id = item[i].raw.project_id;
                            currentpt = item[i].raw.pt_id;
                        }

                        store.add({
                            multiprojectdetail_id : item[i].raw.multiprojectdetail_id, 
                            pt_id: item[i].raw.pt_id, 
                            code: item[i].raw.code,
                            name: item[i].raw.name,
                            ptname: item[i].raw.pt_name,
                            project_name: item[i].raw.project_name,
                            project_id: item[i].raw.project_id
                        });
                    }
                    f.down('[name=pt_id]').setValue(currentpt);

                    f.down('[name=projectpt_id]').setValue(currentprojectpt_id);
                    f.down('[name=project_id]').setValue(currentproject_id);
                } else {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to generate init.");
                }
            }

        });
        var store = f.down("[name=sub_fromsubgl_id]").getStore();
        var storeb = f.down("[name=sub_untilsubgl_id]").getStore();

        // store = me.getStore("Subgl");
        // storeb = me.getStore("Subglb");

        f.down("[name=sub_fromsubgl_id]").on('keyup' , function(e, t, eOpts){
          var project_id = f.down("[name=project_id]").getValue();
          var pt_id = f.down("[name=pt_id]").getValue();
          var kelsub_id = f.down("[name=sub_kelsub_id]").getValue();
          store.proxy.extraParams = {
            "hideparam": 'getsubglbykelsub',
            "project_id": project_id,
            "pt_id": pt_id,
            "kelsub_id": kelsub_id
        }
    });

        f.down("[name=sub_untilsubgl_id]").on('keyup' , function(e, t, eOpts){
          var project_id = f.down("[name=project_id]").getValue();
          var pt_id = f.down("[name=pt_id]").getValue();
          var kelsub_id = f.down("[name=sub_kelsub_id]").getValue();
          storeb.proxy.extraParams = {
            "hideparam": 'getsubglbykelsub',
            "project_id": project_id,
            "pt_id": pt_id,
            "kelsub_id": kelsub_id
        }
    });

        // me.loadPtbyProject();


    },
    loadCoabypt: function(newValue){

        var me = this;
        me.pt_id = newValue;

        var f = me.getFormdata();
        var project_id = f.down("[name=project_id]").getValue();

        storecoa = me.getStore('Coa');
        storecoa.load({
            params: {
                "hideparam": 'coagridbyuserptv2',
                "start": 0,
                "limit": 1000000,
                "pt_id_owner": newValue ,
                "project_id": project_id
            },
            callback: function (records, operation, success) {
                var a = records.length;
                if (records[0]) {
                    var row = records[0]['data'];
                    me.setValueCombobox(me, 'sub_coa_from_id', row.coa_id,row.coa);
                  //  me.setValueCombobox(me, 'sub_coa_until_id', row.coa_id,row.coa);
              }

              if (records[a-1]) {
                var row = records[a-1]['data'];
                me.setValueCombobox(me, 'sub_coa_until_id', row.coa_id,row.coa);
                  //  me.setValueCombobox(me, 'sub_coa_until_id', row.coa_id,row.coa);
              }

              /*  records.forEach(function(entry) {
                    var row = entry.data;
                    if(row.coa=='10.00.000'){
                        me.setValueCombobox(me, 'sub_coa_from_id', row.coa_id,row.coa);
                    }
                    if(row.coa=='90.00.000'){
                        me.setValueCombobox(me, 'sub_coa_until_id', row.coa_id,row.coa);
                    }
                }); */
            }
        });

    },
    loadPtbyProject: function(){

     var me = this;
     projectid = me.getFormdata().down("[name=project_id]").getValue();


     if(projectid != null){
        projectid = me.getFormdata().down("[name=project_id]").getValue();
    }else{
        projectid = apps.project;
    }

    var f = me.getFormdata();
    storecoa = me.getStore('Pt');
    storecoa.load({
        params: {
            "hideparam": 'getptbyuserproject',
            "start": 0,
            "limit": 1000000,
            "project_id": projectid,
            "user_id": apps.uid
        },
        callback: function (records, operation, success) {
            if (records[0]) {
                var row = records[0]['data'];
                if (projectid == apps.project) {
                        // me.setValueCombobox(me, 'pt_id', row.pt_id,row.ptname);
                        f.down("[name=pt_id]").setValue(parseInt(apps.pt));
                    } else {
                        me.setValueCombobox(me, 'pt_id', row.pt_id,row.ptname);
                    }
                }
                
            }
        });

    setTimeout(function(){ 
               //load coa
               me.loadCoabypt(f.down("[name=pt_id]").getValue());
           }, 1000);

},

// filterSub2: function () {
//     var me, storesubcode,ptid,kelsubid;
//     me = this;
//     ptid = me.getFormdata().down("[name=pt_id]").getValue();
//     projectid = me.getFormdata().down("[name=project_id]").getValue();
//     kelsubid = me.getFormdata().down("[name=sub_kelsub_id]").getValue();

//     if(ptid != null){
//         ptid = me.getFormdata().down("[name=pt_id]").getValue();
//     }else{
//         ptid = apps.pt;
//     }

//     Ext.getBody().mask("Please wait...");
//     storesubcode = me.getStore('Subaccountcode');
//     storesubcode.load({
//         params: {
//             "hideparam": 'filtersub',
//             "fromkelsub": me.getValue(me, "sub_kelsub_id", "raw"),
//             "untilkelsub": me.untilkelsub,
//             "fromcoa": me.getValue(me, "sub_coa_from_id", "raw"),
//             "untilcoa": me.getValue(me, "sub_coa_until_id", "raw"),
//             "start": 0,
//             "pt_id_owner": ptid,
//             "kelsub_id" : kelsubid,
//             "limit": 10,
//         },
//         callback: function (recordscode, operationcode, successcode) {
//             storesubcode.sort('code', 'ASC');
//             var f = me.getFormdata();
//             if (successcode) {
//                 var store = f.down("[name=sub_fromsubgl_id]").getStore();
//                 var storeb = f.down("[name=sub_untilsubgl_id]").getStore();

//                 store.getProxy().setExtraParam('hideparam', 'getsubglbykelsub');
//                 store.getProxy().setExtraParam('project_id', parseInt(projectid));
//                 store.getProxy().setExtraParam('kelsub_id', parseInt(kelsubid));
//                 store.getProxy().setExtraParam('pt_id', parseInt(ptid));
//                 store.load();

//                 storeb.getProxy().setExtraParam('hideparam', 'getsubglbykelsub');
//                 storeb.getProxy().setExtraParam('project_id', parseInt(projectid));
//                 storeb.getProxy().setExtraParam('kelsub_id', parseInt(kelsubid));
//                 storeb.getProxy().setExtraParam('pt_id', parseInt(ptid));
//                 storeb.load();

//                 var last = recordscode.length - 1;
//                 if (recordscode[0]) {
//                     var firstdatacode = recordscode[0]['data'];
//                     me.setValue(me, 'sub_fromsubgl_id', firstdatacode.subgl_id);

//                 }else{
//                     me.setValue(me, 'sub_fromsubgl_id', '');
//                 }
//                 if(recordscode[last]){
//                     var lastdatacode = recordscode[last]['data'];
//                     me.setValue(me, 'sub_untilsubgl_id', lastdatacode.subgl_id);

//                 }else{
//                     me.setValue(me, 'sub_untilsubgl_id', '');
//                 }
//             }
//             Ext.getBody().unmask();
//         }

//     });

// },


filterSub: function (type) {
    var me, storesubcode,ptid,kelsubid;
    me = this;
    ptid = me.getFormdata().down("[name=pt_id]").getValue();
    projectid = me.getFormdata().down("[name=project_id]").getValue();
    kelsubid = me.getFormdata().down("[name=sub_kelsub_id]").getValue();

    if(ptid != null){
        ptid = me.getFormdata().down("[name=pt_id]").getValue();
    }else{
        ptid = apps.pt;
    }

    if(projectid != null){
        projectid = me.getFormdata().down("[name=project_id]").getValue();
    }else{
        projectid = apps.project;
    }

    subaccountall = me.getFormdata().down("[name=subaccgroup_all]").getValue();
    if (type == 1) {
        var customCode = me.getFormdata().down("[name=sub_fromsubgl_id]").getRawValue();
    }else{
        var customCode = me.getFormdata().down("[name=sub_untilsubgl_id]").getRawValue();
    }
    var checkallsub = 0;
    if (subaccountall == 1) {
        checkallsub = 1;
        kelsubid = 0;
    }else{
        checkallsub = 0;
        kelsubid = me.getFormdata().down("[name=sub_kelsub_id]").getValue();
    }

    Ext.getBody().mask("Please wait...");
    storesubcode = me.getStore('Subaccountcode');
    storesubcode.load({
        params: {
            "hideparam": 'filterbysub',
            "fromkelsub": me.getValue(me, "sub_kelsub_id", "raw"),
            "untilkelsub": me.untilkelsub,
            "fromcoa": me.getValue(me, "sub_coa_from_id", "raw"),
            "untilcoa": me.getValue(me, "sub_coa_until_id", "raw"),
            "start": 0,
            "pt_id_owner": ptid,
            "project_id": projectid,
            "kelsub_id" : kelsubid,
            "checkallsub" :checkallsub,
            "customCode" : customCode,
            "type" : 0,
            "limit": 10,
        },
        callback: function (recordscode, operationcode, successcode) {
            storesubcode.sort('code', 'ASC');
            var f = me.getFormdata();

            if (type == 1) {    
                var store = f.down("[name=sub_fromsubgl_id]").getStore();
            }else{
                var store = f.down("[name=sub_untilsubgl_id]").getStore();
            }
            store.removeAll();
            store.clearFilter();
            if (successcode) {
                if (successcode) {

                    var last = recordscode.length - 1;
                    // console.log(recordscode);
                    for (let i = 0; i < recordscode.length; i++) {
                        var firstdatacode = recordscode[i]['raw'];
                        store.add({
                            subgl_id: firstdatacode.subgl_id, 
                            code: firstdatacode.code, 
                            code1: firstdatacode.code1,
                            code2: firstdatacode.code2,
                            code3: firstdatacode.code3,
                            code4: firstdatacode.code4,
                            kelsub_id : firstdatacode.kelsub_id,
                            kelsub : firstdatacode.kelsub,
                            description : firstdatacode.description
                        });
                    }
                }
            }

            Ext.getBody().unmask();
        }

    });

},

filterSubbySub: function (type) {
    var me, storesubcode,ptid,kelsubid;
    me = this;
    ptid = me.getFormdata().down("[name=pt_id]").getValue();
    projectid = me.getFormdata().down("[name=project_id]").getValue();

    subaccountall = me.getFormdata().down("[name=subaccgroup_all]").getValue();
    if (type == 1) {
        var customCode = me.getFormdata().down("[name=fromsub1]").getValue();
    }else{
        var customCode = me.getFormdata().down("[name=untilsub1]").getValue();
    }
    var checkallsub = 0
    if (subaccountall == 1) {
        checkallsub = 1;
        kelsubid = 0;
    }else{
        checkallsub = 0;
        kelsubid = me.getFormdata().down("[name=sub_kelsub_id]").getValue();
    }

    if(ptid != null){
        ptid = me.getFormdata().down("[name=pt_id]").getValue();
    }else{
        ptid = apps.pt;
    }

    if(projectid != null){
        projectid = me.getFormdata().down("[name=project_id]").getValue();
    }else{
        projectid = apps.project;
    }

    Ext.getBody().mask("Please wait...");
    storesubcode = me.getStore('Subaccountcode');
    storesubcode.load({
        params: {
            "hideparam": 'filterbysub',
            "fromkelsub": me.getValue(me, "sub_kelsub_id", "raw"),
            "untilkelsub": me.untilkelsub,
            "fromcoa": me.getValue(me, "sub_coa_from_id", "raw"),
            "untilcoa": me.getValue(me, "sub_coa_until_id", "raw"),
            "start": 0,
            "pt_id_owner": ptid,
            "project_id": projectid,
            "kelsub_id" : kelsubid,
            "checkallsub" :checkallsub,
            "customCode" : customCode,
            "type" : 0,
            "limit": 10,
        },
        callback: function (recordscode, operationcode, successcode) {
            storesubcode.sort('code', 'ASC');
            if (type == 1) {
                var store = me.getStore('storeCode');
            }else{
                var store = me.getStore('storeuntilCode');
            }
            store.removeAll();
            store.clearFilter();
            if (successcode) {

                var last = recordscode.length - 1;
                for (let i = 0; i < recordscode.length; i++) {
                    var firstdatacode = recordscode[i]['raw'];
                    store.add({
                        subgl_id: firstdatacode.subgl_id, 
                        code: firstdatacode.code, 
                        code1: firstdatacode.code1,
                        code2: firstdatacode.code2,
                        code3: firstdatacode.code3,
                        code4: firstdatacode.code4,
                        kelsub_id : firstdatacode.kelsub_id,
                        description : firstdatacode.description
                    });
                }
            }
            Ext.getBody().unmask();
        }

    });

},

filterSubbyCode1: function () {
    var me, storesubcode,ptid,kelsubid;
    me = this;
    ptid = me.getFormdata().down("[name=pt_id]").getValue();

    subaccountall = me.getFormdata().down("[name=subaccgroup_all]").getValue();
    var customCode1 = me.getFormdata().down("[name=fromsub1]").getValue();
    var customCode2 = me.getFormdata().down("[name=untilsub1]").getValue()
    var checkallsub = 0;

    var projectid = me.getFormdata().down("[name=project_id]").getValue();

    if (subaccountall == 1) {
        checkallsub = 1;
        kelsubid = 0;
    }else{
        checkallsub = 0;
        kelsubid = me.getFormdata().down("[name=sub_kelsub_id]").getValue();
    }

    if(ptid != null){
        ptid = me.getFormdata().down("[name=pt_id]").getValue();
    }else{
        ptid = apps.pt;
    }

    if(projectid != null){
        projectid = me.getFormdata().down("[name=project_id]").getValue();
    }else{
        projectid = apps.project;
    }

    Ext.getBody().mask("Please wait...");
    storesubcode = me.getStore('Subaccountcode');
    storesubcode.load({
        params: {
            "hideparam": 'filterSubbyCode1',
            "fromkelsub": me.getValue(me, "sub_kelsub_id", "raw"),
            "untilkelsub": me.untilkelsub,
            "fromcoa": me.getValue(me, "sub_coa_from_id", "raw"),
            "untilcoa": me.getValue(me, "sub_coa_until_id", "raw"),
            "start": 0,
            "pt_id_owner": ptid,
            "kelsub_id" : kelsubid,
            "checkallsub" :checkallsub,
            "customCode" : "",
            "customCode1" : customCode1,
            "customCode2" : customCode2,
            "project_id": projectid,
            "type" : 0,
            "limit": 10,
        },
        callback: function (recordscode, operationcode, successcode) {
            storesubcode.sort('code', 'ASC');
            var store = me.getStore('storeCode2');
            if (successcode) {
                store.removeAll();
                store.clearFilter();
                var last = recordscode.length - 1;
                for (let i = 0; i < recordscode.length; i++) {
                    var firstdatacode = recordscode[i]['raw'];
                    store.add({
                        subgl_id: firstdatacode.subgl_id, 
                        // code: firstdatacode.code, 
                        // code1: firstdatacode.code1,
                        code2: firstdatacode.code2,
                        // code2: firstdatacode.code2,
                        // code2: firstdatacode.code2,
                        // code2: firstdatacode.code2,
                        // kelsub_id : firstdatacode.kelsub_id,
                        // description : firstdatacode.description
                    });
                }
            }

            Ext.getBody().unmask();
        }

    });

},


});