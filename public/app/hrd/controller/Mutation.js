Ext.define('Hrd.controller.Mutation', {
    extend: 'Hrd.library.template.controller.Controllermanual',
    alias: 'controller.Mutation',
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
        'Hrd.template.combobox.Alokasibiayacombobox',
        'Hrd.template.combobox.Approvaltransfercombobox',
        'Hrd.template.combobox.Sectiondepartmentcombobox',
        'Hrd.template.combobox.Changestatustypecombobox',
    ],
    views: [
        'mutation.Panel',
        'mutation.FormData',
        'mutation.FormSearch',
        'mutation.Formlookupdocument',
        'mutation.Grid',
        'mutation.Griddocument',
    ],
    stores: [
        'Mutation',
        'Project',
        'Pt',
        'Employee',
        'Reportto',
        'Department',
        'Jobfamily',
        'Position',
        'Banding',
        'Group',
        'Alokasibiaya',
        'Roleapproval',
        'Sectiondepartment',
        'Changestatustype',
        'Changestatustypedoc',
        'Changestatusdocument',
    ],
    models: [
        'Changestatus',
    ],
    refs: [
        {ref: 'panel', selector: 'mutationpanel'},
        {ref: 'grid', selector: 'mutationgrid'},
        {ref: 'griddocument', selector: 'mutationdocumentgrid'},
        {ref: 'formsearch', selector: 'mutationformsearch'},
        {ref: 'formdata', selector: 'mutationformdata'},
        {ref: 'formupload', selector: 'mutationformupload'},
        {ref: 'formlookupdocument', selector: 'mutationformlookupdocument'},
    ],
    controllerName: 'mutation',
    fieldName: 'employee_nik',
    bindPrefixName: 'Mutation',
    urldata: 'hrd/mutation/',
    urlcommon: 'hrd/common/read',
    urlrequest: null,
    senddata: null,
    info: null,
    messagedata: null,
    typedata: 0,
    formWidth: 650,
    rowdata: null,
    win: null,
    winId: null,
    changestatus_id : 0,
    report: 'Employeetransfer',
    loadingrequest: new Ext.LoadMask(Ext.getBody(), {msg: "Please wait..."}),
    init: function (application) {
        var me = this;

        this.control({
            'mutationpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender
            },
            'mutationgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'mutationgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'mutationdocumentgrid actioncolumn': {
                click: this.gridActionColumnClickdocument
            },
            'mutationformsearch button[action=reset]': {
                click: this.dataReset
            },
            'mutationformdata': {
                afterrender: this.formDataAfterRender,
                boxready: function () {
                    var me;
                    me = this;
                    me.formDataBoxready();
                }
            },
            'mutationformupload': {
                afterrender: this.formUploadAfterRender,

            },
            'mutationformlookupdocument': {
                afterrender: this.formDocumentAfterRender,

            },
            'mutationformdata [name=changetype_id]': {
                select: function (the, newValue, oldValue, eOpts) {
                    var row, form, changetype_id, store, employee_id;
                    form = me.getFormdata();
                    row = the.valueModels[0].data;
                    changetype_id = form.down('[name=changetype_id]').getValue();
                    me.setReadonlydata(changetype_id, form);
                    
                    /* add by Wulan Sari 20180410 */
                    employee_id = form.down('[name=employee_id]').getValue();
                    if(employee_id != undefined){
                        store = form.down("[name=employee_id]").getStore();
                        row = store.getAt(store.findExact('employee_id', employee_id)).data;
                        me.setDatatransfer(form, row);
                        me.StatusEmployee(form, row);
                    }
                    /* end add by Wulan Sari 20180410 */
                    
                }
            },
            'mutationformdata [name=employee_id]': {
                select: function (the, newValue, oldValue, eOpts) {
                    var row, form;
                    form = me.getFormdata();
                    row = the.valueModels[0].data;
                    me.setDatatransfer(form, row);
                    me.StatusEmployee(form, row);
                }
            },
            'mutationformdata [name=new_project_id]': {
                select: function (the, newValue, oldValue, eOpts) {
                    var row, form;
                    form = me.getFormdata();
                    row = the.valueModels[0].data;
                    form.down('[name=new_pt_id]').setValue('');
                    form.down('[name=new_department_id]').setValue('');
                    form.down('[name=new_reportto_id]').setValue('');
                    form.down('[name=new_reportto_position_id]').setValue('');
                    form.down('[name=new_department_id]').setValue('');
                    form.down('[name=new_section_id]').setValue('');
                    form.down('[name=new_group_id]').setValue('');
                    form.down('[name=new_group_id_display]').setValue('');
                    form.down('[name=new_costcenter1]').setValue('');
                    form.down('[name=new_costcenter2]').setValue('');
                    form.down('[name=new_costcenter3]').setValue('');
                    me.filterPtbyprojectbyparam(form, 'new_pt_id', row.project_id);
                }
            },
            'mutationformdata [name=new_pt_id]': {
                select: function (the, newValue, oldValue, eOpts) {
                    var row, form, project_id, changetype_id, statedata, old_group;
                    form = me.getFormdata();
                    row = the.valueModels[0].data;
                    changetype_id = form.down('[name=changetype_id]').getValue();
                    project_id = form.down('[name=new_project_id]').getValue();
                    form.down('[name=new_department_id]').setValue('');
                    form.down('[name=new_reportto_id]').setValue('');
                    form.down('[name=new_department_id]').setValue('');
                    form.down('[name=new_section_id]').setValue('');
                    form.down('[name=new_group_id]').setValue('');
                    form.down('[name=new_group_id_display]').setValue('');
                    form.down('[name=new_costcenter1]').setValue('');
                    form.down('[name=new_costcenter2]').setValue('');
                    form.down('[name=new_costcenter3]').setValue('');
                    form.down('[name=generalparameter_id]').setValue('');
                    me.setDepartmentbyparam(form, 'new_department_id', project_id, row.pt_id);
                    me.setStoreSectionbyParam(form, 'new_section_id', project_id, row.pt_id);
                    old_group = form.down('[name=groupname]').getValue();
                    me.setGroupbyparam(form, 'new_group_id', project_id, row.pt_id, old_group);
                    me.setGroupbyparam(form, 'new_group_id_display', project_id, row.pt_id, old_group);
                    me.setReporttobyparam(form, 'new_reportto_id', project_id, row.pt_id);
                    me.setAlokasibiayabyparam(form, 'new_costcenter1', project_id, row.pt_id);
                    me.filterRoleApprovebyparam(form, 'generalparameter_id', changetype_id, project_id, row.pt_id);
                                        
                    /* wulan comment 2019-07-03 karena baris ini bikin saat mutasi jadi nol group nya*/
                    if (changetype_id == 3) {
                        //mutasi
                        //statedata = form.up('window').state.toLowerCase();
                        //if (statedata == 'create') {
                        old_group = form.down('[name=groupname]').getValue();
                        me.getGroupdata(form, 'new_group_id', old_group);
                        me.getGroupdata(form, 'new_group_id_display', old_group);
                        //}
                    }
                },
            },
            'mutationformdata [name=new_reportto_id]': {
                select: function (the, newValue, oldValue, eOpts) {
                    var row, form;
                    form = me.getFormdata();
                    row = the.valueModels[0].data;
                    form.down('[name=new_reportto_position_id]').setValue(row.position_id);
                }
            },
            'mutationformdata [name=generalparameter_id]': {
                select: function (the, newValue, oldValue, eOpts) {
                    var row, form;
                    form = me.getFormdata();
                    row = the.valueModels[0].data;
                    form.down('[name=approvalby]').setValue(row.employee_id);
                }
            },
            'mutationformdata button[action=save]': {
                click: this.dataSavecustome

            },
            'mutationformdata button[action=approve]': {
                click: this.dataApprove
            },
            'mutationformupload button[action=process]': {
                click: this.UploadSubmit
            },
            'mutationformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'mutationformsearch': {
                afterrender: this.formSearchAfterRender,

            },
            'mutationformsearch button[action=search]': {
                click: function () {
                    var me;
                    me = this;
                    me.dataSearch();
                }
            },
            
            /* add by Wulan Sari 20180410 */
            'mutationformdata [name=new_banding_id]': {
                expand: function () {
                    var store, form, old_banding, changetype_id, row, index;
                    form        = me.getFormdata();
                    store       = form.down("[name=new_banding_id]").getStore();
                    old_banding = form.down("[name=old_banding_id]").getValue();
                    new_banding = form.down("[name=new_banding_id]").getValue();
                    row         = store.getAt(store.findExact('banding_id', old_banding));
                    old_index_no = row.get('index_no');
                    changetype_id = form.down("[name=changetype_id]").getValue();
                    
                    if(parseInt(changetype_id) === 1){ // Promosi    
                        store.clearFilter();
                        store.filterBy(function(record){
                            if (parseInt(record.get('index_no')) <= old_index_no) {
                                    return true
                            } else {
                                    return false
                            }
                        });
                    } else if(parseInt(changetype_id) === 4){ // Demosi                  
                        store.clearFilter();
                        store.filterBy(function(record){
                            if (parseInt(record.get('index_no')) >= old_index_no) {
                                    return true
                            } else {
                                    return false
                            }
                        });
                    } else {                   
                        store.clearFilter();                        
                    }
                    
                }
            },
            'mutationformdata [name=new_group_id]': {
                expand: function () {
                    var store, form, old_group, changetype_id, row, index;
                    form        = me.getFormdata();
                    store       = form.down("[name=new_group_id]").getStore();
                    old_group = form.down("[name=old_group_id]").getValue();
                    new_group = form.down("[name=new_group_id]").getValue();
                    row         = store.getAt(store.findExact('group_id', parseInt(old_group)));
                    //console.log(row);
                    old_index_no = row.get('index_no');
                    changetype_id = form.down("[name=changetype_id]").getValue();
                    
                    /* comment by wulan sari 20191107 index no tidak konsisten, jadi seperti nya tidak bisa dijadikan patokan
                    if(parseInt(changetype_id) === 1){ // Promosi    
                        store.clearFilter();
                        store.filterBy(function(record){
                            if (parseInt(record.get('index_no')) <= old_index_no) {
                                    return true
                            } else {
                                    return false
                            }
                        });
                    } else if(parseInt(changetype_id) === 4){ // Demosi                  
                        store.clearFilter();
                        store.filterBy(function(record){
                            if (parseInt(record.get('index_no')) >= old_index_no) {
                                    return true
                            } else {
                                    return false
                            }
                        });
                    } else {                   
                        store.clearFilter();                        
                    }*/
                    
                }
            },
            'mutationformdata [name=new_group_id_display]': {
                expand: function () {
                    var store, form, old_group, changetype_id, row, index, new_group, old_index_no;
                    form        = me.getFormdata();
                    store       = form.down("[name=new_group_id_display]").getStore();
                    old_group = form.down("[name=old_group_id]").getValue();
                    new_group = form.down("[name=new_group_id_display]").getValue();
                    row         = store.getAt(store.findExact('group_id', parseInt(old_group)));
                    //console.log(row);
                    changetype_id = form.down("[name=changetype_id]").getValue();
                    
                    
                    /* comment by wulan sari 20191107 index no tidak konsisten, jadi seperti nya tidak bisa dijadikan patokan
                    if (store.findExact('group_id', parseInt(old_group)) != -1){    
                        old_index_no = row.get('index_no');                
                        if(parseInt(changetype_id) === 1){ // Promosi    
                            store.clearFilter();
                            store.filterBy(function(record){
                                if (parseInt(record.get('index_no')) <= old_index_no) {
                                        return true
                                } else {
                                        return false
                                }
                            });
                        } else if(parseInt(changetype_id) === 4){ // Demosi                  
                            store.clearFilter();
                            store.filterBy(function(record){
                                if (parseInt(record.get('index_no')) >= old_index_no) {
                                        return true
                                } else {
                                        return false
                                }
                            });
                        } else {                   
                            store.clearFilter();                        
                        }
                    }*/
                    
                }
            },
            /* end by Wulan Sari 20180410 */
            

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
        me.setRoleapproval();
        
        /* add by Wulan 20180413 
         *  supaya defaultnya kosong*/
        store = form.down("[name=generalparameter_id]").getStore();
        store.filter('name', '000');
        
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
            //console.log(row);

            me.StatusEmployee(form, row);
            me.setReadonlydata(row.changetype_id, form);
            me.filterPtbyprojectbyparam(form, 'new_pt_id', row.new_project_id);
            //form.down('[name=groupname]').setValue(row.group);
            form.down('[name=groupname]').setValue(row.groupcode);
            me.setDepartmentbyparam(form, 'new_department_id', row.new_project_id, row.new_pt_id);
            me.setStoreSectionbyParam(form, 'new_section_id', row.new_project_id, row.new_pt_id);
            me.setGroupbyparam(form, 'new_group_id', row.new_project_id, row.new_pt_id);
            me.setGroupbyparam(form, 'new_group_id_display', row.new_project_id, row.new_pt_id);
            me.setReporttobyparam(form, 'new_reportto_id', row.new_project_id, row.new_pt_id);
            me.setAlokasibiayabyparam(form, 'new_costcenter1', row.new_project_id, row.new_pt_id);
            
            // wulan edit, di load reord ulang karena kadang yg tampil baru id nya
            form.el.mask('Please wait', 'x-mask-loading');
            setTimeout(function() {                        
               form.getForm().loadRecord(record);     
               form.el.unmask();
            }, 1700);
            
            setTimeout(function() {
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
                if(row.is_approve == 1){
                    me.hideBtn(form, 'save', true);
                    me.hideBtn(form, 'approve', true);                    
                } else {
                    me.hideBtn(form, 'save', false);
                    me.hideBtn(form, 'approve', true);
                }
            } else if (statedata == 'approve') {
                me.hideBtn(form, 'save', true);
                me.hideBtn(form, 'approve', false);        
                
                
                // added by Wulan Sari 2018.06.11
                form.down('[name=generalparameter_id]').setValue(row.approvalname);
                form.down('[name=employee_id]').setValue(row.employee_name);
                
                
            }
        } else {
            me.hideBtn(form, 'approve', true);
        }
    },
    setDatatransfer: function (form, row) {
        var me, changetype_id, statedata;
        me = this;
        changetype_id = form.down('[name=changetype_id]').getValue();
        form.down('[name=employee_nik]').setValue(row.employee_nik);
        form.down('[name=hire_date]').setValue(row.hire_date);
        form.down('[name=old_project_id]').setValue(row.project_id);
        form.down('[name=projectname]').setValue(row.projectname);
        form.down('[name=old_pt_id]').setValue(row.pt_id);
        form.down('[name=ptname]').setValue(row.ptname);
        form.down('[name=old_department_id]').setValue(row.department_id);
        form.down('[name=old_section_id]').setValue(row.section_id);
        form.down('[name=section]').setValue(row.section);
        form.down('[name=department]').setValue(row.department);
        form.down('[name=old_jobfamily_id]').setValue(row.jobfamily_id);
        form.down('[name=old_position_id]').setValue(row.position_id);
        form.down('[name=old_banding_id]').setValue(row.banding_id);
        
        //form.down('[name=groupname]').setValue(row.group);
        
        form.down('[name=old_group_id]').setValue(row.group_id);
        form.down('[name=groupname]').setValue(row.groupcode);
        form.down('[name=old_reportto_id]').setValue(row.reportto);
        form.down('[name=reporttoname]').setValue(row.reporttoname);
        form.down('[name=old_reportto_position_id]').setValue(row.reportto_position_id);
        form.down('[name=old_costcenter1]').setValue(row.alokasibiaya_id);
        form.down('[name=old_costcenter2]').setValue(row.alokasibiaya_id2);
        form.down('[name=old_costcenter3]').setValue(row.alokasibiaya_id3);
        form.down('[name=alokasibiaya1]').setValue(row.alokasibiaya1);
        form.down('[name=alokasibiaya2]').setValue(row.alokasibiaya2);
        form.down('[name=alokasibiaya3]').setValue(row.alokasibiaya3);

        form.down('[name=new_project_id]').setValue(row.project_id);
        form.down('[name=new_pt_id]').setValue(row.pt_id);
        form.down('[name=new_jobfamily_id]').setValue(row.jobfamily_id);
        form.down('[name=new_department_id]').setValue(row.department_id);
        form.down('[name=new_section_id]').setValue(row.section_id);
        form.down('[name=new_position_id]').setValue(row.position_id);
        form.down('[name=new_banding_id]').setValue(row.banding_id);
        form.down('[name=new_group_id]').setValue(row.group_id);
        form.down('[name=new_group_id_display]').setValue(row.group_id);
        form.down('[name=new_reportto_id]').setValue(row.reportto);
        form.down('[name=new_reportto_position_id]').setValue(row.reportto_position_id);
        form.down('[name=new_costcenter1]').setValue(row.alokasibiaya_id);
        form.down('[name=new_costcenter2]').setValue(row.alokasibiaya_id2);
        form.down('[name=new_costcenter3]').setValue(row.alokasibiaya_id3);
        
        // add by wulan sari 20190519
        form.down('[name=old_hari_kerja_perminggu]').setValue(row.hari_kerja_perminggu);
        form.down('[name=new_hari_kerja_perminggu]').setValue(row.hari_kerja_perminggu);
        // end add by wulan sari 20190519
        
        //console.log('aaa ' + row.group_id);
        me.setDepartmentbyparam(form, 'new_department_id', row.project_id, row.pt_id);
        me.setStoreSectionbyParam(form, 'new_section_id', row.project_id, row.pt_id);
        me.setGroupbyparam(form, 'new_group_id', row.project_id, row.pt_id);
        me.setGroupbyparam(form, 'new_group_id_display', row.project_id, row.pt_id);
        me.setReporttobyparam(form, 'new_reportto_id', row.project_id, row.pt_id);
        me.setAlokasibiayabyparam(form, 'new_costcenter1', row.project_id, row.pt_id);
        me.filterRoleApprovebyparam(form, 'generalparameter_id', changetype_id, row.project_id, row.pt_id);
        

    },

    setReadonlydata: function (changetype_id, form) {
        var me, status;
        me = this;
        if (changetype_id == 1) {
            //promosi
            status = 'Promosi';
            form.down('[name=new_project_id]').setReadOnly(true);
            form.down('[name=new_pt_id]').setReadOnly(true);
            form.down('[name=new_department_id]').setReadOnly(false);
            form.down('[name=new_section_id]').setReadOnly(false);
            form.down('[name=new_jobfamily_id]').setReadOnly(false);
            form.down('[name=new_position_id]').setReadOnly(false);
            form.down('[name=new_banding_id]').setReadOnly(false);
            //form.down('[name=new_group_id]').setReadOnly(false);
            form.down('[name=new_group_id_display]').setReadOnly(false);
            form.down('[name=new_reportto_id]').setReadOnly(false);
            form.down('[name=new_reportto_position_id]').setReadOnly(true);
            form.down('[name=new_costcenter1]').setReadOnly(false);
            form.down('[name=new_costcenter2]').setReadOnly(false);
            form.down('[name=new_costcenter3]').setReadOnly(false);
        } else if (changetype_id == 2) {
            //Rotasi
            status = 'Rotasi';
            form.down('[name=new_project_id]').setReadOnly(true);
            form.down('[name=new_pt_id]').setReadOnly(true);
            form.down('[name=new_department_id]').setReadOnly(false);
            form.down('[name=new_section_id]').setReadOnly(false);
            form.down('[name=new_jobfamily_id]').setReadOnly(false);
            form.down('[name=new_position_id]').setReadOnly(false);
            form.down('[name=new_banding_id]').setReadOnly(true);
            //form.down('[name=new_group_id]').setReadOnly(true);
            form.down('[name=new_group_id_display]').setReadOnly(true);
            form.down('[name=new_reportto_id]').setReadOnly(false);
            form.down('[name=new_reportto_position_id]').setReadOnly(true);
            form.down('[name=new_costcenter1]').setReadOnly(false);
            form.down('[name=new_costcenter2]').setReadOnly(false);
            form.down('[name=new_costcenter3]').setReadOnly(false);
        } else if (changetype_id == 3) {
            //Mutasi
            status = 'Mutasi';
            form.down('[name=new_project_id]').setReadOnly(false);
            form.down('[name=new_pt_id]').setReadOnly(false);
            form.down('[name=new_department_id]').setReadOnly(false);
            form.down('[name=new_section_id]').setReadOnly(false);
            form.down('[name=new_jobfamily_id]').setReadOnly(false);
            form.down('[name=new_position_id]').setReadOnly(false);
            form.down('[name=new_banding_id]').setReadOnly(true); //disable
            //form.down('[name=new_group_id]').setReadOnly(true); //disable
            form.down('[name=new_group_id_display]').setReadOnly(true); //disable
            form.down('[name=new_reportto_id]').setReadOnly(false);
            form.down('[name=new_reportto_position_id]').setReadOnly(true);
            form.down('[name=new_costcenter1]').setReadOnly(false);
            form.down('[name=new_costcenter2]').setReadOnly(false);
            form.down('[name=new_costcenter3]').setReadOnly(false);
        } else if (changetype_id == 4) {
            //Demosi
            status = 'Demosi';
            form.down('[name=new_project_id]').setReadOnly(true);
            form.down('[name=new_pt_id]').setReadOnly(true);
            form.down('[name=new_department_id]').setReadOnly(false);
            form.down('[name=new_section_id]').setReadOnly(false);
            form.down('[name=new_jobfamily_id]').setReadOnly(false);
            form.down('[name=new_position_id]').setReadOnly(false);
            form.down('[name=new_banding_id]').setReadOnly(false);
            //form.down('[name=new_group_id]').setReadOnly(false);
            form.down('[name=new_group_id_display]').setReadOnly(false);
            form.down('[name=new_reportto_id]').setReadOnly(false);
            form.down('[name=new_reportto_position_id]').setReadOnly(true);
            form.down('[name=new_costcenter1]').setReadOnly(false);
            form.down('[name=new_costcenter2]').setReadOnly(false);
            form.down('[name=new_costcenter3]').setReadOnly(false);
        }
        me.setLabel(form, 'lblmutasi3', " Maka kami menggunakan " + status.toUpperCase() + " bagi yang bersangkutan sbb :");
        me.setLabel(form, 'lblmutasi4', status + " Dari");
        me.setLabel(form, 'lblmutasi6', status + " Ke");


    },
    gridActionColumnClick: function (view, cell, row, col, e) {
        var me = this;
        var record = me.getGrid().getStore().getAt(row);
        var m = e.getTarget().className.match(/\bact-(\w+)\b/);
        me.getGrid().getSelectionModel().select(row);
        if (m) {
            switch (m[1]) {
                case 'MutationUpload':
                    me.showFormUpload('skdocupload', record['data']);
                    break;
                case 'MutationApprove':
                    me.formDataShow('', 'approve', 'MutationApprove');
                    break;
                case 'MutationDocument':
                    //me.viewdocFile(record['data']);
                    me.changestatus_id = record['data'].changestatus_id;
                    me.instantWindow("Formlookupdocument", 700, "View Document Upload", "view", "mutationformlookupdocument");
                    break;
                case 'MutationPrint':
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
        me.urlrequest = 'hrd/mutation/print';
        me.senddata = row;
        me.AjaxRequest();
    },
    createWindows: function () {
        var me = this;
        me.winId = 'reportemployeetransferwindows';
        me.instantWindow('Panel', 1000, 'Result ', 'state-report', me.winId, 'masterreport');
        me.win = desktop.getWindow(me.winId);
    },
    submitReport: function (value) {
        var me, report, html;
        me = this;
        report = 'employeetransfer/' + me.report;
        html = me.Reportviewerjsv2(value, report);
        me.win.down("#MyReportPanel").body.setHTML(html);
        $("#Reportform").submit();
    },
    showFormUpload: function (mode, row) {
        var me = this;
        var win = me.instantWindow("FormUpload", 400, "Upload file", "create", "mutationformupload");
        var form = me.getFormupload();
        form.down("[name=mode_name]").setValue(mode);
        form.down("[name=changestatus_id]").setValue(row.changestatus_id);
    },
    UploadSubmit: function () {
        var me, form, info, paramdata;
        me = this;
        form = me.getFormupload().getForm();
        if (me.getFormupload().getForm().isValid()) {
            form.submit({
                url: me.urldata + 'upload',
                params: {
                    'mode_read': 'upload',
                },
                waitMsg: 'Uploading your file, please wait...',
                success: function (fp, respon) {
                    info = respon.result;
                    if (info.success) {
                        Ext.Msg.alert('Success', info.msg);
                        me.getFormupload().up('window').close();
                        if (info.counternotvalid > 0) {
                            Ext.Msg.alert('Data Upload Not Valid', info.msguploaderror);
                        }
                    } else {
                        Ext.Msg.alert('Failure', info.msg);
                        //me.formDataClose();
                    }
                    me.getGrid().getStore().reload();
                },
                failure: function (f, respon) {
                    Ext.Msg.alert('Failure', respon.result.msg);
                    me.getFormupload().up('window').close();
                }
            });

        }

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

        if (typeof (form.down("[name=new_costcenter1]").getValue()) !== 'number') {
            value['new_costcenter1'] = '0';
        }
        if (typeof (form.down("[name=new_costcenter2]").getValue()) !== 'number') {
            value['new_costcenter2'] = '0';
        }
        if (typeof (form.down("[name=new_costcenter3]").getValue()) !== 'number') {
            value['new_costcenter3'] = '0';
        }
        if (typeof (form.down("[name=new_section_id]").getValue()) !== 'number') {
            value['new_section_id'] = '0';
        }
        return value;
    },
    StatusEmployee: function (form, row) {
        var statuskaryawan, me;
        me = this;
        statuskaryawan = row.employeestatus;
        if (statuskaryawan == 'permanent') {
            var radio = form.down('[id=employeestatus1]');
            radio.boxLabelEl.update("Kontrak  Tanggal");
            form.down('[name=assignation_date]').setValue(row.assignationdate);
            me.setValbyid(form, 'employeestatus1', false);
            me.setValbyid(form, 'employeestatus3', true);
            me.setVal(form, 'mulaikontrak', '');
            me.setVal(form, 'berakhirkontrak', '');
            form.down('[name=contract_ke]').setValue(0);
        } else if (statuskaryawan == 'contract') {
            var radio = form.down('[id=employeestatus1]');
            me.setVal(form, 'assignation_date', '');
            radio.boxLabelEl.update("Kontrak " + row.contract_ke + " Tanggal");
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
    filterRoleApprovebyparam: function (form, prefix_id, changetype, project_id, pt_id) {
        var me, form, store, status;
        me = this;

        if (changetype == 1) {
            status = 'approvalpromosi';
        } else if (changetype == 2) {
            status = 'approvalrotasi';
        } else if (changetype == 3) {
            status = 'approvalmutasi';
        } else if (changetype == 4) {
            status = 'approvaldemosi';
        }
        store = form.down("[name=" + prefix_id + "]").getStore();
        store.clearFilter(true);
        store.filterBy(function (record) {
            if (record.data.project_id === project_id && record.data.pt_id == pt_id && record.data.name == status) {
                return true;
            } else {
                return false;
            }
        });
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
    setStoreSectionbyParam: function (form, prefix_id, project_id, pt_id) {
        var me, store, department_id, combodata, prefix;
        me = this;
        store = form.down("[name=" + prefix_id + "]").getStore();
        combodata = form.down("[name=" + prefix_id + "]");
        store.load({
            url: me.urlcommon,
            params: {
                "mode_read": 'getsectionbyprojectpt',
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
        var me, store, combodata, prefix, statedata, form, changetype_id, mode_read;
        me = this;
        store = form.down("[name=" + prefix_id + "]").getStore();
        combodata = form.down("[name=" + prefix_id + "]");
                
        form = me.getFormdata();
        changetype_id = form.down('[name=changetype_id]').getValue();
        
        mode_read = 'getgroupbyprojectpt';
        if (changetype_id == 3) {
            mode_read = 'getgroupbyprojectpt_wcac'; // tanpa cek akses user karena kalau mutasi ke project lain kemungkinan blm ada akses di project pt tersebut
        }

        store.load({
            url: me.urlcommon,
            params: {
                "mode_read": mode_read,
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
                dt_ag['combo_store'] = 'new_group_id';
                dt_ag['fgroup_name'] = '';
                dt_ag['sf_group_id'] = 'group_id';
                dt_ag['vgroup_id'] = prefix;
                me.limitedAccessGroup(form, dt_ag);
                
                /*
                var dt_ag = Array();
                dt_ag['fcombo_group_id'] = 'old_group_id';
                dt_ag['fcombo_group_id_display'] = '';
                dt_ag['combo_store'] = 'new_group_id';
                dt_ag['fgroup_name'] = 'groupname_display';
                dt_ag['sf_group_id'] = 'group_id';
                dt_ag['vgroup_id'] = prefix;
                me.limitedAccessGroup(form, dt_ag);
                */
                // end added by wulan sari 20190625
                
                /*
                form.down('[name=old_group_id]').setValue(row.group_id);
                //form.down('[name=groupname]').setValue(row.group);
                form.down('[name=groupname]').setValue(row.groupcode);
                */
                
                /* wulan comment 2019-07-03 karena baris ini bikin saat mutasi jadi nol group nya*/
                var changetype_id = form.down('[name=changetype_id]').getValue();
                if (changetype_id == 3) {
                    //mutasi
                    statedata = form.up('window').state.toLowerCase();
                    if (statedata == 'create') {
                        if (old_group != '') {
                            old_group = form.down('[name=groupname]').getValue();
                            me.getGroupdata(form, 'new_group_id', old_group);
                            me.getGroupdata(form, 'new_group_id_display', old_group); //display jangan di get ulang
                        }
                    }
                }
            }
        });                        
    },
    getGroupdata: function (form, prefix_id, searchgroup) {
        var me, store, combodata, prefix, fcombo_group_id_display;
        me = this;
        store = form.down("[name=" + prefix_id + "]").getStore();
        combodata = form.down("[name=" + prefix_id + "]");
        var group_id = 0;
        store.each(function (record)
        {
            if (record.data['code'] == searchgroup)
            {
                var group_id = record.data['group_id'];
                combodata.setValue(group_id);
                if(prefix_id == 'new_group_id_display'){
                    form.down("[name='new_group_id']").setValue(group_id);
                }
            }

        });

        var last_data = combodata.getRawValue();
        if (last_data > 0) {
            combodata.setValue('');
        }
        
        // added by wulan sari 20190625
        // membatasi group berdasarkan akses user group
        fcombo_group_id_display = '';
        if(prefix_id == 'new_group_id'){
            fcombo_group_id_display = 'new_group_id_display';
            
            var dt_ag = Array();
            dt_ag['combo_store'] = 'new_group_id';
            dt_ag['fcombo_group_id'] = 'new_group_id';
            dt_ag['fcombo_group_id_display'] = fcombo_group_id_display;
            dt_ag['fgroup_name'] = '';
            dt_ag['sf_group_id'] = 'group_id';
            dt_ag['vgroup_id'] = group_id;
            me.limitedAccessGroup(form, dt_ag);
        }
        
        
        
        
        // end added by wulan sari 20190625
    },
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
    setAlokasibiayabyparam: function (form, prefix_id, project_id, pt_id) {
        var me, store, combodata, prefix;
        me = this;
        store = form.down("[name=" + prefix_id + "]").getStore();
        combodata = form.down("[name=" + prefix_id + "]");
        store.load({
            url: me.urlcommon,
            params: {
                "mode_read": 'getalokasibiayabyprojectpt',
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
    setRoleapproval: function () {
        var me, store, statedata, form, changetype_id, new_project_id, new_pt_id;
        me = this;
        form = me.getFormdata();
        store = me.getStore("Roleapproval");
        store.load({
            url: me.urlcommon,
            params: {
                "mode_read": 'getdataallapprovalemployeetransfer',
            },
            callback: function (records, operation, success) {
                statedata = form.up('window').state.toLowerCase();
                if (statedata == 'update') {
                    changetype_id = form.down("[name=changetype_id]").getValue();
                    new_project_id = form.down("[name=new_project_id]").getValue();
                    new_pt_id = form.down("[name=new_pt_id]").getValue();
                    me.filterRoleApprovebyparam(form, 'generalparameter_id', changetype_id, new_project_id, new_pt_id);
                }
            }
        });
    },
    setStoreDocument: function () {
        var me, store, statedata, form, changetype_id, new_project_id, new_pt_id;
        me = this;
        form = me.getFormdata();
        store = me.getStore("Changestatusdocument");
        store.load({
            url: me.urlcommon,
            params: {
                "mode_read": 'getdatachangestatusdocument',
                "changestatus_id":me.changestatus_id,
            },
            callback: function (records, operation, success) {
                
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
            case 'approve':
                if (me.info.success == 'true') {
                    me.messagedata = me.info.msg;
                    me.alertFormdataSuccess();
                } else {
                    me.messagedata = me.info.msg;
                    me.alertFormdataFailed();
                }
                break;
            case 'print':
                var value = me.info.data;
                me.createWindows();
                me.submitReport(value);
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

});