Ext.define('Hrd.controller.Cleansingdata', {
    extend: 'Hrd.library.template.controller.Controllermanual',
    alias: 'controller.Cleansingdata',
    requires: [
        'Hrd.library.box.tools.EventSelector1b',
        'Hrd.library.box.tools.Tools',
        'Hrd.library.template.combobox.Departmentcombobox',
        'Hrd.library.template.combobox.Employeecombobox',
        'Hrd.template.combobox.Projectcombobox',
        'Hrd.template.combobox.Ptcombobox',
        'Hrd.template.combobox.Jobfamilycombobox',
        'Hrd.template.combobox.Positioncombobox',
        'Hrd.template.combobox.Bandingcombobox',
        'Hrd.template.combobox.Groupcombobox',
        'Hrd.template.combobox.Reporttocombobox',
        'Hrd.template.combobox.Approvaltransfercombobox',
        'Hrd.template.combobox.Changestatustypecombobox',
    ],
    views: [
        'cleansingdata.Panel',
        'cleansingdata.FormData',
        'cleansingdata.FormSearch',
        'cleansingdata.Formlookupdocument',
        'cleansingdata.Grid',
        'cleansingdata.Griddocument',
    ],
    stores: [
        'Cleansingdata',
        'Project',
        'Pt',
        'Employee',
        'Reportto',
        'Department',
        'Jobfamily',
        'Position',
        'Banding',
        'Group',
        'Changestatustype',
        'Changestatustypedoc',
        'Changestatusdocument',
    ],
    models: [
        'Cleansingdata',
    ],
    refs: [
        {ref: 'panel', selector: 'cleansingdatapanel'},
        {ref: 'grid', selector: 'cleansingdatagrid'},
        {ref: 'griddocument', selector: 'cleansingdatadocumentgrid'},
        {ref: 'formsearch', selector: 'cleansingdataformsearch'},
        {ref: 'formdata', selector: 'cleansingdataformdata'},
        {ref: 'formupload', selector: 'cleansingdataformupload'},
        {ref: 'formlookupdocument', selector: 'cleansingdataformlookupdocument'},
    ],
    controllerName: 'cleansingdata',
    fieldName: 'employee_nik',
    bindPrefixName: 'Cleansingdata',
    urldata: 'hrd/cleansingdata/',
    urlcommon: 'hrd/common/read',
    urlrequest: null,
    senddata: null,
    info: null,
    messagedata: null,
    typedata: 0,
    formWidth: 780,
    rowdata: null,
    win: null,
    winId: null,
    cleansingdata_id : 0,
    report: 'Cleansingdata',
    loadingrequest: new Ext.LoadMask(Ext.getBody(), {msg: "Please wait..."}),
    init: function (application) {
        var me = this;
        
        
       console.log('me.myConfig' + me.myConfig);

        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        this.control({
            'cleansingdatapanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender
            },
            'cleansingdatagrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'cleansingdatagrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'cleansingdatadocumentgrid actioncolumn': {
                click: this.gridActionColumnClickdocument
            },
            'cleansingdataformsearch button[action=reset]': {
                click: this.dataReset
            },
            'cleansingdataformdata': {
                afterrender: this.formDataAfterRender,
                boxready: function () {
                    var me;
                    me = this;
                    me.formDataBoxready();
                }
            },
            'cleansingdataformupload': {
                afterrender: this.formUploadAfterRender,

            },
            'cleansingdataformlookupdocument': {
                afterrender: this.formDocumentAfterRender,

            },
            'cleansingdataformdata [name=employee_id]': {
                select: function (the, newValue, oldValue, eOpts) {
                    var row, form;
                    form = me.getFormdata();
                    row = the.valueModels[0].data;
                    me.setDatatransfer(form, row);
                    me.StatusEmployee(form, row);
                }
            },
            'cleansingdataformdata [name=new_project_id]': {
                select: function (the, newValue, oldValue, eOpts) {
                    var row, form;
                    form = me.getFormdata();
                    row = the.valueModels[0].data;
                    form.down('[name=new_pt_id]').setValue('');
                    form.down('[name=new_department_id]').setValue('');
                    form.down('[name=new_group_id]').setValue('');
                    form.down('[name=new_reportto_id]').setValue('');
                    form.down('[name=new_reportto_position_id]').setValue('');
                    form.down('[name=new_department_id]').setValue('');
                    form.down('[name=new_group_id]').setValue('');
                    me.filterPtbyprojectbyparam(form, 'new_pt_id', row.project_id);
                }
            },
            'cleansingdataformdata [name=new_reportto_id]': {
                select: function (the, newValue, oldValue, eOpts) {
                    var row, form;
                    form = me.getFormdata();
                    row = the.valueModels[0].data;
                    form.down('[name=new_reportto_position_id]').setValue(row.position_id);
                }
            },
            'cleansingdataformdata button[action=save]': {
                click: this.dataSavecustome

            },
            'cleansingdataformdata button[action=approve]': {
                click: this.dataApprove
            },
            'cleansingdataformupload button[action=process]': {
                click: this.UploadSubmit
            },
            'cleansingdataformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'cleansingdataformsearch': {
                afterrender: this.formSearchAfterRender,

            },
            'cleansingdataformsearch button[action=search]': {
                click: function () {
                    var me;
                    me = this;
                    me.dataSearch();
                }
            },            
            'cleansingdataformdata [name=new_banding_id]': {
                expand: function () {
                    var store, form, old_banding, row, index;
                    form        = me.getFormdata();
                    store       = form.down("[name=new_banding_id]").getStore();
                    old_banding = form.down("[name=old_banding_id]").getValue();
                    new_banding = form.down("[name=new_banding_id]").getValue();
                    row         = store.getAt(store.findExact('banding_id', old_banding));
                    old_index_no = row.get('index_no');
                    store.clearFilter();                    
                }
            },
            'cleansingdataformdata [name=new_group_id]': {
                expand: function () {
                    var store, form, old_group, row, index;
                    form        = me.getFormdata();
                    store       = form.down("[name=new_group_id]").getStore();
                    old_group = form.down("[name=old_group_id]").getValue();
                    new_group = form.down("[name=new_group_id]").getValue();
                    row         = store.getAt(store.findExact('group_id', parseInt(old_group)));
                    //console.log(row);
                    old_index_no = row.get('index_no');
                    store.clearFilter();
                    
                }
            },
            'cleansingdatagrid button[action=export]': {
                click: function (el, val) {
                    var me;
                    me=this;              
                    me.exportData();                

                }
            },  

        });
    },
    formUploadAfterRender: function () {
        var me, form;
        me = this;
        form = me.getFormupload();
    },
    formDocumentAfterRender: function () {
        var me, form;
        me = this;
        form = me.getFormlookupdocument();
        me.setStoreDocument();
    },
    formDataAfterRender: function () {
        var me, form, store;
        me = this;
        form = me.getFormdata();
        me.getEmployeedata();
        me.setStoreProject();
        me.setStorePt();
        me.setJobfamily();
        me.setPosition();
        me.setBanding();
        
    },
    formDataBoxready: function () {
        var me, form, formvalue, element, statedata, grid, store, record, row;
        me = this;
        form = me.getFormdata();
        statedata = form.up('window').state.toLowerCase();
        //console.log(statedata);
        if (statedata == 'update' || statedata == 'approve') {
            grid = me.getGrid();
            store = grid.getStore();
            record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
            row = record.raw;
            form.getForm().loadRecord(record);
            //console.log(row);

            me.StatusEmployee(form, row);
            me.setReadonlydata(form);
            
            form.down('[name=employee_id]').setReadOnly(true);
        
            me.filterPtbyprojectbyparam(form, 'new_pt_id', row.new_project_id);
            //form.down('[name=groupname]').setValue(row.group);
            form.down('[name=groupname]').setValue(row.groupcode);
            me.setDepartmentbyparam(form, 'new_department_id', row.new_project_id, row.new_pt_id);
            me.setGroupbyparam(form, 'new_group_id', row.new_project_id, row.new_pt_id);
            me.setReporttobyparam(form, 'new_reportto_id', row.new_project_id, row.new_pt_id);
            form.down('[name=groupname_display]').setValue();
            
            // wulan edit, di load reord ulang karena kadang yg tampil baru id nya
            setTimeout(function() {
                form.getForm().loadRecord(record);
                
                //comment by wulan sari 20190625 : karena ada validasi akses group
                //form.down("[name=new_group_id]").setRawValue(row.new_groupcode);                
                
                // added by wulan sari 20190625
                // membatasi group berdasarkan akses user group
                var dt_ag = Array();
                dt_ag['fcombo_group_id'] = 'new_group_id';
                dt_ag['fcombo_group_id_display'] = 'new_group_id_display';
                dt_ag['combo_store'] = 'new_group_id';
                dt_ag['fgroup_name'] = '';
                dt_ag['sf_group_id'] = 'group_id';
                dt_ag['vgroup_id'] = record.get('new_group_id');
                me.limitedAccessGroup(form, dt_ag);
                
                
                var dt_ag = Array();
                dt_ag['fcombo_group_id'] = 'old_group_id';
                dt_ag['fcombo_group_id_display'] = '';
                dt_ag['combo_store'] = 'new_group_id';
                dt_ag['fgroup_name'] = 'groupname_display';
                dt_ag['sf_group_id'] = 'group_id';
                dt_ag['vgroup_id'] = record.get('old_group_id');
                me.limitedAccessGroup(form, dt_ag);
                // end added by wulan sari 20190625
                
            }, 1500);
            
            //set dynamic read only
            formvalue = form.getForm().getValues();
            for (var i in formvalue) {
                element = form.down("[name=" + i + "]");
                if (element) {
                    if (statedata == 'update') {
                        if (element.absoluteReadOnly) {
                            element.setReadOnly(true);
                        }
                    } else if (statedata == 'approve') {
                        element.setReadOnly(true);
                    }

                }
            }

            if (statedata == 'update') {
                me.hideBtn(form, 'save', false);
                me.hideBtn(form, 'approve', true);
            }
        } else {
            me.hideBtn(form, 'approve', true);
        }
    },
    setDatatransfer: function (form, row) {
        var me, statedata;
        me = this;
        form.down('[name=employee_nik]').setValue(row.employee_nik);
        form.down('[name=hire_date]').setValue(row.hire_date);
        form.down('[name=old_project_id]').setValue(row.project_id);
        form.down('[name=projectname]').setValue(row.projectname);
        form.down('[name=old_pt_id]').setValue(row.pt_id);
        form.down('[name=ptname]').setValue(row.ptname);
        form.down('[name=old_department_id]').setValue(row.department_id);
        form.down('[name=department]').setValue(row.department);
        form.down('[name=old_jobfamily_id]').setValue(row.jobfamily_id);
        form.down('[name=old_position_id]').setValue(row.position_id);
        form.down('[name=old_banding_id]').setValue(row.banding_id);
        form.down('[name=old_group_id]').setValue(row.group_id);
        //form.down('[name=groupname]').setValue(row.group);
        form.down('[name=groupname]').setValue(row.groupcode);
        form.down('[name=old_reportto_id]').setValue(row.reportto);
        form.down('[name=reporttoname]').setValue(row.reporttoname);
        form.down('[name=old_reportto_position_id]').setValue(row.reportto_position_id);

        form.down('[name=new_project_id]').setValue(row.project_id);
        form.down('[name=new_pt_id]').setValue(row.pt_id);
        form.down('[name=new_jobfamily_id]').setValue(row.jobfamily_id);
        form.down('[name=new_department_id]').setValue(row.department_id);
        form.down('[name=new_position_id]').setValue(row.position_id);
        form.down('[name=new_banding_id]').setValue(row.banding_id);
        form.down('[name=new_group_id]').setValue(row.group_id);
        form.down('[name=new_reportto_id]').setValue(row.reportto);
        form.down('[name=new_reportto_position_id]').setValue(row.reportto_position_id);

        me.setDepartmentbyparam(form, 'new_department_id', row.project_id, row.pt_id);
        me.setGroupbyparam(form, 'new_group_id', row.project_id, row.pt_id);
        me.setReporttobyparam(form, 'new_reportto_id', row.project_id, row.pt_id);
        
        /*
         * comment by wulan sari 20190625 : karena ada penambahan hak akses group setrawvalue 'xxx' kalau id tidak ditemukan
        setTimeout(function() {
            form.down('[name=new_group_id]').setRawValue(row.groupcode);              
        }, 1000);   
        */
    },

    setReadonlydata: function (form) {
        var me, status;
        me = this;
        form.down('[name=new_project_id]').setReadOnly(true);
        form.down('[name=new_pt_id]').setReadOnly(true);
        form.down('[name=new_department_id]').setReadOnly(false);
        form.down('[name=new_jobfamily_id]').setReadOnly(false);
        form.down('[name=new_position_id]').setReadOnly(false);
        //form.down('[name=new_banding_id]').setReadOnly(false);
        form.down('[name=new_group_id]').setReadOnly(false);
        form.down('[name=new_reportto_id]').setReadOnly(false);
        form.down('[name=new_reportto_position_id]').setReadOnly(true);
    },
    gridActionColumnClick: function (view, cell, row, col, e) {
        var me = this;
        var record = me.getGrid().getStore().getAt(row);
        var m = e.getTarget().className.match(/\bact-(\w+)\b/);
        me.getGrid().getSelectionModel().select(row);
        if (m) {
            switch (m[1]) {
                case 'CleansingdataUpload':
                    me.showFormUpload('skdocupload', record['data']);
                    break;
                case 'CleansingdataApprove':
                    me.formDataShow('', 'approve', 'CleansingdataApprove');
                    break;
                case 'CleansingdataPrint':
                    me.printData(record['data']);
                    break;
                case 'update':
                    me.formDataShow('update');
                    break;
                case 'destroy':
                    me.dataDestroy();
                    break;
            }
        }
    },
    gridActionColumnClickdocument: function (view, cell, row, col, e) {
        var me = this;
        var record = me.getGriddocument().getStore().getAt(row);
        var m = e.getTarget().className.match(/\bact-(\w+)\b/);
        me.getGriddocument().getSelectionModel().select(row);
        me.viewdocFiledetail(record['data']);       
       
    },
    printData: function (row) {
        var me;
        me = this;
        row['hideparam'] = 'print';
        row['mode_read'] = 'print';
        me.urlrequest = 'hrd/cleansingdata/print';
        me.senddata = row;
        me.AjaxRequest();
    },
    createWindows: function () {
        var me = this;
        me.winId = 'reportcleansingdatawindows';
        me.instantWindow('Panel', 1000, 'Result ', 'state-report', me.winId, 'masterreport');
        me.win = desktop.getWindow(me.winId);
    },
    submitReport: function (value) {
        var me, report, html;
        me = this;
        report = 'cleansingdata/' + me.report;
        html = me.Reportviewerjsv2(value, report);
        me.win.down("#MyReportPanel").body.setHTML(html);
        $("#Reportform").submit();
    },
    viewdocFile: function (raw) {
        var me, sk_file_upload_path, grid, store, count, url, row, employee_id;
        me = this;
        sk_file_upload_path = raw.sk_file_upload_path;
        window.open(document.URL + sk_file_upload_path);
    },
    viewdocFiledetail: function (raw) {
        var me, sk_file_upload_path, grid, store, count, url, row, employee_id;
        me = this;
        locationpath = raw.locationpath;
        window.open(document.URL + locationpath);
    },
    dataSavecustome: function () {
        var me, form, formvalue, state_submit;
        me = this;
        form = me.getFormdata();
        formvalue = form.getForm().getValues();
        if (form.getForm().isValid()) {
            state_submit = me.getFormdata().up('window').state.toLowerCase();
            me.urlrequest = me.urldata + state_submit;
            formvalue['hideparam'] = state_submit;
            formvalue['mode_read'] = state_submit;
            formvalue = me.cleannullinCombo(form, formvalue);

            me.senddata = formvalue;
            switch (state_submit) {
                case 'create':
                    form.up('window').body.mask('Saving data, create data please wait ...');
                    //me.AjaxRequest(); // comment by Wulan Sari 2018.07.17
                    
                    /* added by Wulan Sari 2018.07.17 */
                    Ext.Ajax.request({
                        url: me.urlrequest,
                        method: 'POST',
                        params: {
                            data: Ext.encode(me.senddata)
                        },
                        success: function (response) {
                            me.info = Ext.JSON.decode(response.responseText);
                            me.setSuccessEvent();
                            form.up('window').body.unmask();
                            me.formDataClose();
                        },
                        failure: function (response) {
                            me.getFormdata().up('window').close();
                        }
                    });
                    /* end added by Wulan Sari 2018.07.17 */
                    break;
                    
                case 'update':
                    form.up('window').body.mask('Saving data, update data please wait ...');
                    //me.AjaxRequest(); // comment by Wulan Sari 2018.07.17
                    
                    /* added by Wulan Sari 2018.07.17 */
                    Ext.Ajax.request({
                        url: me.urlrequest,
                        method: 'POST',
                        params: {
                            data: Ext.encode(me.senddata)
                        },
                        success: function (response) {
                            me.info = Ext.JSON.decode(response.responseText);
                            me.setSuccessEvent();
                            form.up('window').body.unmask();
                            me.formDataClose();
                        },
                        failure: function (response) {
                            me.getFormdata().up('window').close();
                        }
                    });
                    /* end added by Wulan Sari 2018.07.17 */
                    break;
            }
        }
    },
    dataApprove: function () {
        var me;
        me = this;
        me.MessageConfirm('approve', 'Are sure want to approve employee transfer..?', ' Confirm Your Approval');
    },
    MessageConfirm: function (flag, msg, title) {
        var me, store, record, form, formvalue, state_submit, row, data, grid;
        me = this;
        grid = me.getGrid();
        form = me.getFormdata();
        formvalue = form.getForm().getValues();
        Ext.Msg.show({
            title: title,
            msg: msg,
            width: 300,
            closable: false,
            buttons: Ext.Msg.YESNO,
            buttonText:
                    {
                        yes: 'YES',
                        no: 'NO'
                    },
            multiline: false,
            fn: function (buttonValue, inputText, showConfig) {
                if (buttonValue == 'yes') {
                    if (form.getForm().isValid()) {
                        state_submit = me.getFormdata().up('window').state.toLowerCase();
                        me.urlrequest = me.urldata + state_submit;
                        grid = me.getGrid();
                        store = grid.getStore();
                        record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                        row = record.raw;
                        row['hideparam'] = state_submit;
                        row['mode_read'] = state_submit;
                        row = me.cleannullinCombo(form, row);
                        me.senddata = row;
                        form.up('window').body.mask('Saving data, approval data please wait ...');
                        me.AjaxRequest();
                    }
                }
            },
            icon: Ext.Msg.QUESTION
        });
    },
    cleannullinCombo: function (form, value) {
        if (typeof (form.down("[name=old_reportto_position_id]").getValue()) !== 'number') {
            value['old_reportto_position_id'] = '0';
        }
        if (typeof (form.down("[name=new_reportto_position_id]").getValue()) !== 'number') {
            value['new_reportto_position_id'] = '0';
        }
        return value;
    },
    StatusEmployee: function (form, row) {
        var statuskaryawan, me;
        me = this;
        statuskaryawan = row.employeestatus;
        if (statuskaryawan == 'permanent') {
            var radio = form.down('[id=employeestatus1]');
            radio.boxLabelEl.update("Kontrak  Tgl");
            form.down('[name=assignation_date]').setValue(row.assignationdate);
            me.setValbyid(form, 'employeestatus1', false);
            me.setValbyid(form, 'employeestatus3', true);
            me.setVal(form, 'mulaikontrak', '');
            me.setVal(form, 'berakhirkontrak', '');
            form.down('[name=contract_ke]').setValue(0);
        } else if (statuskaryawan == 'contract') {
            var radio = form.down('[id=employeestatus1]');
            me.setVal(form, 'assignation_date', '');
            radio.boxLabelEl.update("Kontrak " + row.contract_ke + " Tgl");
            form.down('[name=mulaikontrak]').setValue(row.mulaikontrak);
            form.down('[name=berakhirkontrak]').setValue(row.berakhirkontrak);
            form.down('[name=contract_ke]').setValue(row.contract_ke);
            me.setValbyid(form, 'employeestatus1', true);
            me.setValbyid(form, 'employeestatus3', false);
        }
    },

    getEmployeedata: function () {
        var me;
        me = this;
        me.senddata = {
            'mode_read': 'getdataemployee_cleansing',
            'project_id': apps.project,
            'pt_id': apps.pt
        };
        me.urlrequest = me.urlcommon;
        me.AjaxRequest();
    },
    filterPtbyprojectbyparam: function (form, prefix_id, project_id) {
        var me, form, store, combodata, prefix;
        me = this;
        store = form.down("[name=" + prefix_id + "]").getStore();
        combodata = form.down("[name=" + prefix_id + "]");
        store.load({
            params: {
                "mode_read": 'getpt',
                "project_id": project_id,
            },
            callback: function (records, operation, success) {
                if (records !== null) {
                    var data = records[0].raw.others[0][0].data;
                    store.loadData(data);
                    prefix = combodata.getValue();
                    if (prefix !== null) {
                        combodata.setValue(prefix);
                    }
                }
            }
        });
    },
    setDepartmentbyparam: function (form, prefix_id, project_id, pt_id) {
        var me, store, combodata, prefix;
        me = this;
        store = form.down("[name=" + prefix_id + "]").getStore();
        combodata = form.down("[name=" + prefix_id + "]");
        store.load({
            url: me.urlcommon,
            params: {
                "mode_read": 'defaultdepartment',
                "project_id": project_id,
                "pt_id": pt_id,
            },
            callback: function (records, operation, success) {
                var data = records;
                store.loadData(data);
                prefix = combodata.getValue();
                if (prefix !== null) {
                    combodata.setValue(prefix);
                }
            }
        });
        
    },
    setGroupbyparam: function (form, prefix_id, project_id, pt_id, old_group) {
        var me, store, combodata, prefix, statedata;
        me = this;
        store = form.down("[name=" + prefix_id + "]").getStore();
        combodata = form.down("[name=" + prefix_id + "]");
        store.load({
            url: me.urlcommon,
            params: {
                "mode_read": 'getgroupbyprojectpt',
                "project_id": project_id,
                "pt_id": pt_id,
            },
            callback: function (records, operation, success) {
                var data = records;
                store.loadData(data);
                prefix = combodata.getValue();
                if (prefix !== null) {
                    combodata.setValue(prefix);
                }
                
                // added by wulan sari 20190625
                // membatasi group berdasarkan akses user group
                var fcombo_group_id_display = '';
                if(prefix_id == 'new_group_id'){
                    fcombo_group_id_display = 'new_group_id_display';
                }
                var dt_ag = Array();
                dt_ag['fcombo_group_id'] = prefix_id;
                dt_ag['fcombo_group_id_display'] = fcombo_group_id_display;
                dt_ag['combo_store'] = prefix_id;
                dt_ag['fgroup_name'] = '';
                dt_ag['sf_group_id'] = 'group_id';
                dt_ag['vgroup_id'] = prefix;
                me.limitedAccessGroup(form, dt_ag);
                
                var dt_ag = Array();
                dt_ag['fcombo_group_id'] = 'old_group_id';
                dt_ag['fcombo_group_id_display'] = '';
                dt_ag['combo_store'] = prefix_id;
                dt_ag['fgroup_name'] = 'groupname_display';
                dt_ag['sf_group_id'] = 'group_id';
                dt_ag['vgroup_id'] = prefix;
                me.limitedAccessGroup(form, dt_ag);
                // end added by wulan sari 20190625
                
            }
        });
    },
    /*
    getGroupdata: function (form, prefix_id, searchgroup) {
        var me, store, combodata, prefix;
        me = this;
        store = form.down("[name=" + prefix_id + "]").getStore();
        combodata = form.down("[name=" + prefix_id + "]");
        store.each(function (record)
        {
            if (record.data['code'] == searchgroup)
            {
                var group_id = record.data['group_id'];
                combodata.setValue(group_id);
            }

        });

        var last_data = combodata.getRawValue();
        if (last_data > 0) {
            combodata.setValue('');
        }


    },*/
    setReporttobyparam: function (form, prefix_id, project_id, pt_id) {
        var me, store, combodata, prefix;
        me = this;
        store = form.down("[name=" + prefix_id + "]").getStore();
        combodata = form.down("[name=" + prefix_id + "]");
        store.load({
            url: me.urlcommon,
            params: {
                //"mode_read": 'getdataemployee', comment by Wulan Sari 2018.06.11
                "mode_read": 'getdataemployeedatasubholdingwithexception_for_reportto', //added by Wulan Sari 2018.06.11
                "project_id": project_id,
                "pt_id": pt_id,
            },
            callback: function (records, operation, success) {
                var data = records;
                store.loadData(data);
                prefix = combodata.getValue();
                if (prefix !== null) {
                    combodata.setValue(prefix);
                }
            }
        });
    },
    setStoreProject: function () {
        var me, store, form, combodata, prefix;
        me = this;
        store = me.getStore("Project");
        form = me.getFormdata();
        combodata = form.down("[name=new_project_id]");
        store.load({
            params: {
                "mode_read": 'getproject',
            },
            callback: function (records, operation, success) {
                var data = records[0].raw.others[0][0].data;
                store.loadData(data);
                prefix = combodata.getValue();
                if (prefix !== null) {
                    combodata.setValue(prefix);
                }
            }
        });
    },
    setStorePt: function () {
        var me, store, form, combodata, prefix;
        me = this;
        form = me.getFormdata();
        store = me.getStore("Pt");
        combodata = form.down("[name=new_pt_id]");
        store.load({
            params: {
                "mode_read": 'getpt',
            },
            callback: function (records, operation, success) {
                var data = records[0].raw.others[0][0].data;
                store.loadData(data);
                prefix = combodata.getValue();
                if (prefix !== null) {
                    combodata.setValue(prefix);
                }
            }
        });
    },
    setStoreGroup: function () {
        var me, store;
        me = this;
        store = me.getStore("Group");
        store.load();
    },
    setJobfamily: function () {
        var me, store;
        me = this;
        store = me.getStore("Jobfamily");
        store.load();
    },
    setPosition: function () {
        var me, store;
        me = this;
        store = me.getStore("Position");
        store.load();
    },
    setBanding: function () {
        var me, store;
        me = this;
        store = me.getStore("Banding");
        store.load();
    },

    AjaxRequest: function () {
        var me;
        me = this;
        Ext.Ajax.request({
            url: me.urlrequest,
            method: 'POST',
            timeout: 90000000, // comment by Wulan Sari 2018.07.17
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
        var data = me.info.data;
        switch (me.info.parameter) {
            case 'default':
                break;
            case 'getdataemployee_cleansing':
                var form, store;
                form = me.getFormdata();
                store = form.down('[name=employee_id]').getStore();
                store.loadData(data);
                break;
            case 'getdatastatusinformation':
                var form, store;
                form = me.getFormdata();
                break;
            case 'create':
                if (me.info.success == 'true') {
                    me.messagedata = me.info.msg;
                    me.alertFormdataSuccess();
                } else {
                    me.messagedata = me.info.msg;
                    me.alertFormdataFailed();
                }
                break;
            case 'update':
                if (me.info.success == 'true') {
                    me.messagedata = me.info.msg;
                    me.alertFormdataSuccess();
                } else {
                    me.messagedata = me.info.msg;
                    me.alertFormdataFailed();
                }
                break;


        }
    },
    alertFormdataSuccess: function () {
        var me, form, store;
        me = this;
        me.getGrid().getStore().reload();
        form = me.getFormdata();
        form.up('window').body.unmask();
        Ext.Msg.show({
            title: 'Success',
            msg: me.messagedata,
            icon: Ext.Msg.INFO,
            buttons: Ext.Msg.OK,
            fn: function () {
                me.formDataClose();
            }
        });
    },
    alertFormdataFailed: function () {
        var me, form, store;
        me = this;
        me.getGrid().getStore().reload();
        form = me.getFormdata();
        form.up('window').body.unmask();
        Ext.Msg.show({
            title: 'Failure',
            msg: 'Error: ' + me.messagedata,
            icon: Ext.Msg.ERROR,
            buttons: Ext.Msg.OK
        });
    },
    exportData:function(){
        var me, url, grid;
        me = this;
        grid = me.getGrid();
        grid.setLoading('Please wait...');
        
        me.senddata = {
            'mode_read': 'exportdata',
            'project_id': apps.project,
            'pt_id': apps.pt
        };
        me.urlrequest = me.urldata + 'read';
        
        Ext.Ajax.request({
            url: me.urlrequest,
            method: 'POST',
            timeout: 90000000, 
            params: {
                data: Ext.encode(me.senddata)
            },
            success: function (response) {
                grid.setLoading(false);
                data = Ext.JSON.decode(response.responseText);
                url = data['directdata'];
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
            },
            failure: function (response) {
                me.getFormdata().up('window').close();
            }
        });
    }
});