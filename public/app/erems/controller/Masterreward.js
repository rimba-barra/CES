Ext.define('Erems.controller.Masterreward', { 
	extend: 'Erems.library.template.controller.Controller2', 
	alias: 'controller.Masterreward', 
	requires: [ 
		'Erems.library.ModuleTools', 
		'Erems.library.Browse', 
		'Erems.library.box.Config', 
		'Erems.library.box.tools.Tools', 
		'Erems.template.ComboBoxFields', 
		'Erems.library.box.tools.EventSelector', 
		'Erems.library.XyReport' 
	], 
	views: ['masterreward.Panel', 'masterreward.Grid', 'masterreward.FormSearch'], 
	refs: [ 
	{ 
		ref: 'grid', 
		selector: 'masterrewardgrid' 
	}, 

	{ 
		ref: 'panel', 
		selector: 'masterrewardpanel' 
	}, 
	{ 
		ref: 'formsearch', 
		selector: 'masterrewardformsearch' 
	} 

	], 
	controllerName: 'masterreward', 
	fieldName: 'reward_id', 
	formWidth: 800, 
	bindPrefixName: 'Masterreward', 
	tools: null, 
	myConfig: null, 
	formxWinId: 'win-masterrewardwinId', 
	constructor: function (configs) { 
		this.callParent(arguments); 
		var me = this; 
		this.myConfig = new Erems.library.box.Config({ 
			_controllerName: me.controllerName 
		}); 
	}, 
	xyReport: null, 
	init: function (application) { 
		var me = this; 

		me.tools = new Erems.library.box.tools.Tools({config: me.myConfig}); 
		var events = new Erems.library.box.tools.EventSelector(); 

		if (typeof Mustache === "undefined") { 
			Ext.Loader.injectScriptElement(document.URL + 'app/erems/library/mustache.min.js', function () { 
			}, function () { 
			}); 
		} 

		if (typeof ApliJs === "undefined") { 
			Ext.Loader.injectScriptElement(document.URL + 'app/erems/js/ApliJs.js?_=' + new Date().getTime(), function () { 
				console.log("[INFO] ApliJs loaded."); 
			}, function () { 
			}); 
		}

		if (typeof moment !== 'function') { 
			Ext.Loader.injectScriptElement(document.URL + 'app/erems/library/moment.min.js', function () { 
			}, function () { 
			}); 
		} 

		this.control({ 
			'masterrewardpanel': { 
				beforerender: me.mainPanelBeforeRender, 
				afterrender: this.panelAfterRender 
			}, 
			'masterrewardgrid': { 
				afterrender: this.gridAfterRender, 
				itemdblclick: this.gridItemDblClick, 
				itemcontextmenu: this.gridItemContextMenu, 
				selectionchange: this.gridSelectionChange 
			}, 
			'masterrewardgrid toolbar button[action=create]': { 
				click: function () { 
					var params = {}; 
					ApliJs.showHtml(me, "formdata_modal", params, 'create'); 
				} 
			}, 
			'masterrewardgrid toolbar button[action=update]': { 
				click: function () { 
					var params = {}; 
					ApliJs.showHtml(me, "formdata_modal", params, 'update'); 
				} 
			}, 
			'masterrewardformsearch button[action=search]': { 
				click: this.dataSearch 
			}, 
			'masterrewardformsearch button[action=reset]': { 
				click: this.dataReset 
			}, 
			'masterrewardgrid toolbar button[action=destroy]': { 
				click: function () { 
					me.deleteData(); 
				} 
			}, 
		}); 
	}, 
	deleteData: function () { 
        var me = this;
        var rows = me.getGrid().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            var confirmmsg, successmsg, failmsg;
            var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            var store = me.getGrid().getStore();
            if (rows.length == 1) {
                var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(me.fieldName) + ']';
                confirmmsg = 'Delete ' + selectedRecord + ' ?';
                failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg = 'Error: Unable to delete data.';
            }
            Ext.Msg.confirm('Delete Data', confirmmsg, function (btn) {
                if (btn == 'yes') {
                    resetTimer();
                    var msg = function () {
                        me.getGrid().up('window').mask('Deleting data, please wait ...');
                    };
                    for (var i = 0; i < rows.length; i++) {
        				$.ajax({ 
							method: "POST", 
							url: "erems/masterreward/read/", 
							data: {mode_read: "hapus", reward_id: rows[i].data.reward_id} 
						}).done(function (s) { 
							if(s.status == 1){
		                        Ext.Msg.show({
		                            title: 'Success',
		                            msg: "Successfully Deleted.",
		                            icon: Ext.Msg.INFO,
		                            buttons: Ext.Msg.OK
		                        });
							}else{
	                            Ext.Msg.show({
	                                title: 'Failure',
	                                msg: 'There is an active record for this unit.',
	                                icon: Ext.Msg.ERROR,
	                                buttons: Ext.Msg.OK
	                            });
							}
	                        me.getGrid().getStore().loadPage(1); 	
						}).fail(function(t){
                            me.getGrid().up('window').unmask();
                            store.un('beforesync', msg);
                            store.reload();
                            Ext.Msg.show({
                                title: 'Failure',
                                msg: failmsg + ' The data may have been used [ERR].',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
						}); 
                        // store.remove(rows[i]);
                    }
                }
            });
        }
	}, 
	gridItemDblClick:function(foo,data){ 
		var me = this; 
		var params = {}; 
		ApliJs.showHtml(me, "formdata_modal", params, 'update');  
	}, 
	execAction: function (el, action, me) { 
	}, 
	gridAfterRender: function (configs) { 
		this.callParent(arguments); 
		var me = this; 
		me.getGrid().doInit(); 
		me.getGrid().getStore().load({ 
			params: {}, 
			callback: function (rec, op) { 
				me.getGrid().attachModel(op); 

				var pg = me.getGrid().down("pagingtoolbar"); 
				if (pg) { 
					pg.getStore().load(); 
				} 
			} 
		}); 

		me.tools.ajax({ 
			params: {}, 
			success: function (data, model) { 
				me.tools.wesea(data.paymentmethods, me.getFormsearch().down("[name=paymentmethod_id]")).comboBox(true); 
				me.tools.wesea(data.blocks, me.getFormsearch().down("[name=block_id]")).comboBox(true); 
				me.tools.wesea(data.clusters, me.getFormsearch().down("[name=cluster_id]")).comboBox(true); 
			} 
		}).read('init'); 
		ApliJs.loadingbar().init(); 
	}, 
	apliJsFuncformdata_modal: function (modalId) { 
		var me = this; 
		var x = { 
			init: function () { 

			}, 
			formInit: function (callback) { 
				$.ajax({ 
					method: "POST", 
					url: "erems/masterreward/read/", 
					data: {mode_read: "forminit"} 
				}).done(function (msg) { 
					callback();
				}).fail(function (msg) { 
					ApliJs.loadingbar().hide(); 
					ApliJs.alert().error("Something problem when processing your request."); 
				}); 
			}, 
			afterRender: function () { 
				$('#' + modalId).on('shown.bs.modal', function () { 
					var action = $('#' + modalId).attr("abc-action"); 
					if (action === "create") { 
						$('#' + modalId + ' h4.modal-title').text("New reward"); 
						me.apliJsFuncformdata_modal(modalId).formInit(function () { 
							$('#' + modalId + ' #active_ID').prop('checked', true);
						}); 
					} else { 
						var rec = me.getGrid().getSelectedRecord(); 
						if (rec) { 
							$('#' + modalId + ' h4.modal-title').text("Edit reward"); 
							me.apliJsFuncformdata_modal(modalId).formInit(function () { 
								ApliJs.loadingbar().show("Mengambil reward..."); 
								$.ajax({ 
									method: "POST", 
									url: "erems/masterreward/read/", 
									data: {mode_read: "detail", reward_id: rec.get("reward_id")} 
								}).done(function (msg) { 
									var fa = msg.reward[1][0];
									ApliJs.form("#" + modalId + " form").loadData(fa); 
									ApliJs.loadingbar().hide(); 
								}).fail(function (msg) { 
									ApliJs.loadingbar().hide(); 
									ApliJs.alert().error("Something problem when processing your request."); 
								}); 
							}); 
						} else { 
							ApliJs.alert().warning("Silahkan memilih reward terlebih dahulu."); 
						} 
					}
				}); 

				$('#' + modalId + ' button[abc-action=save]').click(function () { 
					if (ApliJs.form("#" + modalId + " form").isValid()) { 
						$('#' + modalId + ' button[abc-action=save]').prop('disabled', true); 
						var dataForm = ApliJs.form("#" + modalId + " form").serialize(); 
						ApliJs.loadingbar().show("Sedang menyimpan..."); 
						var action = $('#' + modalId).attr("abc-action"); 
						$.ajax({ 
							method: "POST", 
							url: "erems/masterreward/read/", 
							data: {mode_read: action === "create" ? "save" : "update", data: JSON.stringify(dataForm)} 
						}).done(function (msg) { 
							ApliJs.loadingbar().hide(); 
							$('#' + modalId + ' button[abc-action=save]').prop('disabled', false); 
							if (!msg.STATUS) { 
								ApliJs.alert().warning(msg.MSG); 
							} else { 
								ApliJs.alert().success("reward berhasil disimpan !"); 

								$("#" + modalId).modal('hide'); 
								me.getGrid().getStore().loadPage(1); 
							} 
						}); 
					} 
				}); 
			}, 
		}; 
		return x; 
	} 
}); 