Ext.define('Hrd.controller.Packagemanagement', {
    extend: 'Hrd.library.box.controller.Controller',
    alias: 'controller.Packagemanagement',
    requires: [
        'Hrd.library.box.tools.Tools',
        'Hrd.library.box.tools.DefaultConfig',
        'Hrd.library.box.tools.EventSelector',
        'Hrd.library.Box.Tools.Browse',
        'Hrd.library.box.tools.Dynamicrequest',
    ],
    controllerName: 'packagemanagement',
    fieldName: 'pmdocument_id',
    bindPrefixName: 'Packagemanagement',
    formWidth: 800,
    header_id: 0,
    oldbobot:0,	
    dynamicrequest: null,
    localStore: {},
    refs: [
        {
            ref: 'griddetail',
            selector: 'packagemanagementgriddetail'
        },
        {
            ref: 'formdetail',
            selector: 'packagemanagementformdatadetail'
        }

    ],
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
        me.dynamicrequest = new Hrd.library.box.tools.Dynamicrequest();
        var newEvs = {};


        /* start event for grid detail */
        newEvs['packagemanagementgriddetail toolbar button[action=create] '] = {
            click: function () {
                var me;
                me = this;
                me.paramdetail.stateform = 'create';
                me.dynamicrequest.GenerateFormdata(me.paramdetail);

            }
        }

        newEvs['packagemanagementgriddetail actioncolumn'] = {
            click: this.gridDetailActionColumnClick
        }
        /* end event for grid detail */

        /* start event for form detail */
        newEvs['packagemanagementformdatadetail'] = {
            afterrender: function () {
                var me;
                me = this;
                me.fdardetail();
            }
        }
        newEvs['packagemanagementformdatadetail button[action=save]'] = {
            click: function () {
                var me;
                me = this;
                me.saveDetailtoStore();
            }
        }
        /* end event for form detail */

        /* start for approve or reject action */
        newEvs['packagemanagementformdata toolbar button[action=approve] '] = {
            click: function () {
                this.Approvedata();
            }
        }
        newEvs['packagemanagementformdata toolbar button[action=reject] '] = {
            click: function () {
                this.Rejectdata();
            }
        }

        /* end for approve or reject action */



        this.control(newEvs);
    },
	
    gridDetailActionColumnClick: function (view, cell, row, col, e) {
        var pd;
        var me = this;
        var gr = me.getGriddetail();
        var record = gr.getStore().getAt(row);
        var m = e.getTarget().className.match(/\bact-(\w+)\b/);
        gr.getSelectionModel().select(row);
        pd = me.paramdetail;
        pd.rowdata = record;

        if (m) {
            switch (m[1]) {
                case 'update':
                    me.paramdetail.stateform = 'update';
                    me.dynamicrequest.GenerateFormdata(me.paramdetail);
                    break;
                case 'destroy':
                    var rec = gr.getSelectedRecord();
		    var pengurangbobot  = rec.data.bobot;
                    me.oldbobot = parseFloat(me.oldbobot) - parseFloat(pengurangbobot);	

                    if (rec) {
                        rec.beginEdit();
                        rec.set({
                            deleted: true
                        });
                        rec.endEdit();
                        gr.getStore().filterBy(function (rec, id) {
                            if (rec.data.deleted === true) {
                                return false;
                            } else {
                                return true;
                            }
                        });
                    }
                    break;
            }
        }
    },
    fdar: function () {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();

        me.setActiveForm(f);
        f.setLoading(false);
        ;
        var x = {
            init: function () {

            },
            create: function () {
                me.unMask(1);
                var gd = me.getGriddetail();
                gd.doInit();
                var store = gd.getStore().load({
                    params: {
                        mode_read: 'packagemanagementdetaillist',
                        pmdocument_id: 0
                    },
                    callback: function (data, model) {
                        gd.attachModel(model);
                    }
                });
                /* hide button reject and approve */
                me.hideotherButton(f, true);
            },
            update: function () {
                me.unMask(1);
				
				var g = me.getGrid();
				var rec = g.getSelectedRecord();
				if (rec) {
					f.editedRow = g.getSelectedRow();
					f.loadRecord(rec);
					var headerId = rec.data.pmdocument_id;
					me.header_id = rec.data.pmdocument_id;
					var projectId = rec.data.project_id;
					var ptId = rec.data.pt_id;
					var gd = me.getGriddetail();
					me.checkStatusApprove(f);
					gd.doInit();
					gd.bindPrefixName = me.controllerName;
					gd.doLoad({mode_read: 'updatedetail', pmdocument_id: headerId}, function () {
						gd.getStore().clearFilter(true);
					});
				}
				
				// check approve
				me.tools.ajax({
                    params: {},
                    success: function (data, model) {
						var validapprove = data.others[0][0]['VALIDAPPROVE'];
						//console.log(data.others[0][0]['VALIDAPPROVE']);
						if(validapprove == true){
							f.down("[action=approve]").show();
							f.down("[action=reject]").show();
						} else {
							f.down("[action=approve]").hide();
							f.down("[action=reject]").hide();
						}
                    }
                }).read('checkapproval');
				/*
                me.tools.ajax({
                    params: {},
                    success: function (data, model) {
                        var g = me.getGrid();
                        var rec = g.getSelectedRecord();
                        if (rec) {
                            f.editedRow = g.getSelectedRow();
                            f.loadRecord(rec);
                            var headerId = rec.data.pmdocument_id;
                            me.header_id = rec.data.pmdocument_id;
                            var projectId = rec.data.project_id;
                            var ptId = rec.data.pt_id;
                            var gd = me.getGriddetail();
                            me.checkStatusApprove(f, rec.data.group_id_login, rec.data.group_id_globalparam);
                            gd.doInit();
                            gd.bindPrefixName = me.controllerName;
                            gd.doLoad({mode_read: 'updatedetail', pmdocument_id: headerId}, function () {
                                gd.getStore().clearFilter(true);
                            });
                        }
                    }
                }).read('headerdata');
				*/
            }
        };

        return x;
    },
    fdardetail: function () {
        var me, formheader, formdetail, stateheader, statedetail, pd;
        me = this;
        formheader = me.getFormdata();
        formdetail = me.getFormdetail();
        stateheader = formheader.up('window').state.toLowerCase();
        statedetail = formdetail.up('window').state.toLowerCase();
        pd = me.paramdetail;

        switch (statedetail) {
            case 'create':
                me.tools.ajax({
                    params: {},
                    success: function (data, model) {
                        me.tools.wesea(data.jenisdokumen, formdetail.down("[name=jenisdocument_id]")).comboBox();
                    }
                }).read('formdetail');
                break;
            case 'update':
                me.tools.ajax({
                    params: {},
                    success: function (data, model) {
                        me.tools.wesea(data.jenisdokumen, formdetail.down("[name=jenisdocument_id]")).comboBox();
                        formdetail.loadRecord(pd.rowdata);			
			me.oldbobot = parseFloat(pd.rowdata.data.bobot);	
                    }
                }).read('formdetail');
                break;

        }
    },
    mainDataSave: function () {
        var me = this;
        var f = me.getFormdata();
        var formdata = f.getForm();
        var g = me.getGrid();
        var s = g.getStore();
        var row = f.editedRow;
        me.getGriddetail().getStore().clearFilter(true);
		
		var gds =me.getGriddetail().getStore();
		
		/// validation
		if(gds.getCount()==0){
			me.tools.alert.warning("Detail is required");
			return;
		}else{
			var totalPersen = 0;
			for(var i=0;i<gds.getCount();i++){
				totalPersen += me.tools.floatval(gds.getAt(i).get("bobot"));
			}
			if(totalPersen != 100){
				me.tools.alert.warning("Total bobot must be 100% !");
				return;
			}
		}
		
		//console.log(formdata.isValid());
		
        if (formdata.isValid()) {
            me.insSave({
                form: f,
                grid: g,
                finalData: function (data) {
                    data["details"] = me.getGriddetail().getJson();
                    return data;
                },
                sync: true,
                callback: {
                    create: function (store, form, grid) {

                    }
                }
            });
        }


    },
    paramdetail: {
        //start formgeneate
        fromlocation: 'Hrd.view.packagemanagement.FormDataDetail',
        formtitle: 'Form Detail Document', formicon: 'icon-form-add',
        formid: 'win-packagemanagementformdatadetail', formlayout: 'fit',
        formshadow: 'frame', formmask: 'Loading...',
        formwidth: 600, formtimeout: 0,
        stateform: null, formaction: null, formproperties: null, formwindows: null,
        //end formgeneate

        //start properties form
        iddetail: 0, store: null, data: null, record: null, grid: null, row: null, form: null,
        checkdata: false, object: null, rowdata: null, action: null, counter: 0,
        //start properties form
    },
    Checkdatadetail: function (store, row) {
        var me, status, checkdata;
        me = this;
        checkdata = false;
        store.each(function (record)
        {

            if (
                    record.data['jenisdokumen_code'] == row.jenisdokumen_code

                    )
            {
                checkdata = true;
            }
        });
        return checkdata;

    },
    saveDetailtoStore: function () {
        var me, form, formdata, grid, store, record, row, checkdata, state, jenisdokumen,percent,checkpercent;
        me = this;
        form = me.getFormdetail();
        formdata = form.getForm();
        state = me.getFormdetail().up('window').state.toLowerCase();

        if (formdata.isValid()) {
            grid = me.getGriddetail();
            grid.doInit();
            store = grid.getStore();
            jenisdokumen = form.down("[name=jenisdocument_id]").valueModels[0].raw;
            row = formdata.getValues();
            row['jenisdokumen_code'] = jenisdokumen.code;
            row['jenisdokumen_description'] = jenisdokumen.description;
	    row['bobot'] = parseFloat(row.bobot);
            checkdata = me.Checkdatadetail(store, row);

	    percent = parseFloat(store.sum('bobot'));	

	    if (state == 'create') {
                checkpercent = percent+parseFloat(form.down('[name=bobot]').getValue());
            } else {
                var calculate = (percent-parseFloat(me.oldbobot));  
                checkpercent = parseFloat(calculate)+parseFloat(form.down('[name=bobot]').getValue());
            }  	   

		
	    console.log(state);
            console.log(store.sum('bobot'));
            console.log(me.oldbobot);
            console.log(percent);
            console.log(checkpercent);
     		 	



            if (checkpercent > 100) {
                me.dynamicrequest.buildWarningAlert("Bobot tidak boleh melebihi 100%");
            } else {
                switch (state) {
                    case 'create':
                        if (checkdata == false) {
                            store.add(row);
                            store.commitChanges();
                        } else {
                            me.dynamicrequest.buildWarningAlert("Sorry data already exist in this grid");
                        }
                        break;
                    case 'update':
                        record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                        record.beginEdit();
                        record.set(row);
                        record.endEdit();
                        store.commitChanges();
                        break;

                }
                me.getFormdetail().up('window').close();
            }
        }
    },
    hideotherButton: function (form, status) {
        this.dynamicrequest.hideBtn(form, 'approve', status);
        this.dynamicrequest.hideBtn(form, 'reject', status);
    },
    checkStatusApprove: function (form) {
        var me, approve, reject, record;
        me = this;
        /* KONDISI DI SINI BERKAITAN DENGAN GLOBAL PARAMETER DI DATABASE HRD UNTUK PACKAGE DOCUMENT */
        me.tools.ajax({
            params: {
                'pmdocument_id': me.header_id
            },
            success: function (data, model) {
                record = data.others[0][0].SUCCESS[1][0];
                approve = Boolean(record.is_approve);
                reject = Boolean(record.is_reject);
				if (approve == false && reject == true) {
					me.dynamicrequest.hideBtn(form, 'approve', false);
					me.dynamicrequest.hideBtn(form, 'reject', true);
				} else if (approve == true && reject == false) {
					me.dynamicrequest.hideBtn(form, 'approve', true);
					me.dynamicrequest.hideBtn(form, 'reject', false);
				} else if (approve == false && reject == false) {
					me.dynamicrequest.hideBtn(form, 'approve', false);
					me.dynamicrequest.hideBtn(form, 'reject', false);
				}
            }
        }).read('maindata');

    },/*
    checkStatusApprove: function (form, group_id_login, group_id_globalparam) {
        var me, approve, reject, record;
        me = this;
        // KONDISI DI SINI BERKAITAN DENGAN GLOBAL PARAMETER DI DATABASE HRD UNTUK PACKAGE DOCUMENT 
        me.tools.ajax({
            params: {
                'pmdocument_id': me.header_id
            },
            success: function (data, model) {
                record = data.others[0][0].SUCCESS[1][0];
                approve = Boolean(record.is_approve);
                reject = Boolean(record.is_reject);

                if (group_id_login == group_id_globalparam) {

                    if (approve == false && reject == true) {
                        me.dynamicrequest.hideBtn(form, 'approve', false);
                        me.dynamicrequest.hideBtn(form, 'reject', true);
                    } else if (approve == true && reject == false) {
                        me.dynamicrequest.hideBtn(form, 'approve', true);
                        me.dynamicrequest.hideBtn(form, 'reject', false);
                    } else if (approve == false && reject == false) {
                        me.dynamicrequest.hideBtn(form, 'approve', false);
                        me.dynamicrequest.hideBtn(form, 'reject', false);
                    }

                } else {
                    me.hideotherButton(form, true);
                }
            }
        }).read('maindata');

    },*/
    Approvedata: function () {
        var me, form;
        me = this;
        form = me.getFormdata();
        me.dynamicrequest.formMask(form);
        me.tools.ajax({
            params: {
                'pmdocument_id': me.header_id
            },
            success: function (data, model) {
                me.dynamicrequest.buildSuccessAlert('Data success approval');
                me.dynamicrequest.formUnmask(form);
                me.dynamicrequest.formClose(form);
                me.getGrid().getStore().reload();
            }
        }).read('approveData');
    },
    Rejectdata: function () {
        var me, form;
        me = this;
        form = me.getFormdata();
        me.dynamicrequest.formMask(form);
        me.tools.ajax({
            params: {
                'pmdocument_id': me.header_id
            },
            success: function (data, model) {
                me.dynamicrequest.buildSuccessAlert('Data success rejected');
                me.dynamicrequest.formUnmask(form);
                me.dynamicrequest.formClose(form);
                me.getGrid().getStore().reload();
            }
        }).read('rejectData');

    },
});