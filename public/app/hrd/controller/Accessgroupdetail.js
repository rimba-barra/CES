Ext.define('Hrd.controller.Accessgroupdetail', {
    extend: 'Hrd.library.box.controller.Controller',
    alias: 'controller.Accessgroupdetail',
    requires: [
        'Hrd.library.box.tools.Tools',
        'Hrd.library.box.tools.DefaultConfig',
        'Hrd.library.box.tools.EventSelector',
        'Hrd.library.Box.Tools.Browse',
        'Hrd.library.box.tools.Dynamicrequest',
    ],
    controllerName: 'accessgroupdetail',
    fieldName: 'accessgroup_id',
    bindPrefixName: 'Accessgroupdetail',
    can_approve: '0',
    formWidth: 1250,
    header_id: 0,
    oldbobot:0,	
    dr: null,
    localStore: {},
    refs: [
        {
            ref: 'griddetail',
            selector: 'accessgroupdetailgriddetail'
        },
        {
            ref: 'gridlookupe',
            selector: 'lookupaccessgroupdetailgrid'
        },
        {
            ref: 'formsearchlookupe',
            selector: 'lookupaccessgroupdetailformsearch'
        },
        {
            ref: 'formcopy',
            selector: 'accessgroupdetailformcopy'
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
    gridAfterRender: function() {
        var me = this;	
		var g = me.getGrid();
		
		me.can_approve = g.down('#btnApprove').isVisible();
		me.can_reject = g.down('#btnReject').isVisible();
		
		g.down('#btnApprove').hide();
		g.down('#btnReject').hide();
        me.dataReset();
    },
    init: function () {
        var me = this;
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        me.dr = new Hrd.library.box.tools.Dynamicrequest();
		
        var newEvs = {};
        newEvs['accessgroupdetailgriddetail button[action=addDetail]'] = {
            click: function () {
                me.addDetail('create');
            }
        };

        newEvs['accessgroupdetailgriddetail button[action=approveDetail]'] = {
            click: function () {
				var me = this;
				var index_no = me.getFormdata().down("[name=index_no]").getValue()
				me.tools.ajax({
					params: {
					},
					success: function (record, model) {
						var user_index_no = record.others[0][0].index_no;										
						if(user_index_no == 0 || user_index_no >= index_no){
							Ext.Msg.alert('Warning', 'Do not have authorized');
							return false;
						} else {
							me.approveDetail();
						}
					}
				}).read('validateapprove');
				
            }
        };
		
        newEvs['accessgroupdetailgriddetail button[action=rejectDetail]'] = {
            click: function () {
				var me = this;
				var index_no = me.getFormdata().down("[name=index_no]").getValue();	
				me.tools.ajax({
					params: {
					},
					success: function (record, model) {
						var user_index_no = record.others[0][0].index_no;									
						if(user_index_no == 0 || user_index_no >= index_no){
							Ext.Msg.alert('Warning', 'Do not have authorized');
							return false;
						} else {
                			me.rejectDetail();
						}
					}
				}).read('validateapprove');
            }
        };
		
        newEvs['accessgroupdetailgriddetail button[action=deleteDetail]'] = {
            click: function () {
				me.deleteDetail();
            }
        };
		
        newEvs['accessgroupdetailgriddetail button[action=submitforapp]'] = {
            click: function () {
                me.submitforapp();
            }
        };
		
        newEvs['accessgroupdetailgriddetail actioncolumn'] = {
            click: this.gridDetailActionColumnClick
        }
		
        newEvs['accessgroupdetailgriddetail'] = {
            selectionchange: me.gridDetailSelectionChange,
            edit: me.gridDetailEdit
        };
			
		
        newEvs['#accessgroupdetailLookup lookupaccessgroupdetailgrid button[action=select]'] = {
            click: function () {
                me.selectGroup();
            }
        };
		
        newEvs['accessgroupdetailgriddetail #btnStatusCheck'] = {
            click: function () {
                me.checkAllDetail('statusc');
            }
        };
		
        newEvs['accessgroupdetailgriddetail #btnStatusUncheck'] = {
            click: function () {
                me.checkAllDetail('statusu');
            }
        };
		
        newEvs['accessgroupdetailgriddetail #btnContentCheck'] = {
            click: function () {
                me.checkAllDetail('contentc');
            }
        };
		
        newEvs['accessgroupdetailgriddetail #btnContentUncheck'] = {
            click: function () {
                me.checkAllDetail('contentu');
            }
        };
		
        newEvs['accessgroupdetailgriddetail #btnScoreCheck'] = {
            click: function () {
				var me, g, rec, accessgroup_id;
				me = this;		
				g = me.getGrid();
				rec = g.getSelectedRecord();
				index_no = 0;
				if (rec) {
					index_no = rec.data.index_no;
				}
				
				if(parseInt(index_no) != 1){
					Ext.Msg.alert('Warning', 'Do not have authorized');	
				} else {
              		me.checkAllDetail('scorec');					
				}					
						
            }
        };
		
        newEvs['accessgroupdetailgriddetail #btnScoreUncheck'] = {
            click: function () {
				var me, g, rec, accessgroup_id;
				me = this;		
				g = me.getGrid();
				rec = g.getSelectedRecord();
				index_no = 0;
				if (rec) {
					index_no = rec.data.index_no;
				}
				
				if(parseInt(index_no) != 1){
					Ext.Msg.alert('Warning', 'Do not have authorized');	
				} else {
	                me.checkAllDetail('scoreu');				
				}					
						
            }
        };
		
        newEvs['accessgroupdetailgriddetail #btnCommentGeneralCheck'] = {
            click: function () {
                me.checkAllDetail('commentgeneralc');
            }
        };
		
        newEvs['accessgroupdetailgriddetail #btnCommentGeneralUncheck'] = {
            click: function () {
                me.checkAllDetail('commentgeneralu');
            }
        };
        newEvs['accessgroupdetailgriddetail #btnCommentPrivateCheck'] = {
            click: function () {
                me.checkAllDetail('commentprivatec');
            }
        };
		
        newEvs['accessgroupdetailgriddetail #btnCommentPrivateUncheck'] = {
            click: function () {
                me.checkAllDetail('commentprivateu');
            }
        };
				
        newEvs['lookupaccessgroupdetailformsearch'] = {
            afterrender: function () {
                var me,form;
                me = this;
				f = me.getFormsearchlookupe();
				me.tools.ajax({
					params: {
					},
					success: function(data, model) {
						me.tools.wesea(data.group, f.down("[name=group_id]")).comboBox();				
					}
				}).read('parameter');    
            },
           
        };
		
        newEvs['lookupaccessgroupdetailformsearch button[action=search]'] = {
            click: function () {
				this.lookupGroup();				
            }
        };
        newEvs['lookupaccessgroupdetailformsearch button[action=reset]'] = {
            click: function () {
               form = me.getFormsearchlookupe().getForm().reset();
			   this.lookupGroup();
            }
        };
		
        newEvs['accessgroupdetailgriddetail button[action=copy]'] = {
            click: function () {
                me.Copy();
            }
        };
		
        newEvs['accessgroupdetailformcopy'] = {
            afterrender: function () {
                var me, form,datafilter;
                me = this;
                form = me.getFormcopy();
                me.tools.ajax({
                    params: {},
                    success: function (data, model) {
						if(data.accessgroup){
							datafilter = me.filterAccesslevel(data.accessgroup);
							me.tools.wesea(datafilter, form.down("[name=accessgroup_id]")).comboBox();
						}
                    }
                }).read('headerdata');

            }           
        };
		
        newEvs['accessgroupdetailformcopy button[action=save]'] = {
            click: function () {
                me.saveCopy();
            }
        };
		
        this.control(newEvs);		
    },
	
    filterAccesslevel: function (param) {
		var me, accessgroup_id, datahasfilter;
		me = this;
		accessgroup_id = me.getFormdata().down("[name=accessgroup_id]").getValue();	
        datahasfilter =[];
		if(param){			
        	//yang ditampilkan hanya level access selain yang sedang diedit
			Ext.each(param.data, function (value) {
				 if(value.accessgroup_id != accessgroup_id){
					  datahasfilter.push(value);
				 }           
			});
       		return {'data':datahasfilter,'model':param.model};
		} else {
      		return {'data':datahasfilter,'model':''};
		}
    },
	
    addDetail: function (state) {
		var me = this;		
		var accessgroup_id = me.getFormdata().down("[name=accessgroup_id]").getValue();
		
		var window = me.instantWindow("Panel", 700, "Group", "create", "accessgroupdetailLookup", "lookup.accessgroupdetail", {
			itemId: me.controllerName + 'group'
		});
		f = me.getFormsearchlookupe();
		this.lookupGroup();
    },
	
	lookupGroup: function(){
		var me, form, pt_id, project_id, department_id, grid;
		me = this;
		form = me.getFormsearchlookupe();
		
		if(form.down('[name=code]').getValue() == null){
		   code = 0;
		} else {
		   code = form.down('[name=code]').getValue();
		}
		
		if(form.down('[name=group]').getValue()==null){
		   group = 0;
		}else{
		   group = form.down('[name=group]').getValue();
		}
                		
		grid = me.getGridlookupe();				
		grid.setLoading("Please wait...");				
		var accessgroup_id = me.getFormdata().down("[name=accessgroup_id]").getValue();		
		me.tools.ajax({
			params: {
				'accessgroup_id':accessgroup_id,
				'code': code,
				'group': group
			},
			success: function(data, model) {
				me.tools.wesea({data: data, model: model}, grid).grid();				
				grid.setLoading(false);
			}
		}).read('grouplist');
	},
	
    approveDetail: function (state) {		
        var me, grid, rows, s, s_selected, delimiter, accessgroup_detail_id, accessgroup_detail_id_all;
        me 	= this;
        grid	= me.getGriddetail();	
        s  	= grid.getStore();	
        rows 	= grid.getSelectionModel().getSelection();
		
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();		
        if(dd<10) {
                dd = '0'+dd
        }		
        if(mm<10) {
                mm = '0'+mm
        }		
        today = yyyy + '-' + mm + '-' + dd;

        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected.');
            return;
        } else {			
			// cek kalau ada yang bisa akses content & nilai	
			counter 	= 0;
			delimiter	= '';
			belum_approve   = 0;
			for (var i = 0; i < rows.length; i++) {		
				if(rows[i]['data'].is_approve != '1'){
					delimiter 		= counter == 0 ? '' : '~';
					belum_approve = 1;
				}
			}
			
			if (belum_approve == 0){
				Ext.Msg.alert('Info', 'No record to approve');
				return false;
			}
						
			Ext.Msg.confirm('Approve', 'Approve record(s)?', function (btn) {
				if (btn == 'yes') {
					
					var p = grid.up("window").down("panel");
					p.setLoading("Please wait...");
					accessgroup_detail_id_all = '';
					
					for (var i = 0; i < rows.length; i++) {						
						if(rows[i]['data'].is_approve != true || rows[i].dirty == true){		
							delimiter 		= counter == 0 ? '' : '~';						
							accessgroup_detail_id = rows[i]['data'].accessgroup_detail_id.toString();							
							accessgroup_detail_id_all += delimiter + accessgroup_detail_id;
							counter++;
						}
					}
					
					if (counter > 0) {
						me.tools.ajax({
                                                    params: {
                                                            'accessgroup_detail_id'	: accessgroup_detail_id_all
                                                    },
                                                    success: function (data, model) {				
                                                            //grid.up("window").close();
                                                            grid.getStore().reload();
                                                            p.setLoading(false);

                                                    }
						}).read('approve');
					}
				}
				
			});// end confirm
        }
		
    },
    rejectDetail: function (state) {		
        var me, grid, rows, s, s_selected, delimiter, accessgroup_detail_id_all;
        me 		= this;
		grid	= me.getGriddetail();	
		s  		= grid.getStore();	
        rows 	= grid.getSelectionModel().getSelection();
		
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();		
		if(dd<10) {
			dd = '0'+dd
		}		
		if(mm<10) {
			mm = '0'+mm
		}		
		today = yyyy + '-' + mm + '-' + dd;
		
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected.');
            return;
        } else {
			
			counter 	= 0;
			delimiter	= '';
			belum_reject = 0;
			for (var i = 0; i < rows.length; i++) {		
				if(rows[i]['data'].is_reject != true){
					belum_reject = 1;
				}
			}
			
			if (belum_reject == 0){
				Ext.Msg.alert('Info', 'No record to reject');
				return false;
			}
			
			Ext.Msg.confirm('Reject', 'Reject record(s)?', function (btn) {
				if (btn == 'yes') {
					
					var p = grid.up("window").down("panel");
					p.setLoading("Please wait...");
					counter 	= 0;
					delimiter	= '';
					accessgroup_detail_id_all = '';
					
					for (var i = 0; i < rows.length; i++) {
						
						if(rows[i]['data'].is_reject != true){		
							delimiter 		= counter == 0 ? '' : '~';					
							accessgroup_detail_id_all += delimiter + rows[i]['data'].accessgroup_detail_id.toString();	
							counter++;
						}
					}
					
					if (counter > 0){
						me.tools.ajax({
							params: {
								'accessgroup_detail_id'	: accessgroup_detail_id_all
							},
							success: function (data, model) {				
								//grid.up("window").close();
                                                                grid.getStore().reload();
								p.setLoading(false);
								
							}
						}).read('reject');
					}
										
				}
			})
			
        }
		
    },	
    submitforapp: function () {
        var me, grid, rows, data, row, counter, countarray, accessgroup;
        me 		= this;
        grid 	= me.getGriddetail();
		s  		= grid.getStore();	
        rows 	= grid.getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected..!');
            return;
        } else {
			
			accessgroup = me.getFormdata().down("[name=accessgroup]").getValue();
			
			var cek_belum_approve = 0;		
			for (var i = 0; i < rows.length; i++) {				
				is_approve = rows[i]['data'].is_approve;
				if(is_approve == '' || is_approve == 0){
					cek_belum_approve++;
				}
			}
			
			if(cek_belum_approve == 0){
				Ext.Msg.alert('Info', 'No record to submit, all record already approved.');
				return;
			}
			
			countarray 	= rows.length;
			counter 	= 0;
                        me.arraydata = [];
			
			Ext.Msg.show({
				title: 'Submit',
				msg: 'Submit ' + cek_belum_approve + ' record(s) for approval ?',
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
						
						var all_id = '';		
						for (var i = 0; i < countarray; i++) {
							
							if(all_id != ''){
								all_id = all_id + ',';
							}														
							all_id += rows[i]['data'].accessgroup_detail_id;
														
						}
						
						me.tools.ajax({
							params: {
								all_id : all_id,
								accessgroup : accessgroup
							},
							success: function (data, model) {								
								for (var i = 0; i < countarray; i++) {	
									var index = s.indexOf(rows[i]);
									var rec = s.getAt(index);
									rec.beginEdit();				
									rec.set({
										is_submitforapproval: 1
									});	
									rec.commit();
									rec.endEdit();
								}					
								grid.getView().refresh();								
								Ext.Msg.alert('Info', 'Email sent');
							}
						}).read('sendemail');
						
					}
				},
				icon: Ext.Msg.QUESTION
			});
			
        }
    },
    selectGroup: function () {
        var me, grid, rows, data, row, counter, countarray, act_name, fields, accessgroup_id;
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
                        accessgroup_id = me.getFormdata().down("[name=accessgroup_id]").getValue();
			
			for (var i = 0; i < rows.length; i++) {
				
                //data["details"] = me.getGriddetail().getJson();
				me.tools.ajax({
					params: {
						'accessgroup_id': accessgroup_id,
						'group_id'	: rows[i]['data'].group_id
					},
					success: function (data, model) {
						counter++;
						if (countarray == counter) {
							
							var detailGrid = me.getGriddetail();
							detailGrid.doInit();
							detailGrid.getStore().load({
								params: {
									'accessgroup_id': accessgroup_id,
								},								
								callback: function (recs, op) {
									detailGrid.attachModel(op);									
									grid.up("window").close();
									p.setLoading(false);
									
								}
							});							
						}
					}
				}).read('selectgroup');
				
			}
			
        }
	},
    deleteDetail: function () {
        var me = this;
		var gd = me.getGriddetail();	
		var s  = gd.getStore();	
		Ext.Msg.confirm('Delete Data', 'Delete Record(s)?', function (btn) {
			if (btn == 'yes') {
				rows = gd.getSelectionModel().getSelection();
				for (var i = 0; i < rows.length; i++) {
					var index = s.indexOf(rows[i]);
					var rec = s.getAt(index);
					
					rec.beginEdit();
					rec.set({
						deleted: 1
					});
					rec.setDirty(true);
					rec.endEdit();		
				}
				//gd.getStore().commitChanges();	// jangan dicommit, nanri dirtynya ilang		
				gd.getStore().filterBy(function (rec, id) {
					if (rec.data.deleted === 1) {
						return false;
					} else {
						return true;
					}
				});
								
			}
		})
    },
    checkAllDetail: function (column) {
        var me = this;
		var gd = me.getGriddetail();	
		var s  = gd.getStore();	
		
		rows = gd.getSelectionModel().getSelection();
		for (var i = 0; i < rows.length; i++) {
			var index = s.indexOf(rows[i]);
			var rec = s.getAt(index);
			
			rec.beginEdit();
			switch (column) {
                case 'statusc':
					rec.set({
						status: 1
					});
                    break;
                case 'statusu':
					rec.set({
						status: 0
					});
                    break;
                case 'contentc':
					rec.set({
						content: 1
					});
                    break;
                case 'contentu':
					rec.set({
						content: 0
					});
                    break;
                case 'scorec':
					rec.set({
						score: 1
					});
                    break;
                case 'scoreu':
					rec.set({
						score: 0
					});
                    break;
                case 'commentgeneralc':
					rec.set({
						comment_general: 1
					});
                    break;
                case 'commentgeneralu':
					rec.set({
						comment_general:0
					});
                    break;
                case 'commentprivatec':
					rec.set({
						comment_private: 1
					});
                    break;
                case 'commentprivateu':
					rec.set({
						comment_private: 0
					});
                    break;
				default :
					break;
			}			
			rec.afterEdit();
			rec.endEdit();		
		}
		//gd.getStore().commitChanges();	// jangan dicommit, nanri dirtynya ilang		
		gd.getStore().filterBy(function (rec, id) {
			if (rec.data.deleted === 1) {
				return false;
			} else {
				return true;
			}
		});
    },
    gridDetailActionColumnClick: function (view, cell, row, col, e) {
        var me = this;
        var gd = me.getGriddetail();
        var record = gd.getStore().getAt(row);
        var m = e.getTarget().className.match(/\bact-(\w+)\b/);
        gd.getSelectionModel().select(row);

        if (m) {
            switch (m[1]) {
                case 'destroy':					
                    Ext.Msg.confirm('Delete Data', 'Delete Record?', function (btn) {
                        if (btn == 'yes') {
							var rec = gd.getSelectedRecord();
							if (rec) {
								rec.beginEdit();
								rec.set({
									deleted: 1
								});
								rec.setDirty(true);
								rec.endEdit();
								gd.getStore().filterBy(function (rec, id) {
									if (rec.data.deleted === 1) {
										return false;
									} else {
										return true;
									}
								});								
				
							}
						}
					});
                    break;
				default:
					break;
            }
        }
    },
    fdar: function () {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        var gd = me.getGriddetail();
						
        me.setActiveForm(f);
        f.setLoading(false);
		
		if(me.can_approve == true){
			gd.down('#btnApproveDetail').show();			
		} 
		
		if(me.can_reject == true){
			gd.down('#btnRejectDetail').show();	
		} 
		
        var x = {
            init: function () {
				
            },
            create: function () {
                me.unMask(1);
				var rec = g.getSelectedRecord();
				var headerId = rec.data.accessgroup_id;
                gd.doInit();
                var store = gd.getStore().load({
                    params: {
                        mode_read: 'listdetail',
                        accessgroup_id: headerId
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
					var headerId = rec.data.accessgroup_id;
					me.header_id = rec.data.accessgroup_id;
					var gd = me.getGriddetail();
					gd.doInit();
					gd.bindPrefixName = me.controllerName;
					var store = gd.getStore().load({
						params: {
							mode_read: 'listdetail',
							accessgroup_id: headerId
						},
						callback: function (data, model) {
							gd.attachModel(model);		
		
							gd.getStore().sort({ property: 'approveon', direction: 'ASC'});
		
						}
					});
				}
				
            }
        };

        return x;
    },
    mainDataSave: function () {
        var me = this;
        var f = me.getFormdata();
        var formdata = f.getForm();
        var g = me.getGrid();
        var s = g.getStore();
        var row = f.editedRow;
        me.getGriddetail().getStore().clearFilter(true);
		
		var cek = 0;
		var store = me.getGriddetail().getStore();
		store.each(function(rec) {
			rec.dirty == true ? cek++ : '';			
		});
		
		if(cek == 0){
            Ext.Msg.alert('Info', 'No record to save.');			
			return false;
		}
		
        if (formdata.isValid()) {
            me.insSave({
                form: f,
                grid: g,
                finalData: function (data) {
					
					var store = me.getGriddetail().getStore();
					var details = [];	
					var countRow = 0;
					store.each(function(rec) {
						rec.dirty == true ? details.push(rec.data) : '';
						rec.dirty == true ? countRow++ : '';						
					});
					
					data["details"] = details;
                    //data["details"] = me.getGriddetail().getJson();
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
	gridSelectionChange: function() {
		var me 			= this;
		var grid 		= me.getGrid(), row = grid.getSelectionModel().getSelection();
		var edit 		= grid.down('#btnEdit');
		var approveb 	= grid.down('#btnApprove');
		var rejectb 	= grid.down('#btnReject');
		if (edit !== null) {
			edit.setDisabled(row.length != 1);
		}
		
		if (approveb !== null) {
			approveb.setDisabled(row.length != 1);
		}
		if (rejectb !== null) {
			rejectb.setDisabled(row.length != 1);
		}
	},
	gridDetailSelectionChange: function() {
		var me = this;
		var grid = me.getGriddetail(), row = grid.getSelectionModel().getSelection();
		var checkuncheckall = grid.down('#checkuncheckall');
		var btnDeleteDetail = grid.down('#btnDeleteDetail');
		var btnApproveDetail = grid.down('#btnApproveDetail');
		var btnRejectDetail = grid.down('#btnRejectDetail');
		var btnSubmitforapp = grid.down('#btnSubmitforapp');
		
		if (checkuncheckall !== null) {
			checkuncheckall.setDisabled(row.length < 1);
		}
		if (btnDeleteDetail !== null) {
			btnDeleteDetail.setDisabled(row.length < 1);
		}
		
		if (btnApproveDetail !== null) {
			btnApproveDetail.setDisabled(row.length < 1);
		}
		if (btnRejectDetail !== null) {
			btnRejectDetail.setDisabled(row.length < 1);
		}
		if (btnSubmitforapp !== null) {
			btnSubmitforapp.setDisabled(row.length < 1);
		}
		
	}, 
    Copy: function () {
        var me, rows;
        me = this;
		me.formCopy.stateform = 'Copy from other level';
		me.dr.GenerateFormdata(me.formCopy);
    },
    formCopy: {
        //start formgeneate
        fromlocation: 'Hrd.view.accessgroupdetail.FormCopy',
        formtitle: 'Form', formicon: 'icon-form-copy',
        formid: 'win-accessgroupdetailformcopy', formlayout: 'fit',
        formshadow: 'frame', formmask: 'Loading...',
        formwidth: 500, formtimeout: 0,
        stateform: null, formaction: null, formproperties: null, formwindows: null,
        //end formgeneate       
    },
    saveCopy: function () {
        //save data to table employee
        var me, form, data, row, counter, countarray;
        me 			= this;
        form 		= me.getFormcopy();
        me.dr.formMask(form);
		me.tools.ajax({
			params: {
				'accessgroup_id': me.getFormdata().down("[name=accessgroup_id]").getValue(),
				'accessgroup_id_copy': me.dr.getVal(form, 'accessgroup_id', 'value')
			},
			success: function (data, model) {
				me.dr.buildSuccessAlert('Copy data finish successfully');
				me.dr.formUnmask(form);
				me.dr.formClose(form);
				me.getGriddetail().getStore().reload();
				
			}
		}).read('savecopy');
		
    },	
	gridDetailEdit: function(editor, e){
        var me, g, rec, accessgroup_id;
		me = this;		
        g = me.getGrid();
		rec = g.getSelectedRecord();
		index_no = 0;
		if (rec) {
			index_no = rec.data.index_no;
		}
		
		if(parseInt(index_no) != 1 && e.field == 'score'){
			Ext.Msg.alert('Warning', 'Do not have authorized');			
			e.record.set({
				score: false
			});
		}
		
		/*
		var myTargetRow = 6;		
		if (e.row == myTargetRow) {
			e.cancel = true;
			e.record.data[e.field] = e.value;
		}*/
	}
});