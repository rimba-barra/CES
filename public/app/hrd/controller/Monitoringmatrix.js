Ext.define('Hrd.controller.Monitoringmatrix', {
    extend: 'Hrd.library.box.controller.Controller',
    alias: 'controller.Monitoringmatrix',
    requires: [
        'Hrd.library.box.tools.Tools',
        'Hrd.library.box.tools.DefaultConfig',
        'Hrd.library.box.tools.EventSelector',
        'Hrd.library.Box.Tools.Browse',
        'Hrd.library.box.tools.Dynamicrequest',
    ],
    controllerName: 'monitoringmatrix',
    fieldName: 'accesslevel_id',
    bindPrefixName: 'Monitoringmatrix',
    can_approve: '0',
    formWidth: 1250,
    header_id: 0,
    oldbobot:0,	
    dr: null,
    localStore: {},
    refs: [
        {
            ref: 'griddetail',
            selector: 'monitoringmatrixgriddetail'
        },
        {
            ref: 'gridlookupe',
            selector: 'lookupmonitoringmatrixgrid'
        },
        {
            ref: 'formsearchlookupe',
            selector: 'lookupmonitoringmatrixformsearch'
        },
        {
            ref: 'formcopy',
            selector: 'monitoringmatrixformcopy'
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
        newEvs['monitoringmatrixgriddetail button[action=addDetail]'] = {
            click: function () {
                me.addDetail('create');
            }
        };

        newEvs['monitoringmatrixgriddetail button[action=approveDetail]'] = {
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
		
        newEvs['monitoringmatrixgriddetail button[action=rejectDetail]'] = {
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
		
        newEvs['monitoringmatrixgriddetail button[action=deleteDetail]'] = {
            click: function () {
				me.deleteDetail();
            }
        };
		
        newEvs['monitoringmatrixgriddetail button[action=submitforapp]'] = {
            click: function () {
                me.submitforapp();
            }
        };
		
        newEvs['monitoringmatrixgriddetail actioncolumn'] = {
            click: this.gridDetailActionColumnClick
        }
		
        newEvs['monitoringmatrixgriddetail'] = {
            selectionchange: me.gridDetailSelectionChange,
            edit: me.gridDetailEdit
        };
			
		
        newEvs['#monitoringmatrixLookup lookupmonitoringmatrixgrid button[action=select]'] = {
            click: function () {
                me.selectEmployee();
            }
        };
		
        newEvs['monitoringmatrixgriddetail #btnStatusCheck'] = {
            click: function () {
                me.checkAllDetail('statusc');
            }
        };
		
        newEvs['monitoringmatrixgriddetail #btnStatusUncheck'] = {
            click: function () {
                me.checkAllDetail('statusu');
            }
        };
		
        newEvs['monitoringmatrixgriddetail #btnContentCheck'] = {
            click: function () {
                me.checkAllDetail('contentc');
            }
        };
		
        newEvs['monitoringmatrixgriddetail #btnContentUncheck'] = {
            click: function () {
                me.checkAllDetail('contentu');
            }
        };
		
        newEvs['monitoringmatrixgriddetail #btnScoreCheck'] = {
            click: function () {
				var me, g, rec, accesslevel_id;
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
		
        newEvs['monitoringmatrixgriddetail #btnScoreUncheck'] = {
            click: function () {
				var me, g, rec, accesslevel_id;
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
		
        newEvs['monitoringmatrixgriddetail #btnCommentGeneralCheck'] = {
            click: function () {
                me.checkAllDetail('commentgeneralc');
            }
        };
		
        newEvs['monitoringmatrixgriddetail #btnCommentGeneralUncheck'] = {
            click: function () {
                me.checkAllDetail('commentgeneralu');
            }
        };
        newEvs['monitoringmatrixgriddetail #btnCommentPrivateCheck'] = {
            click: function () {
                me.checkAllDetail('commentprivatec');
            }
        };
		
        newEvs['monitoringmatrixgriddetail #btnCommentPrivateUncheck'] = {
            click: function () {
                me.checkAllDetail('commentprivateu');
            }
        };
				
        newEvs['lookupmonitoringmatrixformsearch'] = {
            afterrender: function () {
                var me,form;
                me = this;
				f = me.getFormsearchlookupe();
				me.tools.ajax({
					params: {
					},
					success: function(data, model) {
						me.tools.wesea(data.banding, f.down("[name=banding_id]")).comboBox();
						me.tools.wesea(data.projectsh, f.down("[name=project_id]")).comboBox();
						me.tools.wesea(data.pt, f.down("[name=pt_id]")).comboBox();
						
						f.down("[name=project_id]").setValue(parseInt(apps.project));
						f.down("[name=pt_id]").setValue(parseInt(apps.pt));						
					}
				}).read('parameter');    
            },
           
        };
		
        newEvs['lookupmonitoringmatrixformsearch button[action=search]'] = {
            click: function () {
				this.lookupEmployee();				
            }
        };
        newEvs['lookupmonitoringmatrixformsearch button[action=reset]'] = {
            click: function () {
               form = me.getFormsearchlookupe().getForm().reset();
			   this.lookupEmployee();
            }
        };
		
        newEvs['monitoringmatrixgriddetail button[action=copy]'] = {
            click: function () {
                me.Copy();
            }
        };
		
        newEvs['monitoringmatrixformcopy'] = {
            afterrender: function () {
                var me, form,datafilter;
                me = this;
                form = me.getFormcopy();
                me.tools.ajax({
                    params: {},
                    success: function (data, model) {
						if(data.accesslevel){
							datafilter = me.filterAccesslevel(data.accesslevel);
							me.tools.wesea(datafilter, form.down("[name=accesslevel_id]")).comboBox();
						}
                    }
                }).read('headerdata');

            }           
        };
		
        newEvs['monitoringmatrixformcopy button[action=save]'] = {
            click: function () {
                me.saveCopy();
            }
        };
		
        this.control(newEvs);		
    },
	
    filterAccesslevel: function (param) {
		var me, accesslevel_id, datahasfilter;
		me = this;
		accesslevel_id = me.getFormdata().down("[name=accesslevel_id]").getValue();	
        datahasfilter =[];
		if(param){			
        	//yang ditampilkan hanya level access selain yang sedang diedit
			Ext.each(param.data, function (value) {
				 if(value.accesslevel_id != accesslevel_id){
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
		var accesslevel_id = me.getFormdata().down("[name=accesslevel_id]").getValue();
		
		var window = me.instantWindow("Panel", 900, "Employee", "create", "monitoringmatrixLookup", "lookup.monitoringmatrix", {
			itemId: me.controllerName + 'employee'
		});
		
		f = me.getFormsearchlookupe();
		f.down("[name=project_id]").setValue(parseInt(apps.project));
		f.down("[name=pt_id]").setValue(parseInt(apps.pt));	
		this.lookupEmployee();
    },
	
	lookupEmployee: function(){
		var me, form, pt_id, project_id, department_id, grid;
		me = this;
		form = me.getFormsearchlookupe();
		
		if(form.down('[name=pt_id]').getValue() == '' || form.down('[name=pt_id]').getValue() == null){
		   pt_id = 0;
		} else {
		   pt_id = form.down('[name=pt_id]').getValue();
		}
		
		if(form.down('[name=project_id]').getValue()==null){
		   project_id = 0;
		}else{
		   project_id = form.down('[name=project_id]').getValue();
		}
				
		if(form.down('[name=banding_id]').getValue()==null){
		   banding_id = 0;
		}else{
		   banding_id = form.down('[name=banding_id]').getValue();
		}
		
		if(form.down('[name=employee_nik]').getValue() == null){
		   employee_nik = 0;
		} else {
		   employee_nik = form.down('[name=employee_nik]').getValue();
		}
		
		if(form.down('[name=employee_name]').getValue()==null){
		   employee_name = 0;
		}else{
		   employee_name = form.down('[name=employee_name]').getValue();
		}
		
		grid = me.getGridlookupe();				
		grid.setLoading("Please wait...");				
		var accesslevel_id = me.getFormdata().down("[name=accesslevel_id]").getValue();		
		me.tools.ajax({
			params: {
				'accesslevel_id':accesslevel_id,
				'employee_nik': employee_nik,
				'employee_name': employee_name,
				'banding_id': banding_id,
				'project_id': project_id,
				'pt_id': pt_id
			},
			success: function(data, model) {
				me.tools.wesea({data: data, model: model}, grid).grid();				
				grid.setLoading(false);
			}
		}).read('employeelist');
	},
	
    approveDetail: function (state) {		
        var me, grid, rows, s, s_selected, delimiter, 
		accessmatrix_id, accessmatrix_id_all, status, status_all, content, content_all, score, score_all, 
		comment_general, comment_general_all, comment_private, comment_private_all;
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
			
			// cek kalau ada yang bisa akses content & nilai	
			counter 	= 0;
			delimiter	= '';	
			cek_content = '0';
			cek_score	= '0';
			belum_approve = 0;
			for (var i = 0; i < rows.length; i++) {		
				if(rows[i]['data'].is_approve != '1'){
					delimiter 		= counter == 0 ? '' : '~';
				
					content = rows[i]['data'].content.toString();
					score 	= rows[i]['data'].score.toString();	
					if (cek_content == '0'){
						cek_content = content == 'true' || content == '1' ? '1' : '0';
					}
					
					if (cek_score == '0'){
						cek_score 	= score == 'true' || score == '1' ? '1' : '0';
					}
					belum_approve = 1;
				}
			}
			
			if (belum_approve == 0){
				Ext.Msg.alert('Info', 'No record to approve');
				return false;
			}
			
			var msg = ''
			if (cek_content == '1' && cek_score == '0'){
				msg = 'Content';
			}
			
			if (cek_content == '0' && cek_score == '1'){
				msg = 'Score';
			}
			
			if (cek_content == '1' && cek_score == '1'){
				msg = 'Content & Score';
			}
			
			if(msg != ''){
				msg = 'User can access to ' + msg + '<br>';
			}
			
			
			Ext.Msg.confirm('Approve', msg + 'Approve record(s)?', function (btn) {
				if (btn == 'yes') {
					
					var p = grid.up("window").down("panel");
					p.setLoading("Please wait...");
					accessmatrix_id_all = '';
					status_all 		= '';
					content_all 	= '';
					score_all 		= '';
					comment_general_all = '';
					comment_private_all = '';
					
					for (var i = 0; i < rows.length; i++) {
						
						if(rows[i]['data'].is_approve != true || rows[i].dirty == true){		
							delimiter 		= counter == 0 ? '' : '~';
						
							accessmatrix_id = rows[i]['data'].accessmatrix_id.toString();
							status 			= rows[i]['data'].status.toString();
							content 		= rows[i]['data'].content.toString()
							score 			= rows[i]['data'].score.toString();	
							comment_general = rows[i]['data'].comment_general.toString();
							comment_private = rows[i]['data'].comment_private.toString();
							
							status 			= status == 'true' || status == '1' ? '1' : '0';
							content 		= content == 'true' || content == '1' ? '1' : '0';
							score 			= score == 'true' || score == '1' ? '1' : '0';
							comment_general = comment_general == 'true' || comment_general == '1' ? '1' : '0';
							comment_private = comment_private == 'true' || comment_private == '1' ? '1' : '0';
							
							accessmatrix_id_all += delimiter + accessmatrix_id;	
							status_all 			+= delimiter + status;
							content_all 		+= delimiter + content;
							score_all 			+= delimiter + score;
							comment_general_all += delimiter + comment_general;
							comment_private_all += delimiter + comment_private;
							counter++;
						}
					}
					
					if (counter > 0) {
						me.tools.ajax({
							params: {
								'accessmatrix_id'	: accessmatrix_id_all,
								'status'			: status_all,
								'content'			: content_all,
								'score'				: score_all,
								'comment_general' 	: comment_general_all,
								'comment_private' 	: comment_private_all
							},
							success: function (data, model) {				
								//grid.up("window").close();											
								for (var i = 0; i < rows.length; i++) {									
									if(rows[i]['data'].is_approve != true || rows[i].dirty == true){										
										var index = s.indexOf(rows[i]);
										var rec = s.getAt(index);
										rec.beginEdit();								
										rec.set({
											is_approve: 1,
											approveon:today,
											is_reject: 0,
											rejecton:''
										});
										rec.commit();
										rec.endEdit();
										grid.getView().refresh();
																				
									}
								}
								p.setLoading(false);
								
							}
						}).read('approve');
					}
				}
				
			});// end confirm
        }
		
    },
    rejectDetail: function (state) {		
        var me, grid, rows, s, s_selected, delimiter, accessmatrix_id_all;
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
					accessmatrix_id_all = '';
					
					for (var i = 0; i < rows.length; i++) {
						
						if(rows[i]['data'].is_reject != true){		
							delimiter 		= counter == 0 ? '' : '~';					
							accessmatrix_id_all += delimiter + rows[i]['data'].accessmatrix_id.toString();	
							counter++;
						}
					}
					
					if (counter > 0){
						me.tools.ajax({
							params: {
								'accessmatrix_id'	: accessmatrix_id_all
							},
							success: function (data, model) {				
								//grid.up("window").close();
								for (var i = 0; i < rows.length; i++) {									
									if(rows[i]['data'].is_reject != true || rows[i].dirty == true){	
									
										var index = s.indexOf(rows[i]);
										var rec = s.getAt(index);
										rec.beginEdit();								
										rec.set({
											is_approve: 0,
											approveon:'',
											is_reject: 1,
											rejecton:today
										});										
										rec.commit();
										rec.endEdit();
										grid.getView().refresh();						
									}
								}
								p.setLoading(false);
								
							}
						}).read('reject');
					}
										
				}
			})
			
        }
		
    },	
    submitforapp: function () {
        var me, grid, rows, data, row, counter, countarray, accesslevel;
        me 		= this;
        grid 	= me.getGriddetail();
		s  		= grid.getStore();	
        rows 	= grid.getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected..!');
            return;
        } else {
			
			accesslevel = me.getFormdata().down("[name=accesslevel]").getValue();
			
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
							all_id += rows[i]['data'].accessmatrix_id;
														
						}
						
						me.tools.ajax({
							params: {
								all_id : all_id,
								accesslevel : accesslevel
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
    selectEmployee: function () {
        var me, grid, rows, data, row, counter, countarray, act_name, fields, accesslevel_id;
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
        	accesslevel_id = me.getFormdata().down("[name=accesslevel_id]").getValue();
			
			for (var i = 0; i < rows.length; i++) {
				
                //data["details"] = me.getGriddetail().getJson();
				me.tools.ajax({
					params: {
						'accesslevel_id': accesslevel_id,
						'employee_id'	: rows[i]['data'].employee_id,
						'status'		: rows[i]['data'].status,
						'content'		: rows[i]['data'].content,
						'score'			: rows[i]['data'].score,
						'comment_general' : rows[i]['data'].comment_general,
						'comment_private' : rows[i]['data'].comment_private
					},
					success: function (data, model) {
						counter++;
						if (countarray == counter) {
							
							var detailGrid = me.getGriddetail();
							detailGrid.doInit();
							detailGrid.getStore().load({
								params: {
									'accesslevel_id': accesslevel_id,
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
				var headerId = rec.data.accesslevel_id;
                gd.doInit();
                var store = gd.getStore().load({
                    params: {
                        mode_read: 'listdetail',
                        accesslevel_id: headerId
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
					var headerId = rec.data.accesslevel_id;
					me.header_id = rec.data.accesslevel_id;
					var gd = me.getGriddetail();
					gd.doInit();
					gd.bindPrefixName = me.controllerName;
					var store = gd.getStore().load({
						params: {
							mode_read: 'listdetail',
							accesslevel_id: headerId
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
        fromlocation: 'Hrd.view.monitoringmatrix.FormCopy',
        formtitle: 'Form', formicon: 'icon-form-copy',
        formid: 'win-monitoringmatrixformcopy', formlayout: 'fit',
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
				'accesslevel_id': me.getFormdata().down("[name=accesslevel_id]").getValue(),
				'accesslevel_id_copy': me.dr.getVal(form, 'accesslevel_id', 'value')
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
        var me, g, rec, accesslevel_id;
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