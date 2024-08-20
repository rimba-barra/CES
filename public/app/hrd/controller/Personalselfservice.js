Ext.define('Hrd.controller.Personalselfservice', {
    extend: 'Hrd.library.template.controller.Controllermanual',
    alias: 'controller.Personalselfservice',
    requires: [
        'Hrd.library.template.combobox.Departmentcombobox',
        'Hrd.library.template.combobox.Employeecombobox',
    ],
    views: [
        'personalselfservice.Panel',
        'personalselfservice.Grid',
        'personalselfservice.GridChield',
        'personalselfservice.GridSibling',
        'personalselfservice.GridContact',
        'personalselfservice.GridOrganization',
        'personalselfservice.GridEducationFormal',
        'personalselfservice.GridEducationNonFormal',
        'personalselfservice.GridJobHis',
	'personalselfservice.GridDocument',
        'personalselfservice.FormSearch',
        'personalselfservice.FormData',
        'personalselfservice.FormPersonal',
        'personalselfservice.FormFamily',
        'personalselfservice.FormFamilySpouse',
        'personalselfservice.FormFamilyParent',
        'personalselfservice.FormContact',
        'personalselfservice.FormOrganization',
        'personalselfservice.FormEducation',
        'personalselfservice.FormPotency',
        'personalselfservice.FormJobHis',
	'personalselfservice.FormDocument',
	'personalselfservice.FormApprove',
    ],
    stores: [
        'Personalselfservice',
        'Department',
        'Employee',
        'FamilyCouple',
        'FamilyParent',
        'ContactEmergency',
        'Organization',
        'EducationFormal',
        'EducationNonFormal',
        'JobHistory',
	'Document',
    ],
    models: [
        'Personalselfservice',
        'Department',
        'Employee',
        'FamilyCouple',
        'FamilyParent',
        'ContactEmergency',
        'Organization',
        'EducationFormal',
        'EducationNonFormal',
        'JobHistory',
	'Document',
    ],
    refs: [
        {ref: 'panel', selector: 'personalselfservicepanel'},
        {ref: 'grid', selector: 'personalselfservicegrid'},
        {ref: 'gridchield', selector: 'familychieldgrid'},
        {ref: 'gridsibling', selector: 'familysiblinggrid'},
        {ref: 'gridcontact', selector: 'familycontactgrid'},
        {ref: 'gridorganization', selector: 'familyorganizationgrid'},
        {ref: 'grideducationformal', selector: 'familyeducationformalgrid'},
        {ref: 'grideducationnonformal', selector: 'familyeducationnonformalgrid'},
        {ref: 'gridjobhistory', selector: 'familyjobhisgrid'},
	{ref: 'griddocument', selector: 'personaldocumentgrid'},
        {ref: 'formsearch', selector: 'personalselfserviceformsearch'},
        {ref: 'formdata', selector: 'personalselfserviceformdata'},
        {ref: 'formpersonal', selector: 'personalselfserviceformpersonal'},
        {ref: 'formfamily', selector: 'personalselfserviceformfamily'},
        {ref: 'formorganization', selector: 'personalselfserviceformorganization'},
        {ref: 'formcontact', selector: 'personalselfserviceformcontact'},
        {ref: 'formfamilyspouse', selector: 'personalselfserviceformfamilyspouse'},
        {ref: 'formfamilyparent', selector: 'personalselfserviceformfamilyparent'},
        {ref: 'formeducation', selector: 'personalselfserviceformeducation'},
        {ref: 'formpotency', selector: 'personalselfserviceformpotency'},
        {ref: 'formjobhistory', selector: 'personalselfserviceformjobhis'},
	{ref: 'formdocument', selector: 'personalselfserviceformdocument'},
	{ref: 'formapprove', selector: 'personalselfserviceformapprove'},
    ],
    controllerName: 'personalselfservice',
    fieldName: 'personalselfservice',
    bindPrefixName: 'Personalselfservice',
    rowproject: null, storept: null, state: null,
    typedata: 0,
    formWidth: 1000,
    urlrequest: null, senddata: null, info: null,
    rowdata: null,
    init: function (application) {
        var me = this;
        this.control({
            'personalselfservicepanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender
            },
            'personalselfservicegrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'familychieldgrid': {
                afterrender: this.griddataChield,

            },
            'familysiblinggrid': {
                afterrender: this.griddataSibling,

            },
            'personalselfservicegrid toolbar button[action=view]': {
                click: function () {
                    me.state = 'view';
                    me.formDataShow('View');
                }
            },
            'personalselfservicegrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'personalselfserviceformsearch button[action=reset]': {
                click: this.dataReset
            },
            'personalselfserviceformdata': {
                afterrender: this.formDataAfterRender
            },
            'personalselfserviceformdata button[action=submit]': {
                click: this.DataSave
            },
            'personalselfserviceformdata button[action=approve]': {
                click: this.DataApprove
            },
            'personalselfserviceformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'personalselfserviceformsearch': {
                afterrender: this.formSearchAfterRender
            },
            'personalselfserviceformsearch [name=status]': {
                change: function (the, newValue, oldValue, eOpts) {
                    var me, form, typedata, grid;
                    me = this;
                    grid = me.getGrid();
                    form = me.getFormsearch();
                    typedata = me.getValRadio(form, "status");
                    if (typedata !== undefined) {
                        me.typedata = typedata;
                        if (typedata !== '1' && typedata !== '4') {
                            grid.down("[action=view]").hide();
                        } else {
                            grid.down("[action=view]").show();
                        }
                    }
                }
            },
            'personalselfserviceformsearch [name=employee_id]': {
                select: function (combo, records, eOpts) {
                    var me, form, employee_name, grid;
                    me = this;
                    grid = me.getGrid();
                    form = me.getFormsearch();
                    employee_name = me.getVal(form, "employee_id", 'raw');
                    me.setVal(form, "employee_name", employee_name);
                }
            },
            'personalselfserviceformsearch button[action=search]': {
                click: function () {
                    var me, form, employee_name;
                    me = this;
                    me.dataSearch();

                }
            },
            'personalselfserviceformdata [name=tabviewdataselfservive] ': {
                'afterrender': function () {
                    me.checkTabviewdata();
                },
                'tabchange': function (p, eOpts) {
                    var me;
                    me = this;
                    me.checkTabviewdata();
                },
            },
            'personalselfserviceformfamily [name=tabfamily] ': {
                'afterrender': function () {
                    me.getDataFamily();
                },
                'tabchange': function (p, eOpts) {
                    var me;
                    me = this;
                    me.getDataFamily();
                },
            },
            'personalselfserviceformeducation [name=tabeducation] ': {
                'afterrender': function () {
                    //me.getDataFamily();
                },
                'tabchange': function (p, eOpts) {
                    var me;
                    me = this;
                    //me.getDataFamily();
                },
            },

	    /* start action view */
            'personalselfserviceformdocument button[action=lihatdokumen_bpjs_pp]': {
                click: function () {
                    me.viewdocFile("BPJS_PP");
                }
            },
            'personalselfserviceformdocument button[action=lihatdokumen_bpjs_k]': {
                click: function () {
                    me.viewdocFile("BPJS_K");
                }
            },
            'personalselfserviceformdocument button[action=lihatdokumen_bpjs_kk]': {
                click: function () {
                    me.viewdocFile("BPJS_KK");
                }
            },
            'personalselfserviceformdocument button[action=lihatdokumen_ijazah]': {
                click: function () {
                    me.viewdocFile("IJAZAH");
                }
            },
            'personalselfserviceformdocument button[action=lihatdokumen_manulife_p]': {
                click: function () {
                    me.viewdocFile("MANULIFE_P");
                }
            },
            'personalselfserviceformdocument button[action=lihatdokumen_rekening]': {
                click: function () {
                    me.viewdocFile("REKENING");
                }
            },
            'personalselfserviceformdocument button[action=lihatdokumen_kk]': {
                click: function () {
                    me.viewdocFile("KK");
                }
            },
            'personalselfserviceformdocument button[action=lihatdokumen_ktp]': {
                click: function () {
                    me.viewdocFile("KTP");
                }
            },

            'personalselfserviceformdocument button[action=lihatdokumen_npwp]': {
                click: function () {
                    me.viewdocFile("NPWP");
                }
            },

            //added by michael 09/08/2021
            'personalselfserviceformdocument button[action=lihatdokumen_vaksin1]': {
                click: function () {
                    me.viewdocFile("VAKSIN1");
                }
            },	
            'personalselfserviceformdocument button[action=lihatdokumen_vaksin2]': {
                click: function () {
                    me.viewdocFile("VAKSIN2");
                }
            },  
            //end added by michael 09/08/2021
            //added by anas 10022022
            'personalselfserviceformdocument button[action=lihatdokumen_vaksin3]': {
                click: function () {
                    me.viewdocFile("VAKSIN3");
                }
            }, 
            'personalselfserviceformdocument button[action=lihatdokumen_pas_foto]': {
                click: function () {
                    me.viewdocFile("PAS_FOTO");
                }
            }, 
            'personalselfserviceformdocument button[action=lihatdokumen_stnk]': {
                click: function () {
                    me.viewdocFile("STNK");
                }
            }, 

        });
    },
    checkTabviewdata: function () {
        var me, grid, store, record, data, row, formdata, formpersonal,
                tab, tabname;
        me = this;

        grid = me.getGrid();
        store = grid.getStore();
        record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
        data = record.data;
        row = record.raw;
        me.rowdata = row;
        
        formdata = me.getFormdata();
        formpersonal = me.getFormpersonal();
        tab = formdata.down("[name=tabviewdataselfservive]").getActiveTab();
        tabname = tab.name;




        switch (tabname) {
            case 'personaldata':
                if (me.typedata == 4) {
                    // data for new data
                    me.getnewdataEmployee();
                } else {
                    // data for update
                me.getdataEmployee();
                }
                break;
            case 'family':
                //me.getDataFamily(row);
                break;
            case 'contact':
                me.griddataContact();
                break;
            case 'organization':
                me.griddataOrganization();
                break;
            case 'education':
                me.griddataEducation();
                break;
            case 'potential':
                me.getPotency();
                break;
            case 'jobhis':
                me.griddataJobHistory();
                break;
	    case 'document':
                me.griddataDocument();
                break;	
	    case 'dataapprove':
                me.getDataApprove();
            break;	
	
        }

    },
    getnewdataEmployee: function () {
        var me, form, info, tab, data, element, activetab;
        me = this;
        form = me.getFormdata();

        Ext.Ajax.request({
            url: 'hrd/personalselfservice/read',
            method: 'POST',
            params: {
                data: Ext.encode({
                    'mode_read': 'getdata_newdata_employee',
                    'project_id': me.rowdata['project_id'],
                    'pt_id': me.rowdata['pt_id'],
                    'employee_nik': me.rowdata['employee_nik'],
                })
            },
            success: function (response) {
                info = Ext.JSON.decode(response.responseText);
                if (info.data !== null) {
                    data = info.data;
                    activetab = info.data.activetab;
                    me.focusActivetab(activetab);
                    $.each(data, function (key, value) {
                        element = form.down("[name=" + key + "]");
                        if (element) {
                            me.setVal(form, key, value);
                        }

                    });
                }
            },
            failure: function (response) {

            }
        });

    },
    getdataEmployee: function () {
        var me, form, info, tab, data, element, activetab;
        me = this;
        form = me.getFormdata();

        Ext.Ajax.request({
            url: 'hrd/personalselfservice/read',
            method: 'POST',
            params: {
                data: Ext.encode({
                    'mode_read': 'getdata_approve_employee',
                    'employee_id': me.rowdata['employee_id'],
                })
            },
            success: function (response) {
                info = Ext.JSON.decode(response.responseText);
                if (info.data !== null) {
                    data = info.data;
		    activetab = info.data.activetab;
                    me.focusActivetab(activetab);  	
		  
                    $.each(data, function (key, value) {
                        element = form.down("[name=" + key + "]");
                        if (element) {
                            me.setVal(form, key, value);
                        }
                        
                    });
                }
            },
            failure: function (response) {

            }
        });

    },
    focusActivetab: function (activetab) {
        var me, form, info, tab, data, element, activetab;
        me = this;
        form = me.getFormdata();
        
        if(activetab.ps_employee){
            form.down("[name=personaldata]").setTitle("<span style='background-color: yellow; border: 5px solid yellow;'>"+" Personal Data &#9888;"+"</span>");
        }
        if(activetab.ps_education || activetab.ps_traininghistory){
            form.down("[id=tabeducation]").setTitle("<span style='background-color: yellow; border: 5px solid yellow;'>"+" Education &#9888;"+"</span>");
        }
        if(activetab.ps_potency){
             form.down("[name=potential]").setTitle("<span style='background-color: yellow; border: 5px solid yellow;'>"+" Potential &#9888;"+"</span>");
        }
        if(activetab.ps_jobhistory){
            form.down("[name=jobhis]").setTitle("<span style='background-color: yellow; border: 5px solid yellow;'>"+" Job Histroy &#9888;"+"</span>");
        }
        if(activetab.ps_organization){
            form.down("[name=organization]").setTitle("<span style='background-color: yellow; border: 5px solid yellow;'>"+" Organization &#9888;"+"</span>");
        }
        if(activetab.ps_relation){
            form.down("[name=contact]").setTitle("<span style='background-color: yellow; border: 5px solid yellow;'>"+" Contact &#9888;"+"</span>");
        }        
        if(activetab.ps_family){
            form.down("[name=family]").setTitle("<span style='background-color: yellow; border: 5px solid yellow;'>"+" Family &#9888;"+"</span>");
        }        
        if(activetab.ps_document){
            form.down("[name=document]").setTitle("<span style='background-color: yellow; border: 5px solid yellow;'>"+" Documents &#9888;"+"</span>");
        }
        
    },	

    getDataApprove: function () {
        var me, form, info, data, element;
        me = this;
        form = me.getFormapprove();
        Ext.Ajax.request({
            url: 'hrd/personalselfservice/read',
            method: 'POST',
            params: {
                data: Ext.encode({
                    'mode_read': 'getdata_already_valid',
                    'employee_id': me.rowdata['employee_id'],
                })
            },
            success: function (response) {
                info = Ext.JSON.decode(response.responseText);
                if (info.data !== null) {
                    data = info.data;
                    $.each(data, function (key, value) {
                        element = form.down("[name=" + key + "]");
                        if (element) {
                            console.log(key);
                            console.log(value);
                            me.setVal(form, key, value);
                        }
                        
                    });
                }
            },
            failure: function (response) {

            }
        });

    },
     griddataDocument: function () {
        var me, grid, store, form;// rowdata = '';
        me = this;
        grid = me.getGriddocument();
        store = grid.getStore();
        /* comment by Wulan Sari 2018.10.13
        store.load(){
            params: {
                "mode_read": 'getdatadocument',
                "employee_id": me.rowdata.employee_id,
                "start": 0,
                "limit": 100,
            },
            callback: function (records, operation, success) {
            }
        });*/
         
        // Start Edit by Wulan Sari 2018.10.13
        store.on('beforeload', function(store, operation){
            store.removeAll();
            operation.params = Ext.applyIf({
                "mode_read": 'getdatadocument',
                "employee_id": me.rowdata.employee_id,
                "start": 0,
                "limit": 100,                
            }, operation.params)
        });
        
        store.load({
            callback: function (records, operation, success) {
                var f = me.getFormdocument();
                grid = me.getGriddocument();
                store = grid.getStore();
                var rec = store.getAt(0)
                f.loadRecord(rec);
                
                var bank = rec.get('bank_rekening');
                var no = rec.get('nomor_rekening');
                var nama = rec.get('nama_rekening');
                f.down("[name=no_rekening]").setValue('Bank : ' + bank + ', No Rekening : ' + no + ', Atas Nama : ' + nama);
//                {name: 'nama_rekening', type: 'string'},
//                {name: 'bank_rekening', type: 'string'},
//                {name: 'nomor_rekening', type: 'string'},
            }
        });
        
        // End Edit by Wulan Sari 2018.10.13
        
    },	
    griddataJobHistory: function () {
        var me, grid, store, form, rowdata = '';
        me = this;
        grid = me.getGridjobhistory();
        store = grid.getStore();
        /* comment by Wulan Sari 2018.10.13
        store.load({
            params: {
                "mode_read": 'getdatajobhistory',
                "employee_id": me.rowdata.employee_id,
                "start": 0,
                "limit": 100,
            },
            callback: function (records, operation, success) {
            }
        });*/
        // Start Edit by Wulan Sari 2018.10.13
        store.on('beforeload', function(store, operation){
            store.removeAll();
            operation.params = Ext.applyIf({
                "mode_read": 'getdatajobhistory',
                "employee_id": me.rowdata.employee_id,
                "start": 0,
                "limit": 100,  
            }, operation.params)
        });
        store.load();
        // End Edit by Wulan Sari 2018.10.13
    },
    getPotency: function () {
        var me, form, info, data, id, el, row;
        me = this;
        Ext.Ajax.request({
            url: 'hrd/personalselfservice/read',
            method: 'POST',
            params: {
                data: Ext.encode({
                    'mode_read': 'getdata_approve_potency',
                    'employee_id': me.rowdata['employee_id'],
                })
            },
            success: function (response) {
                info = Ext.JSON.decode(response.responseText);
                data = info.data;
                form = me.getFormpotency();
                for (var index in data) {
                    row = data[index];
                    id = row['potency_id'];
                    el = form.down("[name=skills_" + id + "]");

                    if (el) {
                        if (row['value']) {
                            el.setValue(row['value']);
                        }

                    }
                    /// check if list exist
                    if (row['list']) {
                        el = form.down("[name=skills_" + id + "_list]");
                        if (el) {
                            el.setValue(row['list']);
                        }
                    }

                    /// check if active taken
                    if (row['is_active']) {
                        el = form.down("[name=skills_" + id + "_active]");
                        if (el) {
                            el.setValue(row['is_active']);
                        }
                    }
                }


            },
            failure: function (response) {

            }
        });

    },
    getDataFamily: function () {
        var me, formdata, formspouse, formparent, tab, tabname, info;
        me = this;
        formdata = me.getFormfamily();
        tab = formdata.down("[name=tabfamily]").getActiveTab();
        tabname = tab.name;

        switch (tabname) {
            case 'familyspouse':
                Ext.Ajax.request({
                    url: 'hrd/personalselfservice/read',
                    method: 'POST',
                    params: {
                        data: Ext.encode({
                            'mode_read': 'getdata_approve_spouse',
                            'employee_id': me.rowdata['employee_id'],
                        })
                    },
                    success: function (response) {
                        info = Ext.JSON.decode(response.responseText);
                        if (info.data !== null) {
                            formspouse = me.getFormfamilyspouse();
                            formspouse.down('[name=relation_id]').setValue(info.data.relation_id);
                            formspouse.down('[name=employee_id]').setValue(me.rowdata.employee_id);
                            formspouse.down('[name=last_education]').setValue(info.data.last_education);
                            formspouse.down('[name=name]').setValue(info.data.name);
                            formspouse.down('[name=birth_place]').setValue(info.data.birth_place);
                            formspouse.down('[name=birth_date]').setValue(info.data.birth_date);
                            formspouse.down('[name=education]').setValue(info.data.education);
                            formspouse.down('[name=birth_place]').setValue(info.data.birth_place);
                            formspouse.down('[name=education]').setValue(info.data.education);
                            formspouse.down('[name=marriage_date]').setValue(me.rowdata.marriage_date);
                            formspouse.down('[name=child_count]').setValue(me.rowdata.child_count);
                            formspouse.down('[name=job]').setValue(info.data.job);
                            formspouse.down('[name=company_name]').setValue(info.data.company_name);
                            formspouse.down('[name=company_line_of_business]').setValue(info.data.company_line_of_business);
                            formspouse.down('[name=company_address]').setValue(info.data.company_address);
                            formspouse.down('[name=company_phone]').setValue(info.data.company_phone);
                            formspouse.down('[name=hp_number]').setValue(info.data.hp_number);
                        }


                    },
                    failure: function (response) {

                    }
                });
                me.griddataChield();
                break;
            case 'familyparent':
                Ext.Ajax.request({
                    url: 'hrd/personalselfservice/read',
                    method: 'POST',
                    params: {
                        data: Ext.encode({
                            'mode_read': 'getdata_approve_father',
                            'employee_id': me.rowdata['employee_id'],
                        })
                    },
                    success: function (response) {
                        info = Ext.JSON.decode(response.responseText);
                        if (info.data !== null) {
                            formparent = me.getFormfamilyparent();
                            formparent.down('[name=name_father]').setValue(info.data.name);
                            formparent.down('[name=birthdate_father]').setValue(info.data.birth_date);
                            formparent.down('[name=work_father]').setValue(info.data.job);
                            formparent.down('[name=address]').setValue(info.data.address);
                        }

                    },
                    failure: function (response) {

                    }
                });

                Ext.Ajax.request({
                    url: 'hrd/personalselfservice/read',
                    method: 'POST',
                    params: {
                        data: Ext.encode({
                            'mode_read': 'getdata_approve_mother',
                            'employee_id': me.rowdata['employee_id'],
                        })
                    },
                    success: function (response) {
                        info = Ext.JSON.decode(response.responseText);
                        if (info.data !== null) {
                            formparent = me.getFormfamilyparent();
                            formparent.down('[name=name_mother]').setValue(info.data.name);
                            formparent.down('[name=birthdate_mother]').setValue(info.data.birth_date);
                            formparent.down('[name=work_mother]').setValue(info.data.job);
			    formparent.down('[name=address_mother]').setValue(info.data.address);	

                        }

                    },
                    failure: function (response) {

                    }
                });
                me.griddataSibling();
                break;

        }
    },
    griddataEducation: function () {
        var me, gridformal, gridnonformal, storeformal, storenonformal, rowdata = '';
        me = this;
        gridformal = me.getGrideducationformal();
        gridnonformal = me.getGrideducationnonformal();
        
        storeformal = gridformal.getStore();
        storenonformal = gridnonformal.getStore();
        /*
        // Comment by Wulan Sari 2018.10.13
        storeformal.load({
            params: {
                "mode_read": 'getdataeducationformal',
                "employee_id": me.rowdata.employee_id,
                "start": 0,
                "limit": 100,
            },
            callback: function (records, operation, success) {
            }
        });
        storenonformal.load({
            params: {
                "mode_read": 'getdataeducationnonformal',
                "employee_id": me.rowdata.employee_id,
                "start": 0,
                "limit": 100,
            },
            callback: function (records, operation, success) {
            }
        });
        */
       
        // Start Edit by Wulan Sari 2018.10.13
        storeformal.on('beforeload', function(store, operation){
            storeformal.removeAll();
            operation.params = Ext.applyIf({
                "mode_read": 'getdataeducationformal',
                "employee_id": me.rowdata.employee_id,
                "start": 0,
                "limit": 100,
            }, operation.params)
        });
        storeformal.load();
        
        storenonformal.on('beforeload', function(store, operation){
            storenonformal.removeAll();
            operation.params = Ext.applyIf({
                "mode_read": 'getdataeducationnonformal',
                "employee_id": me.rowdata.employee_id,
                "start": 0,
                "limit": 100,
            }, operation.params)
        });
        storenonformal.load();                
        // End Edit by Wulan Sari 2018.10.13
        
    },
    griddataChield: function () {
        var me, grid, store, form, rowdata = '';
        me = this;
        form = me.getFormfamilyspouse();
        grid = me.getGridchield();
        store = grid.getStore();
        /*
        // Comment by Wulan Sari 2018.10.13
        store.load({
            params: {
                "mode_read": 'getdatachield',
                "employee_id": me.rowdata.employee_id,
                "start": 0,
                "limit": 100,
            },
            callback: function (records, operation, success) {
            }
        });*/
        // Start Edit by Wulan Sari 2018.10.13
        store.on('beforeload', function(store, operation){
            store.removeAll();
            operation.params = Ext.applyIf({
                "mode_read": 'getdatachield',
                "employee_id": me.rowdata.employee_id,
                "start": 0,
                "limit": 100,
            }, operation.params)
        });
        store.load();
        // End Edit by Wulan Sari 2018.10.13
        
    },
    griddataSibling: function () {
        var me, grid, store, form, rowdata = '';
        me = this;
        form = me.getFormfamilyparent();
        grid = me.getGridsibling();
        store = grid.getStore();
        /*
        // Comment by Wulan Sari 2018.10.13
        store.load({
            params: {
                "mode_read": 'getdatasibling',
                "employee_id": me.rowdata.employee_id,
                "start": 0,
                "limit": 100,
            },
            callback: function (records, operation, success) {
            }
        });
        */
        // Start Edit by Wulan Sari 2018.10.13
        store.on('beforeload', function(store, operation){
            store.removeAll();
            operation.params = Ext.applyIf({
                "mode_read": 'getdatasibling',
                "employee_id": me.rowdata.employee_id,
                "start": 0,
                "limit": 100,
            }, operation.params)
        });
        store.load();
        // End Edit by Wulan Sari 2018.10.13
    },
    griddataOrganization: function () {
        var me, grid, store, form, rowdata = '';
        me = this;
        grid = me.getGridorganization();
        store = grid.getStore();
        /*
        // Comment by Wulan Sari 2018.10.13
        store.load({
            params: {
                "mode_read": 'getdataorganization',
                "employee_id": me.rowdata.employee_id,
                "start": 0,
                "limit": 100,
            },
            callback: function (records, operation, success) {
            }
        });
        */
        // Start Edit by Wulan Sari 2018.10.13
        store.on('beforeload', function(store, operation){
            store.removeAll();
            operation.params = Ext.applyIf({
                "mode_read": 'getdataorganization',
                "employee_id": me.rowdata.employee_id,
                "start": 0,
                "limit": 100,
            }, operation.params)
        });
        store.load();
        // End Edit by Wulan Sari 2018.10.13
    },
    griddataContact: function () {
        var me, grid, store, form, rowdata = '';
        me = this;
        grid = me.getGridcontact();
        store = grid.getStore();
        /*
        // Comment by Wulan Sari 2018.10.13
        store.load({
            params: {
                "mode_read": 'getdatacontactemergency',
                "employee_id": me.rowdata.employee_id,
                "start": 0,
                "limit": 100,
            },
            callback: function (records, operation, success) {
            }
        });
        */
        // Start Edit by Wulan Sari 2018.10.13
        store.on('beforeload', function(store, operation){
            store.removeAll();
            operation.params = Ext.applyIf({
                "mode_read": 'getdatacontactemergency',
                "employee_id": me.rowdata.employee_id,
                "start": 0,
                "limit": 100,
            }, operation.params)
        });
        store.load();
        // End Edit by Wulan Sari 2018.10.13
    },
    gridSelectionChange: function () {
        var me, grid;
        me = this;
        grid = me.getGrid();
    },
    gridActionColumnClick: function (view, cell, row, col, e) {
        var me, record, m;
        me = this;
        record = me.getGrid().getStore().getAt(row);
        m = e.getTarget().className.match(/\bact-(\w+)\b/);
        me.getGrid().getSelectionModel().select(row);

        if (m) {
            switch (m[1]) {
                case me.bindPrefixName + 'Approve':
                    me.Approvedata();
                    break;
            }
        }

    },
    DataApprove: function () {
        var me, panel, form, formvalue, employee_id, info, employee_nik, project_id, pt_id;
        me = this;
        panel = me.getPanel();
        form = me.getFormdata();
        formvalue = form.getForm().getValues();
        //employee_id = formvalue.employee_id[0];
        employee_id = me.rowdata.employee_id;
        employee_nik = me.rowdata.employee_nik;
        project_id = me.rowdata.project_id;
        pt_id = me.rowdata.pt_id;

	 Ext.Msg.show({
            title: 'Process Approve',
            msg: "Yakin ingin mengapprove data " + me.rowdata.employee_name + " ini ? jika Ya, seluruh data karyawan tersebut akan terupdate sesuai yang karyawan tersebut isi datanya.",
            width: 300,
            closable: false,
            buttons: Ext.Msg.YESNO,
            buttonText:
                    {
                        yes: 'YES',
                        no: 'CANCEL'
                    },
            multiline: false,
            fn: function (buttonValue, inputText, showConfig) {
                if (buttonValue == 'yes') {
                    form.mask("Please wait...");
                    if (me.typedata == 4) {
                        var data = {
                            'mode_read': 'createemployee',
                            'project_id': project_id,
                            'pt_id': pt_id,
                            'employee_nik': employee_nik,
                        }
                        //create new employee
                    } else {
                        var data = {
                            'mode_read': 'approve',
                            'employee_id': employee_id,
                        }
                        //update data employee
                    }


	form.mask("Please wait...");
        Ext.Ajax.request({
            url: 'hrd/personalselfservice/approve',
            method: 'POST',
            params: {
                            data: Ext.encode(data)
            },
            success: function (response) {
                info = Ext.JSON.decode(response.responseText);
                form.unmask();
                me.formDataClose();
                Ext.Msg.alert('Info', info.msg);
		me.getGrid().getStore().reload();
            },
            failure: function (response) {
                form.unmask();
                me.formDataClose();
            }
        });


                    
                }
            },
            icon: Ext.Msg.QUESTION
        });



        


    },
    Approvedata: function () {
        var me, panel, grid, store, record, data, row;
        me = this;
        panel = me.getPanel();
        grid = me.getGrid();
        store = grid.getStore();
        record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
        data = record.data;
        row = record.raw;

        Ext.Msg.show({
            title: 'Process Approve',
            msg: "Yakin ingin mengapprove data " + row.employee_name + " ini ? jika Ya, seluruh data karyawan tersebut akan terupdate sesuai yang karyawan tersebut isi datanya.",
            width: 300,
            closable: false,
            buttons: Ext.Msg.YESNO,
            buttonText:
                    {
                        yes: 'YES',
                        no: 'CANCEL'
                    },
            multiline: false,
            fn: function (buttonValue, inputText, showConfig) {
                if (buttonValue == 'yes') {
                    me.AjaxRequest(panel, 'hrd/personalselfservice/approve', data, 'approve');
                }
            },
            icon: Ext.Msg.QUESTION
        });


        //me.AjaxRequest(panel, 'hrd/personalselfservice/approve', data, 'approve');
    },
    AjaxRequest: function (obj, url, paramdata, mode_read) {
        var me, obj;
        me = this;
        obj.mask("Please wait...");
        paramdata['mode_read'] = mode_read;
        Ext.Ajax.request({
            url: url,
            method: 'POST',
            params: {
                data: Ext.encode(paramdata)
            },
            success: function (response) {
                me.info = Ext.JSON.decode(response.responseText);
                me.setSuccessEvent();
                obj.unmask();
                Ext.Msg.alert('Info', me.info.msg);
		me.getGrid().getStore().reload();
            },
            failure: function (response) {
                obj.unmask();
            }
        });
    },
    setSuccessEvent: function () {
        var me, value;
        me = this;
    },
    dataSearch: function () {
        var me, form, store, x, fields;
        resetTimer();
        me = this;
        form = me.getFormsearch();
        store = me.getGrid().getStore();
        form.down("[name=mode_read]").setValue('searching');
        fields = form.getValues();
        for (x in fields)
        {
            store.getProxy().setExtraParam(x, fields[x]);
        }
        me.loadPage(store);
    },
    fdar: function () {
        var me = this;
        var x = {
            init: function () {
                /// init here

            },
            create: function () {
                /// create here  
                me.formatCurrencyFormdata(me, me.getFormdata());
            },
            update: function () {
                var grid = me.getGrid();
                var store = grid.getStore();
                var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                me.getFormdata().loadRecord(record);

                //added by ahmad riadi 26-10-2016
                me.formatCurrencyFormdata(me, me.getFormdata());
                /// update here
            },
            read: function () { //========= added on march 15th 2016 by Tirtha
//                var grid = me.getGrid();
//                var store = grid.getStore();
//                var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
//                var row = record.data;
//                me.getFormdata().loadRecord(record);
                me.getFormdata().getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
                me.formatCurrencyFormdata(me, me.getFormdata());
                me.getFormdata().down('#btnApprove').setDisabled(false);
            }
        };
        return x;
    },
  /*start added by ahmad riadi 17-07-2017 */
    viewdocFile: function (param) {
        var me, documentdata, grid, store, count, url, row, employee_id;
        me = this;
        employee_id = me.rowdata.employee_id;
        //url = "app/hrd/uploads_tmp/personal_system/" + employee_id+"/"+param.toLowerCase();
        grid = me.getGriddocument();
        store = grid.getStore();
        count = store.getCount();
        if (count > 0) {
            documentdata = "dokumen_" + param.toLowerCase();
            store.each(function (record) {
                row = record.data;
                console.log('1 '+record.data);
                $.each(row, function (key, value) {
                    console.log('2 '+key);
                    console.log('3 '+value);
                    console.log('4 '+documentdata);
                console.log('5 '+param);
                    if (documentdata == key) {
                        if (value.length > 0) {
                            if (value != null) {
                                window.open(document.URL + "app/hrd/uploads_tmp/personal_system/" + employee_id + "/" + param.toLowerCase() + "/" + value);
                            } else {
                                Ext.Msg.alert('Info', 'No File!');
                            }
                        } else {
                            Ext.Msg.alert('Info', 'No File!');
                        }                      
                    }
                });
            });
        } else {
            Ext.Msg.alert('Info', 'No document data!');
        }
        //window.open(document.URL + "app/hrd/uploads/" + value);

    },

});