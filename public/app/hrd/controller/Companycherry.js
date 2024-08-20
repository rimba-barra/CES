Ext.define('Hrd.controller.Companycherry', {
    extend: 'Hrd.template.ControllerForMaster',
    alias: 'controller.Companycherry',
    controllerName: 'companycherry',
    fieldName: 'companycode',
    bindPrefixName: 'Companycherry',
    urlToken: '/api/common/RequestToken',
    urlServiceRequest: '/api/common/ServiceRequest',
    uploadFotoKlik:0,
    requires: [
        'Hrd.library.box.tools.Tools',
        'Hrd.library.box.tools.DefaultConfig',
        'Hrd.library.box.tools.EventSelector',
        'Hrd.library.Box.Tools.Browse',
        'Hrd.library.box.tools.Dynamicrequest',
    ],
    dynamicrequest: null,
    refs: [
    ],
    init: function() {
        var me = this;
        
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        
        var newEvs = {};
        
        me.dynamicrequest = new Hrd.library.box.tools.Dynamicrequest();

        newEvs['companycherryformdata button[action=submit]'] = {
            click: function () {
                me.processSave();
            },
        };

        newEvs['companycherrygrid [action=remove]'] = {
            click: function () {
                me.processRemove();
            },
        };

       

        this.control(newEvs);
     
        
    },
    panelAfterRender: function (el) {
        var me = this;
        var f = me.getFormsearch();
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                me.tools.wesea(data.ptaccess, f.down("[name=ptpt_id]")).comboBox();
            }
        }).read('detail');
    },
    fdar: function() {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        me.setActiveForm(f);

        var x = {
            init: function() {
                me.fdarInit();
            },
            create: function() {
                me.unMask(1);
                me.tools.ajax({
                    params: {
                    },
                    success: function(data, model) {
                        me.tools.wesea(data.ptaccess, f.down("[name=ptpt_id]")).comboBox();
                    }
                }).read('detail');
            },
            update: function() {

                me.tools.ajax({
                    params: {
                    },
                    success: function(data, model) {
                        me.tools.wesea(data.ptaccess, f.down("[name=ptpt_id]")).comboBox();
                        var rec = g.getSelectedRecord();
                        f.editedRow = g.getSelectedRow();
                        f.getForm().loadRecord(rec);
                        console.log(rec.get('private'));
                        
                    }
                }).read('detail');


                me.unMask(1);

            }
        };
        return x;
    },
    processSave: function(){
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();

        var ptpt_id = f.down('[name=ptpt_id]').getValue();

        f.setLoading("Please wait...");

        me.tools.ajax({
            params: {
                ptpt_id:ptpt_id
            },
            success: function (data, model) {
                
                var hasil = data.others[0][0].HASIL;
                var action = data.others[0][0].ACTION_TO_CHERRY;
                var ptname = data.others[0][0].PTNAME;
                
                if(action){
                    //GET URL DAN USERNAME
                    me.tools.ajax({
                        params: {},
                        success: function (data, model) {
                            
                            var url = data.others[0][0].url;
                            var username = data.others[0][0].username;
                            var password = data.others[0][0].password;

                            me.getToken(action,hasil,ptpt_id,ptname,url,username,password);
                        }
                    }).read('urlusername');
                }
            }
        }).read('checkcompany');

    },
    processRemove: function(){
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        var sg = g.getStore();

        rec = g.getSelectedRecord();
        id = rec.get("company_id");
        rows = g.getSelectionModel().getSelection();
        var company_id = "";

        if (rows.length > 0) {
            for (var i in rows) {
                company_id += rows[i]['data']["company_id"] + "~";
            }
        }

        var delete_question = Ext.Msg.confirm('Delete', 'Are you sure to delete '+rows.length+" data(s) ?", function(e){
            if(e == 'yes'){
                g.setLoading("Please wait...");
                me.tools.ajax({
                    params: {
                        company_id:company_id
                    },
                    success: function (data, model) {

                        var action = data.others[0][0].ACTION_TO_CHERRY;
                        var hasil = data.others[0][0].HASIL;

                        if(action == 'delete'){
                            //GET URL DAN USERNAME
                            me.tools.ajax({
                                params: {},
                                success: function (data, model) {
                                    
                                    var url = data.others[0][0].url;
                                    var username = data.others[0][0].username;
                                    var password = data.others[0][0].password;

                                    $.each(hasil, function (key_list, value_list) {
                                        me.getToken(action,value_list,company_id,'',url,username,password);
                                    });
                                    
                                    setTimeout(function () {
                                        sg.reload();
                                        me.tools.alert.info("Success Delete and Send to Cherry");
                                        g.setLoading(false);
                                    }, 9000);
                                }
                            }).read('urlusername');
                        }
                        if(action == ''){
                            sg.reload();
                            me.tools.alert.info("Company tidak bisa dihapus, karena sudah ada data");
                            g.setLoading(false);
                        }
                    }
                }).read('getcompany');
            }
         });



    },
    //GET TOKEN CHERRY
    getToken: function(action,hasil,ptpt_id,ptname,url,username,password){
        var me = this;

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
                        if(action == 'insert'){
                            me.submitData(action,hasil,ptpt_id,ptname,url,username,password,token);
                        }
                        if(action == 'delete'){
                            me.deleteData(action,hasil,ptpt_id,'',url,username,password,token);
                        }
                        //COMPANY TIDAK ADA UPDATE
                        // if(action == 'update'){
                        //     me.updateData(action,hasil,ptpt_id,ptname,url,username,password);
                        // }
                    }
                    // return token;
                },
                error: function(XMLHttpRequest) {
                    alert('ERROR');
                }
        }); 
    },
    //GET SUBMIT CHERRY
    submitData: function(action,hasil,ptpt_id,ptname,url,username,password,token){
        var me = this;

        $.ajax({
                type: 'POST',
                url: url + me.urlServiceRequest,
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        "CommandName":"Submit",
                        "ModelCode":"Companies",
                        "UserName":username,
                        "Secure": false,
                        "Token":token,
                        "ParameterData": [],
                        "ModelData": {
                            "LabelCode": ptname,
                            "Name": ptname,
                            "Description": ptname
                        },
                        "ContainFiles": false
                    }
                ),
                success: function(response){
                    var json = JSON.parse(JSON.stringify(response));
                    var result_data = json.Data;
                    var result_data_code = json.Data.Code;
                    var result_status = json.MessageType;
                    var result_status_message = json.Message;
                    me.saveMaster(action,hasil,ptpt_id,ptname,result_data,result_data_code,result_status,result_status_message);
                    
                    //GET TAX STATUS
                    me.getTaxStatus(action,hasil,ptpt_id,ptname,url,username,password,token,result_data,result_data_code);

                    //Employment STATUS
                    me.saveEmpStatus(action,hasil,ptpt_id,ptname,url,username,password,token,result_data,result_data_code);
                },
                error: function(XMLHttpRequest) {
                    alert('ERROR');
                }
        }); 
    },
    //SAVE TO DB LOG
    saveMaster: function (action,hasil,ptpt_id,ptname,result_data,result_data_code,result_status,result_status_message) {
        var me, grid, store;
        me = this;
        var g = me.getGrid();
        var sg = g.getStore();
        var f = me.getFormdata();
        var jsonStringResult = JSON.stringify(result_data);

        //DB MASTER
        me.tools.ajax({
            params: {   
                        action                          : action,
                        hasil                           : hasil,
                        ptpt_id                         : ptpt_id,
                        ptname                          : ptname,
                        result_data                     : result_data,
                        result_data_code                : result_data_code,
                        result_status                   : result_status,
                        result_status_message           : result_status_message
                    },
            success: function (data, model) {
                if(data.others[0][0].MSG == 'berhasil'){
                    //DB LOG
                    me.tools.ajax({
                        params: {   
                                    action                          : action,
                                    hasil                           : hasil,
                                    ptpt_id                         : ptpt_id,
                                    ptname                          : ptname,
                                    result_data                     : result_data,
                                    jsonStringResult                : jsonStringResult,
                                    result_data_code                : result_data_code,
                                    result_status                   : result_status,
                                    result_status_message           : result_status_message,
                                    company_id                      : data.others[0][0].hasil
                                },
                        success: function (data, model) {
                            console.log(data);
                            me.tools.alert.info("Success Create and Send to Cherry");
                            sg.reload();
                            f.up('window').close();
                        }
                    }).read('savelog');
                }else{
                    me.tools.alert.warning("Failed Create Company and Send to Cherry");
                    sg.reload();
                    f.up('window').close();
                }
            }
        }).read('savemaster');

        f.setLoading(false);

    },

    //GET DELETE CHERRY
    deleteData: function(action,hasil,ptpt_id,ptname,url,username,password,token){
        var me = this;

        $.ajax({
                type: 'POST',
                url: url + me.urlServiceRequest,
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        "CommandName":"Remove",
                        "ModelCode":"Companies",
                        "UserName":username,
                        "Token":token,
                        "ParameterData": [],
                        "ModelData": {
                            "Code": hasil.company_code,
                            "Name": hasil.pt_name,
                            "Description": hasil.pt_name,
                            "InsertStamp": hasil.insertstamp,
                            "UpdateStamp": hasil.updatestamp,
                            "Active": false
                        }
                    }
                ),
                success: function(response){
                    var json = JSON.parse(JSON.stringify(response));
                    var result_data = json.Data;
                    var result_data_code = json.Data.Code;
                    var result_status = json.MessageType;
                    var result_status_message = json.Message;
                    me.deleteMaster(action,hasil,ptpt_id,ptname,result_data,result_data_code,result_status,result_status_message);
                    
                },
                error: function(XMLHttpRequest) {
                    alert('ERROR');
                }
        }); 
    },
    deleteMaster: function (action,hasil,ptpt_id,ptname,result_data,result_data_code,result_status,result_status_message) {
        var me, grid, store;
        me = this;
        var g = me.getGrid();
        var sg = g.getStore();
        var f = me.getFormdata();
        var jsonStringResult = JSON.stringify(result_data);
        var jsonStringHasil = JSON.stringify(hasil);

        //DB MASTER
        me.tools.ajax({
            params: {   
                        action                          : action,
                        hasil                           : jsonStringHasil,
                        ptpt_id                         : ptpt_id,
                        ptname                          : ptname,
                        result_data                     : result_data,
                        jsonStringResult                : jsonStringResult,
                        result_data_code                : result_data_code,
                        result_status                   : result_status,
                        result_status_message           : result_status_message
                    },
            success: function (data, model) {
                if(data.others[0][0].MSG == 'berhasil'){
                    //DB LOG
                    me.tools.ajax({
                        params: {   
                                    action                          : action,
                                    hasil                           : jsonStringHasil,
                                    ptpt_id                         : ptpt_id,
                                    ptname                          : ptname,
                                    result_data                     : result_data,
                                    jsonStringResult                : jsonStringResult,
                                    result_data_code                : result_data_code,
                                    result_status                   : result_status,
                                    result_status_message           : result_status_message
                                },
                        success: function (data, model) {
                            if(data.others[0][0].MSG == 'berhasil'){
                                // console.log(data);
                                // me.tools.alert.info("Success Delete and Send to Cherry");
                                // sg.reload();
                            }else{
                                me.tools.alert.warning("Failed Delete Company and Send to Cherry");
                                sg.reload();
                            }
                        }
                    }).read('savelogdelete');
                }else{
                    me.tools.alert.warning("Failed Delete Company and Send to Cherry");
                    sg.reload();
                }
            }
        }).read('deletemaster');
                

    },

    //GET TAX STATUS CHERRY
    getTaxStatus: function(action,hasil,ptpt_id,ptname,url,username,password,token,result_data,result_data_code){
        var me = this;

        $.ajax({
                type: 'POST',
                url: url + me.urlServiceRequest,
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        "CommandName": "GetList",
                        "ModelCode": "PayrollTaxStatus",
                        "UserName": username,
                        "Token": token,
                        "ParameterData": [
                            
                            {
                                "ParamKey": "Active",
                                "ParamValue": "True",
                                "Operator": "eq"
                            },
                            {
                                "ParamKey": "CompanyCode",
                                "ParamValue": result_data_code,
                                "Operator": "eq"
                            }

                        ]
                    }
                ),
                success: function(response){
                    var json = JSON.parse(JSON.stringify(response));
                    var result_data = json.Data;
                    me.saveMasterTaxStatus(result_data);

                },
                error: function(XMLHttpRequest) {
                    alert('ERROR');
                }
        }); 
    },
    saveMasterTaxStatus: function (result_data) {
        var me, grid, store;
        me = this;
        var g = me.getGrid();
        var sg = g.getStore();
        var f = me.getFormdata();
        var jsonStringResult = JSON.stringify(result_data);

        //DB MASTER
        me.tools.ajax({
            params: {   
                        jsonStringResult                : jsonStringResult
                    },
            success: function (data, model) {
                console.log(data);
            }
        }).read('savetaxstatus');

    },

    //GET EMP STATUS CHERRY
    saveEmpStatus: function(action,hasil,ptpt_id,ptname,url,username,password,token,result_data,result_data_code){
        var me = this;

        var str_master = "permanent,contract,candidate,daily permanent,daily contract,temporary,consultant";

        var strArray_master = str_master.split(",");

        $.each(strArray_master, function (key, value) {
            $.ajax({
                    type: 'POST',
                    url: url + me.urlServiceRequest,
                    contentType: 'application/json',
                    data: JSON.stringify(
                        {
                            "CommandName":"Submit",
                            "ModelCode":"EmploymentStatus",
                            "UserName":username,
                            "Secure": false,
                            "Token":token,
                            "ParameterData": [],
                            "ModelData": {
                                "CompanyCode": result_data_code,
                                "Name": value,
                                "StatusId": "Approved"
                            },
                            "ContainFiles": false
                        }
                    ),
                    success: function(response){
                        var json = JSON.parse(JSON.stringify(response));
                        var result_data = json.Data;
                        var result_data_code = json.Data.Code;
                        var result_status = json.MessageType;
                        var result_status_message = json.Message;
                        me.saveMasterEmpStatus(result_data,result_data_code,result_status,result_status_message);

                    },
                    error: function(XMLHttpRequest) {
                        alert('ERROR');
                    }
            }); 

        });
    },
    saveMasterEmpStatus: function (result_data,result_data_code,result_status,result_status_message) {
        var me, grid, store;
        me = this;
        var g = me.getGrid();
        var sg = g.getStore();
        var f = me.getFormdata();
        var jsonStringResult = JSON.stringify(result_data);

        //DB MASTER
        me.tools.ajax({
            params: {   
                        jsonStringResult                : jsonStringResult,
                        result_data_code                : result_data_code,
                        result_status                   : result_status,
                        result_status_message           : result_status_message,
                    },
            success: function (data, model) {
                console.log(data);
            }
        }).read('saveempstatus');

    },
});