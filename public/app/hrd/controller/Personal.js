Ext.define('Hrd.controller.Personal', {
    extend: 'Hrd.library.box.controller.Controllerfdv2',
    alias: 'controller.Personal',
    requires: ['Hrd.library.box.tools.StoreProcessor', 'Hrd.library.box.tools.EventSelector1b',
        'Hrd.library.box.tools.SimpleGridControl',
        'Hrd.library.box.tools.SimpleGridControlUploadFile',
        'Hrd.library.box.tools.Tools',
        'Hrd.template.combobox.Year', //edited by ahmad riadi 2017-06-05
        'Hrd.template.combobox.Projectcombobox', //added by ahmad riadi 2017-06-09
        'Hrd.template.combobox.Ptcombobox', //added by ahmad riadi 2017-06-09
	'Hrd.template.combobox.Subholdingcombobox', //added by ahmad riadi 2017-09-11
	'Hrd.template.combobox.Sectiondepartmentcombobox', //added by ahmad riadi 2017-10-25
        'Hrd.template.combobox.Alasanresigncombobox', // added by wulan sari 20181210
        'Hrd.template.combobox.Ptkpcombobox', // added by wulan sari 20200603
        'Hrd.template.combobox.Ptkpclaimcombobox',

    ],
    //start added by ahmad riadi 2017-06-09
    stores: [
        'Project',
	'Project2',
        'Pt',
	'Pt2',
	'Subholding',
	'Sectiondepartment',
        'Employeemultiposition',
        'Alasanresign', // added by wulan sari 20181210
        'Ptkp', // added by wulan sari 20200603
	    'PtkpClaim',
    ],
    models: [
        'Project',
        'Pt',
	'Subholding',
	'Sectiondepartment',
        'Employeemultiposition',
        'Alasanresign', // added by wulan sari 20181210
        'Ptkp', // added by wulan sari 20200603


    ],
    //end added by ahmad riadi 2017-06-09
    views: ['personal.Panel', 'personal.Grid', 'personal.FormSearch', 'personal.FormData'],
    comboBoxIdEl: [],
    controllerName: 'personal',
    fieldName: 'employee_id',
    fillForm: null,
    formWidth: 800,
    alreadyInit: false,
     /* start added by ahmad riadi 12-07-2017 */
      typedoc: null,
    /* end added by ahmad riadi 12-07-2017 */	
    refs: [
        {
            ref: 'grid',
            selector: 'personalgrid'
        },
        {
            ref: 'formsearch',
            selector: 'personalformsearch'
        },
        {
            ref: 'formdata',
            selector: 'personalformdata'
        },
        {
            ref: 'grideducation',
            selector: 'personaleducationgrid'
        },
        {
            ref: 'gridsaudara',
            selector: 'personalsaudaragrid'
        },
        {
            ref: 'gridchild',
            selector: 'personalchildgrid'
        },
        {
            ref: 'gridemgcontact',
            selector: 'personalemegergencycontactgrid'
        },
        {
            ref: 'gridtraining',
            selector: 'personalcoursegrid'
        },
        {
            ref: 'gridjobs',
            selector: 'personalcompanygrid'
        },
        {
            ref: 'gridorganization',
            selector: 'personalorganizationgrid'
        },
        {
            ref: 'panel',
            selector: 'personalpanel'
        },
        {
            ref: 'gridlookupe',
            selector: 'lookuppersonalgrid'
        },
        {
            ref: 'gridtandakasih',
            selector: 'personaltandakasihgrid'
        },
        {
            ref: 'formupload',
            selector: 'personalformupload'
        },
        {
            ref: 'formuploadijasah',
            selector: '#PrsEducationGridIDFormId'
        },
        {
            ref: 'formuploadsertifikat',
            selector: '#PrsCourseGridIDFormId'
        },
        /* start added by ahmad riadi 09-06-2017*/
        {
            ref: 'formsearhcreportto',
            selector: 'lookuppersonalformsearch'
        },
        /* end added by ahmad riadi 09-06-2017*/

	/* start added by ahmad riadi 24-10-2017*/
        {
            ref: 'formdatamultiposition',
            selector: 'personalformmultiposition'
        },
        {
            ref: 'gridmultiposition',
            selector: 'personalemployeemultipositiongrid'
        },
        /* end added by ahmad riadi 24-10-2017*/        
        {
            ref: 'gridemployeehistory',
            selector: 'personalemployeetransfergrid'
        },

        //added by michael 2022-08-11
        {
            ref: 'formdataintranetca',
            selector: 'personalformintranetca'
        },
        //end added by michael 2022-08-11

        {
            ref: 'gridexportdocument',
            selector: 'personalexportdocumentgrid'
        }

	

    ],
    //unitFormula: null,
    //storeProcess: 'Otherspaymentdatadetail',
    bindPrefixName: 'Personal',
    browseHandler: null,
    localStore: {
        selectedUnit: null,
        customer: null,
        price: null,
        detail: null,
        newdetail: null
    },
    saveStore: 'newdetail',
    newButtonClicked: false,
    skillList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    uploadFotoKlik: 0,
    uploadDokumenKlik: 0,
    saveClicked: false,
    currentPage:1,	
    lastindex:0,	
   
    constructor: function(configs) {
        this.callParent(arguments);
    },
    init: function() {
        var me = this;

        if (me.alreadyInit) {
            return;
        }
        me.alreadyInit = true;
        console.log("INIT PERSONAL");

        var newEvs = {};
        var events = new Hrd.library.box.tools.EventSelector1b();
        this.control(events.getEvents(me, me.controllerName));

        // added 26 Agustus 2014
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});

        var sgc = new Hrd.library.box.tools.SimpleGridControlUploadFile({
            _gridId: 'PrsEducationGridID',
            _methodName: me.sgcPanel
        });
        this.control(sgc.getEvents(me, 'personaleducationgrid'));
        var sgcSaudara = new Hrd.library.box.tools.SimpleGridControl({
            _gridId: 'PrsSaudaraGridID',
            _methodName: me.sgcPanel
        });
        this.control(sgcSaudara.getEvents(me, 'personalsaudaragrid'));
        var sgcChild = new Hrd.library.box.tools.SimpleGridControl({
            _gridId: 'PrsChildGridID',
            _methodName: me.sgcPanel
        });
        this.control(sgcChild.getEvents(me, 'personalchildgrid'));
        var sgcEmgContact = new Hrd.library.box.tools.SimpleGridControl({
            _gridId: 'PrsEmegergencyContactGridID',
            _methodName: me.sgcPanel
        });
        this.control(sgcEmgContact.getEvents(me, 'personalemegergencycontactgrid'));
       
        var sgcCourse = new Hrd.library.box.tools.SimpleGridControlUploadFile({
            _gridId: 'PrsCourseGridID',
            _methodName: me.sgcPanel
        });
        this.control(sgcCourse.getEvents(me, 'personalcoursegrid'));

        var sgcCompany = new Hrd.library.box.tools.SimpleGridControl({
            _gridId: 'PrsCompanyGridID',
            _methodName: me.sgcPanel
        });
        this.control(sgcCompany.getEvents(me, 'personalcompanygrid'));
        
        var sgcOrg = new Hrd.library.box.tools.SimpleGridControl({
            _gridId: 'PrsOrganizationGridID',
            _methodName: me.sgcPanel
        });
        this.control(sgcOrg.getEvents(me, 'personalorganizationgrid'));


        var sgcEmHis = new Hrd.library.box.tools.SimpleGridControl({
            _gridId: 'PrsEmployeeTransferGridID',
            _methodName: me.sgcPanel
        });
        this.control(sgcEmHis.getEvents(me, 'personalemployeetransfergrid'));

	/* start added by ahmad riadi 24-10-2017 */
        newEvs['personalformmultiposition button[action=save]'] = {
            click: function () {
                var me;
                me = this;
                me.Savemultiposition();
            }
        };

        newEvs['personalemployeemultipositiongrid toolbar button[action=create]'] = {
            click: function (el, val) {
                var me;
                me = this;
                me.FormDataCustomeShow('create', 500, 'Create Multiposition', 'Hrd.view.personal.FormMultiposition', 'multipositioncreate');
            }
        };
        newEvs['personalemployeemultipositiongrid toolbar button[action=update]'] = {
            click: function (el, val) {                
                var me;
                me = this;
                
                // add by Wulan Sari 17-04-2018
                var grid = me.getGridmultiposition();
                var store = grid.getStore();
                var index = store.indexOf(grid.getSelectionModel().getSelection()[0]);
                if(index == -1){
                    Ext.Msg.alert('Warning', 'Please select record first');                    
                    return false;
                }                
                
                me.FormDataCustomeShow('update', 500, 'Update Multiposition', 'Hrd.view.personal.FormMultiposition', 'multipositionupdate');
            }
        };
        newEvs['personalemployeemultipositiongrid toolbar button[action=destroy]'] = {
            click: function (el, val) {
                var me, grid;
                me = this;
                grid = me.getGridmultiposition();
                me.dataDestroywithflag(grid);
            },
        };
        newEvs['personalformmultiposition'] = {
            afterrender: function () {
                var me;
                me = this;
                me.formDataMultipositionAfterrender();
            },
            boxready: function () {
                var me;
                me = this;
                me.formDataMultipositionBoxready();
            },
        };
        newEvs['personalformmultiposition [name=is_default]'] = {
            change: function (the, newValue, oldValue, eOpts) {
                var me, form;
                me = this;
                form = me.getFormdatamultiposition();
                if (newValue) {
                    form.down("[name=project_id]").setValue(parseInt(apps.project));
		    me.setStorePtbyparam(form);	
                    form.down("[name=pt_id]").setValue(parseInt(apps.pt));
                }
            },
        };
        newEvs['personalformmultiposition [name=project_id]'] = {
            change: function () {
                var me, form, project_id, store, statedata;
                me = this;
                form = me.getFormdatamultiposition();
                statedata = form.up('window').state.toLowerCase();
                project_id = form.down("[name=project_id]").getValue();   
		me.setStorePtbyparam2(form);           
                me.filterPtbyprojectbyparam(form, project_id);
            },

        };
        newEvs['personalformmultiposition [name=pt_id]'] = {
            change: function () {
                var me, form, pt_id, store;
                me = this;
                form = me.getFormdatamultiposition();
                pt_id = form.down("[name=pt_id]").getValue();             
                me.filterDepartmentbyprojectpt(form);
                //me.filterReporttobyprojectpt(form);
		me.setStoreSection(form);
            },

        };
        newEvs['personalformmultiposition [name=department_department_id]'] = {
            change: function () {
                var me, form, department_id, store;
                me = this;
                form = me.getFormdatamultiposition();               
                
            }
        };
        /* end added by ahmad riadi 24-10-2017 */



        newEvs['personalformdata button[action=lookupreportto]'] = {
            click: function(el, val) {
                me.showLookupReportToWindow();
            }
        };
        
         /* start added by ahmad riadi 29-01-2018*/
         newEvs['personalformmultiposition button[action=lookupreportomulti]'] = {
            click: function (el, val) {
                me.showLookupReportToMultipositionWindow();
            }
        };
         /* end added by ahmad riadi 29-01-2018*/
        
        /* start edited by ahmad riadi 09-06-2017*/
        newEvs['#personalPSLookupRewindow lookuppersonalgrid button[action=select]'] = {
            click: function () {
                me.selectEmployeeReportTo();
            }

        };
        /* end edited by ahmad riadi 09-06-2017*/

        /* start added by ahmad riadi 29-01-2018*/
        newEvs['#personalPSMultipositionLookupRewindow lookuppersonalgrid button[action=select]'] = {
            click: function () {
                me.selectEmployeeReportTomultiposition();
            }
        };
        /* end added by ahmad riadi 29-01-2018*/

        newEvs['personalformdata [name=employeestatus_employeestatus_id]'] = {
            change: function () {
                me.employeeStatusOnChange();
            }
        };

       /* start edited by ahmad riadi 18-09-2017*/
        newEvs['personalformdata [name=email_ciputra]'] = {
            blur: function () {
                me.validateEmailoffice();
            }
        };
        /* end edited by ahmad riadi 18-09-2017*/



        /*
         newEvs['personalformdata #file_foto'] = {
         change: function(fld, a) {
         
         me.formUploadFoto(fld, a, 'FOTO');
         }
         };
         */

        newEvs['personalformdata button[action=upload_foto]'] = {
            click: function(fld, a) {

                me.showFormUpload("FOTO");
            }
        };

        newEvs['personalformdata button[action=upload_file_kk]'] = {
            click: function(fld, a) {

                me.showFormUpload("KK");
            }
        };

        newEvs['personalformdata button[action=upload_file_ktp]'] = {
            click: function(fld, a) {

                me.showFormUpload("KTP");
            }
        };

        newEvs['personalformdata button[action=upload_file_npwp]'] = {
            click: function(fld, a) {

                me.showFormUpload("NPWP");
            }
        };

        newEvs['personalformdata button[action=upload_file_jamsostek]'] = {
            click: function(fld, a) {

                me.showFormUpload("JAMSOSTEK");
            }
        };
        
        newEvs['personalformdata button[action=upload_file_asuransi]'] = {
            click: function(fld, a) {

                me.showFormUpload("ASURANSI");
            }
        };
        //added by michael 09/08/2021
        newEvs['personalformdata button[action=upload_file_vaksin1]'] = {
            click: function(fld, a) {
                me.typedoc='VAKSIN1';
                me.showFormUpload(me.typedoc);
               
            }
        }; 
        newEvs['personalformdata button[action=upload_file_vaksin2]'] = {
            click: function(fld, a) {
                me.typedoc='VAKSIN2';
                me.showFormUpload(me.typedoc);
               
            }
        }; 
        //end added by michael 09/08/2021
	/* start added by ahmad riadi 12-07-2017 */
          /* start action upload */
         newEvs['personalformdata button[action=upload_file_bpjs_pp]'] = {
            click: function(fld, a) {
                me.typedoc='BPJS_PP';
                me.showFormUpload(me.typedoc);
               
            }
        };  
         newEvs['personalformdata button[action=upload_file_bpjs_k]'] = {
            click: function(fld, a) {
                me.typedoc='BPJS_K';
                me.showFormUpload(me.typedoc);
            }
        };
         newEvs['personalformdata button[action=upload_file_bpjs_kk]'] = {
            click: function(fld, a) {
                me.typedoc='BPJS_KK';
                me.showFormUpload(me.typedoc);
            }
        };
         newEvs['personalformdata button[action=upload_file_ijazah]'] = {
            click: function(fld, a) {
                me.typedoc='IJAZAH';
                me.showFormUpload(me.typedoc);
            }
        };
         newEvs['personalformdata button[action=upload_file_manulife_p]'] = {
            click: function(fld, a) {
                me.typedoc='MANULIFE_P';
                me.showFormUpload(me.typedoc);
            }
        };
         newEvs['personalformdata button[action=upload_file_rekening]'] = {
            click: function(fld, a) {
                me.typedoc='REKENING';
                me.showFormUpload(me.typedoc);
            }
        };
         /* end action upload */
         /* start action view */
         //added by michael 09/08/2021
         newEvs['personalformdata button[action=lihatdokumen_vaksin1]'] = {
            click: function() {
                me.viewdocFile("VAKSIN1");
            }
        };
        newEvs['personalformdata button[action=lihatdokumen_vaksin2]'] = {
            click: function() {
                me.viewdocFile("VAKSIN2");
            }
        };
        //end added by michael 09/08/2021
         newEvs['personalformdata button[action=lihatdokumen_bpjs_pp]'] = {
            click: function() {
                me.viewdocFile("BPJS_PP");
            }
        };
         newEvs['personalformdata button[action=lihatdokumen_bpjs_k]'] = {
            click: function() {
                me.viewdocFile("BPJS_K");
            }
        };
        newEvs['personalformdata button[action=lihatdokumen_bpjs_kk]'] = {
            click: function() {
                me.viewdocFile("BPJS_KK");
            }
        };
        newEvs['personalformdata button[action=lihatdokumen_ijazah]'] = {
            click: function() {
                me.viewdocFile("IJAZAH");
            }
        };        
        newEvs['personalformdata button[action=lihatdokumen_manulife_p]'] = {
            click: function() {
                 me.viewdocFile("MANULIFE_P");
            }
        };
         newEvs['personalformdata button[action=lihatdokumen_rekening]'] = {
            click: function() {
                me.viewdocFile("REKENING");
            }
        };
         /* end action view */
        /* end added by ahmad riadi 12-07-2017 */


         newEvs['personalformdata button[action=lihatdokumen_asuransi]'] = {
            click: function() {
                me.viewdocFile("ASURANSI");
            }
        };

        newEvs['personalformupload #file_id'] = {
            change: function(fld, a) {

                me.formUploadFile(fld, a);
            }
        };

        newEvs['personalformdata button[action=lihatdokumen_kk]'] = {
            click: function() {
                //me.lihatFile("KK");
                me.viewdocFile("KK");
            }
        };

        newEvs['personalformdata button[action=lihatdokumen_ktp]'] = {
            click: function() {
                //me.lihatFile("KTP");
                me.viewdocFile("KTP");
            }
        };

        newEvs['personalformdata button[action=lihatdokumen_npwp]'] = {
            click: function() {
                //me.lihatFile("NPWP");
                me.viewdocFile("NPWP");
            }
        };

        newEvs['personalformdata button[action=lihatdokumen_jamsostek]'] = {
            click: function() {
                //me.lihatFile("JAMSOSTEK");
                me.viewdocFile("JAMSOSTEK");
            }
        };


        newEvs['#PrsEducationGridIDFormId button[action=upload_document]'] = {
            click: function() {

                me.showFormUpload("IJASAH");
            }
        };

        newEvs['#PrsEducationGridIDFormId button[action=lihat_dokumen]'] = {
            click: function() {

                me.lihatFileB("IJASAH");
            }
        };

        newEvs['#PrsCourseGridIDFormId button[action=upload_document]'] = {
            click: function() {

                me.showFormUpload("SERTIFIKAT");
            }
        };

        newEvs['#PrsCourseGridIDFormId button[action=lihat_dokumen]'] = {
            click: function() {

                me.lihatFileB("SERTIFIKAT");
            }
        };

        newEvs['personalformdata [name=division_division_id]'] = {
            select: function() {
                me.mypComboOnSelect("division", "division");
            }
        };

        newEvs['personalformdata [name=department_department_id]'] = {
            select: function() {
                me.mypComboOnSelect("department", "department");
            }
        };

        newEvs['personalformdata [name=jobfunction_jobfunction_id]'] = {
            select: function() {
                me.mypComboOnSelect("jobfunction", "jobfunction");
            }
        };
        /* start added by ahmad riadi 21-06-2017 */
        newEvs['personalformdata [name=jobfamily_jobfamily_id]'] = {
            select: function() {
                me.mypComboOnSelect("jobfamily", "jobfamily");
            }
        };
        newEvs['personalformdata [name=banding_banding_id]'] = {
            select: function() {
                me.mypComboOnSelect("banding", "banding");
            }
        };
         /* end added by ahmad riadi 21-06-2017 */
         
        newEvs['personalformdata [name=group_group_id]'] = {
            select: function() {
                //updated by anas 14032022
                me.mypComboOnSelect("group", "group");
            }
        };

        newEvs['personalformdata [name=groupposition_groupposition_id]'] = {
            select: function() {
                me.mypComboOnSelect("groupposition", "groupposition");
            }
        };

        newEvs['personalformdata [name=position_position_id]'] = {
            select: function() {
                me.mypComboOnSelect("position", "description");
            }
        };

        newEvs['personalformdata [name=alokasibiaya_alokasibiaya_id]'] = {
            select: function() {
                me.mypComboOnSelect("alokasibiaya", "name");
            }
        };

        //WORK LOCATION
        newEvs['personalformdata [name=worklocationprojectpt_id]'] = {
            select: function() {
                me.mypComboOnSelectProjectPt("worklocationprojectpt", "worklocationprojectpt");
            }
        };

        newEvs['personalgrid'] = {
            afterrender: me.emGrid().fdar,
            itemdblclick: me.emGrid().select,
            selectionchange: me.emGrid().select
        };
        //WORK LOCATION

        /* start added by ahmad riadi 09-06-2017*/
        newEvs['lookuppersonalformsearch'] = {
            afterrender: function () {
                var me,form;
                me = this;
		form = me.getFormsearhcreportto();
		me.setStoreSubholding();
                me.setStoreProject();
		me.setStorePtbyparam(form);
                //me.setStorePt();               
            },
           
        };

	 newEvs['lookuppersonalformsearch [name=subholding_id]'] = {
            select: function () {
                var me,form,subholding_id,store;
                me = this;
                form = me.getFormsearhcreportto();
                subholding_id = form.down("[name=subholding_id]").getValue();
                form.down("[name=project_id]").setValue(0);
                form.down("[name=project_id]").setRawValue('');
                form.down("[name=pt_id]").setValue(0);
                form.down("[name=pt_id]").setRawValue('');		
                me.filterProjectbysubholding(subholding_id);
            }
        };

        newEvs['lookuppersonalformsearch [name=project_id]'] = {
            select: function () {
                var me,form,project_id,store;
                me = this;
                form = me.getFormsearhcreportto();
                project_id = form.down("[name=project_id]").getValue();
                form.down("[name=pt_id]").setValue(0);
                form.down("[name=pt_id]").setRawValue('');
		me.setStorePtbyparam(form);
                me.filterPtbyproject(project_id);
            }
        };
	newEvs['lookuppersonalformsearch [name=pt_id]'] = {
            select: function () {
                var me, form, project_id, store;
                me = this;
                form = me.getFormsearhcreportto();
                me.filterDepartmentbyprojectpt(form);
            }
        };


        newEvs['lookuppersonalformsearch button[action=search]'] = {
            click: function () {
                var me,form,pt_id,project_id,department_id,grid,subholding_id;
                me = this;
                form = me.getFormsearhcreportto();

		if (form.down('[name=subholding_id]').getValue() == '' || form.down('[name=subholding_id]').getValue() == null) {
                    subholding_id = 0;
                } else {
                    subholding_id = form.down('[name=subholding_id]').getValue();
                }


               if(form.down('[name=pt_id]').getValue()=='' || form.down('[name=pt_id]').getValue()==null){
                   pt_id=0;
               }else{
                   pt_id=form.down('[name=pt_id]').getValue();
               }
               if(form.down('[name=project_id]').getValue()==null){
                   project_id=0;
               }else{
                   project_id=form.down('[name=project_id]').getValue();
               }
               if(form.down('[name=department_department_id]').getValue()==null){
                   department_id=0;
               }else{
                   department_id=form.down('[name=department_department_id]').getValue();
               }               
                
                grid=me.getGridlookupe();


	       if (project_id == 0 && pt_id == 0) {
                    Ext.Msg.alert('Info', 'Harus pilih Project dan Pt terlebih dahulu...');
                    return false;
                }		

                
                grid.setLoading("Please wait...");
                me.tools.ajax({
                    params: {
			'subholding_id': form.down('[name=subholding_id]').getValue(),
                        'employee_nik': form.down('[name=personal_nik]').getValue(),
                        'employee_name': form.down('[name=personal_name]').getValue(),
                        'project_id': project_id,
                        'pt_id': pt_id,
                        'department_id': department_id
                    },
                    success: function (data, model) {
                        me.tools.wesea({data: data, model: model}, grid).grid();
                        grid.setLoading(false);
                    }
                }).read('employeereportofilter');

            }
        };
        newEvs['lookuppersonalformsearch button[action=reset]'] = {
            click: function () {
                var me,form,pt_id,project_id,department_id,grid;
                me = this;
               form = me.getFormsearhcreportto();                
                grid=me.getGridlookupe();                
                grid.setLoading("Please wait...");
                me.tools.ajax({
                    params: {
			'subholding_id':'',
                        'employee_nik': '',
                        'employee_name': '',
                        'project_id': apps.project,
                        'pt_id': apps.pt,
                        'department_id':0
                    },
                    success: function (data, model) {
                        me.tools.wesea({data: data, model: model}, grid).grid();
                        grid.setLoading(false);
                    }
                }).read('employeereportofilter');

            }
        };
        /* end added by ahmad riadi 09-06-2017*/


        //


	/* start added by ahmad riadi 01-02-2018*/
         newEvs['personalgrid button[action=export]'] = {
            click: function (el, val) {
                var me;
                me=this;              
                me.exportData();                
                
            }
        };
         /* end added by ahmad riadi 01-02-2018*/

        // edited by wulan sari 20181210
	newEvs['personalformdata [name=alasanresign_id]'] = {
            select: function () {
                me.alasanOnSelect();
            }
        };        
        // end edited by wulan sari 20181210

        //added by anas 10022022
        newEvs['personalformdata button[action=upload_file_vaksin3]'] = {
            click: function(fld, a) {
                me.typedoc='VAKSIN3';
                me.showFormUpload(me.typedoc);
               
            }
        }; 

        newEvs['personalformdata button[action=lihatdokumen_vaksin3]'] = {
            click: function() {
                me.viewdocFile("VAKSIN3");
            }
        };
        //end added by anas

        newEvs['personalformdata button[action=upload_file_pas_foto]'] = {
            click: function(fld, a) {
                me.typedoc='PAS_FOTO';
                me.showFormUpload(me.typedoc);
               
            }
        }; 

        newEvs['personalformdata button[action=lihatdokumen_pas_foto]'] = {
            click: function() {
                me.viewdocFile("PAS_FOTO");
            }
        };

        newEvs['personalformdata button[action=upload_file_stnk]'] = {
            click: function(fld, a) {
                me.typedoc='STNK';
                me.showFormUpload(me.typedoc);
               
            }
        }; 

        newEvs['personalformdata button[action=lihatdokumen_stnk]'] = {
            click: function() {
                me.viewdocFile("STNK");
            }
        };

        newEvs['personalformdata button[action=export_document]'] = {
            click: function() {
                me.exportList();
            }
        };

        newEvs['personalexportdocumentgrid button[action=export]'] = {
            click: function() {
                // me.exportDocument();
                // me.exportDocumentPdf();
                me.exportValidation();
            }
        };

        // newEvs['personalexportdocumentgrid'] = {
        //     afterrender: function() {
        //         var me = this;

        //         Ext.Ajax.request ({
        //             url     : 'hrd/reportmatrixcompetency/read',
        //             success : function(response) {},

        //         });
        //     }
        // };

        //added by michael 2022-08-11
        newEvs['personalgrid button[action=ica]'] = {
            click: function (el, val) {
                var me;
                me=this;              
                me.FormDataCustomeShow('create', 500, 'Intranet CA', 'Hrd.view.personal.FormIntranetca', 'intranetcacreate');               
                
            }
        };
        newEvs['personalformintranetca'] = {
            afterrender: function () {
                var me;
                me = this;
                me.formDataIntranetcaAfterrender();
            }
        };
        newEvs['personalformintranetca button[action=save]'] = {
            click: function () {
                var me;
                me = this;
                me.saveDataIntranetca();
            }
        };
        //end added by michael 2022-08-11

        // added by michael 2023-04-26 | untuk masa kerja dan usia kerja
        newEvs['personalformdata [name=is_kompensasi]'] = {
            change: function() {
                me.kompensasiChange();

            }
        };
        newEvs['personalformdata [name=statusinformation_assignation_date]'] = {
            change: function() {
                me.kompensasiChange();
            }
        };
        newEvs['personalformdata [name=statusinformation_hire_date]'] = {
            change: function() {
                me.kompensasiChange();
            }
        };
        //end


        //
        if (typeof moment !== 'function') {


            Ext.Loader.injectScriptElement(document.URL + 'app/hrd/library/moment.min.js', function() {
                /// loaded



            }, function() {
                /// error
            });
        }

        //
        this.control(newEvs);


    },
    loadPage: function(store) {
        var me = this;
        var f = me.getFormdata();
        store.loadPage(me.currentPage, {
            callback: function(rec, operation, success) {
                var g = me.getGrid();
                if (!g.getStore().modelExist) {

                    g.attachModel(operation);
                }


                if (g.getStore().getCount() > 0) { // select first record
                    //g.getSelectionModel().select(0);
                    if(me.lastindex < 0){
                        g.getSelectionModel().select(0);
                    }else{
                        g.getSelectionModel().select(me.lastindex);	
                    }                   
                } else {
                    me.tools.ajax({
                        params: {
                        },
                        success: function(data, model) {
                            me.tools.wesea(data.alokasibiaya, f.down("[name=alokasibiaya_alokasibiaya_id]")).comboBox();
                            me.tools.wesea(data.department, me.getFormsearch().down("[name=department_department_id]")).comboBox(true);
                            me.tools.wesea(data.position, f.down("[name=position_position_id]")).comboBox();
                            me.tools.wesea(data.groupposition, f.down("[name=groupposition_groupposition_id]")).comboBox();
                            me.tools.wesea(data.department, f.down("[name=department_department_id]")).comboBox();
                            me.tools.wesea(data.group, f.down("[name=group_group_id]")).comboBox();
                            me.tools.wesea(data.division, f.down("[name=division_division_id]")).comboBox();
                            me.tools.wesea(data.jobfunction, f.down("[name=jobfunction_jobfunction_id]")).comboBox();
                            /* start added by ahmad riadi 21-06-2017 */
                            me.tools.wesea(data.jobfamily, f.down("[name=jobfamily_jobfamily_id]")).comboBox();
                            me.tools.wesea(data.banding, f.down("[name=banding_banding_id]")).comboBox();
                            /* end added by ahmad riadi 21-06-2017 */
                            me.tools.wesea(data.worklocationprojectpt, f.down("[name=worklocationprojectpt_id]")).comboBox();
                        }
                    }).read('parameter');

                    Ext.MessageBox.alert('Alert', 'No record found. Please try again.', function() {


                    });

                }

            }
        });

        // me.getGrid().xLoad();
    },
    mypComboOnSelect: function(name, fieldDisplay) {
        var me = this;
        var el = me.getFormdata().down("[name=" + name + "_" + name + "_id]");
        var val = me.tools.comboHelper(el).getField(name + "_id", fieldDisplay);
        me.getFormdata().down("[name=" + name + "_" + fieldDisplay + "]").setValue(val);
    },

    //WORK LOCATION
    mypComboOnSelectProjectPt: function(name, fieldDisplay) {
        var me = this;
        var el = me.getFormdata().down("[name="+ name + "_id]");
        var val_project = me.tools.comboHelper(el).getField("worklocationprojectpt_id", 'project_name');
        var val_pt = me.tools.comboHelper(el).getField("worklocationprojectpt_id", 'pt_name');
        me.getFormdata().down("[name=" + name + "_" + fieldDisplay + "_project]").setValue(val_project);
        me.getFormdata().down("[name=" + name + "_" + fieldDisplay + "_pt]").setValue(val_pt);
    },
    emGrid: function () {
        var me = this;
        var x = {
            fdar: function () {

            },
            select: function () {
                me.getFormdata().down("[name=worklocationprojectpt_id]").setValue('');
                me.getFormdata().down("[name=worklocationprojectpt_worklocationprojectpt_project]").setValue('');
                me.getFormdata().down("[name=worklocationprojectpt_worklocationprojectpt_pt]").setValue('');

                //added by Michael 2021.08.27
                me.getFormdata().down("[name=is_child]").setValue(0);
                //end added by Michael 2021.08.27

                //added by anas 14032022
                me.getFormdata().down("[name=group_group_id]").setVisible(false);
                me.getFormdata().down("[name=group_code]").setVisible(true);
                //end added by anas

                var g = me.getGrid();
                var rec = g.getSelectedRecord();
                if(rec){
                var e_id = rec.get("employee_id");
                    me.tools.ajax({
                    params: {employee_id: e_id},
                    success: function (data, model) {
                        me.getFormdata().down("[name=worklocationprojectpt_id]").setValue(data.others[0][0].HASIL[1][0].worklocationprojectpt_id);
                        me.getFormdata().down("[name=worklocationprojectpt_worklocationprojectpt_project]").setValue(data.others[0][0].HASIL[1][0].project_name);
                        me.getFormdata().down("[name=worklocationprojectpt_worklocationprojectpt_pt]").setValue(data.others[0][0].HASIL[1][0].pt_name);
                        }
                    }).read('getworklocationprojectpt_employee');

                    //added by Michael 2021.08.27
                    me.tools.ajax({
                    params: {employee_id: e_id},
                    success: function (data, model) {
                        me.getFormdata().down("[name=is_child]").setValue(data.others[0][0].HASIL[1][0].is_child);
                        }
                    }).read('getischild_employee');
                    //end added by Michael 2021.08.27
                }
                
            }
        };
        return x
    },
    // WORK LOCATION
    execAction: function(el, action, me) {
        if (!action) {
            action = '';
        }
        if (!me) {
            me = this;
        }

        switch (action) {
            case me.bindPrefixName + 'Create':
                me.newRecord();
               
                break;
            case me.bindPrefixName + 'Delete':
                me.dataDestroy(el);
                break;
            case me.bindPrefixName + 'Print':
                loadReport(el, 'tms/building/print');
                break;
        }
    },
    lihatFileB: function(modeName) {
        var me = this;

        var f = null;
        if (modeName.toLowerCase() === "ijasah") {
            f = me.getFormuploadijasah();
        } else if (modeName.toLowerCase() === "sertifikat") {
            f = me.getFormuploadsertifikat();
        }


        var fieldName = modeName.toLowerCase();

        var el = f.down("[name=" + fieldName + "]");
        if (!el) {
            // console.log("Tidak el :" + fieldName);
            return;
        }
        var fileName = el.getValue();
        // console.log(fileName);
        
        if (fileName.length > 0) {
            window.open(document.URL + "app/hrd/uploads/personal/dokumen_" + modeName.toLowerCase() + "/" + fileName);

        } else {
            me.tools.alert.warning("Tidak ada file");
        }
    },
    lihatFile: function(mode) {
        var me = this;
        var f = me.getFormdata();
        var fieldName = "";
        switch (mode) {
            case 'KK':
                fieldName = "dokumen_kk";
                break;
            case 'KTP':
                fieldName = "dokumen_ktp";
                break;
            case 'NPWP':
                fieldName = "dokumen_npwp";
                break;
            case 'JAMSOSTEK':
                fieldName = "dokumen_jamsostek";
                break;
        }
        var el = f.down("[name=" + fieldName + "]");
        if (!el) {
            // console.log("Tidak el :" + fieldName);
            return;
        }
        var fileName = el.getValue();
        if (fileName.length > 0) {
            window.open(document.URL + "app/hrd/uploads/personal/dokumen_" + mode.toLowerCase() + "/" + fileName);

        } else {
            me.tools.alert.warning("Tidak ada file");
        }
    },
    showFormUpload: function(mode) {
        var me = this;
        var win = me.instantWindow("FormUpload", 400, "Upload file", "create", "personaluploadwindow");
        var f = me.getFormupload();
        f.down("[name=mode_name]").setValue(mode);
    },
    /*
    formUploadFile: function(fld, a) {
        var me = this;
        var mainForm = me.getFormdata();

        if (me.uploadFotoKlik === 0) {

            var form = fld.up("form");
            var p = me.getPanel();
            var modeName = form.down("[name=mode_name]").getValue();
            me.uploadFile({
                form: form,
                showalert: false,
                params: {
                    "type": modeName,
                    "nik": me.getFormdata().down("[name=employee_nik]").getValue(),
                    "employee_id": me.getFormdata().down("[name=employee_id]").getValue()
                },
                callback: {
                    success: function(fn) {
                        p.setLoading(false);
                        //console.log(fn);
                        if (modeName == "FOTO") {
                            me.refreshPhotoInfo(fn);
                        } else if (modeName == "IJASAH") {
                            var myForm = me.getFormuploadijasah();
                            myForm.down("[name=ijasah]").setValue(fn);
                        } else if (modeName == "SERTIFIKAT") {
                            var myForm = me.getFormuploadsertifikat();
                            myForm.down("[name=sertifikat]").setValue(fn);
                        } else {
                            mainForm.down("[name=dokumen_" + modeName.toLowerCase() + "]").setValue(fn);
                        }

                        me.uploadFotoKlik = 0;

                    },
                    failure: function() {
                        me.uploadFotoKlik = 0;
                        p.setLoading(false);
                    }
                }
            });

            me.uploadFotoKlik = 1;
        }


    },
   */
      formUploadFile: function(fld, a) {       
        var filedata,readeruploaddata,typefile;
        var me = this;
        var mainForm = me.getFormdata();
        if (me.uploadFotoKlik === 0) {
            var form = fld.up("form");
            var p = me.getPanel();
            var modeName = form.down("[name=mode_name]").getValue();
            if(
                    modeName=='KK'||
                    modeName=='KTP'||
                    modeName=='NPWP'||
                    modeName=='JAMSOSTEK'||
                    modeName=='BPJS_PP'||
                    modeName=='BPJS_K'||
                    modeName=='BPJS_KK'||
                    modeName=='IJAZAH'||
                    modeName=='MANULIFE_P'||
                    modeName=='REKENING' ||
                    //added by michael 09/08/2021
                    modeName=='VAKSIN1'||
                    modeName=='VAKSIN2'
                    //end added by michael 09/08/2021
                    //added by anas 10022022
                    || modeName=='VAKSIN3'

                    || modeName=='PAS_FOTO'
                    || modeName=='STNK'

                    
               ){
                filedata = form.getEl().down('input[type=file]').dom.files[0];
                readeruploaddata = new Ext.data.reader.Array(filedata);
                typefile = readeruploaddata['type'];
                // switch (typefile) {                    
                //     case 'application/pdf':
                //         me.prosesUpload(p,mainForm,form,modeName);
                //         break;
                //     default:
                //         Ext.Msg.alert('WARNING', 'Only PDF file will be processed..!');
                // }      

                //added by michael 2022-07-08 request bu shirley, vaksin bisa jpg/png   
                if( modeName=='VAKSIN1'||modeName=='VAKSIN2'|| modeName=='VAKSIN3'
                    || modeName=='PAS_FOTO'|| modeName=='STNK'){
                    switch (typefile) {                    
                        case 'application/pdf':
                            me.prosesUpload(p,mainForm,form,modeName);
                            break;
                        case 'image/jpeg':
                            me.prosesUpload(p,mainForm,form,modeName);
                            break;
                        case 'image/png':
                            me.prosesUpload(p,mainForm,form,modeName);
                            break;
                        default:
                            Ext.Msg.alert('WARNING', 'Only PDF, JPG, PNG file will be processed..!');
                    } 
                }else{
                    switch (typefile) {                    
                        case 'application/pdf':
                            me.prosesUpload(p,mainForm,form,modeName);
                            break;
                        default:
                            Ext.Msg.alert('WARNING', 'Only PDF file will be processed..!');
                    }
                }   
            }else{
                 me.prosesUpload(p,mainForm,form,modeName);
            }          
        }
    },

     prosesUpload: function (p,mainForm,form,modeName) {
        var me;
        me=this;

        //added by michael 09/08/2021
        var f = me.getFormupload();
        //end added by michael 09/08/2021
        
        me.uploadFile({
            form: form,
            showalert: false,
            params: {
                "type": modeName,
                "nik": me.getFormdata().down("[name=employee_nik]").getValue(),
                "employee_id": me.getFormdata().down("[name=employee_id]").getValue()
            },
            callback: {
                success: function (fn) {
                    p.setLoading(false);
                    //console.log(fn);
                    if (modeName == "FOTO") {
                        me.refreshPhotoInfo(fn);
                    } else if (modeName == "IJASAH") {
                        var myForm = me.getFormuploadijasah();
                        myForm.down("[name=ijasah]").setValue(fn);
                    } else if (modeName == "SERTIFIKAT") {
                        var myForm = me.getFormuploadsertifikat();
                        myForm.down("[name=sertifikat]").setValue(fn);
                    } else {
                        mainForm.down("[name=dokumen_" + modeName.toLowerCase() + "]").setValue(fn);
                    }
                    me.uploadFotoKlik = 0;

                    //added by michael 09/08/2021
                    f.up("window").close();
                    //end added by michael 09/08/2021
                },
                failure: function () {
                    me.uploadFotoKlik = 0;
                    p.setLoading(false);
                }
            }
        });
        me.uploadFotoKlik = 1;

    },

    refreshPhotoInfo: function(imageName) {
        var me = this;
        var form = me.getFormdata();
        // form.down("[name=photo]").setValue(imageName);
        //me.mt.customerPhoto(form.down("#photo_image"),imageName,me.myConfig.IMG_FOLDER);
        var size = null;
        var folder = "app/hrd/uploads/personal/foto/";
        var s = size ? size : '200px 250px';


	//start added by ahmad riadi 31-08-2017 
       var  reportto_name = null;       
       reportto_name= form.down("[name=reportto_name]").getValue();
       if(reportto_name.length ==0){
            form.down("[name=reportto_nik]").setValue('');
       }
       //end added by ahmad riadi 31-08-2017 

        // console.log("PHOTO");
        // console.log(imageName);

        form.down("#photo_image").el.setStyle({backgroundImage: 'none'});
        if (imageName.length > 0) {
            form.down("#photo_image").el.setStyle({backgroundImage: 'url(' + folder + '' + imageName + ')', backgroundSize: s, backgroundRepeat: "no-repeat"});

        }

    },
    formSearchAfterRender: function(el) {
        var me = this;
        //me.loadComboBoxStore(el);



    },
    employeeStatusOnChange: function() {
        var me = this;
        var f = me.getFormdata();
        var vs = f.getForm().getValues();
        var val = me.tools.intval(vs["employeestatus_employeestatus_id"]);
                
        if (val === 1) {

            f.down("[name=statusinformation_hire_date]").setReadOnly(false);
            f.down("[name=statusinformation_assignation_date]").setReadOnly(false);

            f.down("[name=statusinformation_contract_ke]").setReadOnly(true);
            f.down("[name=statusinformation_contract_start]").setReadOnly(true);
            f.down("[name=statusinformation_contract_end]").setReadOnly(true);
            //added by michael 18.08.2021
            f.down("[name=statusinformation_consultant_ke]").setReadOnly(true);
            f.down("[name=statusinformation_consultant_start]").setReadOnly(true);
            f.down("[name=statusinformation_consultant_end]").setReadOnly(true);
            //end added by michael 18.08.2021
            f.down("[name=statusinformation_temporary_ke]").setReadOnly(true);
            f.down("[name=statusinformation_temporary_start]").setReadOnly(true);
            f.down("[name=statusinformation_temporary_end]").setReadOnly(true);

            f.down("[name=statusinformation_contract_ke]").setValue("");
            f.down("[name=statusinformation_contract_start]").setValue("");
            f.down("[name=statusinformation_contract_end]").setValue("");
            //added by michael 18.08.2021
            f.down("[name=statusinformation_consultant_ke]").setValue("");
            f.down("[name=statusinformation_consultant_start]").setValue("");
            f.down("[name=statusinformation_consultant_end]").setValue("");
            //end added by michael 18.08.2021
            f.down("[name=statusinformation_temporary_ke]").setValue("");
            f.down("[name=statusinformation_temporary_start]").setValue("");
            f.down("[name=statusinformation_temporary_end]").setValue("");

            f.down("[name=masa_kerja_start_date]").setReadOnly(true);
            f.down("[name=usia_kerja_start_date]").setReadOnly(true);
            f.down("[name=is_kompensasi]").setDisabled(false);
            // f.down("[name=masa_kerja_start_date]").setValue("");
            // f.down("[name=usia_kerja_start_date]").setValue("");
            // f.down("[name=is_kompensasi]").setValue("");

        // } else if (val === 2 || val === 3) {
        //added by michael 18.08.2021
        } else if (val === 2 || val === 3 || val === 7) {
        //end added by michael 18.08.2021

            f.down("[name=statusinformation_hire_date]").setReadOnly(true);
            f.down("[name=statusinformation_assignation_date]").setReadOnly(true);

            f.down("[name=statusinformation_contract_ke]").setReadOnly(false);
            f.down("[name=statusinformation_contract_start]").setReadOnly(false);
            f.down("[name=statusinformation_contract_end]").setReadOnly(false);
            //added by michael 18.08.2021
            f.down("[name=statusinformation_consultant_ke]").setReadOnly(false);
            f.down("[name=statusinformation_consultant_start]").setReadOnly(false);
            f.down("[name=statusinformation_consultant_end]").setReadOnly(false);
            //end added by michael 18.08.2021
            f.down("[name=statusinformation_temporary_ke]").setReadOnly(true);
            f.down("[name=statusinformation_temporary_start]").setReadOnly(true);
            f.down("[name=statusinformation_temporary_end]").setReadOnly(true);

            //f.down("[name=statusinformation_hire_date]").setValue(""); wulan comment 20200708
            f.down("[name=statusinformation_assignation_date]").setValue("");

            f.down("[name=statusinformation_temporary_ke]").setValue("");
            f.down("[name=statusinformation_temporary_start]").setValue("");
            f.down("[name=statusinformation_temporary_end]").setValue("");

            f.down("[name=masa_kerja_start_date]").setReadOnly(true);
            f.down("[name=usia_kerja_start_date]").setReadOnly(true);
            f.down("[name=is_kompensasi]").setDisabled(true);
            f.down("[name=masa_kerja_start_date]").setValue("");
            // f.down("[name=usia_kerja_start_date]").setValue("");
            f.down("[name=is_kompensasi]").setValue("");


        } else {

            f.down("[name=statusinformation_hire_date]").setReadOnly(true);
            f.down("[name=statusinformation_assignation_date]").setReadOnly(true);

            f.down("[name=statusinformation_contract_ke]").setReadOnly(true);
            f.down("[name=statusinformation_contract_start]").setReadOnly(true);
            f.down("[name=statusinformation_contract_end]").setReadOnly(true);
            //added by michael 18.08.2021
            f.down("[name=statusinformation_consultant_ke]").setReadOnly(true);
            f.down("[name=statusinformation_consultant_start]").setReadOnly(true);
            f.down("[name=statusinformation_consultant_end]").setReadOnly(true);
            //end added by michael 18.08.2021
            f.down("[name=statusinformation_temporary_ke]").setReadOnly(false);
            f.down("[name=statusinformation_temporary_start]").setReadOnly(false);
            f.down("[name=statusinformation_temporary_end]").setReadOnly(false);


            f.down("[name=statusinformation_contract_ke]").setValue("");
            f.down("[name=statusinformation_contract_start]").setValue("");
            f.down("[name=statusinformation_contract_end]").setValue("");
            //added by michael 18.08.2021
            f.down("[name=statusinformation_consultant_ke]").setValue("");
            f.down("[name=statusinformation_consultant_start]").setValue("");
            f.down("[name=statusinformation_consultant_end]").setValue("");
            //end added by michael 18.08.2021
            //  f.down("[name=statusinformation_temporary_ke]").setValue("");
            //  f.down("[name=statusinformation_temporary_start]").setValue("");
            //  f.down("[name=statusinformation_temporary_end]").setValue("");

            f.down("[name=statusinformation_hire_date]").setValue("");
            f.down("[name=statusinformation_assignation_date]").setValue("");

            f.down("[name=masa_kerja_start_date]").setReadOnly(true);
            f.down("[name=usia_kerja_start_date]").setReadOnly(true);
            f.down("[name=is_kompensasi]").setDisabled(true);
            f.down("[name=masa_kerja_start_date]").setValue("");
            f.down("[name=usia_kerja_start_date]").setValue("");
            f.down("[name=is_kompensasi]").setValue("");


        }
        //console.log("hello "+val);
    },
    selectEmployeeReportTo: function() {

        var me = this;
        var f = me.getFormdata();
        var g = me.getGridlookupe();
        var rec = g.getSelectedRecord();
        if (rec) {
            f.down("[name=reportto_reportto]").setValue(rec.get("employee_id"));
	     f.down("[name=reportto_nik]").setValue(rec.get("employee_nik"));	
            f.down("[name=reportto_name]").setValue(rec.get("employee_name"));
            // f.down("[name=employee_employee_name]").setValue(rec.get("employee_name"));
            //  f.down("[name=employee_employee_id]").setValue(rec.get("employee_id"));
            g.up("window").close();
        }
    },
    
    selectEmployeeReportTomultiposition: function () {
        var me = this;
        var f = me.getFormdatamultiposition();
        var g = me.getGridlookupe();
        var rec = g.getSelectedRecord();
        if (rec) {
            f.down("[name=reportto_id]").setValue(rec.get("employee_id"));
            f.down("[name=namaatasan]").setValue(rec.get("employee_name"));
            g.up("window").close();
        }
    },
    showLookupReportToWindow: function() {
        var me = this;
        /* start edited by ahmad riadi 09-06-2017*/
        var window = me.instantWindow("Panel", 600, "Employe List", "create", "personalPSLookupRewindow", "lookup.personal", {
            itemId: me.controllerName + 'employee'
        });
        /* end edited by ahmad riadi 09-06-2017*/


        var g = window.down("grid");
        var p = window.down("panel");
        p.setLoading("Please wait...");
        me.tools.ajax({
            params: {},
            success: function(data, model) {
                me.tools.wesea({data: data, model: model}, g).grid();
                p.setLoading(false);
            }
        }).read('employeereporto');


    },
    
    showLookupReportToMultipositionWindow: function () {
        var me = this;
        /* start edited by ahmad riadi 09-06-2017*/
        var window = me.instantWindow("Panel", 600, "Employe List", "create", "personalPSMultipositionLookupRewindow", "lookup.personal", {
            itemId: me.controllerName + 'employee'
        });
        /* end edited by ahmad riadi 09-06-2017*/


        var g = window.down("grid");
        var p = window.down("panel");
        p.setLoading("Please wait...");
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                me.tools.wesea({data: data, model: model}, g).grid();
                p.setLoading(false);
            }
        }).read('employeereporto');


    },
    getdataInmultiposition: function () {
        var me, grid, store,index,rec;
        me = this;
        grid = me.getGridmultiposition();
        store = grid.getStore();
        if (store.getCount() > 0) {
            store.filter('deleted', false);
            index = store.findExact('is_default', true);
            
            // add by Wulan Sari 17-04-2018
            if(index != -1){
                rec = store.getAt(index);
                return rec.data;    
            } else{
                return false;
            }
            
        } else {
            return false;
        }
    },	

    //updated by anas 14032022
    mainDataSave: function() {
        var me = this;
        var f = me.getFormdata();
        var groupCb = f.down("[name=group_group_id]");

        //cek combobox ada datalist atau tidak, jika tidak ada maka artinya tidak ada akses
        //dan cek golongan sudah terpilih atau belum dan mereka karyawan baru (emp id kosong)
        if(groupCb.store.getCount() > 0 && groupCb.getValue() == "" && f.down("[name=employee_id]").getValue() == "")
        {
            //info kalo golongan masih kosong
            //Yes -> lanjut save | No -> balik ke form
            Ext.MessageBox.show({
                title: 'Warning',
                msg: "You have access to insert group (golongan), but it's still empty. Are you sure you want to save ?",
                buttons: Ext.MessageBox.YESNO,
                icon: Ext.MessageBox.WARNING,
                fn: function(btn){
                    if(btn == 'yes'){
                    me.dataSave();
                    } else {
                        return;
                    }
                }
            });
        }
        else
        {
            me.dataSave();
        }
    },
    //end added by anas
    // added by michael 2023-04-26 | untuk masa kerja dan usia kerja
    kompensasiChange: function() {
        var me = this;

        var f = me.getFormdata();        
                
        var form = f;
        var dataForm = form.getForm().getValues();
        var status = dataForm["employeestatus_employeestatus_id"]; 
        var assignation = dataForm["statusinformation_assignation_date"]; 
        var hire = dataForm["statusinformation_hire_date"]; 
        
        if(status == 1 || (assignation && hire)){

            var is_kompensasi = dataForm["is_kompensasi"]; 
            
            var usia_kerja_start_date = dataForm["usia_kerja_start_date"]; 
            var masa_kerja_start_date = dataForm["masa_kerja_start_date"];
            var hire_date = dataForm["statusinformation_hire_date"];
            var statusinformation_assignation_date = dataForm["statusinformation_assignation_date"];

            if(statusinformation_assignation_date == '' || hire_date == ''){

                    form.down("[name=usia_kerja_start_date]").setValue('');
                    form.down("[name=masa_kerja_start_date]").setValue('');
                    form.down("[name=is_kompensasi]").setValue('');

                    Ext.Msg.show({
                        title: 'Info',
                        msg: 'Hire Date & Assignation Date wajib diisi',
                        buttons: Ext.Msg.OK
                    });
                    return false;
            }

            usia_kerja_start_date = hire_date;
            masa_kerja_start_date = hire_date;


            if(is_kompensasi == '1'){
                usia_kerja_start_date = hire_date;
                masa_kerja_start_date = statusinformation_assignation_date;
            }else{
                is_kompensasi = '0';
            }

            usia_kerja_start_date = usia_kerja_start_date.split(" ");
            masa_kerja_start_date = masa_kerja_start_date.split(" ");

            form.down("[name=usia_kerja_start_date]").setValue(usia_kerja_start_date[0]);
            form.down("[name=masa_kerja_start_date]").setValue(masa_kerja_start_date[0]);

            form.down("[name=is_kompensasi]").setValue(is_kompensasi);
        }

    },
    //end
    //func mainDataSave sebelumnya diganti nama jadi dataSave, agar bisa cek group dulu baru jalanin func
    dataSave: function() {
        var me,recorddata,datainmultiposition,employee_id;
            me = this;


        var f = me.getFormdata();

        if (me.saveClicked) {
            return;
        }

        // added by michael 2023-04-26 | untuk masa kerja dan usia kerja
        var vs_es = f.getForm().getValues();
        var val_es = me.tools.intval(vs_es["employeestatus_employeestatus_id"]);
        var assignation = vs_es["statusinformation_assignation_date"]; 
        var hire = vs_es["statusinformation_hire_date"]; 

        if (val_es === 1 || (assignation && hire)) {
            var is_kompensasi = vs_es["is_kompensasi"]; 
            var usia_kerja_start_date = vs_es["usia_kerja_start_date"]; 
            var masa_kerja_start_date = vs_es["masa_kerja_start_date"];
            var hire_date = vs_es["statusinformation_hire_date"];
            var statusinformation_assignation_date = vs_es["statusinformation_assignation_date"];
            var kompensasi_text = "TIDAK mendapatkan kompensasi";  

            if(statusinformation_assignation_date == '' || hire_date == ''){

                    f.down("[name=usia_kerja_start_date]").setValue('');
                    f.down("[name=masa_kerja_start_date]").setValue('');
                    f.down("[name=is_kompensasi]").setValue('');

                    Ext.Msg.show({
                        title: 'Info',
                        msg: 'Hire Date & Assignation Date wajib diisi',
                        buttons: Ext.Msg.OK
                    });
                    return false;
            }

            usia_kerja_start_date = hire_date;
            masa_kerja_start_date = hire_date;


            if(is_kompensasi == '1'){
                usia_kerja_start_date = hire_date;
                masa_kerja_start_date = statusinformation_assignation_date;
                kompensasi_text = "ADA mendapatkan kompensasi";
            }else{
                is_kompensasi = '0';
            }

            usia_kerja_start_date = usia_kerja_start_date.split(" ");
            masa_kerja_start_date = masa_kerja_start_date.split(" ");

            f.down("[name=usia_kerja_start_date]").setValue(usia_kerja_start_date[0]);
            f.down("[name=masa_kerja_start_date]").setValue(masa_kerja_start_date[0]);
            f.down("[name=is_kompensasi]").setValue(is_kompensasi);


        }
        //end

        if(val_es > 0){
            if(val_es == 2 || val_es == 7 ){
                if(val_es == 2){

                    var contract_start = vs_es["statusinformation_contract_start"];
                    var contract_end = vs_es["statusinformation_contract_end"];
                    if(contract_end <= contract_start){
                        Ext.Msg.show({
                            title: 'Info',
                            msg: 'Periode akhir kontrak tidak boleh lebih kecil daripada periode awal',
                            buttons: Ext.Msg.OK
                        });
                        return false;
                    }

                    var contract_ke = vs_es["statusinformation_contract_ke"];
                    if(contract_ke == ''){
                        Ext.Msg.show({
                            title: 'Info',
                            msg: '"kontrak ke" wajib diisi',
                            buttons: Ext.Msg.OK
                        });
                        return false;
                    }
                }

                if(val_es == 7){

                    var consultant_start = vs_es["statusinformation_consultant_start"];
                    var consultant_end = vs_es["statusinformation_consultant_end"];
                    if(consultant_end <= consultant_start){
                        Ext.Msg.show({
                            title: 'Info',
                            msg: 'Periode akhir masa konsultan tidak boleh lebih kecil daripada periode awal',
                            buttons: Ext.Msg.OK
                        });
                        return false;
                    }

                    var consultant_ke = vs_es["statusinformation_consultant_ke"];
                    if(consultant_ke == ''){
                        Ext.Msg.show({
                            title: 'Info',
                            msg: '"consultant ke" wajib diisi',
                            buttons: Ext.Msg.OK
                        });
                        return false;
                    }
                }

            }else{
                
                if(assignation < hire){
                        Ext.Msg.show({
                                title: 'Info',
                                msg: 'Assignation date tidak boleh lebih kecil daripada Hire date',
                                buttons: Ext.Msg.OK
                            });
                            return false;
                }

            }

        }


        
                
        // Add by Wulan Sari 17-04-2018
        var grid_multi = me.getGridmultiposition();
        var store_multi = grid_multi.getStore();
        store_multi.filter('deleted', false);
        index_multi = store_multi.findExact('is_default', true);
        if(index_multi == -1){
            me.tools.alert.warning("'Set as Default' multiposition is required");  
            return false;
            
        } else {
            me.getdataInmultiposition()
        }


        var grid;
        grid = me.getGrid();
        me.currentPage  = grid.getStore()['currentPage'];       
        grid.getView().saveScrollState();
        recorddata = grid.getSelectionModel().getSelection()[0];
        me.lastindex = grid.store.indexOf(recorddata);


        me.saveClicked = true;

        me.insSave({
            form: f,
            grid: me.getGrid(),
            store: me.localStore.newdetail,
            rowStore: 0,
            finalData: function(data) {

                //get data in multoposition for default data employee
                datainmultiposition = me.getdataInmultiposition();

                if (datainmultiposition) {
                    employee_id = data.employee_id;
                    if (employee_id == 0 || employee_id =='') {
                        //setup data department
                        data['department_department_id'] = datainmultiposition.department_id;
                        data['department_department'] = datainmultiposition.department;

                        //setup data job family   
                        data['jobfamily_jobfamily'] = datainmultiposition.jobfamily;
                        data['jobfamily_jobfamily_id'] = datainmultiposition.jobfamily_id;

                        //setup data position   
                        data['position_description'] = datainmultiposition.position;
                        data['position_position_id'] = datainmultiposition.position_id;

                        //setup data alokasibiaya   
                        data['alokasibiaya_alokasibiaya_id'] = datainmultiposition.alokasibiaya_id;
                        data['alokasibiaya_name'] = datainmultiposition.alokasibiaya;

                        //setup data reportto   
                        data['reportto_reportto'] = datainmultiposition.reportto_id;
                    }
                }

                //// added 20 Agustus 2014
                /* set last education in child data*/
                var childJson = me.getGridchild().getJson();
                for (var i in childJson) {
                    childJson[i]["last_education"] = childJson[i]["education_education_id"];
                }

                // added 25 Agustus 2014
                var saudaraJson = me.getGridsaudara().getJson();
                for (var i in saudaraJson) {
                    saudaraJson[i]["last_education"] = saudaraJson[i]["education_education_id"];
                }

                data["unit_unit_id"] = data["unit_id"];
                data["educations"] = me.getGrideducation().getJson();
                data["saudaras"] = saudaraJson;
                data["childs"] = childJson;
                data["emgcontact"] = me.getGridemgcontact().getJson();
                data["trainings"] = me.getGridtraining().getJson();
                data["jobhistories"] = me.getGridjobs().getJson();
                data["organizations"] = me.getGridorganization().getJson();

		
		var gridmulti =  me.getGridmultiposition();
                gridmulti.getStore().clearFilter(true);
                data["multipositions"] = gridmulti.getJson();	





                /// added 25 Agustus
                /* add skill information */


                data["skills"] = me.processSkills();

                /* check deleted data*/
                var dd = me.getFormdata().deletedData;
                var count = 0;
                var arData = [];
                if (dd) {
                    if (dd.PrsChildGridID) {
                        arData = dd.PrsChildGridID;
                        count = 0;
                        for (count in arData) {
                            data["childs"].push({
                                relation_id: arData[count],
                                deleted: 1
                            });
                        }
                    }
                    if (dd.PrsEmegergencyContactGridID) {
                        arData = dd.PrsEmegergencyContactGridID;
                        count = 0;
                        for (count in arData) {
                            data["emgcontact"].push({
                                relation_id: arData[count],
                                deleted: 1
                            });
                        }
                    }
                    if (dd.PrsEducationGridID) {
                        arData = dd.PrsEducationGridID;
                        count = 0;
                        for (count in arData) {
                            data["educations"].push({
                                educationhistory_id: arData[count],
                                deleted: 1
                            });
                        }
                    }
                    if (dd.PrsSaudaraGridID) {
                        arData = dd.PrsSaudaraGridID;
                        count = 0;
                        for (count in arData) {
                            data["saudaras"].push({
                                relation_id: arData[count],
                                deleted: 1
                            });
                        }
                    }
                    if (dd.PrsCourseGridID) {
                        arData = dd.PrsCourseGridID;
                        count = 0;
                        for (count in arData) {
                            data["trainings"].push({
                                traininghistory_id: arData[count],
                                deleted: 1
                            });
                        }
                    }
                    if (dd.PrsCompanyGridID) {
                        arData = dd.PrsCompanyGridID;
                        count = 0;
                        for (count in arData) {
                            data["jobhistories"].push({
                                jobhistory_id: arData[count],
                                deleted: 1
                            });
                        }
                    }
                    if (dd.PrsOrganizationGridID) {
                        arData = dd.PrsOrganizationGridID;
                        count = 0;
                        for (count in arData) {
                            data["organizations"].push({
                                organization_id: arData[count],
                                deleted: 1
                            });
                        }
                    }
                }



                // console.log(data);


                return data;
            },
            sync: true,
            callback: {
                create: function(store, form, grid) {

                    me.saveClicked = false;
                }
            },
            successSaveFunc: function() {

                var worklocationprojectpt_id = f.down("[name=worklocationprojectpt_id]").getValue();
                var employee_id = f.down("[name=employee_id]").getValue();
                
                    me.tools.ajax({
                        params: {
                            employee_id:employee_id,
                            worklocationprojectpt_id:worklocationprojectpt_id
                        },
                        success: function(data, model) {
                            // console.log('ok');
                        }
                    }).read('worklocationprojectpt_input');
                
                //WORKLOCATION

                //added by Michael 2021.08.27
                var is_child = f.down("[name=is_child]").getValue();
                
                    me.tools.ajax({
                        params: {
                            employee_id:employee_id,
                            is_child:is_child
                        },
                        success: function(data, model) {
                            // console.log('ok');
                        }
                    }).read('ischild_input');
                //end added by Michael 2021.08.27

                var is_kompensasi = f.down("[name=is_kompensasi]").getValue();
                
                    me.tools.ajax({
                        params: {
                            employee_id:employee_id,
                            is_kompensasi:is_kompensasi
                        },
                        success: function(data, model) {
                            // console.log('ok');
                        }
                    }).read('iskompensasi_input');

                var is_pensiun = f.down("[name=is_pensiun]").getValue();
                
                    me.tools.ajax({
                        params: {
                            employee_id:employee_id,
                            is_pensiun:is_pensiun
                        },
                        success: function(data, model) {
                            // console.log('ok');
                        }
                    }).read('ispensiun_input');
                
                me.saveClicked = false;


                me.dataReset();
                me.myTabPanelDisabled(false);
               
                console.log("Jalann..");

                //WORKLOCATION
            },
            failSaveFunc: function() {
                me.saveClicked = false;
            }
        });
    },
    fdar: function() {



        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        me.setActiveForm(f);
        //   var sp = new Hrd.library.box.tools.StoreProcessor();
        //  sp.init("detail", me.controllerName + "PRSLSTORE", "employee_id");
        me.localStore.newdetail = me.instantStore({
            id: me.controllerName + 'DetailStore',
            extraParams: {
                mode_read: 'detail'
            },
            idProperty: 'employee_id'
        });


        me.setAlasanresign(); // added by wulan sari 20181210
        me.setPtkp(); // added by wulan sari 20200603
        me.setPtkpClaim();
        

        var x = {
            init: function() {
                var cb = ["religion_religion_id", "education_education_id", "bloodgroup_bloodgroup_id",
                    "spouse_last_education"];
                for (var c in cb) {
                    f.down("[name=" + cb[c] + "]").bindPrefixName = me.controllerName;
                    f.down("[name=" + cb[c] + "]").doInit(true, function() {

                    });
                }





                //  var sp = new Hrd.library.box.tools.StoreProcessor();
                //  sp.init("newdetail", me.controllerName + "PRSLSTORE", "employee_id");
                // sp.create(me);
                //   me.localStore[sp.id] = sp;
                /* education */
                me.getGrideducation().doInit();
                /* saudara*/
                me.getGridsaudara().doInit();
                /* child*/
                me.getGridchild().doInit();
                /* emg contact*/
                me.getGridemgcontact().doInit();
                /* training*/
                me.getGridtraining().doInit();
                /* jobs*/
                me.getGridjobs().doInit();
                /* organization*/
                me.getGridorganization().doInit();
                /* tanda kasih*/
                //  me.getGridtandakasih().doInit();

		me.getGridmultiposition().doInit();
                
		me.getGridemployeehistory().doInit();
                
                



            },
            create: function() {

                me.localStore.newdetail.load({
                    params: {
                        employee_id: 0
                    },
                    callback: function(recs, op) {
                        me.attachModel(op, me.localStore.newdetail, true);
                        var rec = me.localStore.newdetail.getAt(0);
                        if (rec) {
                            f.down("[name=hari_kerja_perminggu]").setValue(false);
                            f.loadRecord(rec);

                            f.down("button[action=save]").setDisabled(false);
                        }
                    }
                });

                //  me.localStore["newdetail"].loadModel(me);
                /* education */
                me.getGrideducation().getStore().load({
                    params: {
                        //  state:"load_default_attribute"
                    },
                    callback: function(rec, op) {
                        me.getGrideducation().attachModel(op);
                    }
                });
                /* education history*/
                me._loadDataGrid(me.getGrideducation(), 0, true);
                /*saudara*/
                me._loadDataGrid(me.getGridsaudara(), 0, true);
                /*child*/
                me._loadDataGrid(me.getGridchild(), 0, true);
                /*emgcontact*/
                me._loadDataGrid(me.getGridemgcontact(), 0, true);
                /*training*/
                me._loadDataGrid(me.getGridtraining(), 0, true);
                /*jobs*/
                me._loadDataGrid(me.getGridjobs(), 0, true);
                /*organizations*/
                me._loadDataGrid(me.getGridorganization(), 0, true);
                /*tanda kasih*/
                // me._loadDataGrid(me.getGridtandakasih(), 0, true);
                me._loadDataGrid(me.getGridemployeehistory(), 0, false);


            },
            update: function() {
                f.editedRow = g.getSelectedRow();
                var eId = me.getGrid().getSelectedRecord().get("employee_id");
                /*  me.localStore["detail"].loadData(eId, me, function() {
                 var rec = me.localStore["detail"].store.getAt(0);
                 if (rec) {
                 f.down("[name=spouse_child]").setValue(rec.get("child_count"));
                 
                 }
                 });*/

                me.localStore.newdetail.load({
                    params: {
                        employee_id: eId
                    },
                    callback: function(recs, op) {
                        me.attachModel(op, me.localStore.newdetail, true);
                        var rec = me.localStore.newdetail.getAt(0);
                        if (rec) {
                            f.down("[name=hari_kerja_perminggu]").setValue(false);
                            f.loadRecord(rec);



                            f.down("button[action=save]").setDisabled(false);
                        }
                    }
                });




                /* education history*/
                me._loadDataGrid(me.getGrideducation(), eId, false);
                /*saudara*/
                me._loadDataGrid(me.getGridsaudara(), eId, false);
                /*child*/
                me._loadDataGrid(me.getGridchild(), eId, false);
                /*emgcontact*/
                me._loadDataGrid(me.getGridemgcontact(), eId, false);
                /*training*/
                me._loadDataGrid(me.getGridtraining(), eId, false);
                /*jobs*/
                me._loadDataGrid(me.getGridjobs(), eId, false);
                /*organizations*/
                me._loadDataGrid(me.getGridorganization(), eId, false);
                /*tandakasih*/
                //me._loadDataGrid(me.getGridtandakasih(), eId, false);
                me.loadPotencies(eId);

	       me.loaddynamicGrid(me.getGridmultiposition(), eId, 'update');
               
               /*employeehistory*/
               me._loadDataGrid(me.getGridemployeehistory(), eId, false);

            },
            other: function(state) {

                me.getFormdata().up('window').getEl().unmask();
            }
        };
        return x;
    },
    /* simple grid control main control*/
    sgcPanel: {
        PrsEducationGridID: {
            afterDelete: function(ctrl, row) {
                var f = ctrl.getFormdata();
                if (!f.deletedData.PrsEducationGridID) {
                    f.deletedData.PrsEducationGridID = [];
                }
                f.deletedData.PrsEducationGridID.push(row.internalId);
            }
        },
        PrsChildGridID: {
            afterDelete: function(ctrl, row) {
                var f = ctrl.getFormdata();
                if (!f.deletedData.PrsChildGridID) {
                    f.deletedData.PrsChildGridID = [];
                }
                f.deletedData.PrsChildGridID.push(row.internalId);
            },
            afterEdit: function(f, rec) {

                var v = f.getValues();
                var educationStore = f.down("[name=education_education_id]").getStore();
                var index = educationStore.findExact('education_id', v["education_education_id"]);

                rec.beginEdit();
                rec.set({
                    education_education: educationStore.getAt(index).get("education")
                });
                rec.endEdit();



            }
        },
        PrsEmegergencyContactGridID: {
            afterDelete: function(ctrl, row) {
                var f = ctrl.getFormdata();
                if (!f.deletedData.PrsEmegergencyContactGridID) {
                    f.deletedData.PrsEmegergencyContactGridID = [];
                }
                f.deletedData.PrsEmegergencyContactGridID.push(row.internalId);
            }
        },
        PrsSaudaraGridID: {
            afterDelete: function(ctrl, row) {
                var f = ctrl.getFormdata();
                if (!f.deletedData.PrsSaudaraGridID) {
                    f.deletedData.PrsSaudaraGridID = [];
                }
                f.deletedData.PrsSaudaraGridID.push(row.internalId);
            },
            afterEdit: function(f, rec) {

                var v = f.getValues();
                var educationStore = f.down("[name=education_education_id]").getStore();
                var index = educationStore.findExact('education_id', v["education_education_id"]);

                rec.beginEdit();
                rec.set({
                    education_education: educationStore.getAt(index).get("education")
                });
                rec.endEdit();



            }

        },
        PrsCourseGridID: {
            afterDelete: function(ctrl, row) {
                var f = ctrl.getFormdata();
                if (!f.deletedData.PrsCourseGridID) {
                    f.deletedData.PrsCourseGridID = [];
                }
                f.deletedData.PrsCourseGridID.push(row.internalId);
            }
        },
        PrsCompanyGridID: {
            afterDelete: function(ctrl, row) {
                var f = ctrl.getFormdata();
                if (!f.deletedData.PrsCompanyGridID) {
                    f.deletedData.PrsCompanyGridID = [];
                }
                f.deletedData.PrsCompanyGridID.push(row.internalId);
            }
        },
        PrsOrganizationGridID: {
            afterDelete: function(ctrl, row) {
                var f = ctrl.getFormdata();
                if (!f.deletedData.PrsOrganizationGridID) {
                    f.deletedData.PrsOrganizationGridID = [];
                }
                f.deletedData.PrsOrganizationGridID.push(row.internalId);
            }
        }

    },
    sgcHelper: {
        genderRadioButton: function(cols) {
            var x = {
                xtype: 'radiogroup',
                fieldLabel: cols.text,
                layout: 'hbox',
                defaults: {
                    margin: '0 7 0 0'
                },
                items: [
                    {boxLabel: 'Male', name: cols.dataIndex, inputValue: "M", checked: true},
                    {boxLabel: 'Female', name: cols.dataIndex, inputValue: "F"},
                ]
            };
            return x;
        }
    },
    _loadDataGrid: function(grid, employeeId, isCreate) {
        var me = this;
        var tempId = 0;
        tempId = !isCreate ? employeeId : 0;
        grid.getStore().getProxy().extraParams.employee_id = tempId;

        me.addProgress();
        grid.getStore().load({
            callback: function(rec, op) {
                grid.attachModel(op);
                me.unMask(1);

            }
        });
    },
    loadPotencies: function(employeeId) {
        var me = this;
        //do ajax
        me.addProgress();
        var f = me.getFormdata();
        /* uncheck checkbox && reset textfield*/
        for (var x = 1; x <= 16; x++) {
            var uel = f.down("[name=skills_" + x + "]");
            if (uel) {
                if (uel.getXType() === "checkboxfield") {
                    uel.setValue(0);
                }

            }

            var rtf = f.down("[name=skills_" + x + "_list]");
            if (rtf) {
                if (rtf.getXType() === "textfield" || rtf.getXType() === "textareafield") {
                    rtf.setValue("");
                }
            }
        }

        /* set radio to pasif */
        f.down("[name=skills_7_active]").setValue(0);
        f.down("[name=skills_8_active]").setValue(0);
        f.down("[name=skills_9_active]").setValue(0);

        me.tools.ajax({
            params: {
                employee_id: employeeId
            },
            success: function(recs, model) {
                var el = null, el;
                var r = null;
                var id = null;




                for (var i in recs) {

                    r = recs[i]['potencytran'];
                    id = r['potency_id'];
                    el = f.down("[name=skills_" + id + "]");

                    if (el) {
                        if (r['value']) {
                            el.setValue(r['value']);
                        }

                    }

                    /// check if list exist
                    if (r['list']) {
                        el = f.down("[name=skills_" + id + "_list]");
                        if (el) {
                            el.setValue(r['list']);
                        }
                    }

                    /// check if active taken
                    if (r['is_active']) {
                        el = f.down("[name=skills_" + id + "_active]");
                        if (el) {
                            el.setValue(r['is_active']);
                        }
                    }


                }
                me.unMask(1);
            }
        }).read('potency');
    },
    getSelectedStatusDate: function(selectedStatus, isSet, data) {
        var me = this;
        var f = me.getFormdata();
        var statusGroup = {
            1: [1],
            2: [2, 3],
            3: [4, 5, 6]
        };
        var textField = {
            1: "permanent_",
            2: "contract_",
            3: "daily_"
        };
        var startDate = null;
        var endDate = null;
        var selectedGroup = 1;
        for (var x in statusGroup) {
            for (var y in statusGroup[x]) {
                if (statusGroup[x][y] == selectedStatus) {
                    selectedGroup = x;
                }
            }
        }
        var startEl = f.down("[name=" + textField[selectedGroup] + "start_date]");
        var endEl = f.down("[name=" + textField[selectedGroup] + "end_date]");
        if (isSet) {

            startEl.setValue(data[0]);
            if (selectedGroup === 1) {
                endEl.setValue(data[1]);
            } else {
                endEl.setValue(data[2]);
            }
        }
        startDate = startEl.getValue();
        endDate = endEl.getValue();
        return [selectedGroup, startDate, endDate];


    },
    processSkills: function() {
        var me = this;
        var f = me.getFormdata();
        var skills = [];

        var values = f.getForm().getValues();
        var cs = null;
        var l = null;
        var v = null;
        var a = null;
        var id = null;
        for (var i in me.skillList) {
            cs = me.skillList[i];
            id = values['skills_' + cs + '_id'];
            v = values['skills_' + cs];
            l = values['skills_' + cs + '_list'];
            a = values['skills_' + cs + '_active'];
            skills.push({
                employeepotency_id: id,
                potency_id: cs,
                is_active: a ? a : 0,
                list: l ? l : '',
                value: v ? 1 : 0
                        // list:currentSkillElList?currentSkillElList.getValue():'',
                        //value:currentSkillEl?currentSkillEl.getValue():0
            });
        }
        return skills;
    },
    gridAfterRender: function() {
        var me = this;

        me.dataReset();
        var g = me.getGrid();
        g.getSelectionModel().setSelectionMode('SINGLE');

        Ext.util.CSS.swapStyleSheet("theme", "ext/resources/css/xtheme-gray.css");

        // alert(g.getStore().getCount());




    },
    gridSelectionChange: function() {
        var me = this;
      
        me.callParent(arguments);
        var g = me.getGrid();
        var f = me.getFormdata();

        // mask panel
        var btnSave = f.down("button[action=save]");
        if (btnSave) {
            btnSave.setDisabled(true);
        }

        var p = me.getPanel();
        p.setLoading("Please wait");
        var selectedRecord = null;
        
        


        me.tools.ajax({
            params: {},
            success: function(data, model) {
                me.afterDetailRequested(data, function() {
                    p.setLoading(false);
                });

            }
        }).read('detail');


    },
    afterDetailRequested: function(data, motherFunc) {
        // data from mode_read : 'detail'
        // motherFunc : fungsi yang dilewatkan dari method gridSelectionChange di Controllerfdv

        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        f.editedRow = g.getSelectedRow();

        f.down("[name=employee_nik]").setReadOnly(false);
        
        
        /// KARENA DESELECT ALL MENTRIGGER GRIDSELECTION CHANGE
        if(f.editedRow >= 0){
        //    alert("Hello");
            me.myTabPanelDisabled(false);
        }
        
              

        /// load parameter


        me.tools.ajax({
            params: {
            },
            success: function(data, model) {

                me.tools.wesea(data.alokasibiaya, f.down("[name=alokasibiaya_alokasibiaya_id]")).comboBox();
                me.tools.wesea(data.department, me.getFormsearch().down("[name=department_department_id]")).comboBox(true);
                me.tools.wesea(data.position, f.down("[name=position_position_id]")).comboBox();
                me.tools.wesea(data.groupposition, f.down("[name=groupposition_groupposition_id]")).comboBox();
                me.tools.wesea(data.department, f.down("[name=department_department_id]")).comboBox();
                me.tools.wesea(data.group, f.down("[name=group_group_id]")).comboBox();
                me.tools.wesea(data.division, f.down("[name=division_division_id]")).comboBox();
                me.tools.wesea(data.jobfunction, f.down("[name=jobfunction_jobfunction_id]")).comboBox();
                  /* start added by ahmad riadi 21-06-2017 */
               me.tools.wesea(data.jobfamily, f.down("[name=jobfamily_jobfamily_id]")).comboBox();
               me.tools.wesea(data.banding, f.down("[name=banding_banding_id]")).comboBox();
                  /* end added by ahmad riadi 21-06-2017 */
               me.tools.wesea(data.worklocationprojectpt, f.down("[name=worklocationprojectpt_id]")).comboBox();
            }
        }).read('parameter');

        // mark on 20170615
        //me.disableEmployeeStatusFields(f.editedRow > -1 ? true : false);

       // console.log(g.getStore().getCount());
        /*
        var pt = g.down("pagingtoolbar");
        if (pt) {
            pt.getStore().loadPage(1);
        }
        */



        if (!g.getSelectedRecord()) {
            motherFunc();
            return;
        }



        var eId = g.getSelectedRecord().get("employee_id");



        me.localStore.newdetail.load({
            params: {
                employee_id: eId
            },
            callback: function(recs, op) {
			
                me.attachModel(op, me.localStore.newdetail, true);
                var rec = me.localStore.newdetail.getAt(0);
                if (rec) {


                    me.refreshPhotoInfo(rec.get("photo"));


                    //console.log(rec);
                    f.down("[name=hari_kerja_perminggu]").setValue(false);
                    f.loadRecord(rec);
                    
                    //wulan add 20200518
                    f.down("[name=no_ktp]").setValue(rec.get('ktp_number'));
                    f.down("[name=no_rekening]").setValue('Bank : ' + rec.get('bank_rekening') + ', No. Rek : ' + rec.get('nomor_rekening') + ', a.n. ' + rec.get('nama_rekening'));
                    f.down("[name=no_npwp]").setValue(rec.get('npwp'));                      
                    me.disableEmployeeStatusFields(false);
                    me.employeeStatusOnChange();
                    me.disableEmployeeStatusFields(true);                           
                    //end wulan add 20200518

        
                    f.down("button[action=save]").setDisabled(false);


                    /* education history*/
                    me._loadDataGrid(me.getGrideducation(), eId, false);
                    /*saudara*/
                    me._loadDataGrid(me.getGridsaudara(), eId, false);
                    /*child*/
                    me._loadDataGrid(me.getGridchild(), eId, false);
                    /*emgcontact*/
                    me._loadDataGrid(me.getGridemgcontact(), eId, false);
                    /*training*/
                    me._loadDataGrid(me.getGridtraining(), eId, false);
                    /*jobs*/
                    me._loadDataGrid(me.getGridjobs(), eId, false);
                    /*organizations*/
                    me._loadDataGrid(me.getGridorganization(), eId, false);
                    /*tandakasih*/
                    // me._loadDataGrid(me.getGridtandakasih(), eId, false);
                    me.loadPotencies(eId);

		    me.loaddynamicGrid(me.getGridmultiposition(), eId, 'update');
                    
                    //employeehistory
                    me._loadDataGrid(me.getGridemployeehistory(), eId, false);

                    f.down("[name=spouse_child]").setValue(f.down("[name=child_count]").getValue());

                    // edited by wulan sari 20181210
                    var alasanresign_id;
                    alasanresign_id = rec.get('alasanresign_id');
                    if(alasanresign_id != ''){
                        if(parseInt(alasanresign_id) === 6){
                            f.down("[name=alasan_resign]").setReadOnly(false);                            
                        } else {
                            f.down("[name=alasan_resign]").setReadOnly(true);
                        }
                    }
                    // end edited by wulan sari 20181210
                                       
                

                    
                    motherFunc();


                }else{
					// console.log("[MAINDETAILERR] Tidak ada data main detail.");
					f.down("button[action=save]").setDisabled(false);
					motherFunc();
				}
            }
        });


        return false;

    },
    disableEmployeeStatusFields: function(mode) {
        var me = this;
        var f = me.getFormdata();
        // for (var i = 1; i <= 6; i++) {
        //added by michael 18.08.2021
        for (var i = 1; i <= 7; i++) {
        //end added by michael 18.08.2021
            f.down("#esID" + i).setDisabled(mode);
        }
        
        //f.down("[name=statusinformation_hire_date]").setReadOnly(mode);
        f.down("[name=statusinformation_assignation_date]").setReadOnly(mode);
        f.down("[name=statusinformation_contract_ke]").setReadOnly(mode);
        f.down("[name=statusinformation_contract_start]").setReadOnly(mode);
        f.down("[name=statusinformation_contract_end]").setReadOnly(mode);
        //added by michael 18.08.2021
        f.down("[name=statusinformation_consultant_ke]").setReadOnly(mode);
        f.down("[name=statusinformation_consultant_start]").setReadOnly(mode);
        f.down("[name=statusinformation_consultant_end]").setReadOnly(mode);
        //end added by michael 18.08.2021
        f.down("[name=statusinformation_temporary_ke]").setReadOnly(mode);
        f.down("[name=statusinformation_temporary_start]").setReadOnly(mode);
        f.down("[name=statusinformation_temporary_end]").setReadOnly(mode);
    },
   
    afterCallNew: function() {
        var me = this;
       
        var icr = me.isCreateRequirementsExist();
        if (!icr.status) {
            me.tools.alert.warning(icr.msg);
            return;
        }

        var f = me.getFormdata();
        f.editedRow = -1;

        //start wulan add 20200518
        me.disableEmployeeStatusFields(false);
        me.employeeStatusOnChange();
        //end wulan add 20200518
      
        me.getGrid().getSelectionModel().deselectAll();
        

        /* education history*/
        me._loadDataGrid(me.getGrideducation(), 0, true);
        /*saudara*/
        me._loadDataGrid(me.getGridsaudara(), 0, true);
        /*child*/
        me._loadDataGrid(me.getGridchild(), 0, true);
        /*emgcontact*/
        me._loadDataGrid(me.getGridemgcontact(), 0, true);
        /*training*/
        me._loadDataGrid(me.getGridtraining(), 0, true);
        /*jobs*/
        me._loadDataGrid(me.getGridjobs(), 0, true);
        /*organizations*/
        me._loadDataGrid(me.getGridorganization(), 0, true);
        
        /*organizations*/
        me._loadDataGrid(me.getGridemployeehistory(), 0, true);

        me.myTabPanelDisabled(true);

        me.newButtonClicked = true;

	

	//added by ahmad riadi 28-12-2017, for remove data if exist in data multiposition
        var gridmultiposition = me.getGridmultiposition();
        var storemultiposition = gridmultiposition.getStore();
        if(storemultiposition.getCount()>0){
            storemultiposition.removeAll();
        }



        /// set default value for birthdate
        var bdate = new Date();
        var bel = f.down("[name=birth_date]");
        bdate.setFullYear(bdate.getFullYear() - 17);
        bdate.setMonth(0);
        bdate.setDate(1);
        bel.setValue(bdate);

        me.refreshPhotoInfo("");


        f.down("[action=save]").setDisabled(false);



        f.down("[name=employee_nik]").setReadOnly(true);
        
        //added by anas 14032022
        //Ketika klik button new dan ada akses golongan maka combobox show dan textfield hide
        if(f.down("[name=group_group_id]").store.getCount() > 0)
        {
            f.down("[name=group_group_id]").setVisible(true);
            f.down("[name=group_code]").setVisible(false);
        }
        //end added by anas
    },
    isCreateRequirementsExist: function() {
        var hasil = {status: false, msg: "Checking..."};
        var me = this;
        var f = me.getFormdata();
        var status = false;
        var msg = '';
        if (f.down("[name=religion_religion_id]").getStore().getCount() === 0) {
            msg = 'Data agama tidak ada';
        } else if (f.down("[name=department_department_id]").getStore().getCount() === 0) {
            msg = 'Data departemen tidak ada';
        } /*else if (f.down("[name=group_group_id]").getStore().getCount() === 0) {
            msg = 'Data golongan tidak ada';
        }*/ else if (f.down("[name=position_position_id]").getStore().getCount() === 0) {
            msg = 'Data jabatan tidak ada';
        } else {
            status = true;
        }

        /// add 20160823
        //status = true;

        hasil.status = status;
        hasil.msg = msg;
        return hasil;
    },
    myTabPanelDisabled: function(isDisabled) {
        var me = this;
        var f = me.getFormdata();
        /// disable semua tab panel kecuali personal dan status / posisi
        f.down('#pFamilyTabID').setDisabled(isDisabled);
        f.down('#pEducationTabID').setDisabled(isDisabled);
        f.down('#pPotencyTabID').setDisabled(isDisabled);
        f.down('#pJobsTabID').setDisabled(isDisabled);
        f.down('#pDocumentTabID').setDisabled(isDisabled);
      //  f.down('personalemegergencycontactgrid').setDisabled(isDisabled);

    },
    unMask: function(progress) {
        var me = this;
        me.loadProgressCount = me.loadProgressCount - progress;
        if (me.loadProgressCount <= 0) {
            me.getFormdata().up('window').getEl().unmask();

            if (me.newButtonClicked) {
                me.myTabPanelDisabled(true);
                me.getFormdata().down('personalemegergencycontactgrid').setDisabled(false);
                me.newButtonClicked = false;
            }


        }

    },
    /* start added by ahmad riadi 09-06-2017 */
    setStoreSubholding: function () {
        var me, store, form;
        me = this;
        store = me.getStore("Subholding");
        store.load({
            params: {
                "mode_read": 'getsubholding',
            },
            callback: function (records, operation, success) {
                var data = records[0].raw.others[0][0].data;
                store.loadData(data);
            }
        });
    },
    

    setStoreProject: function () {
        var me, store, form;
        me = this;
        store = me.getStore("Project");
        store.load({
            params: {
                "mode_read": 'getproject',
            },
            callback: function (records, operation, success) {
                var data = records[0].raw.others[0][0].data;
                store.loadData(data);       
            }
});

    },
    setStorePt: function () {
        var me, store;
        me = this;
        store = me.getStore("Pt");
        store.load({
            params: {
                "mode_read": 'getpt',
            },
            callback: function (records, operation, success) {
                var data = records[0].raw.others[0][0].data;
                store.loadData(data);                
                me.tools.ajax({
                    params: {
                    },
                    success: function (data, model) {
                        me.tools.wesea(data.department, me.getFormsearhcreportto().down("[name=department_department_id]")).comboBox(true);
                    }
                }).read('parameter');
            }
        });
    },
     filterProjectbysubholding: function (subholding_id) {
        var me, form, store;
        me = this;
        form = me.getFormsearhcreportto();
        store = form.down("[name=project_id]").getStore();
        store.clearFilter(true);
        store.filterBy(function (record) {
            return record.data.subholding_id == subholding_id;
        });
    },	

    filterPtbyproject: function (project_id) {
        var me, form, store;
        me = this;
        form = me.getFormsearhcreportto();
        store = form.down("[name=pt_id]").getStore();
        store.clearFilter(true);
        store.filterBy(function (record) {
            return record.data.project_id == project_id;
        });
    },
    searchReportto: function () {
        var me, form, store;
        me = this;
        form = me.getFormsearhcreportto();
    },
    /* end added by ahmad riadi 09-06-2017 */
 
   /*start added by ahmad riadi 17-07-2017 */
    viewdocFile: function (param) {
        var me, grid, store, record, row,rowdata,documentdata;
        me = this;
        grid = me.getGrid();
        record = grid.getSelectedRecord();
        row = record.data;
        me.tools.ajax({
            params: {
                'employee_id': row.employee_id,
            },
            success: function (records, model) {
                rowdata = records.others[0][0].data[1][0];
                documentdata = "dokumen_"+param.toLowerCase();  
                $.each(rowdata, function(key, value) {
                    if(documentdata==key){
                        if(value !=null){
                            window.open(document.URL + "app/hrd/uploads/"+value);
                        }else{
                            me.tools.alert.warning("Tidak ada file");
                        }
                    }
                });               
            }
        }).read('document');
        
    },
    /*end added by ahmad riadi 17-07-2017 */

  /*start added by ahmad riadi 18-09-2017 */
   validateEmailoffice: function () {
        var me, grid, record, row, rowdata, form, email_ciputra, counter,statedata;
        me = this;
        form = me.getFormdata();
        grid = me.getGrid();
        record = grid.getSelectedRecord();
        email_ciputra = form.down("[name=email_ciputra]").getValue();
        if (me.validateEmail(email_ciputra)) { // jika format email valid
            if (record !== undefined) {
                row = record.data;
                me.tools.ajax({
                    params: {
                        'email_ciputra': email_ciputra,
                    },
                    success: function (records, model) {
                        counter = records.others[0][0].counter;
                        rowdata = records.others[0][0].data;                      
                        if (counter > 0) {
                            if (row.email_ciputra == email_ciputra) {
                                statedata = 'dontcreateuser';
                                //form.down("[action=save]").setDisabled(false);
                            } else {
                                //form.down("[action=save]").setDisabled(true);
                                statedata = 'dontcreateuser';
                                me.WarningAlert('Email <b>' + email_ciputra + '</b> sudah digunakan, tidak boleh double..!');
                            }                           
                        } else {   
                            //form.down("[action=save]").setDisabled(false);
                            me.statedata = 'createuser';
                        }                                          
                        
                    }
                }).read('validateemailoffice');
            }else{
                me.tools.ajax({
                    params: {
                        'email_ciputra': email_ciputra,
                    },
                    success: function (records, model) {
                        counter = records.others[0][0].counter;
                        rowdata = records.others[0][0].data;                      
                        if (counter > 0) { 
                                //form.down("[action=save]").setDisabled(true);
                                statedata = 'dontcreateuser';
                                me.WarningAlert('Email <b>' + email_ciputra + '</b> sudah digunakan, tidak boleh double..!');
                        } else {  
                            //form.down("[action=save]").setDisabled(false);
                            statedata = 'createuser';
                        }                                           
                    }
                }).read('validateemailoffice');
            }
        } else {
            me.WarningAlert('Email <b>' + email_ciputra + '</b> tidak valid, cek format email..!');
        }        
    },
    validateEmail: function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return re.test(email); //return true or false
    },
    WarningAlert: function (msg) {
        Ext.Msg.show({
            title: 'WARNING',
            msg: msg,
            buttons: Ext.Msg.OK,
            icon: Ext.Msg.WARNING
        });

    },
    /*end added by ahmad riadi 18-09-2017 */

     /* start added by ahmad riadi 09-06-2017 */
    setStoreSubholding: function () {
        var me, store, form;
        me = this;
        store = me.getStore("Subholding");
        store.load({
            params: {
                "mode_read": 'getsubholding',
            },
            callback: function (records, operation, success) {
                var data = records[0].raw.others[0][0].data;
                store.loadData(data);
            }
        });
    },
    setStoreProject: function () {
        var me, store, form;
        me = this;
        store = me.getStore("Project");
        store.load({
            params: {
                "mode_read": 'getproject',
            },
            callback: function (records, operation, success) {
                var data = records[0].raw.others[0][0].data;
                store.loadData(data);
            }
        });

    },
    setStorePt: function () {
        var me, store;
        me = this;
        store = me.getStore("Pt");
        store.load({
            params: {
                "mode_read": 'getpt',
            },
            callback: function (records, operation, success) {
                var data = records[0].raw.others[0][0].data;
                store.loadData(data);
                me.tools.ajax({
                    params: {
                    },
                    success: function (data, model) {
                        me.tools.wesea(data.department, me.getFormsearhcreportto().down("[name=department_department_id]")).comboBox(true);
                    }
                }).read('parameter');
            }
        });
    },
    filterProjectbysubholding: function (subholding_id) {
        var me, form, store;
        me = this;
        form = me.getFormsearhcreportto();
        store = form.down("[name=project_id]").getStore();
        store.clearFilter(true);
        store.filterBy(function (record) {
            return record.data.subholding_id == subholding_id;
        });
    },
    filterPtbyproject: function (project_id) {
        var me, form, store;
        me = this;
        form = me.getFormsearhcreportto();
        store = form.down("[name=pt_id]").getStore();
        store.clearFilter(true);
        store.filterBy(function (record) {
            return record.data.project_id == project_id;
        });
    },
    searchReportto: function () {
        var me, form, store;
        me = this;
        form = me.getFormsearhcreportto();
    },
    /* end added by ahmad riadi 09-06-2017 */

    /*start added by ahmad riadi 17-07-2017 */
    viewdocFile: function (param) {
        var me, grid, store, record, row, rowdata, documentdata;
        me = this;
        grid = me.getGrid();
        record = grid.getSelectedRecord();
        row = record.data;
        me.tools.ajax({
            params: {
                'employee_id': row.employee_id,
            },
            success: function (records, model) {
                rowdata = records.others[0][0].data[1][0];
                documentdata = "dokumen_" + param.toLowerCase();
                $.each(rowdata, function (key, value) {
                    if (documentdata == key) {
                        if (value != null) {
                            window.open(document.URL + "app/hrd/uploads/" + value);
                        } else {
                            me.tools.alert.warning("Tidak ada file");
                        }
                    }
                });
            }
        }).read('document');

    },
    /*end added by ahmad riadi 17-07-2017 */

    /*start added by ahmad riadi 18-09-2017 */
    validateEmailoffice: function () {
        var me, grid, record, row, rowdata, form, email_ciputra, counter;
        me = this;
        form = me.getFormdata();
        grid = me.getGrid();
        record = grid.getSelectedRecord();
        email_ciputra = form.down("[name=email_ciputra]").getValue();
        // console.log(email_ciputra);
        if (me.validateEmail(email_ciputra)) { // jika format email valid
            if (record !== undefined) {
                row = record.data;
                me.tools.ajax({
                    params: {
                        'email_ciputra': email_ciputra,
                    },
                    success: function (records, model) {
                        counter = records.others[0][0].counter;
                        rowdata = records.others[0][0].data;
                        if (counter > 0) {
                            if (row.email_ciputra == email_ciputra) {
                                me.statedata = 'dontcreateuser';
                                //form.down("[action=save]").setDisabled(false);
                            } else {
                                //form.down("[action=save]").setDisabled(true);
                                me.statedata = 'dontcreateuser';
                                me.WarningAlert('Email <b>' + rowdata.email_ciputra + '</b> sudah digunakan, tidak boleh double..!');
                            }
                        } else {
                            form.down("[action=save]").setDisabled(false);
                            me.statedata = 'createuser';
                        }

                    }
                }).read('validateemailoffice');
            } else {
                me.tools.ajax({
                    params: {
                        'email_ciputra': email_ciputra,
                    },
                    success: function (records, model) {
                        counter = records.others[0][0].counter;
                        rowdata = records.others[0][0].data;
                        if (counter > 0) {
                            //form.down("[action=save]").setDisabled(true);
                            me.statedata = 'dontcreateuser';
                            me.WarningAlert('Email <b>' + email_ciputra + '</b> sudah digunakan, tidak boleh double..!');
                        } else {
                            //form.down("[action=save]").setDisabled(false);
                            me.statedata = 'createuser';
                        }
                    }
                }).read('validateemailoffice');
            }
        } else {
            //form.down("[action=save]").setDisabled(true);
            me.WarningAlert('Email <b>' + email_ciputra + '</b> tidak valid, cek format email..!');
        }
    },
    validateEmail: function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return re.test(email); //return true or false
    },
    WarningAlert: function (msg) {
        Ext.Msg.show({
            title: 'WARNING',
            msg: msg,
            buttons: Ext.Msg.OK,
            icon: Ext.Msg.WARNING
        });

    },
    /*end added by ahmad riadi 18-09-2017 */      
    
    /*start added by ahmad riadi 30-10-2017 */
    FormDataCustomeShow: function (state, width, title, locationform, formid = 'test') {
        var me, winid, win = '';
        me = this;
        if (formid == 'test') {
            winid = 'win-formdatacustome';
        } else {
            winid = 'win-' + formid;
        }
        win = desktop.getWindow(winid);

        if (!win) {
            win = desktop.createWindow({
                id: winid,
                title: title,
                iconCls: 'icon-form-add',
                resizable: false,
                minimizable: false,
                maximizable: false,
                width: width,
                renderTo: Ext.getBody(),
                constrain: true,
                constrainHeader: false,
                modal: true,
                layout: 'fit',
                shadow: 'frame',
                shadowOffset: 10,
                border: false,
                state: state,
                listeners: {
                    boxready: function () {
                        win.body.mask('Loading...');
                        var tm = setTimeout(function () {
                            win.add(Ext.create(locationform));
                            win.center();
                            win.body.unmask();
                            clearTimeout(tm);
                        }, 1000);
                    },
                    close: function () {

                    }
                }

            });
        }
        win.show();
    },

    filterPtbyprojectbyparam: function (form, project_id) {
        var me, form, store;
        me = this;
        store = form.down("[name=pt_id]").getStore();
        store.clearFilter(true);
        store.filterBy(function (record) {
            return record.data.project_id == project_id;
        });
    },
    setStoreProjectbyparam: function (form = '') {
        var me, store, form, prefix;
        me = this;
        store = me.getStore("Project");
        store.load({
            params: {
                "mode_read": 'getproject',
            },
            callback: function (records, operation, success) {
                var data = records[0].raw.others[0][0].data;
                store.loadData(data);
                prefix = form.down("[name=project_id]").getValue();
                if (prefix !== null) {
                    form.down("[name=project_id]").setValue(prefix)
                }
            }
        });

    },
    setStoreProjectbyparam2: function (form = '') {
        var me, store, form, prefix;
        me = this;
        store = me.getStore("Project2");
        store.load({
            params: {
                "mode_read": 'getproject',
            },
            callback: function (records, operation, success) {
                var data = records[0].raw.others[0][0].data;
                store.loadData(data);
                prefix = form.down("[name=project_id]").getValue();
                if (prefix !== null) {
                    form.down("[name=project_id]").setValue(prefix)
                }
            }
        });

    },
    setStorePtbyparam: function (form = '') {
        var me, store, prefix,project_id;
        me = this;
        store = me.getStore("Pt");
	project_id = form.down("[name=project_id]").getValue();
        store.load({
            params: {
                "mode_read": 'getpt',
		"project_id": project_id,
            },
            callback: function (records, operation, success) {

		if (records !== null) {		

                var data = records[0].raw.others[0][0].data;
                store.loadData(data);
                prefix = form.down("[name=pt_id]").getValue();
                if (prefix !== null) {
                    form.down("[name=pt_id]").setValue(prefix)
                }

		}		

            }
        });
    },
    setStorePtbyparam2: function (form = '') {
        var me, store, prefix,project_id;
        me = this;
        store = me.getStore("Pt2");
	project_id = form.down("[name=project_id]").getValue();
        store.load({
            params: {
                "mode_read": 'getpt',
		"project_id": project_id,
            },
            callback: function (records, operation, success) {

		if (records !== null) {		

                var data = records[0].raw.others[0][0].data;
                store.loadData(data);
                prefix = form.down("[name=pt_id]").getValue();
                if (prefix !== null) {
                    form.down("[name=pt_id]").setValue(prefix)
                }

		}		

            }
        });
    },
    filterDepartmentbyprojectpt: function (form = '') {
        var me, project_id, pt_id, department, prefix;
        me = this;
        if (form !== '') {
            project_id = form.down("[name=project_id]").getValue();
            pt_id = form.down("[name=pt_id]").getValue();
            department = form.down("[name=department_department_id]");
            me.tools.ajax({
                params: {
                    "project_id": project_id,
                    "pt_id": pt_id
                },
                success: function (data, model) {
                    department.getStore().removeAll();
                    me.tools.wesea(data.department, department).comboBox(false);
                    prefix = department.getValue();
                    if (prefix !== null) {
                        department.setValue(prefix)
                    }
                }
            }).read('getdepartment');
    }
    },
    filterReporttobyprojectpt: function (form = '') {
        var me, project_id, pt_id, department_id, reportto, prefix, prefixposition, prefixfamily;
        me = this;
        if (form !== '') {
            project_id = form.down("[name=project_id]").getValue();
            pt_id = form.down("[name=pt_id]").getValue();
            department_id = form.down("[name=department_department_id]").getValue();
            reportto = form.down("[name=reportto_id]");

            me.tools.ajax({
                params: {
                    'employee_nik': '',
                    'employee_name': '',
                    'project_id': project_id,
                    'pt_id': pt_id,
                    'department_id': 0
                },
                success: function (data, model) {
                    reportto.getStore().removeAll();
                    me.tools.wesea(data.employee, reportto).comboBox(false);
                    me.tools.ajax({
                        params: {
                        },
                        success: function (data, model) {
                            me.tools.wesea(data.position, form.down("[name=position_position_id]")).comboBox();
                            me.tools.wesea(data.jobfamily, form.down("[name=jobfamily_jobfamily_id]")).comboBox();
                            prefix = reportto.getValue();
                            prefixposition = form.down("[name=position_position_id]").getValue();
                            prefixfamily = form.down("[name=jobfamily_jobfamily_id]").getValue();

                            if (prefix !== null) {
                                reportto.setValue(prefix)
                            }
                            if (prefixposition !== null) {
                                form.down("[name=position_position_id]").setValue(prefixposition)
                            }
                            if (prefixfamily !== null) {
                                form.down("[name=jobfamily_jobfamily_id]").setValue(prefixfamily)
                            }

                            me.filterAlokasibiayabyprojectpt(form);
                        }
                    }).read('parameter');


                }
            }).read('getreportto');
    }
    },
    filterAlokasibiayabyprojectpt: function (form = '') {
        var me, project_id, pt_id, combodata, prefix;
        me = this;
        if (form !== '') {
            project_id = form.down("[name=project_id]").getValue();
            pt_id = form.down("[name=pt_id]").getValue();
            combodata = form.down("[name=alokasibiaya_alokasibiaya_id]");
            me.tools.ajax({
                params: {
                    "project_id": project_id,
                    "pt_id": pt_id
                },
                success: function (data, model) {
                    combodata.getStore().removeAll();
                    me.tools.wesea(data.alokasibiaya, combodata).comboBox(false);
                    prefix = combodata.getValue();
                    if (prefix !== null) {
                        combodata.setValue(prefix)
                    }
                }
            }).read('getalokasibiaya');
    }
    },   
    setStoreSection: function (form = '') {
        var me, store, department_id;
        me = this;
        //department_id = form.down("[name=department_department_id]").getValue();
        store = me.getStore("Sectiondepartment");
        store.load({
            params: {
                "mode_read": 'searching',
                //"department_id": department_id,
            },
            callback: function (records, operation, success) {

            }
        });
    },
    Savemultiposition: function () {
        var me, form, formvalue, value, statedata, store,
                project, pt, department, section, reportto,
                jobfamily, position, alokasi, checkdata, record,
                grid;
        me = this;
        form = me.getFormdatamultiposition();
        formvalue = form.getForm().getValues();
        statedata = form.up('window').state.toLowerCase();
        grid = me.getGridmultiposition();
        store = grid.getStore();
        if (form.getForm().isValid()) {
            project = form.down("[name=project_id]").valueModels[0].raw;
            pt = form.down("[name=pt_id]").valueModels[0].raw;
            department = form.down("[name=department_department_id]").valueModels[0].raw;
            //section = form.down("[name=section_id]").valueModels[0].raw;

	    var sectiondata='';
            if (typeof (form.down("[name=section_id]").getValue()) == 'number') {
                var data = form.down("[name=section_id]").valueModels[0].raw;
                sectiondata = data.section;
            }	

	    var alokasidata='';	
            if (typeof (form.down("[name=alokasibiaya_alokasibiaya_id]").getValue()) == 'number') {
                var data = form.down("[name=alokasibiaya_alokasibiaya_id]").valueModels[0].raw;
                alokasidata = data.name;
            }

	  
		

            //reportto = form.down("[name=reportto_id]").valueModels[0].raw;
            jobfamily = form.down("[name=jobfamily_jobfamily_id]").valueModels[0].raw;
            position = form.down("[name=position_position_id]").valueModels[0].raw;
            //alokasi = form.down("[name=alokasibiaya_alokasibiaya_id]").valueModels[0].raw;

            value = {};
            value = {
                'is_default': formvalue.is_default,
                'statedata': statedata,
                'project_id': formvalue.project_id,
                'pt_id': formvalue.pt_id,
                'employee_multiposition_id': formvalue.employee_multiposition_id,
                'employee_id': me.getFormdata().down("[name=employee_id]").getValue(),
                'employee_nik': me.getFormdata().down("[name=employee_nik]").getValue(),
                'department_id': formvalue.department_department_id,
                'section_id': formvalue.section_id,
                'reportto_id': formvalue.reportto_id,
                'jobfamily_id': formvalue.jobfamily_jobfamily_id,
                'position_id': formvalue.position_position_id,
                'alokasibiaya_id': formvalue.alokasibiaya_alokasibiaya_id,
                'projectname': project.projectname,
                'ptname': pt.ptname,
                'department': department.department,
                //'section': section.section,
		'section': sectiondata,
                //'reportto': reportto.employee_name,
		'reportto': formvalue.namaatasan,
                'jobfamily': jobfamily.jobfamily,
                //'alokasibiaya': alokasi.name,
		'alokasibiaya': alokasidata,
                'position': position.position,
            }


            var selectedRecord = '';
            if (value.statedata == 'update') {
                selectedRecord = grid.getSelectionModel().getSelection()[0];
            }


            checkdata = me.Checkmultipositiondata(value, statedata, selectedRecord);
            if (checkdata == 'granted') {
                form.up('window').body.mask('Saving data, please wait ...');
                if (statedata == 'create') {
                    store.add(value);
		    store.commitChanges();		

                } else if (statedata == 'update') {
                    record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                    record.beginEdit();
                    record.set(value);
                    record.endEdit();
		    store.commitChanges();	
	
                }
               
                store.clearFilter();
                store.filter('deleted', false);
                form.up('window').body.unmask();
                form.up('window').close();
            } else {
                var msg = '';
                if (checkdata == 'alreadyexist') {
                    msg = 'Already Exist..!';
                } else {
                    msg = 'Has been set default..!';
                }
                me.WarningAlert('Project ' + value.projectname + ' ,Pt ' + value.ptname + ' ,Department ' + value.department  + ' ' + msg);
            }

        }
    },
    Checkmultipositiondata: function (value, statedata, rowselected = '') {
        var me, status, grid, store, counter_default_store, counter_default_value, counter_exist, data_default;
        me = this;
        status = 'granted';
        grid = me.getGridmultiposition();
        store = grid.getStore();
        if (store.getCount() > 0) {

            data_default = [];
            counter_default_store = 0;
            counter_default_value = 0;
            counter_exist = 0;
            defaultid = 0;

            store.each(function (record)
            {
                var default1 = typeof record.data['is_default'] === 'boolean' ? (record.data['is_default'] === true ? 1 : 0) : record.data['is_default'];
                var default2 = typeof value.is_default === 'boolean' ? (value.is_default === true ? 1 : 0) : value.is_default;
                if (
                        record.data['project_id'] == value.project_id &&
                        record.data['pt_id'] == value.pt_id &&
                        record.data['department_id'] == value.department_id 
                        //record.data['section_id'] == value.section_id
                        )
                {
                    counter_exist++;
                }

                if (parseInt(default1) == 1) {
                    counter_default_store++;
                    data_default.push(record);
                }
                if (parseInt(default2) == 1) {
                    counter_default_value++;
                }

            });
            
            store.each(function (record)
            {
                if(typeof record.data['is_default'] === 'boolean'){
                    if(record.data['is_default'] === true){
                        defaultid = record.data['employee_multiposition_id'];
                    }
                }
            });
            
            if (counter_exist > 0) {
                status = 'alreadyexist';
            }
            if (counter_default_store > 0 && counter_default_value > 0) {
                status = 'hasbeendefault';
            }

            if (statedata = 'update') {
                var selectedRecord = grid.getSelectionModel().getSelection()[0];
                if (rowselected == selectedRecord) {
                    if (status == 'hasbeendefault') {
                        var rawdata = data_default[0].raw;
                        var flag = '';
                        if (value.project_id == rawdata.project_id &&
                                value.pt_id == rawdata.pt_id &&
                                value.department_id == rawdata.department_id 
                                //value.section_id == rawdata.section_id
                                ) {
                            flag = 'granted';
                        } else {
                            if(value.employee_multiposition_id == defaultid){
                                flag = 'granted';                                
                            } else {
                                flag = 'hasbeendefault';
                            }
                        }
                        status = flag;
                    } else {
                        status = 'granted';
                    }
                }
            }

        }
        return status;

    },
    formDataMultipositionAfterrender: function () {
        var me, form, statedata, grid, store, record, raw;
        me = this;
        form = me.getFormdatamultiposition();
        me.setStoreProjectbyparam2(form);
        me.setStorePtbyparam2(form);
        statedata = form.up('window').state.toLowerCase();
        me.tools.ajax({
            params: {
    },
            success: function (data, model) {
                me.tools.wesea(data.alokasibiaya, form.down("[name=alokasibiaya_alokasibiaya_id]")).comboBox();
                me.tools.wesea(data.position, form.down("[name=position_position_id]")).comboBox();
                me.tools.wesea(data.jobfamily, form.down("[name=jobfamily_jobfamily_id]")).comboBox();
                if (statedata == 'update' || statedata =='read') {
            grid = me.getGridmultiposition();
            store = grid.getStore();
            record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
            raw = record.raw;
            record['data']['reportto_id'] = parseInt(raw.reportto_id);
            record['data']['namaatasan'] = raw.reportto;
            record['data']['department_department_id'] = parseInt(raw.department_id);
            record['data']['jobfamily_jobfamily_id'] = parseInt(raw.jobfamily_id);
            record['data']['position_position_id'] = parseInt(raw.position_id);
            record['data']['alokasibiaya_alokasibiaya_id'] = parseInt(raw.alokasibiaya_id);
            form.getForm().loadRecord(record);
        }
            }
        }).read('parameter');     
        
    },
    formDataMultipositionBoxready: function () {
        var me, form, statedata, grid, store, record, raw;
        me = this;
        form = me.getFormdatamultiposition();
        statedata = form.up('window').state.toLowerCase();

    },
    formDataIntranetcaAfterrender: function () {
        var me, form, statedata, grid, store, record, raw;
        me = this;
        form = me.getFormdataintranetca();
        g = me.getGrid();
        rec = g.getSelectedRecord();
        e_id = rec.get("employee_id");

        me.tools.ajax({
                    params: {
                        employee_id: e_id
                    },
                    success: function(data, model) {
                        if(data.others[0][0].project_id != 4038 && data.others[0][0].pt_id != 20){
                            form.down('button[action=save]').setDisabled(true);
                        }
                    }
                }).read('projectpt');


        me.tools.ajax({
            params: {
                employee_id: e_id
            },
            success: function (data, model) {

                form.down("[name=inventory]").setValue(data.others[0][0].HASIL[1][0].inventory);
                form.down("[name=purchasing]").setValue(data.others[0][0].HASIL[1][0].purchasing);
                form.down("[name=marketing]").setValue(data.others[0][0].HASIL[1][0].marketing);
                form.down("[name=finance]").setValue(data.others[0][0].HASIL[1][0].finance);
                form.down("[name=operational]").setValue(data.others[0][0].HASIL[1][0].operational);
                form.down("[name=sales]").setValue(data.others[0][0].HASIL[1][0].sales);
            }
        }).read('getIntranetca');     
        
    },
    saveDataIntranetca: function () {
        var me, form, statedata, grid, store, record, raw;
        me = this;
        form = me.getFormdataintranetca();
        g = me.getGrid();
        rec = g.getSelectedRecord();
        e_id = rec.get("employee_id");

        me.tools.ajax({
            params: {
                employee_id: e_id,
                inventory: form.down("[name=inventory]").getValue(),
                purchasing: form.down("[name=purchasing]").getValue(),
                marketing: form.down("[name=marketing]").getValue(),
                finance: form.down("[name=finance]").getValue(),
                operational: form.down("[name=operational]").getValue(),
                sales: form.down("[name=sales]").getValue()
            },
            success: function (data, model) {

                form.up("window").close();
                me.dataSave();
            }
        }).read('saveIntranetca');     
        
    },
    loaddynamicGrid: function (grid = '', id = '', statedata = '') {
        var me, store, data;
        me = this;
        store = grid.getStore();
        store.load({
            params: {
                "mode_read": 'multiposition',
                "employee_id": id,
            },
            callback: function (records, operation, success) {
                if (store.getCount() > 0) {
                    store.removeAll();
                    if (records[0].raw.multiposition !== undefined) {
                        data = records[0].raw.multiposition.data;
                        store.loadData(data);
                        store.clearFilter();
                        store.filter('deleted', false);
                    }
                }

            }
        });
    },
    dataDestroywithflag: function (grid = '') {
        var me, rows, ph, pd, confirmmsg, successmsg, failmsg,
                record, recordcounttext, grid, store, selectedRecord, msg, successcount
                , parameter, pesan, dataconfirm, ph, pd;

        me = this;

        rows = grid.getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            store = grid.getStore();

            if (rows.length == 1) {
                selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(dataconfirm) + ']';
                confirmmsg = 'Delete ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }

            Ext.Msg.confirm('Delete Data', confirmmsg, function (btn) {
                if (btn == 'yes') {
                    resetTimer();
                    msg = function () {
                        grid.up('window').mask('Deleting data, please wait ...');
                    };
                    for (var i = 0; i < rows.length; i++) {
                        record = rows[i];
                        record.set("deleted", true);
                        record.set("statedata", 'delete');
                        store.clearFilter(true);
                        store.filter('deleted', false);
                    }
                }
            });
    }
    },
     /*end added by ahmad riadi 30-10-2017 */



    /*start added by ahmad riadi 05-02-2018 */
     exportData:function(){
        var me, url, grid;
        me = this;
        grid = me.getGrid();
        grid.setLoading('Please wait...');

        //added by anas 31032022
        var f = me.getFormsearch();
        var fields = f.getValues();
        var data = {
            employee_name : fields['employee_name'],
            employee_active : fields['employee_active'],
            department_department_id : fields['department_department_id']
        };
        //end added by anas

        me.tools.ajax({
            // params: {},
            //updated by anas 31032022
            params: {                          
                data: Ext.encode(data)
            },
            //end updated by anas
            success: function (data, model) {
                grid.setLoading(false);
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
        }).read('exportdatapersonal');        
     },

   /*end added by ahmad riadi 05-02-2018 */

   /*start added by wulansari 20181216 */
    alasanOnSelect: function () {
        var me = this;
        var f = me.getFormdata();        
        var id = f.down("[name=alasanresign_id]").getValue();
        if (parseInt(id) === 6) {
            f.down("[name=alasan_resign]").setReadOnly(false);
        } else {
            f.down("[name=alasan_resign]").setReadOnly(true);
            f.down("[name=alasan_resign]").setValue();
        }
    },
    setAlasanresign: function () {
        var me, store;
        me = this;
        store = me.getStore("Alasanresign");
        store.load();
    }
    /*end added by wulansari 20181216 */
   
    // added by wulansari 20200603
    ,setPtkp: function () {
        var me, store;
        me = this;
        store = me.getStore("Ptkp");
        store.load();
    },
    setPtkpClaim: function () {
        var me, store;
        me = this;
        store = me.getStore("PtkpClaim");
        store.load();
        
    },
		
    exportList: function() {
        var me = this;
        me.instantWindow("GridExportDocument", 300, "List Export", "create");
        me.exportlistData();
    },

    exportlistData: function(){
        var me = this;

        var grid = me.getGridexportdocument();
        grid.setLoading("Please wait...");

        me.tools.ajax({
            params: {

            },
            success: function(data, model) {
                me.tools.wesea({data: data, model: model}, grid).grid();
                grid.setLoading(false);
            }
        }).read('exportlist');
    },
    exportValidation:function(){
        var me = this;

        // var grid = me.getGridexportdocument();
        // grid.setLoading("Please wait...");
        var g = me.getGridexportdocument();
        var rec = g.getView().getSelectionModel().getSelection();
        var s = g.getSelectionModel().getSelection();

        var f = me.getFormdata();
        var formvalue = f.getForm().getValues();

        selected = [];
        Ext.each(s, function (item) {
            var val = {
                header_title : item.data.header_title,
                field: item.data.field,
                num_order: item.data.num_order
            };
            selected.push(val);
        });

        //sort biar ordernya sesuai
        selected.sort(function(a, b) {
          var keyA = a.num_order,
            keyB = b.num_order;
          // Compare the 2 data
          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
          return 0;
        });

        var doc_list;
        Ext.each(selected, function (item) {
            if(doc_list){
                doc_list = doc_list + ',' + item.field;
            }else{
                doc_list = item.field;
            }
         });

        var employee_id    = formvalue['employee_id'];

        me.tools.ajax({
            params: {
                employee_id : employee_id,
                selected : Ext.encode(selected)
            },
            success: function(data, model) {
                // me.tools.wesea({data: data, model: model}, grid).grid();
                // grid.setLoading(false);
                if(data.others[0][0].HASIL){
                    Ext.MessageBox.show({
                        title: 'Warning',
                        msg: "Dokumen yang dapat didownload "+data.others[0][0].HASIL.available_title+"<br>\n Apakah Anda tetap ingin mendownload dokumen ini?",
                        buttons: Ext.MessageBox.YESNO,
                        icon: Ext.MessageBox.WARNING,
                        fn: function(btn){
                            if(btn == 'yes'){
                            me.exportDocumentPdf(data.others[0][0].HASIL.available, employee_id);
                            } else {
                                return;
                            }
                        }
                    });
                }else{
                    Ext.Msg.alert('Warning', 'Maaf dokumen yang Anda pilih tidak ada');
                    return false;
                }
            }
        }).read('exportvalidation');
    },
    exportDocumentPdf: function(available, employee_id){
        var me = this;

        var grid = me.getGridexportdocument();
        // grid.setLoading("Please wait...");

        me.tools.ajax({
            params: {
                available : available,
                employee_id : employee_id
            },
            success: function(data, model) {
                // me.tools.wesea({data: data, model: model}, grid).grid();
                // grid.setLoading(false);
                url = data['others'][0][0]['HASIL'];
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
        }).read('exportpdf');
    },
    exportDocument: function() {
        var me = this;

        var winId = 'myReportWindow';
        me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
        var win = desktop.getWindow(winId);

        if (win) {
            var f = me.getPanel().down("form");
            var params = f.getForm().getFieldValues();
            var reportData = me.xyReportProcessParams({params: params, file: 'blank'});
            var reportFile = reportData.file;
            var html = me.generateFakeForm_v3(reportData.params, reportData.file); 
            win.down("#MyReportPanel").body.setHTML(html);
            $("#fakeReportFormID").submit();
        }
    },
    generateFakeForm_v3: function (params, reportFile) {
        var form, x;
        form = '<form id="fakeReportFormID" action="resources/stimulsoftjsv3/viewer_hcms.php?reportfilelocation=' + reportFile + '.mrt&ver=1" target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
        for (x in params) {
            if (params[x] === null) {
                params[x] = '';
            }
            form += '<input type="hidden" name="' + x + '" value="' + params[x] + '">';
        }        
        form += '<input type="submit" value="post"></form>';
        form += '<iframe name="my-iframe" style="height:100%;width:100%;"></iframe>';
        return form;
    },
    instantWindow: function(panel, width, title, state, id, folder, panelConfig) {
        var me = this;
        var formtitle, formicon;

        var pc = typeof panelConfig === 'undefined' ? {} : panelConfig;

        title = typeof title == 'undefined' ? 'My Window' : title;
        id = typeof id == 'undefined' ? 'myInstantWindow' : id;
        state = typeof state == 'undefined' ? 'create' : state;
        panel = typeof panel == 'undefined' ? 'Panel' : panel;
        width = typeof width == 'undefined' ? 600 : width;
        formtitle = title;
        formicon = 'icon-form-add';
        var winId = id;
        var fd = typeof folder === "undefined" ? me.controllerName : folder;

        console.log('Hrd.view.' + fd + '.' + panel);


        var win = desktop.getWindow(winId);


        if (!win) {



            win = desktop.createWindow({
                id: winId,
                title: formtitle,
                iconCls: formicon,
                resizable: false,
                minimizable: false,
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
                items: Ext.create('Hrd.view.' + fd + '.' + panel, pc),
                state: state
            });
        }
        win.show();

        return win;
    },
    xyReportProcessParams: function(reportData) {
        var me = this;
        var g = me.getGridexportdocument();
        var rec = g.getView().getSelectionModel().getSelection();
        var s = g.getSelectionModel().getSelection();

        var f = me.getFormdata();
        var formvalue = f.getForm().getValues();

        selected = [];
        Ext.each(s, function (item) {
            var val = {
                header_title : item.data.header_title,
                field: item.data.field,
                num_order: item.data.num_order
            };
            selected.push(val);
        });

        //sort biar ordernya sesuai
        selected.sort(function(a, b) {
          var keyA = a.num_order,
            keyB = b.num_order;
          // Compare the 2 data
          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
          return 0;
        });

        var doc_list;
        Ext.each(selected, function (item) {
            if(doc_list){
                doc_list = doc_list + ',' + item.field;
            }else{
                doc_list = item.field;
            }
         });

        var fn      = "PersonalDocument";
        var employee_id    = formvalue['employee_id'];
        
        reportData.params["employee_id"] = employee_id;
        reportData.params["doc_list"] = doc_list;

        reportData['file'] = fn;
        console.log(reportData);
        return reportData;
    },

    mainPrint: function() {
        var me = this;
        if (!me.xyReport) {
            me.xyReport = new Hrd.library.XyReport();
            me.xyReport.init(me);
        }

        me.xyReport.processReport();
    },

});