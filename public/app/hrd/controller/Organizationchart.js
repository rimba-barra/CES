Ext.define('Hrd.controller.Organizationchart', {
    extend: 'Hrd.library.box.controller.Controller',
    alias: 'controller.Organizationchart',
    requires: [
        'Hrd.library.box.tools.Tools',
        'Hrd.library.box.tools.DefaultConfig',
        'Hrd.library.box.tools.EventSelector',
        'Hrd.library.Box.Tools.Browse',
        'Hrd.library.box.tools.Dynamicrequest'
    ],
    controllerName: 'organizationchart',
    fieldName: 'organizationchart_id',
    bindPrefixName: 'Organizationchart',
    formWidth: 800,
    header_id: 0,
    oldbobot:0,
    dynamicrequest: null,
    mainDataSavefromadddetail : false,
    localStore: {},
    refs: [
        {
            ref: 'griddetail',
            selector: 'organizationchartgriddetail'
        },
        {
            ref: 'formdetail',
            selector: 'organizationchartformdatadetail'
        },
        {
            ref: 'gridlookupe',
            selector: 'lookuporganizationchartgrid'
        },
        {
            ref: 'gridlookupp',
            selector: 'lookuporganizationchartparentgrid'
        },
        {
            ref: 'formsearchlookupe',
            selector: 'lookuporganizationchartformsearch'
        },
        {
            ref: 'formdataformnode',
            selector: 'organizationchartformnode'
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

        //lookup_position
        newEvs['#organizationchartLookup lookuporganizationchartgrid button[action=select]'] = {
            click: function () {
                me.selectPosition();
            }
        };
        newEvs['#organizationchartLookup lookuporganizationchartgrid'] = {
            itemdblclick: function () {
                me.selectPosition();
            }
        };
        
        newEvs['#organizationchartParentLookup lookuporganizationchartparentgrid button[action=select]'] = {
            click: function () {
                me.selectParent();
            }
        };
        newEvs['#organizationchartParentLookup lookuporganizationchartparentgrid'] = {
            itemdblclick: function () {
                me.selectParent();
            }
        };

        /* start event for grid detail */
//        newEvs['organizationchartgriddetail toolbar button[action=addDetail]'] = {
//            click: function() {
//                var me,form;
//                me = this;
//                me.mainDataSavefromadddetail = true;
//                me.mainDataSave();
//            }
//
//        };
        newEvs['organizationchartgriddetail button[action=deleteDetail]'] = {
            click: function () {
		me.deleteDetail();
            }
        };

        newEvs['organizationchartgriddetail'] = {
            selectionchange: me.gridDetailSelectionChange
        };
        
        newEvs['organizationchartgriddetail actioncolumn'] = {
            click: this.gridDetailActionColumnClick
        }
		
        newEvs['organizationchartgriddetail button[action=newNode]'] = {
            click: function () {
                var me,form;
                me = this;
                me.mainDataSavefromadddetail = true;
                me.mainDataSave();
                me.newNode();
            }
        };
        /* end event for grid detail */

        newEvs['lookuporganizationchartformsearch'] = {
            afterrender: function () {
                var me,form;
                me = this;                
            },

        };

        newEvs['lookuporganizationchartformsearch button[action=search]'] = {
            click: function () {
				this.lookupPosition();
            }
        };
        newEvs['lookuporganizationchartformsearch button[action=reset]'] = {
            click: function () {
               form = me.getFormsearchlookupe().getForm().reset();
			   this.lookupPosition();
            }
        };
        
        newEvs['organizationchartformnode button[action=lookupposition]'] = {
            click: function (el, val) {
                me.winPosition();
            }
        };
        
        newEvs['organizationchartformnode button[action=lookupparent]'] = {
            click: function (el, val) {
                me.winParent();
            }
        };
        
        newEvs['organizationchartformnode button[action=save]'] = {
            click: function (el, val) {
                me.detailSave();
            }
        };
        
        newEvs['organizationchartformnode [name=parent_id]'] = {
            select: function() {
                me.mypComboOnSelect("organizationchart", "description");
            }
        };
        			
        newEvs['organizationchartformnode'] = {
            afterrender: function () {
//                var me,form;
//                me = this;
//                var id = me.getFormdata().down("[name=organizationchart_id]").getValue();
//                me = this;                
//                me.tools.ajax({
//                        params: {
//                            id : id
//                        },
//                        success: function(data, model) {
//                                me.tools.wesea(data.organizationchartdetail, f.down("[name=parent_id]")).comboBox();
//                        }
//                }).read('listcb');

            },
           
        };
        /* start event for form detail */
	this.control(newEvs);
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
                                organizationchart_detail_id : rec.data.organizationchart_detail_id
                            },
                            success: function (data, model) {
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

    winPosition: function (state) {
        var me = this;
        var window = me.instantWindow("Panel", 900, "Position", "create", "organizationchartLookup", "lookup.organizationchart", {
                itemId: me.controllerName + 'position'
        });

        f = me.getFormsearchlookupe();
        this.lookupPosition();

    },
    
    lookupPosition: function(){
            var me, form, grid, vs;
            me = this;
            form = me.getFormsearchlookupe();
            var vs = form.getValues();            
            if(vs['description']==null){
               description = 0;
            }else{
               description = vs['description'];
            }

            grid = me.getGridlookupe();
            grid.setLoading("Please wait...");
            var organizationchart_id = me.getFormdata().down("[name=organizationchart_id]").getValue();
            me.tools.ajax({
                    params: {
                            'organizationchart_id':organizationchart_id,
                            'description': description
                    },
                    success: function(data, model) {
                            me.tools.wesea({data: data, model: model}, grid).grid();
                            grid.setLoading(false);
                    }
            }).read('positionlist');
    },


    winParent: function (state) {
        var me = this;
        var window = me.instantWindow("Panel", 900, "Parent", "create", "organizationchartParentLookup", "lookup.organizationchartparent", {
                itemId: me.controllerName + 'parent'
        });
        this.lookupParent();

    },
    
    lookupParent: function(){
            var me, form, grid, vs;
            me = this;

            grid = me.getGridlookupp();
            grid.setLoading("Please wait...");
            var organizationchart_id = me.getFormdata().down("[name=organizationchart_id]").getValue();
            me.tools.ajax({
                    params: {
                            'id':organizationchart_id
                    },
                    success: function(data, model) {
                            me.tools.wesea({data: data, model: model}, grid).grid();
                            grid.setLoading(false);
                    }
            }).read('detaillist');
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
                                organizationchart_detail_id : rec.data.organizationchart_detail_id
                            },
                            success: function (data, model) {
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
                        mode_read: 'organizationchartdetaillist',
                        organizationchart_id: 0
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
                                        console.log('test' + rec.data.organizationchart_id);
					var headerId = rec.data.organizationchart_id;
					me.header_id = rec.data.organizationchart_id;
					var projectId = rec.data.project_id;
					var gd = me.getGriddetail();
					gd.doInit();
					gd.bindPrefixName = me.controllerName;
					gd.doLoad({mode_read: 'detaillist', id: headerId}, function () {
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

        var organizationchart_id = me.getFormdata().down("[name=organizationchart_id]").getValue();                       
        me.tools.ajax({
                params: vs,
                success: function (data, model) {
                        var hasil = data.others[0][0]['HASIL'];
                        console.log(hasil);
                        if(hasil >= 1){
                            if (organizationchart_id == ''){
                                // kalau dalam posisi create, nilai variable hasil adalah id organizationchart
                                me.getFormdata().down("[name=organizationchart_id]").setValue(hasil);
                                s.reload();
                            }
                            var grid = me.getGriddetail();
                            var store = grid.getStore();
                            if(store.getCount() == 0 || me.mainDataSavefromadddetail){
                                me.mainDataSavefromadddetail = false;
                                //me.addDetail('create');
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
        fromlocation: 'Hrd.view.organizationchart.FormDataDetail',
        formtitle: 'Form Detail', formicon: 'icon-form-add',
        formid: 'win-organizationchartformdatadetail', formlayout: 'fit',
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
    /*
    selectPosition: function () {
        var me, grid, rows, data, row, counter, countarray, act_name, fields, organizationchart_id;
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
        	organizationchart_id = me.getFormdata().down("[name=organizationchart_id]").getValue();

		for (var i = 0; i < rows.length; i++) {

                    //data["details"] = me.getGriddetail().getJson();
                    me.tools.ajax({
                            params: {
                                'organizationchart_id': organizationchart_id,
                                'position_id'	: rows[i]['data'].position_id
                            },
                            success: function (data, model) {
                                counter++;
                                if (countarray == counter) {

                                    var detailGrid = me.getGriddetail();
                                    detailGrid.doInit();
                                    detailGrid.getStore().load({
                                            params: {
                                                'organizationchart_id': organizationchart_id,
                                            },
                                            callback: function (recs, op) {
                                                    detailGrid.attachModel(op);
                                                    grid.up("window").close();
                                                    p.setLoading(false);

                                            }
                                    });
                                }
                            }
                    }).read('selectposition');

                }

        }
    },*/
    newNode: function () {
        var me, rows;
        me = this;
        me.formNode.stateform = 'New Node';
        me.dynamicrequest.GenerateFormdata(me.formNode);
    },
    formNode: {
        //start formgeneate
        fromlocation: 'Hrd.view.organizationchart.FormNode',
        formtitle: 'Form', formicon: 'icon-form-node',
        formid: 'win-organizationchartformnode', formlayout: 'fit',
        formshadow: 'frame', formmask: 'Loading...',
        formwidth: 550, formtimeout: 0,
        stateform: null, formaction: null, formproperties: null, formwindows: null,
        //end formgeneate       
    },
    selectPosition: function() {
        var me = this;
        var f = me.getFormdataformnode();
        var g = me.getGridlookupe();
        var rec = g.getSelectedRecord();
        if (rec) {
            f.down("[name=fd_position_id]").setValue(rec.get("position_id"));
	    f.down("[name=fd_position]").setValue(rec.get("position") + ' - ' + rec.get("description"));
            g.up("window").close();
        }
    },
    selectParent: function() {
        var me = this;
        var f = me.getFormdataformnode();
        var g = me.getGridlookupp();
        var rec = g.getSelectedRecord();
        if (rec) {
            f.down("[name=fd_parent_id]").setValue(rec.get("organizationchart_detail_id"));
	    f.down("[name=fd_parentdescription]").setValue(rec.get("position") + ' - ' + rec.get("description"));
            g.up("window").close();
        }
    },
    detailSave: function() {
        var me = this;
        var organizationchart_id = me.getFormdata().down("[name=organizationchart_id]").getValue();
        
        var f = me.getFormdataformnode();
        var position_id = f.down("[name=fd_position_id]").getValue();
        var fd_parent_id = f.down("[name=fd_parent_id]").getValue();
        var fd_order_no = f.down("[name=fd_order_no]").getValue();
        var fd_orglevel = f.down("[name=fd_orglevel]").getValue();
        var fd_isbetween = f.down("[name=fd_isbetween]").getValue();
        
        me.tools.ajax({
                params: {
                        'position_id': position_id,
                        'parent_id': fd_parent_id,
                        'organizationchart_id': organizationchart_id,
                        'order_no': fd_order_no,
                        'orglevel': fd_orglevel,
                        'isbetween': fd_isbetween
                },
                success: function (data, model) {
//                        var detailGrid = me.getGriddetail();
//                        detailGrid.doInit();
//                        detailGrid.getStore().load({
//                                params: {
//                                        'id': organizationchart_id,
//                                },								
//                                callback: function (recs, op) {
//                                        detailGrid.attachModel(op);							
//                                        f.up("window").close();
//
//                                }
//                        });
//                        
                        var gd = me.getGriddetail();
                        gd.doInit();
                        gd.bindPrefixName = me.controllerName;
                        gd.doLoad({mode_read: 'detaillist', id: organizationchart_id}, function () {
                                gd.getStore().clearFilter(true);
                        });
                        f.up("window").close();
                }
        }).read('detailsave');
    }
    
//
//    showLookupNodeWindow: function () {
//        var me = this;
//        
//        var window = me.instantWindow("Panel", 600, "Node", "create", "organizationchartPositionLookupRewindow", "lookup.organizationchart", {
//            itemId: me.controllerName + 'organizationchart'
//        });
//
//        var g = window.down("grid");
//        var p = window.down("panel");
//        p.setLoading("Please wait...");
//        me.tools.ajax({
//            params: {},
//            success: function (data, model) {
//                me.tools.wesea({data: data, model: model}, g).grid();
//                p.setLoading(false);
//            }
//        }).read('employeereporto');
//
//
//    },
});