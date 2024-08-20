Ext.define('Appsmgmt.controller.User', {
	extend : 'Ext.app.Controller',
	alias  : 'controller.User',
	models : ['User', 'UserActivity', 'GroupUser', 'Group'],
	stores : ['User', 'UserActivity', 'GroupUser', 'Group'],
	views  : ['user.Panel', 'user.UserFormData', 'user.UserGroupFormData', 'user.PasswordForm'],
	refs   : [
		{
			ref      : 'UserMainPanel',
			selector : '#userMainPanel'
		},
		{
			ref      : 'UserGrid',
			selector : '#userMainPanel #userGrid'
		},
		{
			ref      : 'UserMainTab',
			selector : '#userMainPanel #userMainTab'
		},
		{
			ref      : 'UserInfo',
			selector : '#userMainPanel #userForm'
		},
		{
			ref      : 'GroupUserGrid',
			selector : '#userMainPanel #groupuserGrid'
		},
		{
			ref      : 'UserActivityGrid',
			selector : '#userMainPanel #userActivityGrid'
		}],
	init: function (application) {
		this.control({
			'#userMainPanel': {
				beforerender: this.mainPanelBeforeRender,
				afterrender: this.mainPanelAfterRender,
				beforedestroy: this.mainPanelBeforeDestroy
			},
			'#userMainPanel panel': {
				selectionchange: this.gridSelectionChange,
				itemdblclick: this.gridItemDblClick
			},
			'#userMainPanel #btnRefresh': {
				click: this.btnRefreshClick
			},
			'UserFormData, UserGroupFormData': {
				afterrender   : this.formDataAfterRender,
				beforedestroy : this.formDataBeforeDestroy
			},
			'PasswordForm': {
				afterrender: this.formPasswordAfterRender
			},
			'PasswordForm button:not([itemId=btnCancel])': {
				click: this.formPasswordButtonClick
			},
			'UserGroupFormData #apps_id': {
				change: this.appsChange,
				select: this.appsSelect
			},
			'UserGroupFormData #group_id': {
				blur: this.groupBlur,
				focus: this.groupFocus
			},
			'UserGroupFormData #project_id': {
				change: this.projectChange,
				select: this.projectSelect
			},
			'UserGroupFormData #pt_id': {
				blur: this.ptBlur,
				focus: this.ptFocus,
				change: this.ptChange,
				select: this.ptSelect
			},
			'window[id=winappsmgmt-formdata-User] #btnSave, window[id=winappsmgmt-formdata-UserGroup] #btnSave': {
				click: this.dataSave
			},
			'window[id=winappsmgmt-formdata-User] #btnCancel, window[id=winappsmgmt-formdata-UserGroup] #btnCancel, window[id=appsmgmt-formpassword] #btnCancel': {
				click: this.formDataClose
			},
			'#btnSearch': {
				click: this.btnSearchClick
			}
		})
	},
	execAction: function (el, action, me) {
		if (!action) {
			action = ''
		}
		if (!me) {
			me = this
		}
		if (me.getUserMainTab().getActiveTab().getItemId() == 'UserGroup' && action == 'delete') {
			var currentApps = (me.self.getName()).split('.', 1).toString().toLowerCase() == me.getGroupUserGrid().getSelectionModel().getSelection()[0].get('apps_basename').toLowerCase(), currentUser = me.getUserGrid().getSelectionModel().getSelection()[0].get('user_name') == apps.uid;
			if (currentApps && currentUser) {
				Ext.Msg.show({
					title: ' ',
					msg: 'This is the current active group for this user account.',
					icon: Ext.Msg.WARNING,
					buttons: Ext.Msg.OK, fn: function () {}
				});
				action = ''
			}
		}
		switch (action) {
			case'create':
			case'update':
				me.formDataShow(el, action);
				break;
			case'delete':
				me.dataDestroy(el);
				break;
			case'UserChangePassword':
				if (me.getUserGrid().getSelectionModel().getSelection()[0].get('user_name') == apps.uid) {
					MyApps.changepassword()
				} else {
					me.formPasswordShow()
				}
				break;
			case'UserLogout':
				Ext.Msg.confirm('Set to Logout', 'Set [' + me.getUserGrid().getSelectionModel().getSelection()[0].get('user_name') + '] to logout ?', function (b) {
					if (b == 'yes') {
						me.getUserGrid().up('window').body.mask('Logging out user, please wait ...');
						Ext.Ajax.request({
							method: 'POST',
							url: 'appsmgmt/user/logout',
							params: {
								'user_id': me.getUserGrid().getSelectionModel().getSelection()[0].get('user_id')
							},
							success: function (a) {
								me.getUserGrid().up('window').body.unmask();
								me.getUserGrid().getStore().reload();
								if (parseInt(a.responseText, 10)) {
									Ext.Msg.show({
										title: 'Success', msg: 'User logged out.', icon: Ext.Msg.INFO, buttons: Ext.Msg.OK
									})
								} else {
									Ext.Msg.show({
										title: 'Failure', msg: 'Failed.', icon: Ext.Msg.ERROR, buttons: Ext.Msg.OK
									})
								}
							},
							failure: function () {
								me.getUserGrid().up('window').body.unmask();
								me.getUserGrid().getStore().reload();
								Ext.Msg.show({
									title: 'Failure', msg: 'Failed.', icon: Ext.Msg.ERROR, buttons: Ext.Msg.OK
								})
							}
						})
					}
				});
				break
		}

	},
	mainPanelBeforeRender: function () {
		if (typeof Ext.StoreManager.lookup('ApplicationStored') == 'undefined') {
			Ext.create('Appsmgmt.store.Application', {
				storeId: 'ApplicationStored',
				sorters: [{property: 'apps_name', direction: 'ASC'}]
			}).load({params: {limit: 0}})
		}
//		if (typeof Ext.StoreManager.lookup('GroupStored') == 'undefined') {
//			Ext.create('Appsmgmt.store.Group', {
//				storeId: 'GroupStored',
//				sorters: [{property: 'group_name', direction: 'ASC'}]
//			}).load({params: {limit: 0}})
//		}
//		if (typeof Ext.StoreManager.lookup('UserStored') == 'undefined') {
//			Ext.create('Appsmgmt.store.User', {
//				storeId: 'UserStored', sorters: [{property: 'user_name', direction: 'ASC'}]
//			}).load({params: {limit: 0}})
//		}
		if (typeof Ext.StoreManager.lookup('GroupUserUserStored') == 'undefined') {
			Ext.create('Appsmgmt.store.GroupUser', {
				storeId: 'GroupUserUserStored',
//				sorters: [
//					{property: 'apps_name', direction: 'ASC'},
//					{property: 'group_name', direction: 'ASC'},
//					{property: 'project_name', direction: 'ASC'}
//				]
			})//.load({params: {limit: 0}})
		}
		if (typeof Ext.StoreManager.lookup('ProjectptStored') == 'undefined') {
			Ext.create('Masterdata.store.Projectpt', {
				storeId: 'ProjectptStored',
				sorters: [{property: 'project_name', direction: 'ASC'}]
			}).load({params: {limit: 0}})
		}

		if (typeof Ext.StoreManager.lookup('UserPtStored') == 'undefined') {
			Ext.create('Masterdata.store.Projectpt', {
				storeId: 'UserPtStored',
				sorters: [{property: 'pt_name', direction: 'ASC'}]
			}).load({params: {limit: 0}})
		}
		setupObject(this.getUserMainPanel(), this.execAction, this);
	},
	mainPanelAfterRender: function () {
//		var me = this;
//		var store = me.getUserGrid().getStore();
//		store.getProxy().setExtraParam('search_query', '');
//		store.getProxy().setExtraParam('limit', 25);

		var me = this;
		me.getUserGrid().getStore().load({
			params: {
				limit: 25,
				search_query: ''
			},
			callback: function () {
				me.getUserGrid().getSelectionModel().select(0)
			}
		});

		me.getGroupUserGrid().bindStore(Ext.StoreManager.lookup('GroupUserUserStored'));
		me.getGroupUserGrid().down('pagingtoolbar').bindStore(Ext.StoreManager.lookup('GroupUserUserStored'));
	},
	mainPanelBeforeDestroy: function () {
		var me = this;
		me.getUserGrid().getStore().removeAll();
		Ext.StoreManager.lookup('ApplicationStored').clearFilter();
//		Ext.StoreManager.lookup('GroupStored').clearFilter();
//		Ext.StoreManager.lookup('UserStored').clearFilter();

	},
	gridSelectionChange: function (el, selected) {
		var me = this,
				panel = el.view.panel,
				groupUserStore = Ext.StoreManager.lookup('GroupUserUserStored'),
//				groupUserStore = me.getGroupUserGrid().getStore(),
				userActivityStore = me.getUserActivityGrid().getStore();
		if (panel.down('#btnEdit')) {
			panel.down('#btnEdit').setDisabled(selected.length != 1)
		}
		if (panel.down('#btnDelete')) {
			panel.down('#btnDelete').setDisabled(selected.length < 1)
		}
		if (panel.getItemId() == 'userGrid') {
			if (selected.length == 1) {
				var user_id = selected[0].get('user_id');
				me.getUserInfo().loadRecord(selected[0]);
				groupUserStore.getProxy().setExtraParam('user_id', user_id);
				groupUserStore.load({params: {'start': 0}});
				groupUserStore.currentPage = 1;
				me.getUserMainTab().setTitle(selected[0].get('user_name') + (selected[0].get('user_fullname') ? ' [' + selected[0].get('user_fullname') + ']' : ''));
				me.getUserMainTab().setDisabled(false);
				var isCurrentUser = selected[0].get('user_name') == apps.uid;
				panel.down('#btnDelete').setDisabled(selected.length < 1 || isCurrentUser || selected[0].get('login_status'));
				me.getUserMainTab().down('[bindAction=UserLogout]').setVisible(!isCurrentUser && selected[0].get('login_status'))
			} else {
				me.getUserMainTab().setTitle('');
				me.getUserMainTab().setDisabled(true);
				me.getUserInfo().getForm().reset();
				groupUserStore.removeAll();
				userActivityStore.removeAll()
			}
		}
	},
	gridItemDblClick: function (el) {
		var me = this, btnEdit = el.up('panel').down('#btnEdit');
		if (btnEdit.isVisible() && !btnEdit.isDisabled()) {
			me.execAction(el, 'update')
		}
	},
	btnRefreshClick: function (el) {
		var me = this, panel = el.up('panel');
		if (panel.isXType('treepanel')) {
			panel.setRootNode().removeAll();
			panel.getStore().setRootNode().removeAll();
			panel.setLoading(true, true);
			panel.getStore().reload({
				callback: function () {
					panel.setLoading(false)
				}
			})
		} else {
			var cfg, selModel = panel.getSelectionModel(), lastSelected = selModel.getLastSelected();
			if (panel.getItemId() == 'userGrid') {
				cfg = {
					callback: function () {
						if (lastSelected) {
							selModel.select(lastSelected.index)
						}
					}
				}
			}
			panel.getStore().reload(cfg)
		}
	},
	formDataShow: function (el, state) {
		var me = this,
				formtitle,
				formicon,
				parent = (Ext.isObject(el.up('gridpanel[itemId=userGrid]')) ? el.up('gridpanel[itemId=userGrid]') : me.getUserMainTab().getActiveTab()),
				parentId = (Ext.isObject(el.up('gridpanel[itemId=userGrid]')) ? 'User' : parent.getItemId()),
				title = (Ext.isObject(el.up('gridpanel[itemId=userGrid]')) ? 'User' : parent.title),
				winId = 'winappsmgmt-formdata-' + parentId, formwidget = 'Appsmgmt.view.user.' + parentId + 'FormData', win = desktop.getWindow(winId);

		switch (state) {
			case'create':
				formtitle = 'Add ' + title;
				formicon = 'icon-form-add';
				break;
			case'update':
				formtitle = 'Edit ' + title;
				formicon = 'icon-form-edit';
				break
		}
		if (!win) {
			win = desktop.createWindow({
				id: winId,
				title: formtitle,
				iconCls: formicon,
				resizable: false,
				minimizable: false,
				maximizable: false,
				width: 670,
				renderTo: Ext.getBody(),
				constrain: true,
				constrainHeader: false,
				taskbarButton: false,
				modal: true,
				layout: 'fit',
				shadow: 'frame',
				shadowOffset: 10,
				border: false,
				items: Ext.create(formwidget),
				state: state,
				sender: el
			})
		}
		win.show();

	},
	formDataAfterRender: function (el) {
		var me = this, win = el.up('window'), state = win.state.toLowerCase(), formId = el.getItemId(), store = [];
		if (formId == 'UserGroup') {
			el.down('#apps_id').bindStore(Ext.StoreManager.lookup('ApplicationStored'));
			store[0] = me.getGroupStore();
			store[1] = Ext.StoreManager.lookup('ProjectptStored');
			store[2] = Ext.create('Ext.data.Store', {
				fields: ['project_id', 'project_name']
			}
			);
			// store[3] = Ext.create('Ext.data.Store', {
			// 	model: store[2].model, recordType: store[2].recordType
			// }
			// );
			store[2].sort('project_name', 'ASC');
			// store[3].sort('pt_name', 'ASC');
			var projectrecords = [], ptrecords = [];
			Ext.each(store[1].collect('project_id'), function (x) {
				store[1].each(function (r) {
					if (x == r.get('project_id')) {
						projectrecords[x] = {
							'project_id': x, 'project_name': r.get('project_name')
						}
					}
				})
			});
			Ext.each(projectrecords, function (x) {
				if (Ext.isObject(x)) {
					store[2].add(x)
				}
			});
			// store[1].each(function (r) {
			// 	store[3].add(r)
			// });
			el.down('#user_id').setValue(parseInt((me.getUserGrid().getSelectionModel().getSelection()[0]).get('user_id'), 10));
			el.down('#user_name').setValue((me.getUserGrid().getSelectionModel().getSelection()[0]).get('user_name'));
			el.down('#group_id').bindStore(store[0]);
			el.down('#projectpt_id').bindStore(store[1]);
			el.down('#project_id').bindStore(store[2]);
			el.down('#pt_id').bindStore(Ext.StoreManager.lookup('UserPtStored'))

			me.reset_warning_projectpt(el);
		}

		if (state == 'create') {
			switch (formId) {
				case'User':
					break;
				case'UserGroup':
					store[0].filter({
						filterFn: function (a) {
							return(a.get('active') == true)
						}
					}
					);
					el.down('#projectpt').setVisible(false);
					break
			}
			el.down('#active').setValue(1)
		} else if (state == 'update') {
			var record = win.sender.up('panel').getSelectionModel().getSelection()[0];
			el.loadRecord(record);
			switch (formId) {
				case'User':
					if (record.get('user_name') == apps.uid) {
						el.down('#user_name').setReadOnly(true);
						el.down('#active').setReadOnly(true)
					}
					el.down('#user_pass').setValue('XXXXXXXXXX');
					el.down('#user_pass').setReadOnly(true);
					el.down('#employee_id').setValue('');
					break;
				case'UserGroup':
					var projectpt = Ext.StoreManager.lookup('ApplicationStored').getById(record.get('apps_id')).get('projectpt');
					el.down('#group_id').getStore().load({params: {apps_id: record.get('apps_id'), limit: 0}});
					store[0].filter({
						filterFn: function (a) {
							return(a.get('apps_id') == record.get('apps_id') && a.get('active') == true) || a.get('group_id') == record.get('group_id')
						}
					});
					if (projectpt) {
						// store[2].filter({
						// 	filterFn                   : function (a) {
						// 		return a.get('active') == true || a.get('project_id') == record.get('project_id')
						// 	}
						// });
						el.down('#pt_id').getStore().load({params: {limit: 0, project_id: record.get('project_id')}});
						el.down('#pt_id').setValue(record.get('pt_id'))
					}
					el.down('#projectpt_id').setValue(record.get('projectpt_id'));
					el.down('#projectpt').setVisible(projectpt);
					el.down('#group_id').setValue(record.get('group_id'));
					el.down('#group_id').setReadOnly(false);
					el.down('#pt_id').setReadOnly(false);
					var currentApps = (me.self.getName()).split('.', 1).toString().toLowerCase() == me.getGroupUserGrid().getSelectionModel().getSelection()[0].get('apps_basename').toLowerCase(),
							currentUser = me.getUserGrid().getSelectionModel().getSelection()[0].get('user_name') == apps.uid;
					if (currentApps && currentUser) {
						el.down('#apps_id').setReadOnly(true);
						el.down('#group_id').setReadOnly(true);
						el.down('#pt_id').setReadOnly(true);
						el.down('#active').setReadOnly(true)
					}
					break
			}
		}

	},
	formDataClose: function (el) {
		el.up('window').close();
	},
	formDataBeforeDestroy: function (el) {
		var formId = el.getItemId();
		Ext.StoreManager.lookup('ApplicationStored').clearFilter();
		// Ext.StoreManager.lookup('GroupStored').clearFilter();
		// Ext.StoreManager.lookup('UserStored').clearFilter();
		switch (formId) {
			case'User':
				break;
			case'UserGroup':
				// Ext.StoreManager.lookup('GroupUserUserStored').clearFilter();
				Ext.StoreManager.lookup('ProjectptStored').clearFilter();
				break
		}

	},
	formPasswordShow: function (el) {
		var winId = 'appsmgmt-formpassword', win = desktop.getWindow(winId);
		if (!win) {
			win = desktop.createWindow({
				id: winId,
				title: 'Reset Password',
				iconCls: 'icon-appsmgmt-key',
				resizable: false,
				minimizable: false,
				maximizable: false,
				width: 350,
				bodyPadding: 15,
				renderTo: Ext.getBody(),
				constrain: true,
				constrainHeader: false,
				taskbarButton: false,
				modal: true,
				layout: 'fit',
				shadow: 'frame',
				shadowOffset: 10,
				border: true,
				items: Ext.create('Appsmgmt.view.user.PasswordForm'),
				sender: el
			})
		}
		win.show();

	},
	formPasswordAfterRender: function (el) {
		var me = this;
		el.down('#user_id').setValue(me.getUserGrid().getSelectionModel().getSelection()[0].data.user_id);
		el.down('#user_name').setValue(me.getUserGrid().getSelectionModel().getSelection()[0].data.user_name);

	},
	formPasswordButtonClick: function (el) {
		var me = this;
		if (el.getItemId() == 'btnHelp') {
			Ext.Msg.show({
				title: 'Password Help', msg: '<div class="small">Min. ' + apps.passminlength + ' character' + (apps.passminlength > 1 ? 's' : '') + ', CASE-SENSITIVE.</div>', icon: Ext.Msg.INFO, buttons: Ext.Msg.OK
			})
		} else if (el.getItemId() == 'btnSubmit') {
			var form = el.up('form').getForm(), pas = el.up('form').down('#user_pass');
			if (pas.getValue().length < apps.passminlength || pas.getValue().match(/[^A-Za-z0-9!@#$%^&*()_+<>?,.\-\/]/gi)) {
				Ext.Msg.show({
					title: 'Reset Password',
					msg: 'Password does not meet minimum requirement !',
					icon: Ext.Msg.ERROR,
					buttons: Ext.Msg.OK, fn: function () {
						pas.focus()
					}
				})
			} else {
				form.submit({
					url: 'appsmgmt/user/changepassword',
					waitMsg: 'Submitting password, please wait ...',
					success: function (a, b) {
						if (b.result.success == true) {
//							var c = me.getUserGrid().getSelectionModel(), lastSelected = c.getLastSelected();
//							me.getUserGrid().getStore().reload({
//								callback: function () {
//									c.select(lastSelected.index)
//								}
//							});
//							Ext.StoreManager.lookup('UserStored').reload();
							Ext.Msg.show({
								title: 'Reset Password',
								msg: 'Password reset successfully !',
								icon: Ext.Msg.INFO,
								buttons: Ext.Msg.OK,
								fn: function () {
									me.formDataClose(el)
								}
							})
						} else {
							Ext.Msg.show({
								title: 'Reset Password',
								msg: 'Error: Unable to reset password !',
								icon: Ext.Msg.ERROR,
								buttons: Ext.Msg.OK
							})
						}
					},
					failure: function () {
						Ext.Msg.show({
							title: 'Reset Password',
							msg: 'Error: Unable to reset password !',
							icon: Ext.Msg.ERROR,
							buttons: Ext.Msg.OK
						})
					}
				})
			}
		}
	},
	appsChange: function (el) {
		var me = this;

		el.next().getStore().clearFilter();
		el.next().setValue('');
		el.next().setReadOnly(true);
		el.up('form').down('#projectpt').setVisible(false);

		el.up('form').down('#project_id').getStore().clearFilter();
		el.up('form').down('#project_id').setValue('');
		me.reset_warning_projectpt(el.up('form'));
	},
	appsSelect: function (el) {
		var me = this;
		me.getGroupStore().load({params: {apps_id: el.getValue(), limit: 0}});
		el.next().setReadOnly(false);
		if (el.getStore().getById(el.getValue()).get('projectpt')) {
			el.up('form').down('#project_id').allowBlank = false;
			el.up('form').down('#pt_id').allowBlank = false;
			el.up('form').down('#projectpt').setVisible(true)
		}
		else {
			el.up('form').down('#project_id').allowBlank = true;
			el.up('form').down('#pt_id').allowBlank = true;
			el.up('form').down('#projectpt').setVisible(false);
			el.up('form').down('#projectpt_id').setValue(0)
		}
	},
	groupBlur: function (el) {
		if (!el.prev().getValue()) {
			el.setValue('')
		}

	},
	groupFocus: function (el) {
		if (!el.prev().getValue()) {
			el.setValue('-- select application first --')
		}

	},
	projectChange: function (el) {
		el.next().getStore().clearFilter();
		el.next().setValue('');
		el.next().setReadOnly(true);
	},
	/*
	 projectSelect: function (el) {
	 eval(function (p, a, c, k, e, r) {
	 e = String;
	 if (!''.replace(/^/, String)) {
	 while (c--)
	 r[c] = k[c] || c;
	 k = [function (e) {
	 return r[e]
	 }];
	 e = function () {
	 return '\\w+'
	 };
	 c = 1
	 }
	 ;
	 while (c--)
	 if (k[c])
	 p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
	 return p
	 }('0.1().2().3(\'4\',0.5());0.1().6(7);', 8, 8, 'el|next|getStore|filter|project_id|getValue|setReadOnly|false'.split('|'), 0, {}))
	 },
	 */
	projectSelect: function (el) { //edited by ahmad riadi 10-10-2017
		var me =  this;
		var store = el.next().getStore();
		var form = el.up('form');
		var project_id = form.down('#project_id').getValue();

		store.load({params: {limit: 0, project_id: project_id}});

		el.next().setReadOnly(false);

		me.reset_warning_projectpt(form);
	},

	ptBlur: function (el) {
		if (!el.prev().getValue()) {
			el.setValue('')
		}

	},
	ptFocus: function (el) {
		if (!el.prev().getValue()) {
			el.setValue('-- select project first --')
		}

	},
	ptChange: function (el) {
		el.next().setValue('');
	},
	ptSelect: function (el) {
		var form = el.up('form'), field = el.next('#projectpt_id'), store = field.getStore();
		store.clearFilter();
		store.filter({
			filterFn: function (a) {
				return a.get('project_id') == form.down('#project_id').getValue() && a.get('pt_id') == form.down('#pt_id').getValue()
			}
		});
		el.next('#projectpt_id').setValue(store.getAt(0).get('projectpt_id'));

		if(form.down('#apps_id').getValue() == 5){ //// erems
			//////// CEK GENCO PROLIB
            $.ajax({
                type     : "POST",
                url      : 'erems/bypass/general',
                data     : { 
					mode_read      : 'cek_genco_prolib', 
					projectid      : form.down('#project_id').getValue(), 
					ptid           : form.down('#pt_id').getValue(), 
					projectname    : form.down('#project_id').getRawValue(), 
					ptname         : form.down('#pt_id').getRawValue(),
					show_available : 1 
                },
                dataType : 'json',
                success  : function (response){
					form.down('#label_warning_projectpt').setVisible(true);

                	var text_available = '';
                    if(response.msg != ''){
                    	text_available = '<p style="color:red;">' + response.msg + '</p>';
                    }

                    if(response.msg_available != ''){
                    	if(response.msg != ''){
                    		text_available = text_available + '<br/>';
                    	}
                    	text_available = text_available + '<p>' + response.msg_available + '</p>';
                    }
                    
                    form.down('#label_warning_projectpt').el.dom.innerHTML = text_available;
                }
            });
		}
	},
	dataSave: function (el) {
		var me = this, formpanel = el.up('form'), form = formpanel.getForm();
		if (form.isValid()) {
			var formId = formpanel.getItemId(),
					win = el.up('window'),
					state = win.state.toLowerCase(),
					store = win.sender.up('panel').getStore(),
					extraFailMsg = '',
					msg = function () {
						win.body.mask('Saving data, please wait ...')
					};
			switch (state) {
				case'create':
					extraFailMsg = '<br />Data may already exists.';
					store.add(form.getValues());
					break;
				case'update':
					var idProperty = store.getProxy().getReader().getIdProperty(), rec = store.getById(parseInt(form.findField(idProperty).getValue(), 10));
					extraFailMsg = '<br />Data may have been used.';
					rec.beginEdit();
					rec.set(form.getValues());
					rec.endEdit();
					break
			}
			store.on('beforesync', msg);
			store.sync({
				success: function () {
					win.body.unmask();
					store.un('beforesync', msg);
					store.reload();
					if (formId == 'UserGroup') {
						formId = 'GroupUser';
						var a = desktop.getWindow('win-mnuAccessRights');
						if (a) {
							if (!a.down('#groupuserGrid').up('tabpanel').isDisabled()) {
								a.down('#groupuserGrid').getStore().reload()
							}
						}
					}
					if (typeof Ext.StoreManager.lookup(formId + 'Stored') != 'undefined') {
						Ext.StoreManager.lookup(formId + 'Stored').reload()
					}
					if (state == 'update') {
						if (rec.get('user_name') == apps.uid) {
							apps.username = (rec.get('user_fullname') ? rec.get('user_fullname') : rec.get('user_name'));
							desktop.taskbar.startMenu.setTitle(apps.username)
						}
					}
					Ext.Msg.show({
						title: 'Success',
						msg: 'Data saved successfully.',
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK,
						fn: function () {
							me.formDataClose(el)
						}
					})
				},
				failure: function () {
					win.body.unmask();
					store.un('beforesync', msg);
					store.reload();
					if (formId == 'UserGroup') {
						formId = 'GroupUser';
						var a = desktop.getWindow('win-mnuAccessRights');
						if (a) {
							if (!a.down('#groupuserGrid').up('tabpanel').isDisabled()) {
								a.down('#groupuserGrid').getStore().reload()
							}
						}
					}
					if (typeof Ext.StoreManager.lookup(formId + 'Stored') != 'undefined') {
						Ext.StoreManager.lookup(formId + 'Stored').reload()
					}
					Ext.Msg.show({
						title: 'Failure',
						msg: 'Error: Unable to save data.' + extraFailMsg,
						icon: Ext.Msg.ERROR,
						buttons: Ext.Msg.OK
					})
				}
			})
		}
	},
	dataDestroy: function (el) {
		var me = this, tab = el.up('tabpanel'), gridId = (tab ? tab.getActiveTab().getItemId() : 'User'), grid = el.up('panel'), store = grid.getStore(), winbody = grid.up('window').body, rec = grid.getSelectionModel().getSelection();
		if (gridId == 'UserGroup') {
			gridId = 'GroupUser'
		}
		if (rec.length < 1) {
			Ext.Msg.alert('Info', 'No record selected !');
			return
		} else {
			var confirmmsg, successmsg, failmsg, recordcounttext = rec.length + ' record' + (rec.length > 1 ? 's' : '');
			if (rec.length == 1) {
				var recname;
				switch (gridId) {
					case'GroupUser':
						recname = rec[0].get('apps_name') + ' - ' + rec[0].get('group_name');
						break;
					default:
						recname = rec[0].get(gridId.toLowerCase() + '_name');
						break
				}
				var selectedRecord = '[' + recname + ']';
				confirmmsg = 'Delete ' + selectedRecord + ' ?';
				failmsg = 'Error: Unable to delete ' + selectedRecord + '.'
			} else {
				confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
				failmsg = 'Error: Unable to delete data.'
			}
			Ext.Msg.confirm('Delete Data', confirmmsg, function (d) {
				if (d == 'yes') {
					var e = function () {
						winbody.mask('Deleting data, please wait ...')
					};
					for (var i = 0; i < rec.length; i++) {
						store.remove(rec[i])
					}
					store.on('beforesync', e);
					store.sync({
						success: function (s) {
							winbody.unmask();
							var a = parseInt(Ext.decode(s.operations[0].response.responseText).total, 10);
							var b = (rec.length == 1 ? selectedRecord : (a != rec.length ? a + ' of ' : '') + recordcounttext) + ' deleted successfully.';
							store.un('beforesync', e);
							if (gridId == 'GroupUser') {
								var c = desktop.getWindow('win-mnuAccessRights');
								if (c) {
									if (!c.down('#groupuserGrid').up('tabpanel').isDisabled()) {
										c.down('#groupuserGrid').getStore().reload()
									}
								}
							}
							if (typeof Ext.StoreManager.lookup(gridId + 'Stored') != 'undefined') {
								Ext.StoreManager.lookup(gridId + 'Stored').reload()
							}
							Ext.Msg.show({
								title: 'Success',
								msg: b,
								icon: Ext.Msg.INFO,
								buttons: Ext.Msg.OK
							})
						},
						failure: function () {
							grid.up('window').body.unmask();
							store.un('beforesync', e);
							if (gridId == 'GroupUser') {
								var a = desktop.getWindow('win-mnuAccessRights');
								if (a) {
									if (!a.down('#groupuserGrid').up('tabpanel').isDisabled()) {
										a.down('#groupuserGrid').getStore().reload()
									}
								}
							}
							if (typeof Ext.StoreManager.lookup(gridId + 'Stored') != 'undefined') {
								Ext.StoreManager.lookup(gridId + 'Stored').reload()
							}
							Ext.Msg.show({
								title: 'Failure',
								msg: failmsg + '<br />Data may have been used. Try to deactivate data.',
								icon: Ext.Msg.ERROR,
								buttons: Ext.Msg.OK
							})
						}
					})
				}
			})
		}
	},
	btnSearchClick: function () {
		var me = this;
		var panel = Appsmgmt.view.user.Panel;
		var store = me.getUserGrid().getStore();
		var search_query = Ext.ComponentQuery.query('#search_query_user')[0].getValue();
		store.getProxy().setExtraParam('search_query', search_query);
		me.getUserGrid().getStore().loadPage(1);
	},
	reset_warning_projectpt : function(form){
		var me = this;
		if(form.down('#label_warning_projectpt') && form.down('#pt_id')){
			if(!form.down('#pt_id').getValue()){
				form.down('#label_warning_projectpt').setVisible(false);
				form.down('#label_warning_projectpt').setText('');
			}
		}
	}
});