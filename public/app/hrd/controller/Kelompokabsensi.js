Ext.define('Hrd.controller.Kelompokabsensi', {
    extend: 'Hrd.library.box.controller.Controller',
    alias: 'controller.Kelompokabsensi',
    requires: [
        'Hrd.library.box.tools.Tools',
        'Hrd.library.box.tools.DefaultConfig',
        'Hrd.library.box.tools.EventSelector',
        'Hrd.library.Box.Tools.Browse',
        'Hrd.library.box.tools.Dynamicrequest'
    ],
    controllerName: 'kelompokabsensi',
    fieldName: 'kelompokabsensi_id',
    bindPrefixName: 'Kelompokabsensi',
    formWidth: 800,
    header_id: 0,
    oldbobot:0,
    dynamicrequest: null,
    mainDataSavefromadddetail : false,
    localStore: {},
    refs: [
        {
            ref: 'griddetail',
            selector: 'kelompokabsensigriddetail'
        },
        {
            ref: 'formdetail',
            selector: 'kelompokabsensiformdatadetail'
        },
        {
            ref: 'gridlookupe',
            selector: 'lookupkelompokabsensigrid'
        },
        {
            ref: 'formsearchlookupe',
            selector: 'lookupkelompokabsensiformsearch'
        },

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

        //lookup_employee
        newEvs['#kelompokabsensiLookup lookupkelompokabsensigrid button[action=select]'] = {
            click: function () {
                me.selectEmployee();
            }
        };

        /* start event for grid detail */
        newEvs['kelompokabsensigriddetail toolbar button[action=addDetail]'] = {
            click: function() {
                var me,form;
                me = this;
                me.mainDataSavefromadddetail = true;
                me.mainDataSave();
            }

        };
        newEvs['kelompokabsensigriddetail button[action=deleteDetail]'] = {
            click: function () {
		me.deleteDetail();
            }
        };

        newEvs['kelompokabsensigriddetail'] = {
            selectionchange: me.gridDetailSelectionChange
        };
        
        newEvs['kelompokabsensigriddetail actioncolumn'] = {
            click: this.gridDetailActionColumnClick
        }
        /* end event for grid detail */

        newEvs['lookupkelompokabsensiformsearch'] = {
            afterrender: function () {
                var me,form;
                me = this;

                f = me.getFormsearchlookupe();
                me.tools.ajax({
                        params: {
                        },
                        success: function(data, model) {
                                me.tools.wesea(data.department, f.down("[name=department_id]")).comboBox();
                        }
                }).read('parameter');
                
            },

        };

        newEvs['lookupkelompokabsensiformsearch button[action=search]'] = {
            click: function () {
				this.lookupEmployee();
            }
        };
        newEvs['lookupkelompokabsensiformsearch button[action=reset]'] = {
            click: function () {
               form = me.getFormsearchlookupe().getForm().reset();
			   this.lookupEmployee();
            }
        };

        /* start event for form detail */
		this.control(newEvs);
    },

    addDetail: function (state) {
        var me = this;
        var window = me.instantWindow("Panel", 900, "Employee", "create", "kelompokabsensiLookup", "lookup.kelompokabsensi", {
                itemId: me.controllerName + 'employee'
        });

        f = me.getFormsearchlookupe();
        this.lookupEmployee();

    },
    
    deleteDetail: function () {
        var me = this;
        var gd = me.getGriddetail();	
        var s  = gd.getStore();	
        var err = 0;
        Ext.Msg.confirm('Delete Data', 'Delete Record(s)?', function (btn) {
            if (btn == 'yes') {
                gd.setLoading(true);
                
                rows = gd.getSelectionModel().getSelection();
                for (var i = 0; i < rows.length; i++) {
                        var index = s.indexOf(rows[i]);
                        var rec = s.getAt(index);

                        me.tools.ajax({
                            params: {
                                employee_id : rec.get('employee_id'),
                                kelompokabsensi_id : me.getFormdata().down("[name=kelompokabsensi_id]").getValue()
                            },
                            success: function (data, model) {
                                //console.log(data.others[0][0]['HASIL']);
                                var hasil = data.others[0][0]['HASIL'][0][0]['result'];
                                if(hasil >= 1){
                                    
                                } else {
                                        err = 1
                                        me.tools.alert.warning("Problem when save data");
                                }

                            }
                        }).read('deletedetail');
                }	
                
                if(err == 0) {
                    
                    for (var i = 0; i < rows.length; i++) {
                            var index = s.indexOf(rows[i]);
                            var rec = s.getAt(index);

                            rec.beginEdit();
                            rec.set({
                                deleted: true
                            });
                            rec.endEdit();
                            rec.commit();

                    }

                    gd.getStore().filterBy(function (rec, id) {
                        if (rec.data.deleted === true) {
                            return false;
                        } else {
                            return true;
                        }
                    });
                    
                }
                
                gd.setLoading(false);
            }
        })
    },

    lookupEmployee: function(){
            var me, form, department_id, grid, vs;
            me = this;
            form = me.getFormsearchlookupe();

            var vs = form.getValues();
            
            if(vs['employee_nik'] == null){
               employee_nik = 0;
            } else {
               employee_nik = vs['employee_nik'];
            }

            if(vs['employee_name']==null){
               employee_name = 0;
            }else{
               employee_name = vs['employee_name'];
            }

            if(vs['department_id']==null){
               department_id = 0;
            }else{
               department_id = vs['department_id'];
            }

            grid = me.getGridlookupe();
            grid.setLoading("Please wait...");
            var kelompokabsensi_id = me.getFormdata().down("[name=kelompokabsensi_id]").getValue();
            me.tools.ajax({
                    params: {
                            'kelompokabsensi_id':kelompokabsensi_id,
                            'employee_nik': employee_nik,
                            'employee_name': employee_name,
                            'department_id': department_id
                    },
                    success: function(data, model) {
                            me.tools.wesea({data: data, model: model}, grid).grid();
                            grid.setLoading(false);
                    }
            }).read('employeelist');
    },

    gridDetailActionColumnClick: function (view, cell, row, col, e) {
        var pd;
        var me = this;
        var gr = me.getGriddetail();
        var record = gr.getStore().getAt(row);
        var m = e.getTarget().className.match(/\bact-(\w+)\b/);
        gr.getSelectionModel().select(row);
        //pd = me.paramdetail;
        //pd.rowdata = record;

        if (m) {
            switch (m[1]) {
                case 'destroy':
                    var rec = gr.getSelectedRecord();
                    if (rec) {
                        me.tools.ajax({
                            params: {
                                employee_id : rec.data.employee_id,
                                kelompokabsensi_id : me.getFormdata().down("[name=kelompokabsensi_id]").getValue()
                            },
                            success: function (data, model) {
                                //console.log(data.others[0][0]['HASIL']);
                                var hasil = data.others[0][0]['HASIL'][0][0]['result'];
                                console.log(hasil)
                                if(hasil >= 1){

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
                                        
                                } else {
                                        me.tools.alert.warning("Problem when save data");
                                }

                            }
                        }).read('deletedetail');
                    
                        
                    }
                    break;
            }
        }
    },
    fdar: function () {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();

        me.getGriddetail().getStore().removeAll();
        
        me.setActiveForm(f);
        f.setLoading(false);

        var x = {
            init: function () {

            },
            create: function () {
                me.unMask(1);
                var gd = me.getGriddetail();
                gd.doInit();
                var store = gd.getStore().load({
                    params: {
                        mode_read: 'kelompokabsensidetaillist',
                        kelompokabsensi_id: 0
                    },
                    callback: function (data, model) {
                        gd.attachModel(model);
                    }
                });

            },
            update: function () {
                me.unMask(1);

				var g = me.getGrid();
				var rec = g.getSelectedRecord();
				if (rec) {
					f.editedRow = g.getSelectedRow();
					f.loadRecord(rec);
					var headerId = rec.data.kelompokabsensi_id;
					me.header_id = rec.data.kelompokabsensi_id;
					var projectId = rec.data.project_id;
					var gd = me.getGriddetail();
					gd.doInit();
					gd.bindPrefixName = me.controllerName;
					gd.doLoad({mode_read: 'updatedetail', kelompokabsensi_id: headerId}, function () {
						gd.getStore().clearFilter(true);
					});
				}

            }
        };

        return x;
    },
    mainDataSave: function () {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        var s = g.getStore();
        var row = f.editedRow;
        var vs = f.getValues();
        var page = 1;

        var name = me.getFormdata().down("[name=name]").getValue();
        var kelompokabsensi_id = me.getFormdata().down("[name=kelompokabsensi_id]").getValue();
        if(name === ''){
            me.tools.alert.warning("Name is required");
            return false;
        }
        me.tools.ajax({
            params: vs,
            success: function (data, model) {
                var hasil = data.others[0][0]['HASIL'][0].length;
                if(hasil > 0){
                    me.tools.alert.warning("Problem when save data : 'Name already exists'");
                } else {
                       
                    me.tools.ajax({
                            params: vs,
                            success: function (data, model) {
                                    var hasil = data.others[0][0]['HASIL'];
                                    if(hasil >= 1){
                                        if (kelompokabsensi_id == ''){
                                            // kalau dalam posisi create, nilai variable hasil adalah id kelompokabsensi
                                            me.getFormdata().down("[name=kelompokabsensi_id]").setValue(hasil);
                                            s.reload();
                                        }
                                        var grid = me.getGriddetail();
                                        var store = grid.getStore();
                                        if(store.getCount() == 0 || me.mainDataSavefromadddetail){
                                            me.mainDataSavefromadddetail = false;
                                            me.addDetail('create');
                                        } else {                                 
                                            
                                            me.tools.alert.info("Data saved succesfully");
                                            f.up('window').close();
                                            me.getGrid().getStore().reload();
                                        }
                                    } else {
                                            me.tools.alert.warning("Problem when save data");
                                    }

                            }
                    }).read('saveheader');
                }

            }
        }).read('dataexist');

    },
    /*
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
                    }
                }).read('formdetail');
                break;
            case 'update':
                me.tools.ajax({
                    params: {},
                    success: function (data, model) {
                        formdetail.loadRecord(pd.rowdata);
                    }
                }).read('formdetail');
                break;

        }
    },
    paramdetail: {
        //start formgeneate
        fromlocation: 'Hrd.view.kelompokabsensi.FormDataDetail',
        formtitle: 'Form Detail', formicon: 'icon-form-add',
        formid: 'win-kelompokabsensiformdatadetail', formlayout: 'fit',
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
                    record.data['rating'] == row.rating

                    )
            {
                checkdata = true;
            }
        });
        return checkdata;

    },*/
    gridDetailSelectionChange: function() {
            var me = this;
            var grid = me.getGriddetail(), row = grid.getSelectionModel().getSelection();
            var checkuncheckall = grid.down('#checkuncheckall');
            var btnDeleteDetail = grid.down('#btnDeleteDetail');

            if (checkuncheckall !== null) {
                    checkuncheckall.setDisabled(row.length < 1);
            }
            if (btnDeleteDetail !== null) {
                    btnDeleteDetail.setDisabled(row.length < 1);
            }

    }, 
    selectEmployee: function () {
        var me, grid, rows, data, row, counter, countarray, act_name, fields, kelompokabsensi_id;
        me = this;
        grid = me.getGridlookupe();
        rows = grid.getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected..!');
            return;
        } else {

                var p = grid.up("window").down("panel");
                p.setLoading("Please wait...");

                countarray 	= rows.length;
                counter 	= 0;
        	kelompokabsensi_id = me.getFormdata().down("[name=kelompokabsensi_id]").getValue();

		for (var i = 0; i < rows.length; i++) {

                    //data["details"] = me.getGriddetail().getJson();
                    me.tools.ajax({
                            params: {
                                'kelompokabsensi_id': kelompokabsensi_id,
                                'employee_id'	: rows[i]['data'].employee_id
                            },
                            success: function (data, model) {
                                counter++;
                                if (countarray == counter) {

                                    var detailGrid = me.getGriddetail();
                                    detailGrid.doInit();
                                    detailGrid.getStore().load({
                                            params: {
                                                'kelompokabsensi_id': kelompokabsensi_id,
                                            },
                                            callback: function (recs, op) {
                                                    detailGrid.attachModel(op);
                                                    grid.up("window").close();
                                                    p.setLoading(false);

                                            }
                                    });
                                }
                            }
                    }).read('selectemployee');

                }

        }
	},

});