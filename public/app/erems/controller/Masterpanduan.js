Ext.define('Erems.controller.Masterpanduan', {
	extend: 'Erems.library.template.controller.Controller2',
	requires: ['Erems.library.Browse',
		'Erems.library.box.Config',
		'Erems.library.box.tools.Tools',
		'Erems.template.ComboBoxFields',
		'Erems.library.box.tools.EventSelector', 
		'Erems.library.ModuleTools'],
	alias: 'controller.Masterpanduan',
	views: ['masterpanduan.Panel', 'masterpanduan.Grid', 'masterpanduan.FormSearch', 'masterpanduan.FormData'],
	refs: [
		{
			ref: 'grid',
			selector: 'masterpanduangrid'
		},
		{
			ref: 'formsearch',
			selector: 'masterpanduanformsearch'
		},
		{
			ref: 'formdata',
			selector: 'masterpanduanformdata'
		}
	],
	controllerName: 'masterpanduan',
	fieldName: 'menu',
	bindPrefixName: 'Masterpanduan',
	localStore: {
		detail: null,
		selectedUnit: null,
		customer: null
	},
	browseHandler: null,
	cbf: null,
	mt: null,
	formxWinId: 'win-posisiwinId',
	constructor: function (configs) {
		this.callParent(arguments);
		var me = this;
		this.myConfig = new Erems.library.box.Config({
			_controllerName: me.controllerName
		});

		me.cbf = new Erems.template.ComboBoxFields();
	},
	init: function (application) {
		var me = this;

		me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
		var events = new Erems.library.box.tools.EventSelector();

		this.control({
			'masterpanduanpanel': {
				afterrender: this.panelAfterRender,
				beforerender: me.mainPanelBeforeRender
			},
			'masterpanduangrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'masterpanduangrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'masterpanduangrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'masterpanduangrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'masterpanduangrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'masterpanduangrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'masterpanduanformsearch button[action=search]': {
				click: this.dataSearch
			},
			'masterpanduanformsearch button[action=reset]': {
				click: this.dataReset
			},
			'masterpanduanformdata': {
				afterrender: this.formDataAfterRender,
				beforerender: function (el) {
				}
			},
			'masterpanduanformdata button[action=save]': {
				click: this.mainDataSave
			},
			'masterpanduanformdata button[action=cancel]': {
				click: this.formDataClose
			},
            'masterpanduanformdata #fd_file': {
                change: function(fld, a) {
                    me.formDataUploadFileDoc(fld, a, 'mode');
                }
            },
            //addby anas 18012021
            'masterpanduangrid actioncolumn': {
                downloadaction: me.actionColumnDownload
            },

		});
	},
	fdar: function () {
		var me = this;
        
        me.mt = new Erems.library.ModuleTools();

		return me.altFdar(me);

	},
	mainDataSave: function () {
		var me = this;

		me.tools.iNeedYou(me).save();
	},
	altFdar: function (controller) {
		var me = this;
		var f = controller.getFormdata();

		var x = {
			init: function () {
				controller.setActiveForm(f);
			},
			create: function () {
				var that = this;
				f.editedRow = -1;
				f.setLoading("Loading components...");
				me.tools.ajax({
					params: {},
					success: function (data, model) {
						f.setLoading(false);
					}
				}).read('detail');
			},
			update: function () {
				var that = this;
				f.editedRow = controller.getGrid().getSelectedRow();
				var rec = controller.getGrid().getSelectedRecord();

				f.setLoading("Loading...");
				me.tools.ajax({
					params: {},
					success: function (data, model) {
						f.loadRecord(rec);
						f.setLoading(false);
					}
				}).read('detail');
			}
		};
		return x;
	},
    refreshDocumentImageInfo: function(imageName) {
        var me = this;

        var form = me.getFormdata();
        form.down("[name=filename]").setValue(imageName);
        me.mt.customerPhoto(form.down("#file_image"), imageName, 'app/erems/uploads/masterpanduan/','360px 170px');
    },
    formDataUploadFileDoc: function(fld, a, mode) {
        var me = this;
        var form = fld.up("form");

        // update by anas 18012021
        me.uploadFile({
            form: form,
            params: {tipe: 'document'},
            callback: {
                success: function(imageName) {
                    me.refreshDocumentImageInfo(imageName);
                },
                failure: function() {

                }
            }
        });
    },

    //addby anas 18012021
    uploadFile: function(params) {
        var me = this;
        var form = params.form;
        var callback = params.callback;

        //updateby anas 22012021
        var filesize = 0;
        var filedoc = document.getElementsByName("file_browse")[0];
        if(filedoc != null){
            filesize = filedoc.files[0].size;
            filetype = filedoc.files[0].type;
        }

        if(filesize > 0 && filesize <= 5242880 && filetype == 'application/pdf') //filesize max 5MB
        {

            form.submit({
                clientValidation: false,
                url: 'erems/' + me.controllerName + '/upload',
                params:params.params,
                waitMsg: 'Uploading file...',
                success: function(f, a) {

                    var icon = Ext.Msg.INFO;
                    var msg = 'File Uploaded';

                    if (!a.result.success) {
                        icon = Ext.Msg.ERROR;
                        msg = a.result.msg;
                    } else {
                        callback.success(a.result.msg);
                    }

                    Ext.Msg.show({
                        title: 'Info',
                        msg: msg,
                        icon: icon,
                        buttons: Ext.Msg.OK
                    });
                },
                failure: function(f, a) {
                    callback.failure();
                    var msg = "...";
                    if(typeof a.result !=="undefined"){
                        msg= a.result.msg;
                    }else{
                        msg = "Please complete all the required field";
                    }
                    Ext.Msg.show({
                        title: 'Fail',
                        msg: msg,
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            });
        }
        else
        {
        	if(filesize <= 0 && filesize > 5242880){
            	var msg = "File upload maximum 5 MB";
        	}else if(filetype != 'application/pdf'){
            	var msg = "File hanya boleh pdf";
        	}
            Ext.Msg.show({
                title: 'Fail',
                msg: msg,
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
        }
    },

    //addby anas 18012021
    actionColumnDownload: function (view, rowIndex, colIndex, item, e, record, row) {
        //ceslive - updated by anas 01022021
        var url = window.location.protocol+"//"+window.location.host+'/webapps/Ciputra/public/app/erems/uploads/masterpanduan/'+view[5].data.filename;

        //cestest
        // var url = window.location.protocol+"//"+window.location.host+'/rico/Ciputra/public/app/erems/uploads/masterpanduan/'+view[5].data.filename;
        
        //local
        // var url = window.location.protocol+"//"+window.location.host+'/webapps/public/app/erems/uploads/masterpanduan/'+view[5].data.filename;
           
        var a = document.createElement('A');
        a.href = url;
        a.download = url.substr(url.lastIndexOf('/') + 1);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    },
});