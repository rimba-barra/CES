/*  JS CONTROLLER FOR 'Perspective Percentage' */

Ext.define('Hrd.controller.Perspectivepercentage', {
    extend          : 'Hrd.library.box.controller.Controller',
    alias           : 'controller.Perspectivepercentage',
    requires        : [
        'Hrd.library.box.tools.Tools',
        'Hrd.library.box.tools.DefaultConfig',
        'Hrd.library.box.tools.EventSelector',
        'Hrd.library.Box.Tools.Browse'
    ],
    controllerName  : 'perspectivepercentage',
    fieldName       : 'perspective_percentage_id',
    bindPrefixName  : 'Perspectivepercentage',
    formWidth       : 600,
    localStore      : {},
    refs            : [{
        ref         : 'griddetail',
        selector    : 'perspectivepercentagegriddetail'
    }],
    
    constructor         : function(configs) {
        var me      = this;
        var config  = new Hrd.library.box.tools.DefaultConfig ({
            moduleName  : me.controllerName
        });
        config.run(this);
        this.callParent(arguments);
    },

    init                : function() {
        var me      = this;
        var events  = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools    = new Hrd.library.box.tools.Tools({config: me.myConfig});
        var newEvs  = {};

        newEvs['perspectivepercentageformdata button[action=generate]'] = {
            click: function() {
                me.generateOnClick();
            }
        };

        newEvs['perspectivepercentageformdata combobox[action=resetdetail]'] = {
            change: function() {
                me.detailReset();
            }
        };

        newEvs['perspectivepercentagegriddetail actioncolumn'] = {
            click: this.gridDetailActionColumnClick
        }

        this.control(newEvs);
    },

    generateOnClick     : function() {
        var me          = this;
        var f           = me.getFormdata();
        var vs          = f.getForm().getValues();
        var projectid   = f.down("[name=project_id]").getValue();
        var ptid        = f.down("[name=pt_id]").getValue();
        var deptid      = f.down("[name=department_id]").getValue();

        if (projectid == null) {
            Ext.Msg.alert('Info', 'Invalid Project, please select Project first');
        } else if(ptid == null) {
            Ext.Msg.alert('Info', 'Invalid PT, please select PT first');
        } else if(deptid == null) {
            Ext.Msg.alert('Info', 'Invalid Department, please select Department first');
        } else {
            var gd      = me.getGriddetail();
            gd.doInit();

            gd.getStore().load({
                params  : {
                    perspective_percentage_id   : '',
                    project_id                  : projectid,
                    pt_id                       : ptid,
                    department_id               : deptid
                },

                callback: function(recs,op) {
                    gd.attachModel(op);
                }
            });
        }
    },

    detailReset: function() {
        var me      = this;
        var gr      = me.getGriddetail();
        var store   = gr.getStore();

        store.removeAll();
    },

    gridDetailActionColumnClick: function(view, cell, row, col, e) {
        var me      = this;
        var gr      = me.getGriddetail();
        var record  = gr.getStore().getAt(row);
        var m       = e.getTarget().className.match(/\bact-(\w+)\b/);
        gr.getSelectionModel().select(row);

        if (m) {
            switch (m[1]) {
                case 'destroy':
                    var rec = gr.getSelectedRecord();
					console.log(rec);
                    if(rec) {
                        rec.beginEdit();
                        rec.set({
                            deleted:true
                        });
                        rec.endEdit();
                    
						gr.getStore().filterBy(function(rec, id) {
							console.log(rec.data.deleted);
							if (rec.data.deleted === true) {
								return false;
							}
							else {
								return true;
							}
						});
					
                        /*gr.getStore().filterBy(function(recod){
							console.log(recod);
							if(recod.data.deleted){
                            	return recod.data.deleted==false;
							}
                        });*/
                    }
                break;
            }
        }
    },

    fdar                : function() {
        var me  = this;
        var f   = me.getFormdata();
        var g   = me.getGrid();
        
        me.setActiveForm(f);
        f.setLoading(false);
        // f.down("button[action=generate]").setDisabled(true);
        ;
        var x   = {
            init    : function() {

            },
            create  : function() {
                me.unMask(1);
                me.tools.ajax ({
                    params      : {},
                    success     : function(data, model) {
                        var gd  = me.getGriddetail();

                        me.tools.wesea(data.project, f.down("[name=project_id]")).comboBox();
                        me.tools.wesea(data.pt, f.down("[name=pt_id]")).comboBox();
                        me.tools.wesea(data.department, f.down("[name=department_id]")).comboBox();
                    
                        gd.doInit();
                    }
                }).read('headerdata');
            },
            update  : function() {
                me.unMask(1)
                var x = f.down("[action=generate]").setDisabled(true);
                // console.log(x);

                me.tools.ajax ({
                    params      : {},
                    success     : function(data, model) {
                        me.tools.wesea(data.project, f.down("[name=project_id]")).comboBox();
                        me.tools.wesea(data.pt, f.down("[name=pt_id]")).comboBox();
                        me.tools.wesea(data.department, f.down("[name=department_id]")).comboBox();

                        // Ext.getStore('Levelcategory').load();
                        var g   = me.getGrid();
                        var rec = g.getSelectedRecord();
                        if (rec) {
                            f.editedRow = g.getSelectedRow();
                            f.loadRecord(rec);

                            var headerId        = rec.data.perspective_percentage_id;
                            var projectId       = rec.data.project_id;
                            var ptId            = rec.data.pt_id;
                            var deptId          = rec.data.department_id;
                            var gd              = me.getGriddetail();

                            gd.doInit();
                            gd.bindPrefixName   = me.controllerName;
                            gd.doLoad({mode_read:'updatedetail',perspective_percentage_id:headerId}, function() {
                                gd.getStore().clearFilter(true);
                            });
                            // gd.getStore().load( {
                            //     params  : {
                            //         mode_read                   : 'updatedetail',
                            //         perspective_percentage_id   : headerId
                            //     },
                            //     me.getGriddetail().getStore().clearFilter(true);
                            //     callback: function(recs, op) {
                            //         gd.attachModel(op);
                                    
                            //         for (var i = 0; i < recs.length; i++) {
                            //             var raw = recs[i].raw.perspectivepercentage.perspectivepercentage_percentage;
                            //             console.log(gd);
                            //             console.log(raw);
                            //         };
                            //     }
                            // });
                        }
                    }
                }).read('headerdata');
            }
        };

        return x;
    },
    
    mainDataSave        : function() {
        var me  = this;
        var f   = me.getFormdata();
        var g   = me.getGrid();
        var s   = g.getStore();
        var row = f.editedRow;
        me.getGriddetail().getStore().clearFilter(true);
		
		/*var totalPercent = 0;
		me.getGriddetail().getStore().each(function(rec) {
			if (rec.data.deleted === true) {
				//return false;
			}
			else {
				totalPercent += rec.data.percentage
				//return true;
			}
		});
		if(totalPercent < 100 || totalPercent > 100){
			me.tools.alert.warning('Total Percentage must be 100%');
			return;
		} */
		
        me.insSave ({
            form        : f,
            grid        : g,
            finalData   : function(data) {
                data["details"] = me.getGriddetail().getJson();            
                // console.log(data);
                return data;
            },
            sync        : true,
            callback    : {
                create: function(store, form, grid) {

                }
            }
        });
    },
});