Ext.define('Hrd.controller.Scoringbsc', {
    extend: 'Hrd.library.box.controller.Controller',
    alias: 'controller.Scoringbsc',
    requires: [
        'Hrd.library.box.tools.Tools',
        'Hrd.library.box.tools.DefaultConfig',
        'Hrd.library.box.tools.EventSelector',
        'Hrd.library.Box.Tools.Browse',
        'Hrd.library.box.tools.Dynamicrequest',
    ],
    controllerName: 'scoringbsc',
    fieldName: 'scoringbsc_id',
    bindPrefixName: 'Scoringbsc',
    formWidth: 800,
    header_id: 0,
    oldbobot:0,	
    dynamicrequest: null,
    localStore: {},
    refs: [
        {
            ref: 'griddetail',
            selector: 'scoringbscgriddetail'
        },
        {
            ref: 'formdetail',
            selector: 'scoringbscformdatadetail'
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
        newEvs['scoringbscgriddetail toolbar button[action=create] '] = {
            click: function () {
                var me;
                me = this;
                me.paramdetail.stateform = 'create';
                me.dynamicrequest.GenerateFormdata(me.paramdetail);

            }
        }

        newEvs['scoringbscgriddetail actioncolumn'] = {
            click: this.gridDetailActionColumnClick
        }
        /* end event for grid detail */

        /* start event for form detail */
        newEvs['scoringbscformdatadetail'] = {
            afterrender: function () {
                var me;
                me = this;
                me.fdardetail();
            }
        }
        newEvs['scoringbscformdatadetail button[action=save]'] = {
            click: function () {
                var me;
                me = this;
                me.saveDetailtoStore();
            }
        }
        newEvs['scoringbscformdatadetail [name=batas_atas]'] = {
            change: function() {
                me.batasOnChange();
            }

        }
        newEvs['scoringbscformdatadetail [name=batas_bawah]'] = {
            change: function() {
                me.batasOnChange();
            }

        }
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
										
					me.paramdetail.rowdata.get('rating') == '' ? me.paramdetail.rowdata.set('rating', 0) : '';
					me.paramdetail.rowdata.get('batas_bawah') == '' ? me.paramdetail.rowdata.set('batas_bawah', 0) : '';
					me.paramdetail.rowdata.get('batas_atas') == '' ? me.paramdetail.rowdata.set('batas_atas', 0) : '';
					me.paramdetail.rowdata.get('interval') == '' ? me.paramdetail.rowdata.set('interval', 0) : '';
												
                    me.dynamicrequest.GenerateFormdata(me.paramdetail);
                    break;
                case 'destroy':
                    var rec = gr.getSelectedRecord();
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
        
        var x = {
            init: function () {

            },
            create: function () {
                me.unMask(1);
                var gd = me.getGriddetail();
                gd.doInit();
                var store = gd.getStore().load({
                    params: {
                        mode_read: 'scoringbscdetaillist',
                        scoringbsc_id: 0
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
					var headerId = rec.data.scoringbsc_id;
					me.header_id = rec.data.scoringbsc_id;
					var projectId = rec.data.project_id;
					var gd = me.getGriddetail();
					gd.doInit();
					gd.bindPrefixName = me.controllerName;
					gd.doLoad({mode_read: 'updatedetail', scoringbsc_id: headerId}, function () {
						gd.getStore().clearFilter(true);
					});
				}
				
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
        fromlocation: 'Hrd.view.scoringbsc.FormDataDetail',
        formtitle: 'Form Detail', formicon: 'icon-form-add',
        formid: 'win-scoringbscformdatadetail', formlayout: 'fit',
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

    },
    saveDetailtoStore: function () {
        var me, form, formdata, grid, store, record, row, checkdata, state;
        me = this;
        form = me.getFormdetail();
        formdata = form.getForm();
        state = me.getFormdetail().up('window').state.toLowerCase();

        if (formdata.isValid()) {
            grid = me.getGriddetail();
            grid.doInit();
            store = grid.getStore();
            row = formdata.getValues();
	    	row['rating'] = parseFloat(row.rating);
	    	row['batas_bawah'] = parseFloat(row.batas_bawah);
	    	row['batas_atas'] = parseFloat(row.batas_atas);
	    	row['interval'] = parseFloat(row.interval);
	    	row['rating_range'] = row.rating_range;
            checkdata = me.Checkdatadetail(store, row);
			
			/*
		    console.log(state);
            console.log(store.sum('bobot'));
            console.log(me.oldbobot);
            console.log(percent);
            console.log(checkpercent);
     		 */
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
    },
    batasOnChange: function() {
        var me = this;
        var f = me.getFormdetail();
        var vs = f.getForm().getValues();
		var batas_bawah = vs["batas_bawah"];
		var batas_atas = vs["batas_atas"];
		if(batas_bawah != undefined){
			var interval = parseFloat(batas_atas) - parseFloat(batas_bawah) + 1;
			f.down("[name=interval]").setValue(interval);
		}
	}

});