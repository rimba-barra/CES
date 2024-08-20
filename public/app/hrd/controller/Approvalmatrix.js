/*  JS CONTROLLER FOR 'Approvalmatrix' */

Ext.define('Hrd.controller.Approvalmatrix', {
    extend: 'Hrd.library.box.controller.Controller',
    alias: 'controller.Approvalmatrix',
    requires: [
        'Hrd.library.box.tools.Tools',
        'Hrd.library.box.tools.DefaultConfig',
        'Hrd.library.box.tools.EventSelector',
        'Hrd.library.Box.Tools.Browse',
        'Hrd.library.box.tools.Dynamicrequest',
    ],
    controllerName: 'approvalmatrix',
    fieldName: 'employee_id',
    bindPrefixName: 'Approvalmatrix',
    formWidth: 850,
    localStore: {},
    editingIndexRow: 0,
    refs: [
        {
            ref: 'griddetail',
            selector: 'approvalmatrixgriddetail'
        },
        {
            ref: 'formdatadetail',
            selector: 'approvalmatrixformdatadetail'
        },
        {
            ref: 'formpackagedocument',
            selector: 'packagemanagementformpackagedocument'
        },
        {
            ref: 'formapplytodoc',
            selector: 'approvalmatrixformapplytodoc'
        },

        //added by anas 15012024
        {
            ref: 'formviewdoccontract',
            selector: 'approvalmatrixformviewdoccontract'
        },
        {
            ref: 'gridviewdoccontract',
            selector: 'approvalmatrixgridviewdoccontract'
        },
        {
            ref: 'gridapprovalcontract',
            selector: 'approvalmatrixgridapprovalcontract'
        },
        //end added by anas
    ],
    dr: null,
    header_id: 0,
    employee_id: 0,
    checkpackagedockument: null,
    arraydata: null,
    constructor: function (configs) {
        var me = this;
        var config = new Hrd.library.box.tools.DefaultConfig({
            moduleName: me.controllerName
        });
        config.run(this);
        this.callParent(arguments);
    },

    init: function () {
        var me = this;
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        me.dr = new Hrd.library.box.tools.Dynamicrequest();
        var newEvs = {};

        newEvs['approvalmatrixgrid button[action=applyall]'] = {
            click: function () {
                me.Applyselected();
            }
        };
        newEvs['approvalmatrixgriddetail button[action=addDetail]'] = {
            click: function () {
                me.addDetail('create');
            }
        };

        newEvs['approvalmatrixformdata'] = {
            boxready: function () {
                var me, form, packagedocument;
                me = this;
                form = me.getFormdata();
                packagedocument = me.dr.getVal(form, 'pmdocument_id', 'value');
                if (packagedocument == null || packagedocument == '') {
                    me.checkpackagedockument = null;
                } else {
                    me.checkpackagedockument = packagedocument;
                }
            }
        };
        newEvs['packagemanagementformpackagedocument'] = {
            afterrender: function () {
                var me, form,datafilter;
                me = this;
                form = me.getFormpackagedocument();
                me.tools.ajax({
                    params: {},
                    success: function (data, model) {
						if(data.packagedocument){							
							datafilter = me.filterPackagedocument(data.packagedocument);
							me.tools.wesea(datafilter, form.down("[name=pmdocument_id]")).comboBox();
						}
                    }
                }).read('headerdata');

            },
           
        };

        newEvs['packagemanagementformpackagedocument button[action=save]'] = {
            click: function () {
                me.saveApplyPackagedocument();
            }
        };

        newEvs['approvalmatrixformdata button[action=close]'] = {
            click: function () {
                me.checkDataHeadBeforeClose();
            }
        };

        newEvs['approvalmatrixformdata button[action=applytodoc]'] = {
            click: function () {
                me.winApplyToDoc();
            }
        };

        newEvs['approvalmatrixformdata button[action=reloadcompetency]'] = {
            click: function () {
                me.winReloadcompetency();
            }
        };
        
        newEvs['approvalmatrixformapplytodoc button[action=save]'] = {
            click: function () {
                var f = this.getFormapplytodoc();
                var f2 = this.getFormdata();
                var periode = f.down("[name=periode]").getValue();
                var employee_name = f2.down("[name=employee_name]").getValue();
                var state = f.up('window').state;
                if (state == 'Approval Matrix'){
                    if(periode == '' || periode == null){
                        me.tools.alert.warning("Please select periode");
                    } else if(periode != '' && periode != null){
                        me.confirmbeforeApplyToDoc('Approval Matrix PM ' + employee_name + ' ' + periode +' will be replaced with new setting, are you sure?');
                    }
                } else {                   
                    if(periode == '' || periode == null){
                        me.tools.alert.warning("Please select periode");
                    } else if(periode != '' && periode != null){
                        me.confirmbeforeReloadCompetency('Document Competency ' + employee_name + ' ' + periode +' will reload, are you sure?');
                    }                    
                }
                
            }
        };

        newEvs['approvalmatrixformdatadetail'] = {
            afterrender: me.fddar
        };

        newEvs['approvalmatrixformdatadetail button[action=save]'] = {
            click: function () {
                me.saveDetail();
            }
        };

        newEvs['approvalmatrixgriddetail actioncolumn'] = {
            click: this.gridDetailActionColumnClick
        };

        newEvs['approvalmatrixformdatadetail combobox[name=department_id]'] = {
            select: me.tcb
        };
        newEvs['approvalmatrixformdatadetail combobox[name=project_id]'] = {
            select: me.tcb
        };
        newEvs['approvalmatrixformdatadetail combobox[name=pt_id]'] = {
            select: me.tcb
        };

        newEvs['approvalmatrixformapplytodoc'] = {
            afterrender: function () {

                var me, form, formdetail, datafilter;
                me = this;
                mainFormData = me.getFormdata();
                employee_id = mainFormData.down("[name=employee_id]").getValue();
                
                form = me.getFormapplytodoc();
                me.tools.ajax({
                    params: {
                    	employee_id : employee_id
                    },
                    success: function (data, model) {
						if(data.periodepm){
							me.tools.wesea(data.periodepm, form.down("[name=periode]")).comboBox();
						}
                    }
                }).read('periodedata');

            },
           
        };

        //added by anas 15012024
        newEvs['approvalmatrixformdata button[action=viewDocContract]'] = {
            click: function () {
                var me = this;
                me.Formviewdoccontractshow();
            }
        };
        newEvs['approvalmatrixformviewdoccontract'] = {
            boxready: function () {
                var me = this;
                me.getDataviewadoccontract();
            }
        };
        newEvs['approvalmatrixformdatadetail [name=is_pmcontract]'] = {
            change: function() {
                me.contractreviewChange();

            }
        };

        newEvs['approvalmatrixformapplytodoc [name=periode]'] = {
            change: function() {
                me.periodereloadChange();
            }
        };
        //end added by anas
        
        this.control(newEvs);
    },

    panelAfterRender: function (el) {
        var me = this;
        var f = me.getFormsearch();
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                me.tools.wesea(data.department, f.down("[name=department_id]")).comboBox();
                me.tools.wesea(data.projectsh, f.down("[name=project_id]")).comboBox();
                me.tools.wesea(data.pt, f.down("[name=pt_id]")).comboBox();

                f.down("[name=project_id]").setValue(parseInt(apps.project));
                f.down("[name=pt_id]").setValue(parseInt(apps.pt));
            }
        }).read('listdept');
    },

    gridAfterRender: function() {
        var me = this;
        me.dataReset();
		
		//supaya paging langsung aktif tanpa user refresh secara manual
		var delay_task = new Ext.util.DelayedTask(function(){
			var s = me.getGrid().getStore();
			//s.remoteSort = true;
			s.reload();
		});
		delay_task.delay(50); 
    },
	
    fdar: function () {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();

        me.setActiveForm(f);
        f.setLoading(false);

        var x = {
            init: function () {},
            create: function () {
               me.unMask(1);
            },
            update: function () {
				 me.unMask(1);
				
				var gs = g.getStore();
				var rec = g.getSelectedRecord();
				if(!rec){
					me.tools.alert.warning("Invalid record");
				}


				me.tools.ajax({
                    params: {},
                    success: function (data, model) {      
                        var datafilter = me.filterPackagedocument(data.packagedocument);
                        me.tools.wesea(datafilter, f.down("[name=pmdocument_id]")).comboBox();
						f.loadRecord(rec);
                    }
                }).read('headerdata');

				var employee_id = rec.data.employee_id;

                // console.log("employee_id");
                // console.log(employee_id);

                    var detailGrid = me.getGriddetail();
                // console.log(detailGrid);


                    detailGrid.doInit();
                    detailGrid.getStore().load({
                        params: {
                            employee_id: employee_id
                        },

                        callback: function (recs, op) {
                            detailGrid.attachModel(op);
                        }
                    });
							
              

                
            }
        };

        return x;
    },
	
	/*
	fdar: function () {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();

        me.setActiveForm(f);
        f.setLoading(false);


        var x = {
            init: function () {},
            create: function () {
                me.unMask(1);
            },
            update: function () {
				
                me.unMask(1);

                f.down('#btnSave').setVisible(false);
                f.down('#btnClose').setText('Close');

                var g = me.getGrid();
                var rec = g.getSelectedRecord();
                if (rec) {
                    f.editedRow = g.getSelectedRow();
                    me.tools.ajax({
                        params: {},
                        success: function (data, model) {      
                            var datafilter = me.filterPackagedocument(data.packagedocument);
                            me.tools.wesea(datafilter, f.down("[name=pmdocument_id]")).comboBox();
							console.log(rec);
                            f.loadRecord(rec);
                            me.header_id = rec.data.approvalmatrix_id;
                            me.employee_id = rec.data.employee_id;
                            me.checkpackagedockument = rec.data.pmdocument_id;
                            me.filterPackagedocument(f);

                        }
                    }).read('headerdata');
                    var employee_id = rec.data.employee_id;
                    var detailGrid = me.getGriddetail();

                    detailGrid.doInit();
                    detailGrid.getStore().load({
                        params: {
                            employee_id: employee_id
                        },

                        callback: function (recs, op) {
                            detailGrid.attachModel(op);
                        }
                    });
                }
            }
        };

        return x;
    },
	*/

    mainDataSave: function () {
        // console.log("mainDataSave");
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        var s = g.getStore();
        var row = f.editedRow;
		var vs = f.getValues();
		var page = 1;
		
				
		me.tools.ajax({
			params: vs,
			success: function (data, model) {      
				//console.log(data.others[0][0]['HASIL']);
				var hasil = data.others[0][0]['HASIL'];
				if(hasil == 1){
					me.tools.alert.info("Success");
					f.up('window').close();
					
					me.loadPageAndFocus();
					//s.loadPage(1); // getcurrenctpage
				} else {
					me.tools.alert.warning("Problem when save data");
				}
				
			}
		}).read('savepackagedocument');
		
		
		/*
        me.insSave({
            form: f,
            grid: g,
            finalData: function (data) {
                return data;
            },
            sync: true,
            callback: {
                create: function (store, form, grid) {}
            }
        });
		*/
    },

    addDetail: function (state) {
        var me = this;
        var win = new Ext.Window({
            modal: true,
            closable: true,
            id: 'add_detail',
            width: 500,
            //height      : 500,
            layout: 'auto',
            autoScroll: true,
            state: state,
            listeners: {
                boxready: function () {
                    win.body.mask('Loading...');
                    var tm = setTimeout(function () {
                        win.add(Ext.create('Hrd.view.approvalmatrix.FormDataDetail'));
                        win.center();
                        win.body.unmask();
                        clearTimeout(tm);
                    }, 1000);
                },
            }
        });
        win.show();
    },

    fddar: function () {
        var me = this;
        var f = me.getFormdatadetail();
        var mainFormData = me.getFormdata();
        
        me.tools.ajax({
			//timeout: 240000000,
            params: {},
            success: function (data, model) {
                me.tools.wesea(data.projectsh, f.down("[name=project_id]")).comboBox();
                me.tools.wesea(data.pt, f.down("[name=pt_id]")).comboBox();
                me.tools.wesea(data.departmentall, f.down("[name=department_id]")).comboBox();
                me.tools.wesea(data.employeeall, f.down("[name=penilai_id]")).comboBox();
                me.tools.wesea(data.approvallevel, f.down("[name=approvallevel_id]")).comboBox();
                me.tools.wesea(data.departmentall, f.down("[name=docdept_id]")).comboBox();

                var state = f.up('window').state;
                if (state == 'create') {
                    f.down("[name=employee_id]").setValue(mainFormData.down("[name=employee_id]").getValue());
                    f.down("[name=project_id]").setValue(parseInt(mainFormData.down("[name=project_id]").getValue()));
                    f.down("[name=pt_id]").setValue(parseInt(mainFormData.down("[name=pt_id]").getValue()));
                    f.down("[name=department_id]").setValue(parseInt(mainFormData.down("[name=department_id]").getValue()));
                    me.tcb();
                } else if (state == 'edit') {
                    var gr = me.getGriddetail();
                    var record = gr.getStore().getAt(me.editingIndexRow);
                    f.loadRecord(record);
                    me.listEmpEdit();
                }
            }
        }).read('listdetailcb');



    },

    saveDetail: function () {
        var me = this;
        var f = me.getFormdatadetail();

        var approvalmatrix_id = f.down("[name=approvalmatrix_id]").getValue();
        var employee_id = f.down("[name=employee_id]").getValue();
        var project_id = f.down("[name=project_id]").getValue();
        var pt_id = f.down("[name=pt_id]").getValue();
        var department_id = f.down("[name=department_id]").getValue();
        var penilai_id = f.down("[name=penilai_id]").getValue();
        var approvallevel_id = f.down("[name=approvallevel_id]").getValue();
        var docdept_id = f.down("[name=docdept_id]").getValue();
        var is_plan_approval = f.down("[name=is_plan_approval]").getValue();
        var is_midyear_evaluation = f.down("[name=is_midyear_evaluation]").getValue();
        var is_endyear_evaluation = f.down("[name=is_endyear_evaluation]").getValue();

        //added by anas 15012024
        var is_pmcontract = f.down("[name=is_pmcontract]").getValue();
        var from_quarterly = f.down("[name=from_quarterly]").getValue();
        //end added by anas

        if (!project_id || !pt_id || !department_id || !penilai_id || !approvallevel_id || !docdept_id) {
            Ext.Msg.alert('Info', 'All field should be filled');
        } 
        //added by anas 15012024
        else if(is_pmcontract == 1 && !from_quarterly)
        {
            Ext.Msg.alert('Info', 'Start from Q should be filled');
        }
        else {
            var data = {
                approvalmatrix_id: approvalmatrix_id,
                employee_id: employee_id,
                project_id: project_id,
                pt_id: pt_id,
                department_id: department_id,
                penilai_id: penilai_id,
                approvallevel_id: approvallevel_id,
                docdept_id: docdept_id,
                is_plan_approval: is_plan_approval,
                is_midyear_evaluation: is_midyear_evaluation,
                is_endyear_evaluation: is_endyear_evaluation,

                //added by anas 15012024
                is_pmcontract: is_pmcontract,
                from_quarterly: from_quarterly
            };

            me.tools.ajax({
                params: {data: Ext.encode(data)},
                success: function (cek, model) {
                	
                    var CEKPENILAI = cek.others[0][0].CEKPENILAI;
                    if (parseInt(CEKPENILAI) > 0) {
                        Ext.Msg.show({
                            title: 'Error',
                            msg: 'Failed to save, Approval Already exists',
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.ERROR
                        });
                        
                    } else {

                        var state = f.up('window').state;
                        var readAction = '';
                        if (state == 'create') {
                            readAction = 'savedetail';
                        } else if (state == 'edit') {
                            readAction = 'editdetail';
                        }

                        me.tools.ajax({
                            params: {data: Ext.encode(data)},
                            success: function (data, model) {
                                //console.log(data.others[0][0].success);
                                if (data.others[0][0].success) {
                                    //console.log('save detail');
                                    //Ext.Msg.alert('Info', 'Data Saved');
                                    Ext.Msg.show({
                                        title: 'Success',
                                        msg: 'Data saved successfully.',
                                        icon: Ext.Msg.INFO,
                                        buttons: Ext.Msg.OK,
                                        fn: function () {
                                            f.up('window').close();
                                            var detailGrid = me.getGriddetail();
                                            detailGrid.doInit();
                                            detailGrid.getStore().load({
                                                params: {
                                                    employee_id: employee_id
                                                },

                                                callback: function (recs, op) {
                                                    detailGrid.attachModel(op);
                                                }
                                            });
                                            /*
                                            var gridStore = me.getGrid().getStore();
                                            gridStore.reload();
                                            */
                                            me.loadPageAndFocus();
                                        }
                                    });

                                } else {
                                    Ext.Msg.show({
                                        title: 'Failure',
                                        msg: 'Failed to Save Data',
                                        icon: Ext.Msg.ERROR,
                                        buttons: Ext.Msg.OK
                                    });
                                }
                            }
                        }).read(readAction);
                        
                    }
                }
            }).read('penilaiexist');
            
        }
    },

    gridDetailActionColumnClick: function (view, cell, row, col, e) {
        var me = this;
        var gr = me.getGriddetail();
        var record = gr.getStore().getAt(row);
        var m = e.getTarget().className.match(/\bact-(\w+)\b/);

        if (m) {
            switch (m[1]) {
                case 'edit':
                    me.addDetail('edit');
                    me.editingIndexRow = row;
                    break;
                case 'destroy':
                    Ext.Msg.confirm('Delete Data', 'Delete Selected Record?', function (btn) {
                        if (btn == 'yes') {
                            //console.log(record.data.approvalmatrix_id);
                            var data = {
                                approvalmatrix_id: record.data.approvalmatrix_id
                            };

                            me.tools.ajax({
                                params: {data: Ext.encode(data)},
                                success: function (data, model) {
                                    if (data.others[0][0].success) {
                                        Ext.Msg.show({
                                            title: 'Success',
                                            msg: 'Delete data successfully.',
                                            icon: Ext.Msg.INFO,
                                            buttons: Ext.Msg.OK,
                                            fn: function () {
                                                var detailGrid = me.getGriddetail();
                                                detailGrid.doInit();
                                                detailGrid.getStore().load({
                                                    params: {
                                                        employee_id: record.data.employee_id
                                                    },

                                                    callback: function (recs, op) {
                                                        detailGrid.attachModel(op);
                                                    }
                                                });

                                                var gridStore = me.getGrid().getStore();
                                                gridStore.reload();
                                            }
                                        });

                                    } else {
                                        Ext.Msg.show({
                                            title: 'Failure',
                                            msg: 'Failed to Delete Data',
                                            icon: Ext.Msg.ERROR,
                                            buttons: Ext.Msg.OK
                                        });
                                    }
                                }
                            }).read('deletedetail');
                        }
                    });
                    break
            }
        }
    },

    listEmp: function () {
        var me = this;
        var f = me.getFormdatadetail();

        var project_id = f.down("[name=project_id]").getValue();
        var pt_id = f.down("[name=pt_id]").getValue();
        var dept_id = f.down("[name=department_id]").getValue();

        var penilaiCombo = f.down("[name=penilai_id]");//Ext.getCmp("penilai_id");

        penilaiCombo.setValue(0);
        var store = penilaiCombo.getStore();
        store.clearFilter();

        //store.filterBy(function(recod){return recod.data.department_id==dept_id && recod.data.project_id==project_id && recod.data.pt_id==pt_id;});
		
		// Department
        var deptCombo = f.down("[name=department_id]");
        var department_id = deptCombo.getValue();
        deptCombo.setValue(0);
        var store = deptCombo.getStore();
        store.clearFilter();
        store.filterBy(function(recod){return recod.data.project_id==project_id && recod.data.pt_id==pt_id;});
		var finddept = store.findExact('department_id', department_id);
		finddept != -1 ? deptCombo.setValue(department_id) : deptCombo.setValue(0);
		
		// Doc Department
        var docdeptCombo = f.down("[name=docdept_id]");
        var docdept_id = deptCombo.getValue();
        docdeptCombo.setValue(0);
        var store = docdeptCombo.getStore();
        store.clearFilter();
        store.filterBy(function(recod){return recod.data.project_id==project_id && recod.data.pt_id==pt_id;});		
    },
	
    listEmpEdit: function () {
        var me = this;
        var f = me.getFormdatadetail();

        var project_id = f.down("[name=project_id]").getValue();
        var pt_id = f.down("[name=pt_id]").getValue();
        var dept_id = f.down("[name=department_id]").getValue();
        var penilaiCombo = f.down("[name=penilai_id]");//Ext.getCmp("penilai_id");
		
        var store = penilaiCombo.getStore();
        store.clearFilter();
		
		// Department
        var deptCombo = f.down("[name=department_id]");
        var department_id = deptCombo.getValue();
        deptCombo.setValue(0);
        var store = deptCombo.getStore();
        store.clearFilter();
        store.filterBy(function(recod){return recod.data.project_id==project_id && recod.data.pt_id==pt_id;});
		var finddept = store.findExact('department_id', department_id);
		finddept != -1 ? deptCombo.setValue(department_id) : deptCombo.setValue(0);
		
		// Doc Department
        var docdeptCombo = f.down("[name=docdept_id]");
        var docdept_id = docdeptCombo.getValue();
        docdeptCombo.setValue(0);
        var store = docdeptCombo.getStore();
        store.clearFilter();
        store.filterBy(function(recod){return recod.data.project_id==project_id && recod.data.pt_id==pt_id;});
		var finddept = store.findExact('department_id', docdept_id);
		finddept != -1 ? docdeptCombo.setValue(docdept_id) : docdeptCombo.setValue(0);		
    },
	
    //for callback (function in function)
    tcb: function () {
        var me = this;
        me.listEmp();
    },
    filterPackagedocument: function (param) {
        //yang ditampilkan hanya yang berstatus is_approve = yes    
        var datahasfilter =[];
		if(param){			
			Ext.each(param.data, function (value) {
				 if(value.is_approve=='yes'){
					  datahasfilter.push(value);
				 }           
			});
       		return {'data':datahasfilter,'model':param.model};
		} else {
      		return {'data':datahasfilter,'model':''};
		}
    },
    parampackagecodument: {
        //start formgeneate
        fromlocation: 'Hrd.view.approvalmatrix.FormPackageDocument',
        formtitle: 'PACKAGE DOCUMENT', formicon: 'icon-form-add',
        formid: 'win-packagemanagementformpackagedocument', formlayout: 'fit',
        formshadow: 'frame', formmask: 'Loading...',
        formwidth: 500, formtimeout: 0,
        stateform: null, formaction: null, formproperties: null, formwindows: null,
        //end formgeneate       
    },
    checkDataHeadBeforeClose: function () {
        var me, form, packagedocument, oldpackagedocument;
        me = this;
        form = me.getFormdata();
        packagedocument = me.dr.getVal(form, 'pmdocument_id', 'value');
        if (packagedocument == null || packagedocument == '') {
            form.up('window').close();
        } else {
            oldpackagedocument = me.checkpackagedockument;
            if (oldpackagedocument !== packagedocument && oldpackagedocument !== null && oldpackagedocument !== '') {
                me.confirmbeforeSave('Data Package Dokument akan di update, apakah anda yakin ?');
            } else if (oldpackagedocument == null || oldpackagedocument == '') {
                me.confirmbeforeSave('Data Package Dokument akan di simpan, apakah anda yakin ?');
            } else {
                form.up('window').close();
            }
        }

    },
    confirmbeforeSave: function (msg) {
        var me;
        me = this;
        Ext.Msg.show({
            title: 'Save',
            msg: msg,
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
                    me.savePackagedocument();
                } else {
                    me.clearParam();
                    me.getFormdata().up('window').close();
                }
            },
            icon: Ext.Msg.QUESTION
        });
    },
    Applyselected: function () {
        var me, grid, rows;
        me = this;
        grid = me.getGrid();
        rows = grid.getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected..!');
            return;
        } else {
            me.parampackagecodument.stateform = 'Apply All Package Document';
            me.dr.GenerateFormdata(me.parampackagecodument);
            me.arraydata = [];
            for (var i = 0; i < rows.length; i++) {
                me.arraydata.push(rows[i]['data'].employee_id);
            }
        }
    },
    saveApplyPackagedocument: function () {
        //save data to table employee
        var me, form, data, row, counter, countarray;
        me = this;
        form = me.getFormpackagedocument();
        me.dr.formMask(form);
        data = me.arraydata;
        countarray = data.length;
        counter = 0;
        Ext.each(data, function (value) {
            counter++;
            me.tools.ajax({
                params: {
                    'approvalmatrix_id': 0,
                    'employee_id': value,
                    'pmdocument_id': me.dr.getVal(form, 'pmdocument_id', 'value'),
                },
                success: function (data, model) {
                    me.clearParam();
                }
            }).read('updatepackagedocument');
        });

        if (countarray == counter) {
            me.clearParam();
            me.dr.buildSuccessAlert('Data success update');
            me.dr.formUnmask(form);
            me.dr.formClose(form);
            //me.getGrid().getStore().reload();
			
			me.loadPageAndFocus();
        }

    },
    savePackagedocument: function () {
        //save data to table employee
        var me, form;
        me = this;
        form = me.getFormdata();
        me.dr.formMask(form);
        me.tools.ajax({
            params: {
                'approvalmatrix_id': me.header_id,
                'employee_id': me.employee_id,
                'pmdocument_id': me.dr.getVal(form, 'pmdocument_id', 'value'),
            },
            success: function (data, model) {
                me.clearParam();
                me.dr.buildSuccessAlert('Data success update');
                me.dr.formUnmask(form);
                me.dr.formClose(form);
                //me.getGrid().getStore().reload();
				
				me.loadPageAndFocus();
            }
        }).read('updatepackagedocument');

    },
    confirmbeforeApplyToDoc: function (msg) {
        var me;
        me = this;

        //added by anas 15012024 | ambil data used template contract ato gak
        var f2 = me.getFormdata();
        var used_pmcontract = f2.down("[name=used_pmcontract]").getValue();
        //end added

        Ext.Msg.show({
            title: 'Reload Approval Matrix',
            msg: msg,
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

                    //added by anas 15012024 | used template contract 
                    if(used_pmcontract == 1){
                        // console.log("USED TEMPLATE CONTRACT");
                        me.applyToDocContract();
                    }
                    else{                        
                        me.applyToDoc();
                    }

                } else {
                    me.clearParam();
                   // me.getFormdata().up('window').close();
                }
            },
            icon: Ext.Msg.QUESTION
        });
    },
    confirmbeforeReloadCompetency: function (msg) {
        var me;
        me = this;
        Ext.Msg.show({
            title: 'Reload Document Competency',
            msg: msg,
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
                    me.reloadCompetency();
                } else {
                    me.clearParam();
                   // me.getFormdata().up('window').close();
                }
            },
            icon: Ext.Msg.QUESTION
        });
    },
    winApplyToDoc: function () {
        var me, grid, rows;
        me = this;
        grid = me.getGrid();
        rows = grid.getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected..!');
            return;
        } else {
            me.paramapplytodoc.stateform = 'Approval Matrix';
            me.dr.GenerateFormdata(me.paramapplytodoc);
            /*
            me.arraydata = [];
            for (var i = 0; i < rows.length; i++) {
                me.arraydata.push(rows[i]['data'].employee_id);
            }*/
        }
    },
    winReloadcompetency: function () {
        var me, grid, rows;
        me = this;
        grid = me.getGrid();
        rows = grid.getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected..!');
            return;
        } else {
            me.paramreloadcompetency.stateform = 'Document Competency';
            me.dr.GenerateFormdata(me.paramreloadcompetency);
        }
    },
    paramapplytodoc: {
        //start formgeneate
        fromlocation: 'Hrd.view.approvalmatrix.FormApplyToDoc',
        formtitle: 'Reload', formicon: 'icon-form-add',
        formid: 'win-approvalmatrixformapplytodoc', formlayout: 'fit',
        formshadow: 'frame', formmask: 'Loading...',
        formwidth: 500, formtimeout: 0,
        stateform: null, formaction: null, formproperties: null, formwindows: null,
        //end formgeneate       
    },
    paramreloadcompetency: {
        //start formgeneate
        fromlocation: 'Hrd.view.approvalmatrix.FormApplyToDoc',
        formtitle: 'Reload', formicon: 'icon-form-add',
        formid: 'win-approvalmatrixformapplytodoc', formlayout: 'fit',
        formshadow: 'frame', formmask: 'Loading...',
        formwidth: 500, formtimeout: 0,
        stateform: null, formaction: null, formproperties: null, formwindows: null,
        //end formgeneate       
    },
    applyToDoc: function () {
        //save data to table employee
        var me, form, formapp;
        me = this;
        form = me.getFormdata();
        formapp = me.getFormapplytodoc();
        me.dr.formMask(form);		
        me.tools.ajax({
            params: {
                'employee_id': form.down("[name=employee_id]").getValue(),
                'periode': formapp.down("[name=periode]").getValue(),
            },
            success: function (data, model) {
                me.clearParam();
                me.dr.buildSuccessAlert('Success..');
                me.dr.formUnmask(form);
                me.dr.formClose(form);
                me.getFormapplytodoc().up('window').close();
                //me.getGrid().getStore().reload();
				me.loadPageAndFocus();
            }
        }).read('applytodoc');

    },
    reloadCompetency: function () {
        //save data to table employee
        var me, form, formapp;
        me = this;
        form = me.getFormdata();
        formapp = me.getFormapplytodoc();
        me.dr.formMask(form);
        me.tools.ajax({
            params: {
                'employee_id': form.down("[name=employee_id]").getValue(),
                'periode': formapp.down("[name=periode]").getValue(),
            },
            success: function (data, model) {
                me.clearParam();
                me.dr.buildSuccessAlert('Success..');
                me.dr.formUnmask(form);
                me.dr.formClose(form);
                me.getFormapplytodoc().up('window').close();
                //me.getGrid().getStore().reload();
				me.loadPageAndFocus();
            }
        }).read('reloadcompetency');

    },
    clearParam: function () {
        var me;
        me = this;
        me.header_id = 0;
        me.employee_id = 0;
        me.checkpackagedockument = null;
    },
    loadPageAndFocus: function () {
        var me, page, index, s;
        me = this;
        s = me.getGrid().getStore();
        mainform = me.getFormdata();
		s.currentPage = s.currentPage;
		s.load({
			callback: function(s){ 
				var employee_id = mainform.down("[name=employee_id]").getValue();
				if(employee_id != undefined){
					var index 		= me.getGrid().getStore().findExact('employee_id', employee_id*1);
					index > -1 ? me.getGrid().getSelectionModel().select(index) : '';
				}
			} 
		});
    },

    //added by anas 15012024 | untuk menampilkan popup
    Formviewdoccontractshow: function () {
        // console.log("viewDocContract");
        var me = this;
        me.instantWindow("FormViewDocContract", 800, "View Document Contract", "View Document Contract", "approvalmatrixformviewdoccontract");
    },

    //added by anas 15012024 | untuk mengambil data grid
    getDataviewadoccontract: function (flag) {
        // console.log("getDataviewadoccontract");
        var me, form, formvalue, grid, store, gridabsent, storeabsent, record, row;
        me = this;

        // me.instantWindow("FormViewAllLog", 800, "View doc contract", "view all log", "approvalmatrixformviewdoccontract");

        form = me.getFormdata();
        formvalue = form.getForm().getValues();
        grid = me.getGridviewdoccontract();

                // console.log(grid);

        // gridabsent = me.getGridabsentrecord();
        // storeabsent = gridabsent.getStore();
        // record = storeabsent.getAt(storeabsent.indexOf(gridabsent.getSelectionModel().getSelection()[0]));
        // row = record.raw.employee;

        // gridall = me.getGridalllog();

        // added by Michael 2021.05.19
        // var fs = me.getFormsearch();
        // var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19

        grid.doInit();
        store = grid.getStore().load({
            params: {
                mode_read: 'getdatadoccontract',
                // employee_id: '43620',
                // fromdate: '', //form.down('[name=fromdate]').getRawValue(),
                // untildate: '', //form.down('[name=untildate]').getRawValue(),
                // // added by Michael 2021.05.19
                // projectptid_opsi : '',//projectptid_opsi
                // // end added by Michael 2021.05.19
            },
            callback: function (data, model) {
                // console.log(data);
                // console.log(model);
                grid.attachModel(model);
                grid.store.sort({property: 'date', direction: 'ASC'});
            }
        });
    },

    //added by anas 15012024 | untuk menampilkan combobox quearterly
    contractreviewChange: function() {
        // console.log("change review checklist");
        var me = this;

        var form = me.getFormdatadetail();   
        var dataForm = form.getForm().getValues();

        var is_pmcontract = dataForm["is_pmcontract"]; 

        if(is_pmcontract == 1)
        {
            form.down("[name=from_quarterly]").show();            
        }
        else
        {
            form.down("[name=from_quarterly]").setValue('');
            form.down("[name=from_quarterly]").hide();  
        }

    },

    //added by anas 15012024 | untuk menampilkan combobox quearterly
    periodereloadChange: function() {
        // console.log("change periodereloadChange");
        var me = this;

        var formdata = me.getFormdata();   
        var form = me.getFormapplytodoc();   
        var dataForm = form.getForm().getValues();

        var periode = dataForm["periode"]; 

        form.down("[name=gridapprovalcontract]").hide(); 

        // console.log(formdata);
        var employee_id = formdata.down('[name=employee_id]').getRawValue();
        var used_pmcontract = formdata.down('[name=used_pmcontract]').getRawValue();

        if(periode != '' && used_pmcontract == 1)
        {             
            form.down("[name=gridapprovalcontract]").show();  
            grid = me.getGridapprovalcontract();

            grid.doInit();
            store = grid.getStore().load({
                params: {
                    mode_read: 'getdataapprovalcontract',
                    periode: periode,
                    employee_id: formdata.down('[name=employee_id]').getRawValue(),
                    // fromdate: '', //formdata.down('[name=fromdate]').getRawValue(),
                    // untildate: '', //form.down('[name=untildate]').getRawValue(),
                    // // added by Michael 2021.05.19
                    // projectptid_opsi : '',//projectptid_opsi
                    // // end added by Michael 2021.05.19
                },
                callback: function (data, model) {
                    // console.log(data);

                    if(data != null && data.length > 0)
                    {
                        grid.attachModel(model);
                        grid.store.sort({property: 'date', direction: 'ASC'});
                    }

                    
                }
            });         
        }
    },


    //added by anas 15012024 | untuk reload approval contract
    applyToDocContract: function () {
        // console.log("func applyToDocContract");
        //save data to table employee
        var me, form, formapp;
        me = this;
        form = me.getFormdata();
        formapp = me.getFormapplytodoc();
        me.dr.formMask(form);       

        me.tools.ajax({
            params: {
                'employee_id': form.down("[name=employee_id]").getValue(),
                'periode': formapp.down("[name=periode]").getValue(),
            },
            success: function (data, model) {

                // console.log(data);

                var is_submit = 0;
                var is_close = 0;

                if(data.length > 0)
                {
                    is_submit = data[0]["pmcontract"]["is_submit"] === undefined ? is_submit : data[0]["pmcontract"]["is_submit"];
                    is_close = data[0]["pmcontract"]["is_close"] === undefined ? is_close : data[0]["pmcontract"]["is_close"];

                    if(is_submit == 1 && is_close == 0)
                    {
                        Ext.Msg.show({
                            title: 'Reload Approval Matrix',
                            msg: "Contract document already submit by IS, are you sure want to reload with new setting?",
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
                                    // console.log("YESSSS");
                                    me.reloadapprovalContract();

                                } else {
                                    // console.log("NOOOOO");
                                    me.clearParam();
                                   // me.getFormdata().up('window').close();
                                }
                            },
                            icon: Ext.Msg.QUESTION
                        });

                    }
                    else if(is_close == 0){
                        me.reloadapprovalContract();
                    }
                }
                
            }
        }).read('getdatapmcontract');
        

    },

    //added by anas 15012024 | untuk reload approval contract
    reloadapprovalContract: function () {
        // console.log("reloadapprovalContract");

        var me, form, formapp;
        me = this;
        form = me.getFormdata();
        formapp = me.getFormapplytodoc();
        me.dr.formMask(form);  
        me.tools.ajax({
            params: {
                'employee_id': form.down("[name=employee_id]").getValue(),
                'periode': formapp.down("[name=periode]").getValue(),
            },
            success: function (data, model) {
                // console.log(data);

                // console.log(data['others'][0]);
                // console.log(data['others'][0][0]);
                var hasil = data['others'][0][0]["HASIL"];

                if(hasil == 0)
                {
                    Ext.Msg.show({
                        title: 'Error',
                        msg: data['others'][0][0]["MSG"],
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });

                    me.clearParam();
                    me.dr.formUnmask(form);
                    me.getFormapplytodoc().up('window').close();
                }
                else{
                    me.clearParam();
                    me.dr.buildSuccessAlert('Success..');
                    me.dr.formUnmask(form);
                    me.dr.formClose(form);
                    me.getFormapplytodoc().up('window').close();
                    //me.getGrid().getStore().reload();
                    me.loadPageAndFocus();
                }
            }
        }).read('applytodoccontract');
    }

});