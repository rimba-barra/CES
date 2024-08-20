Ext.define('Erems.library.template.controller.Controllerpopup', {
    extend: 'Erems.library.template.controller.Controller',
	
	dataExport: function(el, popup_type, extra_param={}) {
		var me = this;
		
		el.up('window').body.mask('Creating Excel File, Please Wait...');
		
		Ext.Ajax.timeout = 60000*30;
		
        var obj_export = {
            popup_type   : popup_type,
            export_excel : 1
        };

        if (Object.keys(extra_param).length > 0 && extra_param.constructor === Object) {
            obj_export = Object.assign(obj_export, extra_param);
        }

		Ext.Ajax.request({
            url     : 'erems/popupmaster/read/?action=schema',
            params  : obj_export,
            success : function(response) {
				try{
					var resp = response.responseText;
					
					if(resp) {
						var info = Ext.JSON.decode(resp);
						
						if(info.success == true){
							el.up('window').body.unmask();
							Ext.Msg.show({
								title: 'Info',
								msg: '<a href="' + info.url + '" target="blank">Click Here For Download Excel File</a>',
								icon: Ext.Msg.INFO,
								//buttons: [], //jika ingin tidak ada buttons
								buttons: Ext.Msg.CANCEL,
								buttonText : 
								{
									cancel : 'Close',
								}
							});
						} else {
							el.up('window').body.unmask();
							Ext.Msg.show({
								title: 'Failure',
								msg: 'Error: Export to Excel Failed.',
								icon: Ext.Msg.ERROR,
								buttons: Ext.Msg.OK
							});
						}
					}
				}catch(e){
					//console.error(e);
					el.up('window').body.unmask();
					Ext.Msg.show({
                        title: 'Failure',
                        msg: 'Error: Export to Excel Failed.',
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
			  	}
			},
			failure: function(e){
				//console.error(e);
				el.up('window').body.unmask();
				Ext.Msg.show({
					title: 'Failure',
					msg: 'Error: Export to Excel Failed.',
					icon: Ext.Msg.ERROR,
					buttons: Ext.Msg.OK
				});
			}
		});
    },
	
	dataSave: function() {
        var me = this;
        var form = me.getFormdata().getForm();
        var addingRecord = false;
        if (!me.finalValidation()) {
            return false;
        }
       
        // added 12 Nov 2013 
        var vp = me.validationProcess();
        var vps = false; // validation prosess status
        if (typeof vp === 'object') {
            vps = vp.status;
            if (!vps) {

                Ext.MessageBox.alert('Alert', vp.msg, function() {
                    var x = me.getFormdata().down('[name=' + vp.field + ']');
                    if (x !== null) {
                        x.markInvalid(vp.msg);
                        x.focus();
                    }

                });
            }
        } else if (typeof vp === 'boolean') {
            vps = vp;
        }
        // end added 12 Nov 2013

        if (form.isValid() && vps) {
            
            resetTimer();
            //var store = me.getGrid().getStore();
            var store = null;

            var fida = me.getFinalData(form.getValues());

            if (me.instantCreateMode) {

                store = _Apps.getController(me.callerId).getInstanCreateStorex(me.controllerName);
            } else {
                /* Mendefinisikan store sendiri pada saat proses simpan/edit 
                 * yang ada di me.storeProcess
                 * */
                if (!me.storeProcess) {
                   
                    store = me.getGrid().getStore();
                    console.log(store);

                } else {

                    store = me.storeProcess;

                }

            }

            var msg = function() {
                me.getFormdata().up('window').body.mask('Saving data, please wait ...');
            };
            switch (me.getFormdata().up('window').state.toLowerCase()) {
                case 'create':

                    store.add(fida);
                    addingRecord = true;
                    break;
                case 'update':
              
                    var idProperty = store.getProxy().getReader().getIdProperty();
                    var rec = store.getById(parseInt(form.findField(idProperty).getValue(), 10));
                    rec.beginEdit();
                    rec.set(fida);
                    rec.endEdit();
                    break;
                default:
                    return;
            }

            store.on('beforesync', msg);
            store.sync({
                success: function() {
                    me.getFormdata().up('window').body.unmask();
                    store.un('beforesync', msg);
                    store.reload();

                    /*if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
                        Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 0}});
                    }*/
                    Ext.Msg.show({
                        title: 'Success',
                        msg: 'Data saved successfully.',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function() {
                            me.formDataClose();
                        }
                    });
                },
                failure: function() {
                    me.getFormdata().up('window').body.unmask();
                    store.un('beforesync', msg);
                    if (store.getCount() > 0 && addingRecord) {
                        store.removeAt(store.getCount() - 1);
                    }
                    store.reload();
                    Ext.Msg.show({
                        title: 'Failure',
                        msg: 'Error: Unable to save data.',
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            });
        }
    },
	
	instantWindow: function(panel, width, title, state, id, controller) {
        var me = this;
        var formtitle, formicon;


        title = typeof title == 'undefined' ? 'My Window' : title;
        id = typeof id == 'undefined' ? 'myInstantWindow' : id;
        state = typeof state == 'undefined' ? 'create' : state;
        panel = typeof panel == 'undefined' ? 'Panel' : panel;
        width = typeof width == 'undefined' ? 600 : width;
        var controllerFolder = typeof controller === 'undefined' ? me.controllerName : controller;
        formtitle = title;
        formicon = 'icon-form-add';
        var winId = id;



        var win = desktop.getWindow(winId);
        if (!win) {
            win = desktop.createWindow({
                id: winId,
                title: formtitle,
                iconCls: formicon,
                resizable: true,
                minimizable: false,
                maximizable: true,
                width: width,
                renderTo: Ext.getBody(),
                constrain: true,
                constrainHeader: false,
                modal: true,
                layout: 'fit',
                shadow: 'frame',
                shadowOffset: 10,
                border: false,
                items: Ext.create('Erems.view.' + controllerFolder + '.' + panel),
                state: state
            });
        }
        win.show();
    },
	
	generateFakeForm:function(paramList,reportFile){		
        var form = '<form id="fakeReportFormID" action=resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key='+reportFile+'.mrt" target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
        for(var x in paramList){
            if(paramList[x]===null){
                paramList[x]='';
            }
            form +='<input type="hidden" name="'+x+'" value="'+paramList[x]+'">';
        }
        form +='<input type="submit" value="post"></form>';
        form +='<iframe name="my-iframe" style="height:100%;width:100%;"></iframe>';
        return form;
    },
	
	generateReportParams: function(params) {
        var str = "";
        var me = this;
        for (var x in params) {
            if (me.getFormdata().down("[name=" + x + "]").reportParams) {
                params[x] = params[x] === null ? "" : params[x];
                str += x + "=" + params[x] + "&";
            }

        }
        return str;
    },
	
	generateFakeForm2:function(paramList,reportFile){		
		//var form = '<form id="fakeReportFormID" action=resources/stimulsoftjs/viewer.php?reportfilelocation='+reportFile+'.mrt target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
		var form = '<form id="fakeReportFormID" action=resources/stimulsoftjsv2/viewer.php?reportfilelocation='+reportFile+'.mrt target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
		for(var x in paramList){
            if(paramList[x]===null){
                paramList[x]='';
            }
            form +='<input type="hidden" name="'+x+'" value="'+paramList[x]+'">';
        }
        form +='<input type="submit" value="post"></form>';
        form +='<iframe name="my-iframe" style="height:100%;width:100%;"></iframe>';
        return form;
    },
})