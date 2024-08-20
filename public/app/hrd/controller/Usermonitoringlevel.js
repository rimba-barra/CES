Ext.define('Hrd.controller.Usermonitoringlevel', {
    extend: 'Hrd.library.box.controller.Controller',
    alias: 'controller.Usermonitoringlevel',
    requires: [
        'Hrd.library.box.tools.Tools',
        'Hrd.library.box.tools.DefaultConfig',
        'Hrd.library.box.tools.EventSelector',
        'Hrd.library.Box.Tools.Browse',
        'Hrd.library.box.tools.Dynamicrequest',
    ],
    controllerName: 'usermonitoringlevel',
    fieldName: 'employee_name',
    bindPrefixName: 'Usermonitoringlevel',
    formWidth: 550,
    //header_id: 0,
    dynamicrequest: null,
    arraydata: null,
    localStore: {},
    refs: [
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
        me.dr = new Hrd.library.box.tools.Dynamicrequest();
        var newEvs = {};
		
        newEvs['usermonitoringlevelgrid button[action=approve]'] = {
            click: function () {
                me.Approve();
            }
        };
		
        newEvs['usermonitoringlevelgrid button[action=reject]'] = {
            click: function () {
                me.Reject();
            }
        };
		
        newEvs['usermonitoringlevelgrid button[action=submitforapp]'] = {
            click: function () {
                me.Submitforapp();
            }
        };
		
        this.control(newEvs);
    },
    Approve: function () {
        var me, grid, rows, data, row, counter, countarray;
        me = this;
        grid = me.getGrid();
        rows = grid.getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected..!');
            return;
        } else {
			countarray 	= rows.length;
			counter 	= 0;
                        me.arraydata = [];
			
			var cek_belum_approve = 0;	
			for (var i = 0; i < rows.length; i++) {
				is_approve = rows[i]['data'].is_approve;
				if(is_approve == ''){
					cek_belum_approve++;
				}
			}
			
			if(cek_belum_approve == 0){
				Ext.Msg.alert('Info', 'No record to approve, all record already approved.');
				return;
			}
			
			Ext.Msg.show({
				title: 'Approve',
				msg: 'Are you sure want to Approve ?',
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
						me.tools.ajax({
							params: {
							},
							success: function (record, model) {
								var user_index_no = record.others[0][0].index_no;
								if(parseInt(user_index_no) == 0){
									Ext.Msg.alert('Warning', 'Do not have authorized to approve');
									return false;
																
								} else {
									var do_not_autorized = 0;	
									var success = 0;
									var success_msg = '';
									var do_not_autorized_msg = '';
																
									for (var i = 0; i < rows.length; i++) {
										if (user_index_no >= rows[i]['data'].index_no){
											counter++;
											do_not_autorized++;
											if (countarray == counter) {
												if(success > 0){
													success_msg = 'Successfully approved ' + success + ' record(s)' ;
												}
												if(do_not_autorized > 0){
													do_not_autorized_msg = '<br>Do not have authorized to approve '+ do_not_autorized + ' record(s)';
												}
												me.dr.buildSuccessAlert(success_msg + do_not_autorized_msg);
												me.getGrid().getStore().reload();
											}
										} else {															
											me.tools.ajax({
												params: {
													'access_id': rows[i]['data'].access_id
												},
												success: function (data, model) {
													counter++;
													success++
													if (countarray == counter) {
														if(success > 0){
															success_msg = 'Successfully approved ' + success + ' record(s)' ;
														}
														if(do_not_autorized > 0){
															do_not_autorized_msg = '<br>Do not have authorized to approve '+ do_not_autorized + ' record(s)';
														}
														me.dr.buildSuccessAlert(success_msg + do_not_autorized_msg);
														me.getGrid().getStore().reload();
													}
												}
											}).read('approve');	
										}										
									}
								}
								
							}
						}).read('validateapprove');
						
						
					}
				},
				icon: Ext.Msg.QUESTION
			});
			
        }
    },	
    Reject: function () {
        var me, grid, rows, data, row, counter, countarray, is_reject;
        me = this;
        grid = me.getGrid();
        rows = grid.getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected..!');
            return;
        } else {
			countarray 	= rows.length;
			counter 	= 0;
            me.arraydata = [];
			
			var cek_belum_reject = 0;		
			for (var i = 0; i < rows.length; i++) {
				is_reject = rows[i]['data'].is_reject;
				if(is_reject == ''){
					cek_belum_reject++;
				}
			}
			
			if(cek_belum_reject == 0){
				Ext.Msg.alert('Info', 'No record to reject, all record already rejected.');
				return;
			}
			
			Ext.Msg.show({
				title: 'Reject',
				msg: 'Are you sure want to Reject ?',
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
						me.tools.ajax({
							params: {
							},
							success: function (record, model) {
								var user_index_no = record.others[0][0].index_no;
								if(user_index_no == 0){
									Ext.Msg.alert('Warning', 'Do not have authorized to reject');
									return false;
									
								} else {
									var do_not_autorized = 0;	
									var success = 0;
									var success_msg = '';
									var do_not_autorized_msg = '';
									
									for (var i = 0; i < rows.length; i++) {
										if (user_index_no >= rows[i]['data'].index_no){
											counter++;
											do_not_autorized++;
											if (countarray == counter) {
												if(success > 0){
													success_msg = 'Successfully rejected ' + success + ' record(s)' ;
												}
												if(do_not_autorized > 0){
													do_not_autorized_msg = '<br>Do not have authorized to reject '+ do_not_autorized + ' record(s)';
												}
												me.dr.buildSuccessAlert(success_msg + do_not_autorized_msg);
												me.getGrid().getStore().reload();
											}
										} else {
												
											me.tools.ajax({
												params: {
													'access_id': rows[i]['data'].access_id
												},
												success: function (data, model) {
													counter++;
													success++
													if (countarray == counter) {
														if(success > 0){
															success_msg = 'Successfully rejected ' + success + ' record(s)' ;
														}
														if(do_not_autorized > 0){
															do_not_autorized_msg = '<br>Do not have authorized to reject '+ do_not_autorized + ' record(s)';
														}
														me.dr.buildSuccessAlert(success_msg + do_not_autorized_msg);
														me.getGrid().getStore().reload();
													}						
												}
											}).read('reject');
											
										}										
									}
								}
								
							}
						}).read('validateapprove');			
					}
				},
				icon: Ext.Msg.QUESTION
			});
			
        }
    },	
    Submitforapp: function () {
        var me, grid, rows, data, row, counter, countarray;
        me = this;
        grid = me.getGrid();
        rows = grid.getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected..!');
            return;
        } else {
			
			var cek_belum_approve = 0;		
			for (var i = 0; i < rows.length; i++) {
				is_approve = rows[i]['data'].is_approve;
				if(is_approve == ''){
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
						for (var i = 0; i < rows.length; i++) {
							
							if(all_id != ''){
								all_id = all_id + ',';
							}														
							all_id += rows[i]['data'].access_id;
														
						}
						
						me.tools.ajax({
							params: {
								all_id : all_id
							},
							success: function (data, model) {
								me.getGrid().getStore().reload();
								me.dr.buildSuccessAlert('Email sent ');
							}
						}).read('sendemail');
						
					}
				},
				icon: Ext.Msg.QUESTION
			});
			
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
				me.tools.ajax({
					params: {},
					success: function (data, model) {
						me.tools.wesea(data.employeeall, f.down("[name=employee_id]")).comboBox();
						me.tools.wesea(data.accesslevel, f.down("[name=accesslevel_id]")).comboBox();		
					}
				}).read('listcb');
                me.unMask(1);
            },
            update: function () {				
				me.tools.ajax({
					params: {},
					success: function (data, model) {
						me.tools.wesea(data.employeeall, f.down("[name=employee_id]")).comboBox();
						me.tools.wesea(data.accesslevel, f.down("[name=accesslevel_id]")).comboBox();		
				
						var g = me.getGrid();
						var rec = g.getSelectedRecord();
						if (rec) {
							f.editedRow = g.getSelectedRow();
							f.loadRecord(rec);
						}
						
					}
				}).read('listcb');
                me.unMask(1);
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
		console.log(formdata);
        if (formdata.isValid()) {
            me.insSave({
                form: f,
                grid: g,
                finalData: function (data) {
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
		var me = this;
		var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();
		var edit = grid.down('#btnEdit');
		var deleteb = grid.down('#btnDelete');
		var approveb = grid.down('#btnApprove');
		var rejectb = grid.down('#btnReject');
		var submitforappb = grid.down('#btnSubmitforapp');
		if (edit !== null) {
			edit.setDisabled(row.length != 1);
		}
		if (deleteb !== null) {
			deleteb.setDisabled(row.length < 1);
		}
		if (approveb !== null) {
			approveb.setDisabled(row.length < 1);
		}
		if (rejectb !== null) {
			rejectb.setDisabled(row.length < 1);
		}
		if (submitforappb !== null) {
			submitforappb.setDisabled(row.length < 1);
		}
	}
});