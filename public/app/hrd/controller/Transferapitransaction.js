Ext.define('Hrd.controller.Transferapitransaction', {
    // extend: 'Hrd.template.ControllerForMaster',
    extend: 'Hrd.template.ControllerForMasterDirect',
    // extend: 'Hrd.library.box.controller.ControllerReport',
    // extend: 'Hrd.library.box.controller.Controller',
    alias: 'controller.transferapitransaction',
    controllerName: 'transferapitransaction',
    bindPrefixName: 'Transferapitransaction',
    dateNow: new Date(),
    ParamRender:null,
    otherParamsAT :{leave:0,sick:0,permission:0},
    productform_count:0,
    productform_load:0,
    // urlToken: '',
    // urlServiceRequest: '',
    urlToken: '/api/common/RequestToken',
    urlServiceRequest: '/api/common/ServiceRequest',
    // urlToken: 'https://careers.ciputragroup.com/api/common/RequestToken',
    // urlServiceRequest: 'https://careers.ciputragroup.com/api/common/ServiceRequest',
    requires: [
        'Hrd.library.box.tools.Tools',
        'Hrd.library.box.tools.DefaultConfig',
        'Hrd.library.box.tools.EventSelector',
        'Hrd.library.Box.Tools.Browse',
        'Hrd.library.box.tools.Dynamicrequest',
    ],
    stores: [
        'Trainingperiode'
    ],
    refs:[
        {
            ref: 'formprocess',
            selector: 'transferapitransactionformprocess'
        },
        {
            ref: 'gridprocess',
            selector: 'transferapitransactionprocessgrid'
        },
        {
            ref: 'gridprocesscutibesar',
            selector: 'transferapitransactionprocesscutibesargrid'
        },
        {
            ref: 'gridprocessmedicalclaim',
            selector: 'transferapitransactionprocessmedicalclaimgrid'
        },
        {
            ref: 'gridprocessovertime',
            selector: 'transferapitransactionprocessovertimegrid'
        },
        {
            ref: 'gridprocessuangmakan',
            selector: 'transferapitransactionprocessuangmakangrid'
        },
        {
            ref: 'gridprocessunpaidleave',
            selector: 'transferapitransactionprocessunpaidleavegrid'
        },
        {
            ref: 'gridprocesssaldocutibayar',
            selector: 'transferapitransactionprocesssaldocutibayargrid'
        },
        {
            ref: 'gridprocesspotongantransport',
            selector: 'transferapitransactionprocesspotongantransportgrid'
        },
        {
            ref: 'gridprocesssaldocutiminus',
            selector: 'transferapitransactionprocesssaldocutiminusgrid'
        },
        
    ],
    init: function(application) {
        this.callParent(arguments);
        var newEvs = {};
        var me = this;
        newEvs['transferapitransactionpanel #btnExport'] = {
            click: function(el, val) {
                // this.exportData();  
                me.formProcess();    
            }
        };
        newEvs['transferapitransactionformprocess'] = {
            afterrender: function () {
                me.formProcessAfterRender();
            }
        };
        // newEvs['transferapitransactionpanel [name=projectpt_id]'] = {
        //     select: function() {
                
        //        me.selectProjectpt();
        //     }
        // };
        // newEvs['transferapitransactionpanel [name=transfer_type]'] = {
        //     change: function() {
        //        me.selectType();
        //     }
        // };
        newEvs['transferapitransactionformprocess [action=process_cherry]'] = {
            click: function(el, val) {
                // var doIt = 'submitData';
                // me.getToken(doIt);

                // var doIt = 'getlistData';
                // me.getToken(doIt);

                me.processCherry();
            }
        };

        //DOWNLOAD LOG
        newEvs['transferapitransactionformprocess [action=download_log]'] = {
            click: function(el, val) {
                me.exportData();
            }
        };

        //UPDATE HCMS SALDO MINUS
        newEvs['transferapitransactionformprocess [action=update_hcms]'] = {
            click: function(el, val) {
                me.updateHcms();
            }
        };

        //SELECT PT LAST ACTIVITY
        newEvs['transferapitransactionpanel [name=ptpt_id]'] = {
            change: function() {
               me.getLastActivityPtId();
            }
        };

        newEvs['transferapitransactionpanel [name=transfer_type]'] = {
            change: function() {
               me.getLastActivityPtId();
            }
        };

        //searchButtonID
        console.log(me.controllerName);

        this.control(newEvs);
    },

    //GET TOKEN CHERRY
    getToken: function(val,data_current,action_to_cherry,lastprocessid,hasil_get,hasil_get_all){
        var me = this;

        // $.ajax({
        //         type: 'POST',
        //         url: me.urlToken,
        //         contentType: 'application/json',
        //         data: JSON.stringify({ 
        //                 CommandName:"RequestToken",
        //                 ModelCode:"AppUserAccount",
        //                 UserName:"HCAPI",
        //                 Password:"C1pUtR4HC",
        //                 ParameterData:[]
        //         }),
        //         success: function(response){
        //             var json = JSON.parse(JSON.stringify(response));
        //             var token = json.Token;

        //             if(token){
        //                 if(val == 'submitData'){
        //                     me.submitData(token,data_current,action_to_cherry,lastprocessid);
        //                 }
        //                 if(val == 'getlistData'){
        //                     me.getlistData(token);
        //                 }
        //                 if(val == 'updateData'){
        //                     me.updateData(token,data_current,action_to_cherry,lastprocessid,hasil_get);
        //                 }
        //             }
        //             // return token;
        //         },
        //         error: function(XMLHttpRequest) {
        //             alert('ERROR');
        //         }
        // }); 

        //GET URL DAN USERNAME
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                                    
                var url = data.others[0][0].url;
                var username = data.others[0][0].username;
                var password = data.others[0][0].password;

                $.ajax({
                        type: 'POST',
                        url: url + me.urlToken,
                        contentType: 'application/json',
                        data: JSON.stringify({ 
                                CommandName:"RequestToken",
                                ModelCode:"AppUserAccount",
                                UserName:username,
                                Password:password,
                                ParameterData:[]
                        }),
                        success: function(response){
                            var json = JSON.parse(JSON.stringify(response));
                            var token = json.Token;

                            if(token){
                                if(val == 'submitData'){
                                    me.submitData(token,data_current,action_to_cherry,lastprocessid,url,username,password);
                                }
                                if(val == 'getlistData'){
                                    me.getlistData(token);
                                }
                                if(val == 'updateData'){
                                    me.updateData(token,data_current,action_to_cherry,lastprocessid,hasil_get,hasil_get_all,url,username,password);
                                }
                            }
                            // return token;
                        },
                        error: function(XMLHttpRequest) {
                            alert('ERROR');
                        }
                }); 
            }
        }).read('urlusername');
    },
    //GET SUBMIT CHERRY
    submitData: function(token,data_current,action_to_cherry,lastprocessid,url,username,password){
        var me = this;

        // $.ajax({
        //         type: 'POST',
        //         url: me.urlServiceRequest,
        //         contentType: 'application/json',
        //         data: JSON.stringify(
        //             {
        //                 "CommandName":"Submit",
        //                 "ModelCode":"EMEmployeeProductivityForms",
        //                 "UserName":"HCAPI",
        //                 "Secure": false,
        //                 "Token":token,
        //                 "ParameterData": [],
        //                 "ModelData": {
        //                     "CompanyCode": "3F9YZED2DL",    
        //                     "Name": "[TEST]Staff_"+data_current.employee_id,
        //                     "TitleCode": "TESTSTF_"+data_current.employee_id,
        //                     "ParentCode": "",
        //                     "Description": "[TEST]Staff_"+data_current.employee_id
        //                 },
        //                 "ContainFiles": false
        //             }
        //         ),
        //         success: function(response){
        //             var json = JSON.parse(JSON.stringify(response));
        //             var result_data = json.Data;
        //             var result_status = json.MessageType;
        //             var result_status_message = json.Message;
        //             // me.saveDbLog(data_current,action_to_cherry,lastprocessid,result_data,result_status,result_status_message);
        //             me.updateDbLog(data_current,action_to_cherry,lastprocessid,result_data,result_status,result_status_message);
        //             // console.log(data);
        //         },
        //         error: function(XMLHttpRequest) {
        //             alert('ERROR');
        //         }
        // }); 

        //DEFINITION
        var f = me.getPanel().down("form");
        var vs = f.getValues();
        var choose_startdate = f.down("[name=start_date]").getValue();
        var choose_enddate   = f.down("[name=end_date]").getValue();
        var choose_payroll_month = f.down("[name=payroll_month]").getValue();
        var choose_payroll_year   = f.down("[name=payroll_year]").getValue();
        var choose = vs["transfer_type"];
        var value;
        if(choose == 'transfer_attendance'){
            value = data_current.total_attendance;
        }
        if(choose == 'transfer_overtime'){
            value = data_current.total_overtime;
        }
        if(choose == 'transfer_uangmakanlembur'){
            value = data_current.total_uang_makan;
        }
        if(choose == 'transfer_medicalclaim'){
            value = data_current.total_medical_claim;
        }
        if(choose == 'transfer_unpaidleave'){
            value = data_current.total_unpaid_leave;
        }
        if(choose == 'transfer_cutibesar'){
            value = '1';
        }
        if(choose == 'transfer_saldocutibayar'){
            value = data_current.total_saldocuti_bayar;
        }
        if(choose == 'transfer_potongantransport'){
            value = data_current.total_potongan_transport;
        }
        if(choose == 'transfer_saldocutiminus'){
            value = data_current.total_saldocuti_minus;
        }
        
        //enddate
        var d = new Date(choose_enddate),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        var end_date = year+'-'+month+'-'+day;

        //startdate
        var d = new Date(choose_startdate),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        var start_date = year+'-'+month+'-'+day;


        me.tools.ajax({
            params: {   companycode: data_current.company_code,
                        choose_payroll_month : choose_payroll_month,
                        choose_payroll_year : choose_payroll_year
                    },
            success: function (data, model) {
                    var cutoffdate = data.others[0][0].HASIL.cutoffdate;
                    var json_api = JSON.stringify(
                                        {
                                            "CommandName":"Submit",
                                            "ModelCode":"EMEmployeeProductivityForms",
                                            "UserName":username,
                                            "Secure": false,
                                            "Token":token,
                                            "ParameterData": [],
                                            "ModelData": {
                                                "CompanyCode": data_current.company_code,
                                                "Date": cutoffdate,
                                                "EmployeeCode": data_current.code.employee_code,
                                                "FormCode": data_current.code.productivity_form_code,
                                                //"Notes": "Process start date: "+start_date+" - end date:"+end_date,
                                                "Notes": "Payroll Process Bulan: "+choose_payroll_month+" Tahun: "+choose_payroll_year,
                                                "StatusId": "Approved",
                                                "DetailList":[
                                                    {
                                                        "Active" : true,
                                                        "ItemCode" : data_current.code.productivitydetail_form_code,
                                                        "Value": value,
                                                    }
                                                ],
                                                "Active": true
                                            },
                                            "ContainFiles": false
                                        }
                                    );

                $.ajax({
                        type: 'POST',
                        url: url + me.urlServiceRequest,
                        contentType: 'application/json',
                        data: json_api ,
                        success: function(response){
                            var json = JSON.parse(JSON.stringify(response));
                            var result_data = json.Data;
                            var result_status = json.MessageType;
                            var result_status_message = json.Message;

                            me.updateDbLog(data_current,action_to_cherry,lastprocessid,result_data,result_status,result_status_message);
                        },
                        error: function(XMLHttpRequest) {
                            alert('ERROR');
                        }
                }); 

                    }
        }).read('getcherryCutOffDate');
    },
    //GET UPDATE CHERRY
    updateData: function(token,data_current,action_to_cherry,lastprocessid,hasil_get,hasil_get_all,url,username,password){
        var me = this;
        
        var code = hasil_get_all[0].code;
        var insertstamp = hasil_get_all[0].insertstamp;
        var updatestamp = hasil_get_all[0].updatestamp;

        var code_detail = '';
        console.log(hasil_get);
        if(hasil_get[0]){
            code_detail = hasil_get[0].code_detail;
        }

        if(hasil_get_all[0].active == '1'){
            var active = 'true';
        }else{
            var active = 'true';
        }
        
        // $.ajax({
        //         type: 'POST',
        //         url: me.urlServiceRequest,
        //         contentType: 'application/json',
        //         data: JSON.stringify(
        //             {
        //                 "CommandName":"Submit",
        //                 "ModelCode":"JobTitles",
        //                 "UserName":"HCAPI",
        //                 "Secure": false,
        //                 "Token":token,
        //                 "ParameterData": [],
        //                 "ModelData": {
        //                     "CompanyCode": "3F9YZED2DL",    
        //                     "Code": code,   
        //                     "Name": "[TEST]_"+data_current.employee_id,
        //                     "TitleCode": "TEST_"+data_current.employee_id,
        //                     "ParentCode": "",
        //                     "Description": "[TEST]_"+data_current.employee_id,
        //                     "InsertStamp": insertstamp,
        //                     "UpdateStamp": updatestamp,
        //                     "Active": active
        //                 },
        //                 "ContainFiles": false
        //             }
        //         ),
        //         success: function(response){
        //             var json = JSON.parse(JSON.stringify(response));
        //             var result_data = json.Data;
        //             var result_status = json.MessageType;
        //             var result_status_message = json.Message;
        //             // me.saveDbLog(data_current,action_to_cherry,lastprocessid,result_data,result_status,result_status_message);
        //             me.updateDbLog(data_current,action_to_cherry,lastprocessid,result_data,result_status,result_status_message);
        //             // console.log(data);
        //         },
        //         error: function(XMLHttpRequest) {
        //             alert('ERROR');
        //         }
        // }); 

        //DEFINITION
        var f = me.getPanel().down("form");
        var vs = f.getValues();
        var choose_startdate = f.down("[name=start_date]").getValue();
        var choose_enddate   = f.down("[name=end_date]").getValue();
        var choose_payroll_month = f.down("[name=payroll_month]").getValue();
        var choose_payroll_year   = f.down("[name=payroll_year]").getValue();
        var choose = vs["transfer_type"];
        var value;
        if(choose == 'transfer_attendance'){
            value = data_current.total_attendance;
        }
        if(choose == 'transfer_overtime'){
            value = data_current.total_overtime;
        }
        if(choose == 'transfer_uangmakanlembur'){
            value = data_current.total_uang_makan;
        }
        if(choose == 'transfer_medicalclaim'){
            value = data_current.total_medical_claim;
        }
        if(choose == 'transfer_unpaidleave'){
            value = data_current.total_unpaid_leave;
        }
        if(choose == 'transfer_cutibesar'){
            value = '1';
        }
        if(choose == 'transfer_saldocutibayar'){
            value = data_current.total_saldocuti_bayar;
        }
        if(choose == 'transfer_potongantransport'){
            value = data_current.total_potongan_transport;
        }
        if(choose == 'transfer_saldocutiminus'){
            value = data_current.total_saldocuti_minus;
        }

        //enddate
        var d = new Date(choose_enddate),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        var end_date = year+'-'+month+'-'+day;

        //startdate
        var d = new Date(choose_startdate),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        var start_date = year+'-'+month+'-'+day;

        me.tools.ajax({
            params: {   companycode: data_current.company_code,
                        choose_payroll_month : choose_payroll_month,
                        choose_payroll_year : choose_payroll_year
                    },
            success: function (data, model) {
                    var cutoffdate = data.others[0][0].HASIL.cutoffdate;
                    if(code_detail){

                        var json_api = JSON.stringify(
                                            {
                                                "CommandName":"Submit",
                                                "ModelCode":"EMEmployeeProductivityForms",
                                                "UserName":username,
                                                "Secure": false,
                                                "Token":token,
                                                "ParameterData": [],
                                                "ModelData": {
                                                    "Code": code,  
                                                    "CompanyCode": data_current.company_code,
                                                    // "Date": end_date,
                                                    "Date": cutoffdate,
                                                    "EmployeeCode": data_current.code.employee_code,
                                                    "FormCode": data_current.code.productivity_form_code,
                                                    // "Notes": "Process start date: "+start_date+" - end date:"+end_date,
                                                    "Notes": "Payroll Process Bulan: "+choose_payroll_month+" Tahun: "+choose_payroll_year,
                                                    "StatusId": "Approved",
                                                    "DetailList":[
                                                        {
                                                            "Code": code_detail,
                                                            "Active" : true,
                                                            "ItemCode" : data_current.code.productivitydetail_form_code,
                                                            "Value": value,
                                                            "StatusId": "Approved"
                                                        }
                                                    ],
                                                    "InsertStamp": insertstamp,
                                                    "UpdateStamp": updatestamp,
                                                    "Active": active
                                                },
                                                "ContainFiles": false
                                            }
                                        );

                    }else{

                        var json_api = JSON.stringify(
                                            {
                                                "CommandName":"Submit",
                                                "ModelCode":"EMEmployeeProductivityForms",
                                                "UserName":username,
                                                "Secure": false,
                                                "Token":token,
                                                "ParameterData": [],
                                                "ModelData": {
                                                    "Code": code,  
                                                    "CompanyCode": data_current.company_code,
                                                    // "Date": end_date,
                                                    "Date": cutoffdate,
                                                    "EmployeeCode": data_current.code.employee_code,
                                                    "FormCode": data_current.code.productivity_form_code,
                                                    // "Notes": "Process start date: "+start_date+" - end date:"+end_date,
                                                    "Notes": "Payroll Process Bulan: "+choose_payroll_month+" Tahun: "+choose_payroll_year,
                                                    "StatusId": "Approved",
                                                    "DetailList":[
                                                        {
                                                            "Active" : true,
                                                            "ItemCode" : data_current.code.productivitydetail_form_code,
                                                            "Value": value,
                                                        }
                                                    ],
                                                    "InsertStamp": insertstamp,
                                                    "UpdateStamp": updatestamp,
                                                    "Active": active
                                                },
                                                "ContainFiles": false
                                            }
                                        );
                    }
                    

                    $.ajax({
                            type: 'POST',
                            url: url + me.urlServiceRequest,
                            contentType: 'application/json',
                            data: json_api ,
                            success: function(response){
                                var json = JSON.parse(JSON.stringify(response));
                                var result_data = json.Data;
                                var result_status = json.MessageType;
                                var result_status_message = json.Message;

                                me.updateDbLog(data_current,action_to_cherry,lastprocessid,result_data,result_status,result_status_message);
                            },
                            error: function(XMLHttpRequest) {
                                alert('ERROR');
                            }
                    }); 

                }
        }).read('getcherryCutOffDate');

    },
    //GET LIST CHERRY
    getlistData: function(token){
        var me = this;

        $.ajax({
                type: 'POST',
                url: me.urlServiceRequest,
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        "UserName":"HCAPI", 
                        "Token":token,
                        "CommandName":"GetList",
                        "ModelCode":"JobTitles",
                        "UserName":"HCAPI",
                        "Token":token,
                        "ParameterData":[]
                    }
                ),
                success: function(response){
                    var json = JSON.parse(JSON.stringify(response));
                    var data = json.Data;
                    console.log(response);
                },
                error: function(XMLHttpRequest) {
                    alert('ERROR');
                }
        }); 
    },
    //SAVE TO DB LOG
    saveDbLog: function (data_current,action_to_cherry,lastprocessid,result_data,result_status,result_status_message) {
        var me, grid, store;
        me = this;
        console.log(result_data);
        var f = me.getPanel().down("form");
        // var choose_projectpt = f.down("[name=projectpt_id]").getValue();
        var choose_ptpt = f.down("[name=ptpt_id]").getValue();
        var choose_startdate = f.down("[name=start_date]").getValue();
        var choose_enddate   = f.down("[name=end_date]").getValue();

        var choose_payroll_month = f.down("[name=payroll_month]").getValue();
        var choose_payroll_year   = f.down("[name=payroll_year]").getValue();

        var fp = me.getFormprocess();
        var process_api = fp.down("[name=process_api]").getValue();
        var process_api_model = fp.down("[name=process_api_model]").getValue();

        var jsonString = JSON.stringify(data_current);
        var jsonStringResult = JSON.stringify(result_data);
        
        //DB_LOG
        me.tools.ajax({
            params: {   
                        action_to_cherry    : action_to_cherry,
                        lastprocessid       : lastprocessid,
                        process_api         : process_api,
                        process_api_model   : process_api_model,
                        // projectpt_id        : choose_projectpt,
                        ptpt_id             : choose_ptpt,
                        start_date          : choose_startdate,
                        end_date            : choose_enddate,
                        payroll_month       : choose_payroll_month,
                        payroll_year        : choose_payroll_year,
                        jsonString          : jsonString,
                        jsonStringResult    : jsonStringResult,
                        result_status       : result_status,
                        result_status_message: result_status_message
                    },
            success: function (data, model) {
                if(data.others[0][0].MSG == 'berhasil'){
                    // fp.setLoading("Please wait...");
                    me.tools.ajax({
                        params: {   
                                    lastprocessid       : lastprocessid,
                                    process_api         : process_api,
                                    process_api_model   : process_api_model,
                                },
                        success: function (data, model) {
                            if(process_api == 'attendance'){
                                var gr_trans = me.getGridprocess();
                            }
                            if(process_api == 'cutibesar'){
                                var gr_trans = me.getGridprocesscutibesar();
                            }
                            if(process_api == 'medicalclaim'){
                                var gr_trans = me.getGridprocessmedicalclaim();
                            }
                            if(process_api == 'overtime'){
                                var gr_trans = me.getGridprocessovertime();
                            }
                            if(process_api == 'uangmakan'){
                                var gr_trans = me.getGridprocessuangmakan();
                            }
                            if(process_api == 'unpaidleave'){
                                var gr_trans = me.getGridprocessunpaidleave();
                            }
                            if(process_api == 'saldocutibayar'){
                                var gr_trans = me.getGridprocesssaldocutibayar();
                            }
                            if(process_api == 'potongantransport'){
                                var gr_trans = me.getGridprocesspotongantransport();
                            }
                            if(process_api == 'saldocutiminus'){
                                var gr_trans = me.getGridprocesssaldocutiminus();
                            }
                            
                            var s_gr_trans = gr_trans.getStore();
                            me.tools.wesea({data: data, model: model}, gr_trans).grid();
                            s_gr_trans.reload();
                            fp.down("[name=process_log_process_id]").setValue(lastprocessid);
                            fp.down("[action=process_cherry]").hide();
                            fp.down("[action=download_log]").show();

                            // fp.setLoading(false);

                            // added by michael 02/11/2021
                            setTimeout(function () {
                                fp.setLoading(false);
                            }, 10000);
                            // end added by michael 02/11/2021

                            if(process_api == 'saldocutiminus'){
                                fp.down("[action=update_hcms]").show();
                                me.tools.alert.info("Jangan lupa klik button Update HCMS untuk langsung update sisa saldo cuti minus. Jika tidak, maka data tidak langsung terupdate dan harus menunggu Scheduler Harian.");
                            }
                        }
                    }).read('get_transaction');
                }else{
                    alert('Something error...');
                }
            }
        }).read('save_transaction');

    },
    //SAVE BEFORE KIRIM KE CHERRY
    saveDbLogBeforeAPI: function (data_current,action_to_cherry,lastprocessid) {
        var me, grid, store;
        me = this;
        
        var f = me.getPanel().down("form");
        // var choose_projectpt = f.down("[name=projectpt_id]").getValue();
        var choose_ptpt = f.down("[name=ptpt_id]").getValue();
        var choose_startdate = f.down("[name=start_date]").getValue();
        var choose_enddate   = f.down("[name=end_date]").getValue();

        var choose_payroll_month = f.down("[name=payroll_month]").getValue();
        var choose_payroll_year   = f.down("[name=payroll_year]").getValue();

        var fp = me.getFormprocess();
        var process_api = fp.down("[name=process_api]").getValue();
        var process_api_model = fp.down("[name=process_api_model]").getValue();

        var jsonString = JSON.stringify(data_current);
        
        //DB_LOG
        me.tools.ajax({
            params: {   
                        action_to_cherry    : action_to_cherry,
                        lastprocessid       : lastprocessid,
                        process_api         : process_api,
                        process_api_model   : process_api_model,
                        // projectpt_id        : choose_projectpt,
                        ptpt_id             : choose_ptpt,
                        start_date          : choose_startdate,
                        end_date            : choose_enddate,
                        payroll_month       : choose_payroll_month,
                        payroll_year        : choose_payroll_year,
                        jsonString          : jsonString
                    },
            success: function (data, model) {
                if(data.others[0][0].MSG == 'berhasil'){
                    console.log(data);
                }else{
                    alert('Something error...');
                }
            }
        }).read('save_transaction_beforeapi');
    },
    //UPDATE AFTER API
    updateDbLog: function (data_current,action_to_cherry,lastprocessid,result_data,result_status,result_status_message) {
        var me, grid, store;
        me = this;
        console.log(result_data);
        var f = me.getPanel().down("form");
        // var choose_projectpt = f.down("[name=projectpt_id]").getValue();
        var choose_ptpt = f.down("[name=ptpt_id]").getValue();
        var choose_startdate = f.down("[name=start_date]").getValue();
        var choose_enddate   = f.down("[name=end_date]").getValue();

        var fp = me.getFormprocess();
        var process_api = fp.down("[name=process_api]").getValue();
        var process_api_model = fp.down("[name=process_api_model]").getValue();

        var jsonString = JSON.stringify(data_current);
        var jsonStringResult = JSON.stringify(result_data);
        
        //DB_LOG
        me.tools.ajax({
            params: {   
                        action_to_cherry    : action_to_cherry,
                        lastprocessid       : lastprocessid,
                        process_api         : process_api,
                        process_api_model   : process_api_model,
                        // projectpt_id        : choose_projectpt,
                        ptpt_id             : choose_ptpt,
                        start_date          : choose_startdate,
                        end_date            : choose_enddate,
                        jsonString          : jsonString,
                        jsonStringResult    : jsonStringResult,
                        result_status       : result_status,
                        result_status_message: result_status_message
                    },
            success: function (data, model) {
                if(data.others[0][0].MSG == 'berhasil'){
                    // fp.setLoading("Please wait...");
                    me.tools.ajax({
                        params: {   
                                    lastprocessid       : lastprocessid,
                                    process_api         : process_api,
                                    process_api_model   : process_api_model,
                                },
                        success: function (data, model) {
                            if(process_api == 'attendance'){
                                var gr_trans = me.getGridprocess();
                            }
                            if(process_api == 'cutibesar'){
                                var gr_trans = me.getGridprocesscutibesar();
                            }
                            if(process_api == 'medicalclaim'){
                                var gr_trans = me.getGridprocessmedicalclaim();
                            }
                            if(process_api == 'overtime'){
                                var gr_trans = me.getGridprocessovertime();
                            }
                            if(process_api == 'uangmakan'){
                                var gr_trans = me.getGridprocessuangmakan();
                            }
                            if(process_api == 'unpaidleave'){
                                var gr_trans = me.getGridprocessunpaidleave();
                            }
                            if(process_api == 'saldocutibayar'){
                                var gr_trans = me.getGridprocesssaldocutibayar();
                            }
                            if(process_api == 'potongantransport'){
                                var gr_trans = me.getGridprocesspotongantransport();
                            }
                            if(process_api == 'saldocutiminus'){
                                var gr_trans = me.getGridprocesssaldocutiminus();
                            }
                            
                            var s_gr_trans = gr_trans.getStore();
                            me.tools.wesea({data: data, model: model}, gr_trans).grid();
                            s_gr_trans.reload();
                            fp.down("[name=process_log_process_id]").setValue(lastprocessid);
                            fp.down("[action=process_cherry]").hide();
                            fp.down("[action=download_log]").show();

                            // fp.setLoading(false);
                            
                            // added by michael 02/11/2021
                            setTimeout(function () {
                                fp.setLoading(false);
                            }, 10000);
                            // end added by michael 02/11/2021

                            me.getLastActivityPtId();
                            
                            if(process_api == 'saldocutiminus'){
                                fp.down("[action=update_hcms]").show();
                                me.tools.alert.info("Jangan lupa klik button Update HCMS untuk langsung update sisa saldo cuti minus. Jika tidak, maka data tidak langsung terupdate dan harus menunggu Scheduler Harian.");
                            }
                        }
                    }).read('get_transaction');
                }else{
                    alert('Something error...');
                }
            }
        }).read('update_transaction');

    },
    //PROCESS TO CHERRY
    processCherry: function () {
        var me, grid, store;
        me = this;
        
        var f = me.getPanel().down("form");
        // var choose_projectpt = f.down("[name=projectpt_id]").getValue();
        var choose_ptpt = f.down("[name=ptpt_id]").getValue();
        var choose_startdate = f.down("[name=start_date]").getValue();
        var choose_enddate   = f.down("[name=end_date]").getValue();
        var choose_payroll_month = f.down("[name=payroll_month]").getValue();
        var choose_payroll_year   = f.down("[name=payroll_year]").getValue();
        var vs = f.getValues();
        var choose = vs["transfer_type"];

        var fp = me.getFormprocess();
        fp.setLoading("Please wait...");
        var process_api = fp.down("[name=process_api]").getValue();
        var process_api_model = fp.down("[name=process_api_model]").getValue();

        //get data
        var datalist, action_to_cherry, data_current_parse, rowdata, lastprocessid;
        me.tools.ajax({
                params: {
                            // projectpt_id    : choose_projectpt,
                            ptpt_id         : choose_ptpt,
                            start_date      : choose_startdate,
                            end_date        : choose_enddate,
                            choose          : choose
                        },
                success: function (data, model) {
                    //jika ada, akan di cek dulu ke db dia ud pernah proses apa blm
                    datalist = data;
                    fp.setLoading("Process data to Cherry 0 of "+datalist.length);
                    if(datalist){
                        // for (i = 0; i < datalist.length; i++) {
                        //     var data_current = datalist[i].transferapitransaction;
                        //     var jsonString = JSON.stringify(data_current);
                        //     console.log(jsonString);
                        //     me.tools.ajax({
                        //             params: {   
                        //                         process_api         : process_api,
                        //                         process_api_model   : process_api_model,
                        //                         projectpt_id        : choose_projectpt,
                        //                         start_date          : choose_startdate,
                        //                         end_date            : choose_enddate,
                        //                         employee_id         : datalist[i].transferapitransaction.employee_id,
                        //                         nik_group           : value.transferapitransaction.nik_group
                        //                     },
                        //             success: function (data, model) {
                        //                 action_to_cherry = data.others[0][0].ACTION_TO_CHERRY;
                        //                 // console.log(jsonString);
                        //                 // console.log(action_to_cherry);
                        //                 // if(action_to_cherry == 'insert'){
                        //                 //     //API

                        //                 //     //DB_LOG
                        //                 //     me.tools.ajax({
                        //                 //         params: {
                        //                 //                     process_api         : process_api,
                        //                 //                     process_api_model   : process_api_model,
                        //                 //                     projectpt_id        : choose_projectpt,
                        //                 //                     start_date          : choose_startdate,
                        //                 //                     end_date            : choose_enddate,
                        //                 //                     jsonString          : jsonString
                        //                 //                 },
                        //                 //         success: function (data, model) {
                        //                 //             console.log('a');
                        //                 //         }
                        //                 //     }).read('save_transaction');
                        //                 // }
                        //                 // if(action_to_cherry == 'update'){
                        //                 //     //API

                        //                 //     //DB_LOG

                        //                 // }
                        //             }
                        //     }).read('checkdata_transaction');
                        //     console.log(action_to_cherry);
                        // }

                        if(choose == 'transfer_saldocutiminus'){
                            var notif = 0;
                            $.each(datalist, function (key, value) {
                                var gsm = me.getGridprocesssaldocutiminus();
                                var sgsm = gsm.getStore();
                                var data_cell = sgsm.data.items[key].data;

                                if(data_cell.total_saldocuti_minus > 0){
                                    notif = notif + 1;
                                }
                            });

                            if(notif > 0){
                                me.tools.alert.warning("Maaf Total Saldo Cuti Minus tidak boleh lebih besar daripada nol / tidak boleh positif, contoh: 0,-1,-2,-3, dst");
                                fp.setLoading(false);
                                return false;
                            }
                        }

                        me.tools.ajax({
                            params: {
                                        process_api         : process_api,
                                        process_api_model   : process_api_model
                                    },
                            success: function (data, model) {
                                lastprocessid = data.others[0][0].HASIL;

                                //SAVE KE DB DULU SEBELUM API
                                $.each(datalist, function (key, value) {
                                    
                                    var data_current = value.transferapitransaction;
                                    var jsonString = JSON.stringify(data_current);
                                    me.tools.ajax({
                                            params: {   
                                                        process_api         : process_api,
                                                        process_api_model   : process_api_model,
                                                        // projectpt_id        : choose_projectpt,
                                                        ptpt_id               : choose_ptpt,
                                                        start_date          : choose_startdate,
                                                        end_date            : choose_enddate,
                                                        payroll_month       : choose_payroll_month,
                                                        payroll_year        : choose_payroll_year,
                                                        employee_id         : value.transferapitransaction.employee_id,
                                                        nik_group           : value.transferapitransaction.nik_group
                                                    },
                                            success: function (data, model) {
                                                action_to_cherry = data.others[0][0].ACTION_TO_CHERRY;
                                                fp.setLoading("Please wait... ");

                                                if(choose == 'transfer_saldocutiminus'){
                                                    var gsm = me.getGridprocesssaldocutiminus();
                                                    var sgsm = gsm.getStore();
                                                    var data_cell = sgsm.data.items[key].data;
                                                    
                                                    if(data_current.employee_id == data_cell.employee_id){
                                                        data_current = data_cell;
                                                    }
                                                }
                                                me.saveDbLogBeforeAPI(data_current,action_to_cherry,lastprocessid);
                                            }
                                    }).read('checkdata_transaction');
                                    
                                });

                                $.each(datalist, function (key, value) {
                                    
                                    var data_current = value.transferapitransaction;
                                    var jsonString = JSON.stringify(data_current);
                                    me.tools.ajax({
                                            params: {   
                                                        process_api         : process_api,
                                                        process_api_model   : process_api_model,
                                                        // projectpt_id        : choose_projectpt,
                                                        ptpt_id               : choose_ptpt,
                                                        start_date          : choose_startdate,
                                                        end_date            : choose_enddate,
                                                        payroll_month       : choose_payroll_month,
                                                        payroll_year        : choose_payroll_year,
                                                        employee_id         : value.transferapitransaction.employee_id,
                                                        nik_group           : value.transferapitransaction.nik_group
                                                    },
                                            success: function (data, model) {
                                                action_to_cherry = data.others[0][0].ACTION_TO_CHERRY;
                                                hasil_get = data.others[0][0].HASIL;
                                                hasil_get_all = data.others[0][0].HASILALL;

                                                var loading = parseInt(key+1);
                                                fp.setLoading("Process data to Cherry "+loading+" of "+datalist.length);
                                                console.log("Process data to Cherry "+loading+" of "+datalist.length);

                                                if(choose == 'transfer_saldocutiminus'){
                                                    var gsm = me.getGridprocesssaldocutiminus();
                                                    var sgsm = gsm.getStore();
                                                    var data_cell = sgsm.data.items[key].data;
                                                    
                                                    if(data_current.employee_id == data_cell.employee_id){
                                                        console.log(data_current.employee_id+' - '+data_current.employee_name+' - '+data_current.total_saldocuti_minus);
                                                        console.log(data_cell.employee_id+' - '+data_cell.employee_name+' - '+data_cell.total_saldocuti_minus);

                                                        data_current = data_cell;
                                                    }

                                                }
                                                console.log(data_current);
                                                if(action_to_cherry == 'insert'){
                                                    //API
                                                    var doIt = 'submitData';
                                                    var res = me.getToken(doIt,data_current,action_to_cherry,lastprocessid,'','');
                                                }
                                                if(action_to_cherry == 'update'){
                                                    //API
                                                    var doIt = 'updateData';
                                                    var res = me.getToken(doIt,data_current,action_to_cherry,lastprocessid,hasil_get,hasil_get_all);
                                                }
                                                // fp.down("[name=process_log_process_id]").setValue(lastprocessid);
                                                // fp.down("[action=update_hcms]").show();
                                                // fp.setLoading(false);

                                                //    //TIDAK DIPAKE
                                                // console.log(data_current);
                                                    //DB_LOG
                                                    // me.tools.ajax({
                                                    //     params: {   
                                                    //                 action_to_cherry    : action_to_cherry,
                                                    //                 lastprocessid       : lastprocessid,
                                                    //                 process_api         : process_api,
                                                    //                 process_api_model   : process_api_model,
                                                    //                 projectpt_id        : choose_projectpt,
                                                    //                 start_date          : choose_startdate,
                                                    //                 end_date            : choose_enddate,
                                                    //                 jsonString          : jsonString
                                                    //             },
                                                    //     success: function (data, model) {
                                                    //         console.log(data);
                                                    //     }
                                                    // }).read('save_transaction');
                                            }
                                    }).read('checkdata_transaction');
                                    
                                });
                                // me.checkaftersaveDbLog();
                                // fp.setLoading(false);

                            }
                        }).read('get_lastprocessid');

                        // console.log(rowdata);
                    }else{
                        console.log('kosong...');
                        alert('Tidak ada data yang di process');
                    }
                }
        }).read('get_transaction_'+process_api);
        
        
        // me.tools.ajax({
        //         params: {
        //             process_api         : process_api,
        //             projectpt_id        : choose_projectpt,
        //             start_date          : choose_startdate,
        //             end_date            : choose_enddate
        //         },
        //         success: function (data, model) {
        //             // console.log(data);
        //             for (i = 0; i < data.length; i++) {
        //               console.log(data[i]);
        //             }
        //         }
        //     }).read('process_cherry');
        
    },
    //UPDATE CUTI MINUS HCMS
    updateHcms:function(){
        var me, grid, store;
        me = this;
        
        var f = me.getPanel().down("form");
        // var choose_projectpt = f.down("[name=projectpt_id]").getValue();
        var choose_ptpt = f.down("[name=ptpt_id]").getValue();
        var choose_startdate = f.down("[name=start_date]").getValue();
        var choose_enddate   = f.down("[name=end_date]").getValue();
        var choose_payroll_month = f.down("[name=payroll_month]").getValue();
        var choose_payroll_year   = f.down("[name=payroll_year]").getValue();
        var vs = f.getValues();
        var choose = vs["transfer_type"];

        var fp = me.getFormprocess();
        fp.setLoading("Please wait...");
        var process_api = fp.down("[name=process_api]").getValue();
        var process_api_model = fp.down("[name=process_api_model]").getValue();
        var process_log_process_id = fp.down("[name=process_log_process_id]").getValue();

        if(choose == 'transfer_saldocutiminus'){
            var gsm = me.getGridprocesssaldocutiminus();
            var sgsm = gsm.getStore();
            var data_cell = sgsm.data.items;
            $.each(data_cell, function (key, value) {
                var data_cell_current = value.data;
                var jsonString_cell = JSON.stringify(data_cell_current);
                //DB_LOG
                me.tools.ajax({
                    params: {   
                                // projectpt_id        : choose_projectpt,
                                ptpt_id               : choose_ptpt,
                                start_date          : choose_startdate,
                                end_date            : choose_enddate,
                                payroll_month       : choose_payroll_month,
                                payroll_year        : choose_payroll_year,
                                log_process_id      : process_log_process_id,
                                jsonString_cell     : jsonString_cell
                            },
                    success: function (data, model) {
                        if(data.others[0][0].MSG == 'berhasil'){
                            me.tools.ajax({
                                params: {   
                                            lastprocessid       : process_log_process_id,
                                            process_api         : process_api,
                                            process_api_model   : process_api_model,
                                        },
                                success: function (data, model) {
                                    if(process_api == 'saldocutiminus'){
                                        var gr_trans = me.getGridprocesssaldocutiminus();
                                    }
                                    
                                    var s_gr_trans = gr_trans.getStore();
                                    me.tools.wesea({data: data, model: model}, gr_trans).grid();
                                    s_gr_trans.reload();
                                    fp.setLoading(false);
                                    fp.down("[action=update_hcms]").hide();
                                    me.tools.alert.info("Update HCMS berhasil");
                                    
                                }
                            }).read('get_transaction');
                        }else{
                            alert('Something error...');
                        }
                    }
                }).read('update_hcms');
            });
        }
    },
    /* must override */
    processParams: function(reportData) {
        var me = this;

      
        
       
        var sd = new Date(reportData['params']['start_date']);
        // var projectptId = reportData['params']['projectpt_id'];
        var ptptId = reportData['params']['ptpt_id'];
        // var departmentId = reportData['params']['department_id'];
        var employeeId = reportData['params']['employee_id'];
        reportData['params']['start_date'] = me.tools.dateFunc(reportData['params']['start_date']).toYMD('-');
        reportData['params']['end_date'] = me.tools.dateFunc(reportData['params']['end_date']).toYMD('-');
        reportData['params']['start_date_text'] = me.tools.dateFunc(reportData['params']['start_date']).toDMY('-');
        reportData['params']['end_date_text'] = me.tools.dateFunc(reportData['params']['end_date']).toDMY('-');
        // reportData['params']['projectpt_id'] = projectptId==="999"?"0":projectptId;
        reportData['params']['ptpt_id'] = ptptId==="999"?"0":ptptId;
        // reportData['params']['department_id'] = departmentId==="999"?"0":departmentId;
        // reportData['params']['employee_id'] = employeeId==="999"?"0":employeeId;
        

        return reportData;


    },
    
    zendInitLoaded: function(data) {
        var me = this;
        var f = me.getForm();
        var vs = f.getValues();
        // alert('a');
        // me.tools.wesea(data.projectpt, f.down("[name=projectpt_id]")).comboBox(true);
        me.tools.wesea(data.companycherry, f.down("[name=ptpt_id]")).comboBox(true);
        // me.tools.wesea(data.department, f.down("[name=department_id]")).comboBox(true);
        // me.tools.wesea(data.employeeb, f.down("[name=employee_id]")).comboBox(true);
        // f.down("[name=projectpt_id]").setValue('999');
        f.down("[name=ptpt_id]").setValue('999');
        // f.down("[name=department_id]").setValue('999');
        // f.down("[name=employee_id]").setValue('999');

        var choose = vs["transfer_type"];
        // if(choose == 'transfer_master'){
        //      me.setReadonlydata(f);
        //      f.down("[name=start_date]").setValue('');
        //      f.down("[name=end_date]").setValue('');
        //      // f.down("[name=employee_id]").setValue('');
        // }else{
        //     me.unsetReadonlydata(f);
        // }
       
        
        return;

    },
    panelAfterRender: function (el) {
        var me = this;
        var f = me.getPanel().down("form");
        var vs = f.getValues();
        var currentDate = new Date();
        var firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                // me.tools.wesea(data.projectpt, f.down("[name=projectpt_id]")).comboBox(true);
                me.tools.wesea(data.companycherry, f.down("[name=ptpt_id]")).comboBox(true);
                // me.tools.wesea(data.employeeb, f.down("[name=employee_id]")).comboBox(true);
                // f.down("[name=projectpt_id]").setValue('999');
                f.down("[name=ptpt_id]").setValue('999');
                f.down("[name=start_date]").setValue(firstDay);
                // f.down("[name=employee_id]").setValue('999');
                var year = new Date().getFullYear();
                f.down("[name=payroll_year]").setValue(year);

                var month = new Date().getMonth()+1;
                f.down("[name=payroll_month]").setValue(month);
            }
        }).read('init');

        var choose = vs["transfer_type"];
        // if(choose == 'transfer_master'){
        //      me.setReadonlydata(f);
        //      f.down("[name=start_date]").setValue('');
        //      f.down("[name=end_date]").setValue('');
        //      // f.down("[name=employee_id]").setValue('');
        // }else{
        //     me.unsetReadonlydata(f);
        // }

        
    },
    getEmGrid: function() {
        return this.getForm().down("#employeeListGridID");
    },
    getReportTypeCombo: function() {
        return this.getForm().down("[name=report_type]");
    },
    cleannullinCombo: function (form, value) {
        // if (typeof (form.down("[name=projectpt_id]").getValue()) !== 'number') {
        //     value['projectpt_id'] = '0';
        // }
        if (typeof (form.down("[name=ptpt_id]").getValue()) !== 'number') {
            value['ptpt_id'] = '0';
        }
        // if (typeof (form.down("[name=department_id]").getValue()) !== 'number') {
        //     value['department_id'] = '0';
        // }
        if (typeof (form.down("[name=employee_id]").getValue()) !== 'number') {
            value['employee_id'] = '0';
        }
        if (!form.down("[name=start_date]").getValue()) {
            value['start_date'] = '1900-01-01';
        }
        if (!form.down("[name=end_date]").getValue()) {
            value['end_date'] = '3000-12-31';
        }
        return value;
    },
    exportData:function(){
        var me, url, formvalue, form;
        me = this;
        form = me.getFormprocess();
        formvalue = me.getFormprocess().getValues();
               
        var p = me.getPanel();
        form.setLoading("Please wait");
        me.tools.ajax({
            params: {},
            params: {
                data: Ext.encode(formvalue)
            },
            success: function (data, model) {
                form.setLoading(false);
                url = data['others'][1]['directdata'];
                if (url) {
                    Ext.Msg.show({
                        title: 'Info',
                        msg: '<a href="' + url + '" target="blank">Download file</a>',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function () {
                        }
                    });
                }
            }
        }).read('exportdata');        
     },
    //  setReadonlydata: function (form) {
    //     form.down('[name=start_date]').setReadOnly(true);
    //     form.down('[name=end_date]').setReadOnly(true);
    //     // form.down('[name=employee_id]').setReadOnly(true);
    // },
    // unsetReadonlydata: function (form) {
    //     form.down('[name=start_date]').setReadOnly(false);
    //     form.down('[name=end_date]').setReadOnly(false);
    //     // form.down('[name=employee_id]').setReadOnly(false);
    // },
    // selectType: function () {
    //     var me = this;
    //     var f = me.getPanel().down("form");
    //     var vs = f.getValues();
    //     var currentDate = new Date();

    //     var choose = vs["transfer_type"];
    //     if(choose == 'transfer_master'){
    //          me.setReadonlydata(f);
    //          f.down("[name=start_date]").setValue('');
    //          f.down("[name=end_date]").setValue('');
    //          // f.down("[name=employee_id]").setValue('');
    //     }else{
    //         me.unsetReadonlydata(f);
    //         f.down("[name=start_date]").setValue(currentDate);
    //         f.down("[name=end_date]").setValue(currentDate);
    //         // f.down("[name=employee_id]").setValue('999');
    //     }
        
    // },
    //  selectProjectpt: function () {
    //     var me = this;
    //     var f = me.getPanel().down("form");
        
    //     var choose_projectpt = f.down("[name=projectpt_id]").getValue();
        
    //     me.tools.ajax({
    //     params: {projectpt_id: choose_projectpt},
    //     success: function (data, model) {
    //         // me.tools.wesea(data.employeeb, f.down("[name=employee_id]")).comboBox();
    //         // me.tools.wesea(data.competencynames, f.down("[name=competency_name_id]")).comboBox();
    //         // console.log(data.employeeb.data);
    //         }
    //     }).read('get_employeeprojectpt');
        
    // },
    formProcess: function () {
        var me, grid, store;
        me = this;

        var f = me.getPanel().down("form");

        if(f.down('[name=ptpt_id]').getValue() == '' || f.down('[name=ptpt_id]').getValue() == null){
                me.tools.alert.warning("Select PT is required");
                return false;
            } else {
                if(f.down('[name=ptpt_id]').getValue() == '999'){
                    me.tools.alert.warning("PT tidak boleh ALL");
                    return false;
                }else{
                    me.instantWindow("FormProcess", 950, "Process", "process", "transferapitransactionformprocess");

                }
            }

        // me.instantWindow("FormProcess", 950, "Process", "process", "transferapitransactionformprocess");
        
    },
    formProcessAfterRender: function () {
        var me, grid, store;
        me = this;

        me.productform_count = 0;
        me.productform_load = 0;
        
        var f = me.getPanel().down("form");
        // var choose_projectpt = f.down("[name=projectpt_id]").getValue();
        var choose_ptpt = f.down("[name=ptpt_id]").getValue();
        var choose_startdate = f.down("[name=start_date]").getValue();
        var choose_enddate   = f.down("[name=end_date]").getValue();
        // var choose_employee = f.down("[name=employee_id]").getValue();

        //CHECK PERIODE PAYROLL DICHERRY
        me.cherryPayrollPeriode();

        var fp = me.getFormprocess();
        fp.down("[action=process_cherry]").hide();
        fp.down("[action=download_log]").hide();
        fp.down("[action=update_hcms]").hide();
        fp.setLoading("Please wait...");
        fp.down("[name=process_api]").setValue('');
        var vs = f.getValues();
        var choose = vs["transfer_type"];

        //check productivity form sudah ada atau belum
        me.tools.ajax({
            params: {pt_id:choose_ptpt},
            success: function (data, model) {
                need_input_cherry = data.others[0][0].need_input_cherry;

                if(need_input_cherry){
                    fp.setLoading("Please wait, transfer Productivity Form to Cherry...");
                    me.productform_count = need_input_cherry.length;

                    $.each(need_input_cherry, function (key, value) {
                        me.savePformDb(key,value);
                    });

                } 
            }

        }).read('get_productivity_form');
        
        if(choose == 'transfer_attendance'){
            fp.down('#pAttendanceTabID').setDisabled(false);
            fp.down('#tabID').setActiveTab(0);

            fp.down('#pOvertimeTabID').setDisabled(true);
            fp.down('#pUangMakanTabID').setDisabled(true);
            fp.down('#pMedicalClaimTabID').setDisabled(true);
            fp.down('#pUnpaidLeaveTabID').setDisabled(true);
            fp.down('#pCutiBesarTabID').setDisabled(true);
            fp.down('#pSaldoCutiBayarTabID').setDisabled(true);
            fp.down('#pPotonganTransportTabID').setDisabled(true);
            fp.down('#pSaldoCutiMinusTabID').setDisabled(true);

            
            var gp = me.getGridprocess();
            var sgp = gp.getStore();
            me.tools.ajax({
                params: {
                            // projectpt_id    : choose_projectpt,
                            ptpt_id         : choose_ptpt,
                            start_date      : choose_startdate,
                            end_date        : choose_enddate,
                            choose          : choose
                        },
                success: function (data, model) {
                    me.tools.wesea({data: data, model: model}, gp).grid();
                    sgp.reload();
                    fp.down("[name=process_api]").setValue('attendance');
                    fp.down("[name=process_api_model]").setValue('Attendance');
                    fp.setLoading(false);

                    var check_employee;
                    var i_count = 0;
                    $.each(data, function (key, value) {
                        if(value.transferapitransaction.code.employee_code == ""){
                            i_count = parseInt(i_count+1);
                        }
                    });

                    if(i_count > 0){
                        me.tools.alert.info("Ada Master Employee baru yang belum tercatat di Cherry. Silahkan Transfer API Master terlebih dahulu");
                        fp.down("[action=process_cherry]").hide();
                    }else{
                        fp.down("[action=process_cherry]").show();
                    }

                    if(data.length < 1){
                        fp.down("[action=process_cherry]").hide();
                    }else{
                        fp.down("[action=process_cherry]").show();
                    }

                }
            }).read('get_transaction_attendance');

        }
        if(choose == 'transfer_overtime'){
            fp.down('#pOvertimeTabID').setDisabled(false);
            fp.down('#tabID').setActiveTab(1);

            fp.down('#pAttendanceTabID').setDisabled(true);
            fp.down('#pUangMakanTabID').setDisabled(true);
            fp.down('#pMedicalClaimTabID').setDisabled(true);
            fp.down('#pUnpaidLeaveTabID').setDisabled(true);
            fp.down('#pCutiBesarTabID').setDisabled(true);
            fp.down('#pSaldoCutiBayarTabID').setDisabled(true);
            fp.down('#pPotonganTransportTabID').setDisabled(true);
            fp.down('#pSaldoCutiMinusTabID').setDisabled(true);

            
            var go = me.getGridprocessovertime();
            var sgo = go.getStore();
            me.tools.ajax({
                params: {
                            // projectpt_id    : choose_projectpt,
                            ptpt_id         : choose_ptpt,
                            start_date      : choose_startdate,
                            end_date        : choose_enddate,
                            choose          : choose
                        },
                success: function (data, model) {
                    me.tools.wesea({data: data, model: model}, go).grid();
                    sgo.reload();
                    fp.down("[name=process_api]").setValue('overtime');
                    fp.down("[name=process_api_model]").setValue('Overtime');
                    fp.setLoading(false);

                    var check_employee;
                    var i_count = 0;
                    $.each(data, function (key, value) {
                        if(value.transferapitransaction.code.employee_code == ""){
                            i_count = parseInt(i_count+1);
                        }
                    });

                    if(i_count > 0){
                        me.tools.alert.info("Ada Master Employee baru yang belum tercatat di Cherry. Silahkan Transfer API Master terlebih dahulu");
                        fp.down("[action=process_cherry]").hide();
                    }else{
                        fp.down("[action=process_cherry]").show();
                    }

                    if(data.length < 1){
                        fp.down("[action=process_cherry]").hide();
                    }else{
                        fp.down("[action=process_cherry]").show();
                    }

                }
            }).read('get_transaction_overtime');

        }

        if(choose == 'transfer_uangmakanlembur'){
            fp.down('#pUangMakanTabID').setDisabled(false);
            fp.down('#tabID').setActiveTab(2);

            fp.down('#pAttendanceTabID').setDisabled(true);
            fp.down('#pOvertimeTabID').setDisabled(true);
            fp.down('#pMedicalClaimTabID').setDisabled(true);
            fp.down('#pUnpaidLeaveTabID').setDisabled(true);
            fp.down('#pCutiBesarTabID').setDisabled(true);
            fp.down('#pSaldoCutiBayarTabID').setDisabled(true);
            fp.down('#pPotonganTransportTabID').setDisabled(true);
            fp.down('#pSaldoCutiMinusTabID').setDisabled(true);

            
            var gu = me.getGridprocessuangmakan();
            var sgu = gu.getStore();
            me.tools.ajax({
                params: {
                            // projectpt_id    : choose_projectpt,
                            ptpt_id         : choose_ptpt,
                            start_date      : choose_startdate,
                            end_date        : choose_enddate,
                            choose          : choose
                        },
                success: function (data, model) {
                    me.tools.wesea({data: data, model: model}, gu).grid();
                    sgu.reload();
                    fp.down("[name=process_api]").setValue('uangmakan');
                    fp.down("[name=process_api_model]").setValue('UangMakan');
                    fp.setLoading(false);

                    var check_employee;
                    var i_count = 0;
                    $.each(data, function (key, value) {
                        if(value.transferapitransaction.code.employee_code == ""){
                            i_count = parseInt(i_count+1);
                        }
                    });

                    if(i_count > 0){
                        me.tools.alert.info("Ada Master Employee baru yang belum tercatat di Cherry. Silahkan Transfer API Master terlebih dahulu");
                        fp.down("[action=process_cherry]").hide();
                    }else{
                        fp.down("[action=process_cherry]").show();
                    }

                    if(data.length < 1){
                        fp.down("[action=process_cherry]").hide();
                    }else{
                        fp.down("[action=process_cherry]").show();
                    }

                }
            }).read('get_transaction_uangmakan');

        }

        if(choose == 'transfer_medicalclaim'){
            fp.down('#pMedicalClaimTabID').setDisabled(false);
            fp.down('#tabID').setActiveTab(3);

            fp.down('#pAttendanceTabID').setDisabled(true);
            fp.down('#pOvertimeTabID').setDisabled(true);
            fp.down('#pUangMakanTabID').setDisabled(true);
            fp.down('#pUnpaidLeaveTabID').setDisabled(true);
            fp.down('#pCutiBesarTabID').setDisabled(true);
            fp.down('#pSaldoCutiBayarTabID').setDisabled(true);
            fp.down('#pPotonganTransportTabID').setDisabled(true);
            fp.down('#pSaldoCutiMinusTabID').setDisabled(true);

            
            var gm = me.getGridprocessmedicalclaim();
            var sgm = gm.getStore();
            me.tools.ajax({
                params: {
                            // projectpt_id    : choose_projectpt,
                            ptpt_id         : choose_ptpt,
                            start_date      : choose_startdate,
                            end_date        : choose_enddate,
                            choose          : choose
                        },
                success: function (data, model) {
                    me.tools.wesea({data: data, model: model}, gm).grid();
                    sgm.reload();
                    fp.down("[name=process_api]").setValue('medicalclaim');
                    fp.down("[name=process_api_model]").setValue('MedicalClaim');
                    fp.setLoading(false);

                    var check_employee;
                    var i_count = 0;
                    $.each(data, function (key, value) {
                        if(value.transferapitransaction.code.employee_code == ""){
                            i_count = parseInt(i_count+1);
                        }
                    });

                    if(i_count > 0){
                        me.tools.alert.info("Ada Master Employee baru yang belum tercatat di Cherry. Silahkan Transfer API Master terlebih dahulu");
                        fp.down("[action=process_cherry]").hide();
                    }else{
                        fp.down("[action=process_cherry]").show();
                    }

                    if(data.length < 1){
                        fp.down("[action=process_cherry]").hide();
                    }else{
                        fp.down("[action=process_cherry]").show();
                    }


                }
            }).read('get_transaction_medicalclaim');

        }

        if(choose == 'transfer_unpaidleave'){
            fp.down('#pUnpaidLeaveTabID').setDisabled(false);
            fp.down('#tabID').setActiveTab(4);

            fp.down('#pAttendanceTabID').setDisabled(true);
            fp.down('#pOvertimeTabID').setDisabled(true);
            fp.down('#pUangMakanTabID').setDisabled(true);
            fp.down('#pMedicalClaimTabID').setDisabled(true);
            fp.down('#pCutiBesarTabID').setDisabled(true);
            fp.down('#pSaldoCutiBayarTabID').setDisabled(true);
            fp.down('#pPotonganTransportTabID').setDisabled(true);
            fp.down('#pSaldoCutiMinusTabID').setDisabled(true);

            
            var gul = me.getGridprocessunpaidleave();
            var sgul = gul.getStore();
            me.tools.ajax({
                params: {
                            // projectpt_id    : choose_projectpt,
                            ptpt_id         : choose_ptpt,
                            start_date      : choose_startdate,
                            end_date        : choose_enddate,
                            choose          : choose
                        },
                success: function (data, model) {
                    me.tools.wesea({data: data, model: model}, gul).grid();
                    sgul.reload();
                    fp.down("[name=process_api]").setValue('unpaidleave');
                    fp.down("[name=process_api_model]").setValue('UnpaidLeave');
                    fp.setLoading(false);

                    var check_employee;
                    var i_count = 0;
                    $.each(data, function (key, value) {
                        if(value.transferapitransaction.code.employee_code == ""){
                            i_count = parseInt(i_count+1);
                        }
                    });

                    if(i_count > 0){
                        me.tools.alert.info("Ada Master Employee baru yang belum tercatat di Cherry. Silahkan Transfer API Master terlebih dahulu");
                        fp.down("[action=process_cherry]").hide();
                    }else{
                        fp.down("[action=process_cherry]").show();
                    }

                    if(data.length < 1){
                        fp.down("[action=process_cherry]").hide();
                    }else{
                        fp.down("[action=process_cherry]").show();
                    }

                }
            }).read('get_transaction_unpaidleave');

        }

        if(choose == 'transfer_cutibesar'){
            fp.down('#pCutiBesarTabID').setDisabled(false);
            fp.down('#tabID').setActiveTab(5);

            fp.down('#pAttendanceTabID').setDisabled(true);
            fp.down('#pOvertimeTabID').setDisabled(true);
            fp.down('#pUangMakanTabID').setDisabled(true);
            fp.down('#pMedicalClaimTabID').setDisabled(true);
            fp.down('#pUnpaidLeaveTabID').setDisabled(true);
            fp.down('#pSaldoCutiBayarTabID').setDisabled(true);
            fp.down('#pPotonganTransportTabID').setDisabled(true);
            fp.down('#pSaldoCutiMinusTabID').setDisabled(true);

            
            var gcb = me.getGridprocesscutibesar();
            var sgcb = gcb.getStore();
            me.tools.ajax({
                params: {
                            // projectpt_id    : choose_projectpt,
                            ptpt_id         : choose_ptpt,
                            start_date      : choose_startdate,
                            end_date        : choose_enddate,
                            choose          : choose
                        },
                success: function (data, model) {
                    me.tools.wesea({data: data, model: model}, gcb).grid();
                    sgcb.reload();
                    fp.down("[name=process_api]").setValue('cutibesar');
                    fp.down("[name=process_api_model]").setValue('CutiBesar');
                    fp.setLoading(false);

                    var check_employee;
                    var i_count = 0;
                    $.each(data, function (key, value) {
                        if(value.transferapitransaction.code.employee_code == ""){
                            i_count = parseInt(i_count+1);
                        }
                    });

                    if(i_count > 0){
                        me.tools.alert.info("Ada Master Employee baru yang belum tercatat di Cherry. Silahkan Transfer API Master terlebih dahulu");
                        fp.down("[action=process_cherry]").hide();
                    }else{
                        fp.down("[action=process_cherry]").show();
                    }

                    if(data.length < 1){
                        fp.down("[action=process_cherry]").hide();
                    }else{
                        fp.down("[action=process_cherry]").show();
                    }
                    
                }
            }).read('get_transaction_cutibesar');

        }

        if(choose == 'transfer_saldocutibayar'){
            fp.down('#pSaldoCutiBayarTabID').setDisabled(false);
            fp.down('#tabID').setActiveTab(6);

            fp.down('#pAttendanceTabID').setDisabled(true);
            fp.down('#pOvertimeTabID').setDisabled(true);
            fp.down('#pUangMakanTabID').setDisabled(true);
            fp.down('#pMedicalClaimTabID').setDisabled(true);
            fp.down('#pUnpaidLeaveTabID').setDisabled(true);
            fp.down('#pCutiBesarTabID').setDisabled(true);
            fp.down('#pPotonganTransportTabID').setDisabled(true);
            fp.down('#pSaldoCutiMinusTabID').setDisabled(true);

            
            var gsb = me.getGridprocesssaldocutibayar();
            var sgsb = gsb.getStore();
            me.tools.ajax({
                params: {
                            // projectpt_id    : choose_projectpt,
                            ptpt_id         : choose_ptpt,
                            start_date      : choose_startdate,
                            end_date        : choose_enddate,
                            choose          : choose
                        },
                success: function (data, model) {
                    me.tools.wesea({data: data, model: model}, gsb).grid();
                    sgsb.reload();
                    fp.down("[name=process_api]").setValue('saldocutibayar');
                    fp.down("[name=process_api_model]").setValue('SaldoCutiBayar');
                    fp.setLoading(false);

                    var check_employee;
                    var i_count = 0;
                    $.each(data, function (key, value) {
                        if(value.transferapitransaction.code.employee_code == ""){
                            i_count = parseInt(i_count+1);
                        }
                    });

                    if(i_count > 0){
                        me.tools.alert.info("Ada Master Employee baru yang belum tercatat di Cherry. Silahkan Transfer API Master terlebih dahulu");
                        fp.down("[action=process_cherry]").hide();
                    }else{
                        fp.down("[action=process_cherry]").show();
                    }

                    if(data.length < 1){
                        fp.down("[action=process_cherry]").hide();
                    }else{
                        fp.down("[action=process_cherry]").show();
                    }
                }
            }).read('get_transaction_saldocutibayar');

        }

        if(choose == 'transfer_potongantransport'){
            fp.down('#pPotonganTransportTabID').setDisabled(false);
            fp.down('#tabID').setActiveTab(7);

            fp.down('#pAttendanceTabID').setDisabled(true);
            fp.down('#pOvertimeTabID').setDisabled(true);
            fp.down('#pUangMakanTabID').setDisabled(true);
            fp.down('#pMedicalClaimTabID').setDisabled(true);
            fp.down('#pUnpaidLeaveTabID').setDisabled(true);
            fp.down('#pCutiBesarTabID').setDisabled(true);
            fp.down('#pSaldoCutiBayarTabID').setDisabled(true);
            fp.down('#pSaldoCutiMinusTabID').setDisabled(true);

            
            var gpt = me.getGridprocesspotongantransport();
            var sgpt = gpt.getStore();
            me.tools.ajax({
                params: {
                            // projectpt_id    : choose_projectpt,
                            ptpt_id         : choose_ptpt,
                            start_date      : choose_startdate,
                            end_date        : choose_enddate,
                            choose          : choose
                        },
                success: function (data, model) {
                    me.tools.wesea({data: data, model: model}, gpt).grid();
                    sgpt.reload();
                    fp.down("[name=process_api]").setValue('potongantransport');
                    fp.down("[name=process_api_model]").setValue('PotonganTransport');
                    fp.setLoading(false);

                    var check_employee;
                    var i_count = 0;
                    $.each(data, function (key, value) {
                        if(value.transferapitransaction.code.employee_code == ""){
                            i_count = parseInt(i_count+1);
                        }
                    });

                    if(i_count > 0){
                        me.tools.alert.info("Ada Master Employee baru yang belum tercatat di Cherry. Silahkan Transfer API Master terlebih dahulu");
                        fp.down("[action=process_cherry]").hide();
                    }else{
                        fp.down("[action=process_cherry]").show();
                    }

                    if(data.length < 1){
                        fp.down("[action=process_cherry]").hide();
                    }else{
                        fp.down("[action=process_cherry]").show();
                    }
                }
            }).read('get_transaction_potongantransport');

        }

        if(choose == 'transfer_saldocutiminus'){
            fp.down('#pSaldoCutiMinusTabID').setDisabled(false);
            fp.down('#tabID').setActiveTab(8);

            fp.down('#pAttendanceTabID').setDisabled(true);
            fp.down('#pOvertimeTabID').setDisabled(true);
            fp.down('#pUangMakanTabID').setDisabled(true);
            fp.down('#pMedicalClaimTabID').setDisabled(true);
            fp.down('#pUnpaidLeaveTabID').setDisabled(true);
            fp.down('#pCutiBesarTabID').setDisabled(true);
            fp.down('#pSaldoCutiBayarTabID').setDisabled(true);
            fp.down('#pPotonganTransportTabID').setDisabled(true);


            
            var gsm = me.getGridprocesssaldocutiminus();
            var sgsm = gsm.getStore();
            me.tools.ajax({
                params: {
                            // projectpt_id    : choose_projectpt,
                            ptpt_id         : choose_ptpt,
                            start_date      : choose_startdate,
                            end_date        : choose_enddate,
                            choose          : choose
                        },
                success: function (data, model) {
                    me.tools.wesea({data: data, model: model}, gsm).grid();
                    sgsm.reload();
                    fp.down("[name=process_api]").setValue('saldocutiminus');
                    fp.down("[name=process_api_model]").setValue('SaldoCutiMinus');
                    fp.setLoading(false);

                    var check_employee;
                    var i_count = 0;
                    $.each(data, function (key, value) {
                        if(value.transferapitransaction.code.employee_code == ""){
                            i_count = parseInt(i_count+1);
                        }
                    });

                    if(i_count > 0){
                        me.tools.alert.info("Ada Master Employee baru yang belum tercatat di Cherry. Silahkan Transfer API Master terlebih dahulu");
                        fp.down("[action=process_cherry]").hide();
                    }else{
                        fp.down("[action=process_cherry]").show();
                    }

                    if(data.length < 1){
                        fp.down("[action=process_cherry]").hide();
                    }else{
                        me.tools.alert.info("Silahkan tentukan Total Saldo Cuti Minus yang ingin di proses, contoh: -1");
                        fp.down("[action=process_cherry]").show();
                    }
                }
            }).read('get_transaction_saldocutiminus');

        }



    },
    //SAVE TO DB Pform BEFORE API
    savePformDb: function (key,value) {
        var me, grid, store;
        me = this;
        
        var jsonString = JSON.stringify(value);
        var result_id;
        //DB_LOG
        me.tools.ajax({
            params: {   
                        jsonString          : jsonString
                    },
            success: function (data, model) {
                if(data.others[0][0].msg == 'berhasil'){
                    result_id = data.others[0][0].hasil;
                    if(result_id){
                        console.log(result_id);
                        var res = me.getPformToken('submitData',key,value,result_id);
                    }
                }else{
                    console.log('Something error...');
                }
            }
        }).read('save_productivity_form_beforeapi');

    },
    //GET TOKEN CHERRY
    getPformToken: function(action,key,value,result_id){
        var me = this;
        //GET URL DAN USERNAME
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                                    
                var url = data.others[0][0].url;
                var username = data.others[0][0].username;
                var password = data.others[0][0].password;

                $.ajax({
                        type: 'POST',
                        url: url + me.urlToken,
                        contentType: 'application/json',
                        data: JSON.stringify({ 
                                CommandName:"RequestToken",
                                ModelCode:"AppUserAccount",
                                UserName:username,
                                Password:password,
                                ParameterData:[]
                        }),
                        success: function(response){
                            var json = JSON.parse(JSON.stringify(response));
                            var token = json.Token;

                            if(token){
                                if(action == 'submitData'){
                                    me.submitPformData(token,'insert',key,value,result_id,url,username,password);
                                }
                            }
                            // return token;
                        },
                        error: function(XMLHttpRequest) {
                            alert('ERROR');
                        }
                }); 
            }
        }).read('urlusername');
        
    },
    //GET SUBMIT CHERRY
    submitPformData: function(token,action,key,value,result_id,url,username,password){
        var me = this;

        //DEFINITION
            var json_api = JSON.stringify(
                                {
                                    "CommandName":"Submit",
                                    "ModelCode":"EMProductivityFormSchemas",
                                    "UserName":username,
                                    "Secure": false,
                                    "Token":token,
                                    "ParameterData": [],
                                    "ModelData": {
                                        "CompanyCode": value.company_code,
                                        "FormKeyProperty": value.formkeyproperty,
                                        "Name": value.name,
                                        "DetailList":[
                                            {
                                                "Active" : true,
                                                "Description" : value.detail.attendance_desc,
                                                "FormulationCode": value.detail.attendance_formula,
                                            },
                                            {
                                                "Active" : true,
                                                "Description" : value.detail.overtime_desc,
                                                "FormulationCode":value.detail.overtime_formula,
                                            },
                                            {
                                                "Active" : true,
                                                "Description" : value.detail.uangmakanlembur_desc,
                                                "FormulationCode":value.detail.uangmakanlembur_formula,
                                            },
                                            {
                                                "Active" : true,
                                                "Description" : value.detail.medicalclaim_desc,
                                                "FormulationCode":value.detail.medicalclaim_formula,
                                            },
                                            {
                                                "Active" : true,
                                                "Description" : value.detail.unpaidleave_desc,
                                                "FormulationCode":value.detail.unpaidleave_formula,
                                            },
                                            {
                                                "Active" : true,
                                                "Description" : value.detail.cutibesar_desc,
                                                "FormulationCode":value.detail.cutibesar_formula,
                                            },
                                            {
                                                "Active" : true,
                                                "Description" : value.detail.saldocutidibayarkan_desc,
                                                "FormulationCode":value.detail.saldocutidibayarkan_formula,
                                            },
                                            {
                                                "Active" : true,
                                                "Description" : value.detail.potongantransport_desc,
                                                "FormulationCode":value.detail.potongantransport_formula,
                                            },
                                            {
                                                "Active" : true,
                                                "Description" : value.detail.saldocutiminus_desc,
                                                "FormulationCode":value.detail.saldocutiminus_formula,
                                            }
                                        ],
                                        "Active": true
                                    },
                                    "ContainFiles": false
                                }
                            );

        $.ajax({
                type: 'POST',
                url: url + me.urlServiceRequest,
                contentType: 'application/json',
                data: json_api ,
                success: function(response){
                    var json = JSON.parse(JSON.stringify(response));
                    var result_data = json.Data;
                    var result_status = json.MessageType;
                    var result_status_message = json.Message;

                    me.updatePformDb(action,key,value,result_id,result_data,result_status,result_status_message);
                },
                error: function(XMLHttpRequest) {
                    alert('ERROR');
                }
        }); 
    },
    //UPDATE TO DB COMMON BEFORE API
    updatePformDb: function (action,key,value,result_id,result_data,result_status,result_status_message) {
        var me, grid, store;
        me = this;
        
        var jsonString = JSON.stringify(value);
        var jsonStringResult = JSON.stringify(result_data);

        // var load = 0;
        // var count = 0;

        //DB_LOG
        me.tools.ajax({
            params: {   
                        action              : action,
                        result_id           : JSON.stringify(result_id),
                        jsonString          : jsonString,
                        jsonStringResult    : jsonStringResult,
                        result_status       : result_status,
                        result_status_message : result_status_message
                    },
            success: function (data, model) {
                console.log(data);

                var fp = me.getFormprocess();
                var count = parseInt(me.productform_load+1);
                me.productform_load = count;

                fp.setLoading("Process Pform data to Cherry "+me.productform_load+" of "+me.productform_count);

                console.log('Pform --'+me.productform_load+'----'+me.productform_count);

                if(me.productform_load == me.productform_count){
                    me.formProcessAfterRender();
                    
                    setTimeout(function () {
                        fp.setLoading(false);
                    }, 3000);
                }
            }
        }).read('update_productivity_form_afterapi');

    },

    //getlast activity
    getLastActivityPtId: function(){
        var me, grid, store;
        me = this;

        var f = me.getPanel().down("form");
        var choose_ptpt = f.down("[name=ptpt_id]").getValue();
        var vs = f.getValues();
        var choose = vs["transfer_type"];

        f.down("[name=la_start_date]").setValue('');
        f.down("[name=la_end_date]").setValue('');
        f.down("[name=la_payroll_month]").setValue('');
        f.down("[name=la_payroll_year]").setValue('');

        if(choose_ptpt != '999'){
            me.tools.ajax({
                    params: {
                                ptpt_id         : choose_ptpt,
                                choose          : choose
                            },
                    success: function (data, model) {

                        if(data.others[0][0].HASIL != null){
                            if(data.others[0][0].HASIL.processdata_from){
                                f.down("[name=la_start_date]").setValue(data.others[0][0].HASIL.processdata_from);
                            }

                            if(data.others[0][0].HASIL.processdata_end){
                                f.down("[name=la_end_date]").setValue(data.others[0][0].HASIL.processdata_end);
                            }

                            if(data.others[0][0].HASIL.processpayroll_month){
                                f.down("[name=la_payroll_month]").setValue(data.others[0][0].HASIL.processpayroll_month);
                            }

                            if(data.others[0][0].HASIL.processpayroll_year){
                                f.down("[name=la_payroll_year]").setValue(data.others[0][0].HASIL.processpayroll_year);
                            }
                        }
                    }
            }).read('get_lastactivity');

        }
    },

    //ambil periode payroll di cherry
    cherryPayrollPeriode: function () {
        var me, grid, store;
        me = this;
        var f                       = me.getPanel().down("form");
        var choose_ptpt             = f.down("[name=ptpt_id]").getValue();
        var choose_payroll_month    = f.down("[name=payroll_month]").getValue();
        var choose_payroll_year     = f.down("[name=payroll_year]").getValue();

        var fp = me.getFormprocess();
        fp.setLoading("Please wait...");

        me.tools.ajax({
            params: {pt_id: choose_ptpt},
            success: function (data, model) {

                var companycode     = data.others[0][0].HASIL.company_code;

                me.tools.ajax({
                    params: {},
                    success: function (data, model) {
                                            
                        var url = data.others[0][0].url;
                        var username = data.others[0][0].username;
                        var password = data.others[0][0].password;

                        $.ajax({
                                type: 'POST',
                                url: url + me.urlToken,
                                contentType: 'application/json',
                                data: JSON.stringify({ 
                                        CommandName:"RequestToken",
                                        ModelCode:"AppUserAccount",
                                        UserName:username,
                                        Password:password,
                                        ParameterData:[]
                                }),
                                success: function(response){
                                    var json = JSON.parse(JSON.stringify(response));
                                    var token = json.Token;

                                    if(token){
                                        //DEFINITION
                                            var json_api = JSON.stringify(
                                                            {
                                                                "CommandName":"GetSingle",
                                                                "ModelCode":"PayrollPeriods",
                                                                "UserName":username,
                                                                "Token":token,
                                                                "ParameterData":[
                                                                    {
                                                                        "ParamKey": "CompanyCode",
                                                                        "ParamValue": companycode,
                                                                        "Operator": "eq"
                                                                    },
                                                                    {
                                                                        "ParamKey": "Month",
                                                                        "ParamValue": choose_payroll_month,
                                                                        "Operator": "eq"
                                                                    },
                                                                    {
                                                                        "ParamKey": "Year",
                                                                        "ParamValue": choose_payroll_year,
                                                                        "Operator": "eq"
                                                                    }
                                                                ]
                                                            }
                                                        );

                                        $.ajax({
                                                type: 'POST',
                                                url: url + me.urlServiceRequest,
                                                contentType: 'application/json',
                                                data: json_api ,
                                                success: function(response){
                                                    var json = JSON.parse(JSON.stringify(response));
                                                    var result_data = json.Data;
                                                    
                                                    if(result_data.Code){
                                                        var jsonStringResult = JSON.stringify(result_data);

                                                        me.tools.ajax({
                                                            params: {   
                                                                        jsonStringResult    : jsonStringResult
                                                                    },
                                                            success: function (data, model) {

                                                                fp.setLoading(false);
                                                                fp.down("[action=process_cherry]").show();
                                                            }
                                                        }).read('cherryCutOffDate');
                                                    }else{
                                                        fp.setLoading(false);
                                                        me.tools.alert.info("Periode cut off date Bulan "+choose_payroll_month+" Tahun "+choose_payroll_year+" di cherry belum di setting, Silahkan hubungi PIC Cherry");
                                                        fp.down("[action=process_cherry]").hide();
                                                    }

                                                },
                                                error: function(XMLHttpRequest) {
                                                    alert('ERROR');
                                                }
                                        }); 
                                    }
                                    // return token;
                                },
                                error: function(XMLHttpRequest) {
                                    alert('ERROR');
                                }
                        }); 
                    }
                }).read('urlusername');
                
            }
        }).read('companycodecherry');
    },
});