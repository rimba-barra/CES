Ext.define('Hrd.controller.Groupemployee', {
    extend: 'Hrd.library.template.controller.Controllermanual',
    alias: 'controller.Groupemployee',
    requires: [
        'Hrd.library.box.tools.EventSelector1b',
        'Hrd.library.box.tools.Tools',
        'Hrd.library.template.combobox.Employeecombobox',
        'Hrd.template.combobox.Groupcombobox',
    ],
    views: [
        'groupemployee.Panel',
        'groupemployee.FormData',
        'groupemployee.FormSearch',
        'groupemployee.Grid',
    ],
    stores: [
        'Groupemployee',
        'Employee',
        'Group',
    ],
    models: [
        'Groupemployee',
    ],
    refs: [
        {ref: 'panel', selector: 'groupemployeepanel'},
        {ref: 'grid', selector: 'groupemployeegrid'},
        {ref: 'formsearch', selector: 'groupemployeeformsearch'},
        {ref: 'formdata', selector: 'groupemployeeformdata'},
    ],
    controllerName: 'groupemployee',
    fieldName: 'employee_nik',
    bindPrefixName: 'Groupemployee',
    urldata: 'hrd/groupemployee/',
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
    groupemployee_id : 0,
    report: 'Groupemployee',
    loadingrequest: new Ext.LoadMask(Ext.getBody(), {msg: "Please wait..."}),
    init: function (application) {
        var me = this;
        
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        this.control({
            'groupemployeepanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender
            },
            'groupemployeegrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'groupemployeegrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'groupemployeeformsearch button[action=reset]': {
                click: this.dataReset
            },
            'groupemployeeformdata': {
                afterrender: this.formDataAfterRender,
                boxready: function () {
                    var me;
                    me = this;
                    me.formDataBoxready();
                }
            },
            'groupemployeeformdata [name=employee_id]': {
                select: function (the, newValue, oldValue, eOpts) {
                    var row, form;
                    form = me.getFormdata();
                    row = the.valueModels[0].data;
                    me.setDatatransfer(form, row);
                    me.StatusEmployee(form, row);
                }
            },
            'groupemployeeformdata button[action=save]': {
                click: this.dataSavecustome

            },
            'groupemployeeformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'groupemployeeformsearch': {
                afterrender: this.formSearchAfterRender,

            },
            'groupemployeeformsearch button[action=search]': {
                click: function () {
                    var me;
                    me = this;
                    me.dataSearch();
                }
            },
            'groupemployeeformdata [name=group_id]': {
                expand: function () {
                    var store, form, group, row, index;
                    form        = me.getFormdata();
                    store       = form.down("[name=group_id]").getStore();
                    group = form.down("[name=group_id]").getValue();
                    group = form.down("[name=group_id]").getValue();
                    row         = store.getAt(store.findExact('group_id', parseInt(group)));
                    
                }
            },
        });
    },
    formDataAfterRender: function () {
        var me, form, store;
        me = this;
        form = me.getFormdata();
        me.getEmployeedata();
        
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
            form.getForm().loadRecord(record);
            row = record.raw;
            //form.getForm().loadRecord(record);
            //console.log(row);

            //me.StatusEmployee(form, row);
            //me.setReadonlydata(form);
            
            form.down('[name=employee_id]').setReadOnly(true);
            me.setGroupbyparam(form, 'group_id', row.project_id, row.pt_id);
                        
            // wulan edit, di load reord ulang karena kadang yg tampil baru id nya
            setTimeout(function() {                
                // added by wulan sari 20190625
                // membatasi group berdasarkan akses user group
                var dt_ag = Array();
                dt_ag['fcombo_group_id'] = 'group_id';
                dt_ag['combo_store'] = 'group_id';
                dt_ag['fgroup_name'] = '';
                dt_ag['sf_group_id'] = 'group_id';
                dt_ag['vgroup_id'] = record.get('group_id');
                me.limitedAccessGroup(form, dt_ag);
                
                var dt_ag = Array();
                dt_ag['fcombo_group_id'] = 'group_id';
                dt_ag['combo_store'] = 'group_id';
                dt_ag['fgroup_name'] = '';
                dt_ag['sf_group_id'] = 'group_id';
                dt_ag['vgroup_id'] = record.get('group_id');
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
            }
        }
    },
    setDatatransfer: function (form, row) {
        var me, statedata;
        me = this;
        form.down('[name=employee_nik]').setValue(row.employee_nik);
        form.down('[name=hire_date]').setValue(row.hire_date);
        form.down('[name=jobfamily]').setValue(row.jobfamily);
        form.down('[name=department]').setValue(row.department);
        form.down('[name=position]').setValue(row.position);
        form.down('[name=banding]').setValue(row.banding);
        form.down('[name=group_id]').setValue(row.group_id);
        me.setGroupbyparam(form, 'group_id', row.project_id, row.pt_id);        
    },
    setReadonlydata: function (form) {
        var me, status;
        me = this;
        form.down('[name=group_id]').setReadOnly(false);
    },
    gridActionColumnClick: function (view, cell, row, col, e) {
        var me = this;
        var record = me.getGrid().getStore().getAt(row);
        var m = e.getTarget().className.match(/\bact-(\w+)\b/);
        me.getGrid().getSelectionModel().select(row);
        if (m) {
            switch (m[1]) {
                case 'update':
                    me.formDataShow('update');
                    break;
                case 'destroy':
                    me.dataDestroy();
                    break;
            }
        }
    },
    /*
    createWindows: function () {
        var me = this;
        me.winId = 'reportgroupemployeewindows';
        me.instantWindow('Panel', 500, 'Result ', 'state-report', me.winId, 'masterreport');
        me.win = desktop.getWindow(me.winId);
    },*/
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

            me.senddata = formvalue;
            switch (state_submit) {
                case 'create':
                    form.up('window').body.mask('Saving data, create data please wait ...');
                    //me.AjaxRequest(); // comment by Wulan Sari 2018.07.17
                    
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
                    break;
                    
                case 'update':
                                                            
                    Ext.Msg.confirm('Update Data', 'Are there a promotion, mutation, demosion, rotation?', function (btn) {
                        if (btn == 'yes') {                            
                            
                            var task = new Ext.util.DelayedTask(function(){
                                Ext.Msg.show({
                                    title: 'Info',
                                    msg: 'Please do update from Employee Transfer',
                                    icon: Ext.Msg.INFO,
                                    buttons: Ext.Msg.OK,
                                    fn: function () {
                                        me.getFormdata().up('window').close();
                                       // Open Menu Employee Transfer
                                        openPage({id:'mnuMutation', title:'Employee Transfer', icon:'', iconCls:'', sender:this, controller:'Mutation', widget:'Hrd.view.mutation.Panel', });

                                    }
                                });
                            });
                            //start the task after 500 miliseconds
                            task.delay(500)
                            
                        } else {
                            var task = new Ext.util.DelayedTask(function(){
                                Ext.Msg.confirm('Update Data', 'This action will sent email notification to Root User, continue ?', function (btn2) {
                                    if (btn2 == 'yes') {

                                        form.up('window').body.mask('Saving data, update data please wait ...');
                                        //me.AjaxRequest(); // comment by Wulan Sari 2018.07.17

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

                                    } else {


                                    }
                                });
                            });
                            //start the task after 500 miliseconds
                            task.delay(500)                     
                            
                            
                        }
                    });
                    
                    break;
            }
        }
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
            'mode_read': 'getdataemployee',
            'project_id': apps.project,
            'pt_id': apps.pt
        };
        me.urlrequest = me.urlcommon;
        me.AjaxRequest();
    },
    setGroupbyparam: function (form, prefix_id, project_id, pt_id, group) {
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
                console.log(prefix_id);
                if (prefix !== null) {
                    combodata.setValue(prefix);
                }
                /*
                var dt_ag = Array();
                dt_ag['fcombo_group_id'] = prefix_id;
                dt_ag['combo_store'] = prefix_id;
                dt_ag['fgroup_name'] = '';
                dt_ag['sf_group_id'] = 'group_id';
                dt_ag['vgroup_id'] = prefix;
                me.limitedAccessGroup(form, dt_ag);     
                */
            }
        });
    },
    setStoreGroup: function () {
        var me, store;
        me = this;
        store = me.getStore("Group");
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
            case 'getdataemployee':
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
    }
});